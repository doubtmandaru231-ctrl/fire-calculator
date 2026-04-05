import type {
  AdvancedInput,
  Age,
  ExpenseCategory,
  IncomeSource,
  RequiredAssetsBreakdown,
  SimulationResult,
  YearlySnapshot,
  Yen,
} from '@/types';
import { calcTotalEducationCostByOwnerAge } from './education';
import { calcTotalDebtPaymentByOwnerAge } from './debt';
import { amountAtAge, isAgeInRange } from './utils';
import { calcSuggestions } from './suggestions';

/**
 * 指定年齢時点の収入合計を計算する
 */
function calcIncomeForAge(
  age: Age,
  incomeSources: IncomeSource[],
): Yen {
  return incomeSources.reduce((sum, source) => {
    if (!isAgeInRange(age, source.startAge, source.endAge)) {
      return sum;
    }
    return sum + amountAtAge(source.annualAmount, source.growthRate, source.startAge, age);
  }, 0);
}

/**
 * 指定年齢時点の支出合計を計算する
 */
function calcExpenseForAge(
  age: Age,
  expenseCategories: ExpenseCategory[],
): Yen {
  return expenseCategories.reduce((sum, expense) => {
    if (!isAgeInRange(age, expense.startAge, expense.endAge)) {
      return sum;
    }
    return sum + amountAtAge(expense.annualAmount, expense.growthRate, expense.startAge, age);
  }, 0);
}

/**
 * 必要資産の内訳を計算する
 */
export function calcRequiredAssetsBreakdown(
  input: AdvancedInput,
): RequiredAssetsBreakdown {
  const { profile, cashFlow, debts, educationPlans } = input;

  const postFireYears = Math.max(0, profile.lifeExpectancy - profile.retirementAge);
  const livingExpenseTotal = cashFlow.retirementExpense * postFireYears;

  const educationMap = calcTotalEducationCostByOwnerAge(
    educationPlans,
    profile.currentAge,
    profile.lifeExpectancy,
  );
  const educationTotal = Object.entries(educationMap)
    .filter(([age]) => Number(age) >= profile.retirementAge)
    .reduce((sum, [, cost]) => sum + cost, 0);

  const debtMap = calcTotalDebtPaymentByOwnerAge(
    debts,
    profile.currentAge,
    profile.lifeExpectancy,
  );
  const debtTotal = Object.entries(debtMap)
    .filter(([age]) => Number(age) >= profile.retirementAge)
    .reduce((sum, [, payment]) => sum + payment, 0);

  const emergencyBuffer = cashFlow.retirementExpense;

  return {
    livingExpenseTotal,
    debtTotal,
    educationTotal,
    emergencyBuffer,
    total: livingExpenseTotal + debtTotal + educationTotal + emergencyBuffer,
  };
}

/**
 * 詳細モードの年次シミュレーション
 */
export function runAdvancedSimulation(input: AdvancedInput): SimulationResult {
  const { profile, cashFlow, assets, debts, educationPlans } = input;

  const currentAssets = assets.reduce((sum, account) => sum + account.currentBalance, 0);
  const annualContribution = assets.reduce((sum, account) => sum + account.annualContribution, 0);
  const weightedReturn =
    currentAssets > 0
      ? assets.reduce(
          (sum, account) => sum + account.currentBalance * account.expectedReturn,
          0,
        ) / currentAssets
      : 0;

  const educationMap = calcTotalEducationCostByOwnerAge(
    educationPlans,
    profile.currentAge,
    profile.lifeExpectancy,
  );

  const debtMap = calcTotalDebtPaymentByOwnerAge(
    debts,
    profile.currentAge,
    profile.lifeExpectancy,
  );

  const snapshots: YearlySnapshot[] = [];
  let assetsBalance = currentAssets;
  let depletionAge: Age | undefined;
  let projectedAtRetirement: Yen = currentAssets;

  for (let age = profile.currentAge; age <= profile.lifeExpectancy; age++) {
    const isRetired = age >= profile.retirementAge;

    const income = isRetired ? 0 : cashFlow.annualIncome;
    const livingExpense = isRetired
      ? cashFlow.retirementExpense
      : cashFlow.annualExpense;

    const educationCost = educationMap[age] ?? 0;
    const debtPayment = debtMap[age] ?? 0;
    const totalExpense = livingExpense + educationCost + debtPayment;

    const baseNetCashFlow = income - totalExpense;

    const contribution = isRetired ? 0 : annualContribution;
    const preReturnAssets = assetsBalance + contribution + baseNetCashFlow;

    const normalizedAssets = Math.max(0, preReturnAssets);

    const endAssets = normalizedAssets * (1 + weightedReturn);
    const netCashFlow = baseNetCashFlow + contribution;

    if (age === profile.retirementAge) {
      projectedAtRetirement = endAssets;
    }

    if (endAssets <= 0 && depletionAge === undefined) {
      depletionAge = age;
    }

    snapshots.push({
      age,
      totalIncome: income,
      totalExpense,
      educationCost,
      debtPayment,
      netCashFlow,
      assets: endAssets,
    });

    assetsBalance = endAssets;
  }

  const breakdown = calcRequiredAssetsBreakdown(input);
  const requiredAssets = breakdown.total;
  const shortfall = projectedAtRetirement - requiredAssets;

  const suggestions = calcSuggestions({
    shortfall,
    yearsToFire: Math.max(0, profile.retirementAge - profile.currentAge),
    annualSaving: Math.max(0, cashFlow.annualIncome - cashFlow.annualExpense) + annualContribution,
    postFireYears: Math.max(0, profile.lifeExpectancy - profile.retirementAge),
  });

  return {
    snapshots,
    depletionAge,
    canFire: depletionAge === undefined || depletionAge > profile.lifeExpectancy,
    fireAge: profile.retirementAge,
    requiredAssets,
    currentProjectedAssets: projectedAtRetirement,
    shortfall,
    breakdown,
    suggestions,
    calculatedAt: new Date().toISOString(),
    mode: 'advanced',
  };
}
