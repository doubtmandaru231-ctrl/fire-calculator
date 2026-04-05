import type { Age, Yen, Rate } from '@/types';

/**
 * 複利成長を計算する
 * @param principal 元本（万円）
 * @param rate 年率
 * @param years 年数
 */
export function compoundGrowth(
  principal: Yen,
  rate: Rate,
  years: number,
): Yen {
  return principal * Math.pow(1 + rate, years);
}

/**
 * 元利均等返済の月額を計算する
 * @param principal 元本（万円）
 * @param annualRate 年利
 * @param durationYears 返済期間（年）
 * @returns 月額返済額（万円）
 */
export function calcMonthlyPayment(
  principal: Yen,
  annualRate: Rate,
  durationYears: number,
): Yen {
  if (annualRate === 0) {
    return principal / (durationYears * 12);
  }
  const monthlyRate = annualRate / 12;
  const n = durationYears * 12;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
    (Math.pow(1 + monthlyRate, n) - 1)
  );
}

/**
 * 月額 → 年額に変換する
 */
export function monthlyToAnnual(monthly: Yen): Yen {
  return monthly * 12;
}

/**
 * 本人年齢から「対象年齢（子どもの年齢など）」を求める
 * @param ownerCurrentAge 本人の現在年齢
 * @param targetCurrentAge 対象の現在年齢
 * @param ownerAge シミュレーション中の本人年齢
 * @returns シミュレーション中の対象年齢
 */
export function calcTargetAge(
  ownerCurrentAge: Age,
  targetCurrentAge: Age,
  ownerAge: Age,
): Age {
  const elapsedYears = ownerAge - ownerCurrentAge;
  return targetCurrentAge + elapsedYears;
}

/**
 * 指定年齢が範囲内かどうかを判定する
 * @param age 判定する年齢
 * @param startAge 開始年齢（inclusive）
 * @param endAge 終了年齢（inclusive, undefined = 上限なし）
 */
export function isAgeInRange(
  age: Age,
  startAge: Age,
  endAge?: Age,
): boolean {
  if (age < startAge) return false;
  if (endAge !== undefined && age > endAge) return false;
  return true;
}

/**
 * 成長率を考慮した特定年齢での年額を返す
 * @param baseAmount 基準年額（万円）
 * @param growthRate 年間成長率
 * @param baseAge 基準年齢
 * @param targetAge 求めたい年齢
 */
export function amountAtAge(
  baseAmount: Yen,
  growthRate: Rate,
  baseAge: Age,
  targetAge: Age,
): Yen {
  const years = targetAge - baseAge;
  if (years < 0) return 0;
  return compoundGrowth(baseAmount, growthRate, years);
}

/**
 * 万円を表示用文字列に変換
 * @param amount 金額（万円）
 * @param digits 小数点以下桁数（デフォルト0）
 */
export function toManEn(amount: Yen, digits = 0): string {
  return amount.toFixed(digits) + '万円';
}
