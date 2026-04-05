import type {
  Age,
  Debt,
  DebtPaymentByAge,
} from '@/types';
import {
  calcMonthlyPayment,
  monthlyToAnnual,
  isAgeInRange,
} from './utils';

/**
 * 1件の負債の返済額を「本人年齢 → 年額」マップで返す
 *
 * - debt.startAge = 借入開始時の本人年齢（年齢ベース設計）
 * - 返済期間中の各年齢に年額返済額をマッピングする
 *
 * @param debt            負債情報
 * @param ownerCurrentAge 本人の現在年齢
 * @param ownerEndAge     シミュレーション終了年齢
 */
export function calcDebtPaymentByOwnerAge(
  debt: Debt,
  ownerCurrentAge: Age,
  ownerEndAge: Age,
): DebtPaymentByAge {
  const result: DebtPaymentByAge = {};

  const repayEndAge = debt.startAge + debt.durationYears - 1;

  // シミュレーション範囲と返済期間の重複がない場合は空を返す
  if (repayEndAge < ownerCurrentAge || debt.startAge > ownerEndAge) {
    return result;
  }

  const monthlyPayment = calcMonthlyPayment(
    debt.principal,
    debt.annualRate,
    debt.durationYears,
  );
  const annualPayment = monthlyToAnnual(monthlyPayment);

  for (let ownerAge = ownerCurrentAge; ownerAge <= ownerEndAge; ownerAge++) {
    if (isAgeInRange(ownerAge, debt.startAge, repayEndAge)) {
      result[ownerAge] = annualPayment;
    }
  }

  return result;
}

/**
 * 複数の負債の返済額マップを合算して返す
 *
 * @param debts           負債の配列
 * @param ownerCurrentAge 本人の現在年齢
 * @param ownerEndAge     シミュレーション終了年齢
 */
export function calcTotalDebtPaymentByOwnerAge(
  debts: Debt[],
  ownerCurrentAge: Age,
  ownerEndAge: Age,
): DebtPaymentByAge {
  const result: DebtPaymentByAge = {};

  for (const debt of debts) {
    const paymentMap = calcDebtPaymentByOwnerAge(
      debt,
      ownerCurrentAge,
      ownerEndAge,
    );

    for (const [ageStr, payment] of Object.entries(paymentMap)) {
      const age = Number(ageStr);
      result[age] = (result[age] ?? 0) + payment;
    }
  }

  return result;
}
