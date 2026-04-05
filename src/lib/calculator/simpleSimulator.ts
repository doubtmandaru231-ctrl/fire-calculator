import type { Age, SimpleInput, SimulationResult, YearlySnapshot } from '@/types';
import { FIRE_WITHDRAWAL_RATE } from '@/constants/defaults';
import { calcSuggestions } from './suggestions';

const LIFE_EXPECTANCY = 90;

/**
 * 簡易モードのシミュレーション
 *
 * - 現役期: 毎年 monthlySaving × 12 を積立 → 年末に expectedReturn を適用
 * - FIRE後: 毎年 monthlyExpenseAfterFire × 12 を取り崩し → 年末に expectedReturn を適用
 * - 必要資産: 4%ルール（年間支出 ÷ 0.04）
 */
export function runSimpleSimulation(input: SimpleInput): SimulationResult {
  const {
    currentAge,
    retirementAge,
    currentAssets,
    monthlySaving,
    monthlyExpenseAfterFire,
    monthlyIncome,
    expectedReturn,
  } = input;

  const annualSaving = monthlySaving * 12;
  const annualExpenseAfterFire = monthlyExpenseAfterFire * 12;
  const annualIncome = monthlyIncome * 12;
  const annualExpenseBeforeFire = annualIncome - annualSaving;

  const snapshots: YearlySnapshot[] = [];
  let assets = currentAssets;
  let depletionAge: Age | undefined;
  let projectedAtRetirement = currentAssets;

  for (let age = currentAge; age <= LIFE_EXPECTANCY; age++) {
    const isRetired = age >= retirementAge;

    const totalIncome = isRetired ? 0 : annualIncome;
    const totalExpense = isRetired ? annualExpenseAfterFire : annualExpenseBeforeFire;
    const contribution = isRetired ? 0 : annualSaving;
    const withdrawal = isRetired ? annualExpenseAfterFire : 0;

    const netCashFlow = contribution - withdrawal;
    const preReturnAssets = Math.max(0, assets + netCashFlow);
    const endAssets = preReturnAssets * (1 + expectedReturn);

    if (age === retirementAge) {
      projectedAtRetirement = endAssets;
    }

    if (endAssets <= 0 && depletionAge === undefined) {
      depletionAge = age;
    }

    snapshots.push({
      age,
      totalIncome,
      totalExpense,
      educationCost: 0,
      debtPayment: 0,
      netCashFlow,
      assets: endAssets,
    });

    assets = endAssets;
  }

  // 4%ルールによる必要資産
  const requiredAssets = annualExpenseAfterFire / FIRE_WITHDRAWAL_RATE;
  const shortfall = projectedAtRetirement - requiredAssets;

  const suggestions = calcSuggestions({
    shortfall,
    yearsToFire: Math.max(0, retirementAge - currentAge),
    annualSaving,
    postFireYears: Math.max(0, LIFE_EXPECTANCY - retirementAge),
  });

  return {
    snapshots,
    depletionAge,
    canFire: depletionAge === undefined || depletionAge > LIFE_EXPECTANCY,
    fireAge: retirementAge,
    requiredAssets,
    currentProjectedAssets: projectedAtRetirement,
    shortfall,
    suggestions,
    calculatedAt: new Date().toISOString(),
    mode: 'simple',
  };
}
