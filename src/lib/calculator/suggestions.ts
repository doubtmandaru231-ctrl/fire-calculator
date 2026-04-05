import type { Suggestion, Yen } from '@/types';

interface SuggestionParams {
  /** 余剰/不足額（万円）。負値が不足 */
  shortfall: Yen;
  /** FIREまでの残年数（現在年齢 → FIRE年齢） */
  yearsToFire: number;
  /** 現役時の年間貯蓄額（万円） */
  annualSaving: Yen;
  /** FIRE後の年数（FIRE年齢 → 試算終了年齢） */
  postFireYears: number;
}

/**
 * 不足額がある場合に3件の改善提案を返す。
 * 達成済みの場合は「達成可能」を示す1件を返す。
 *
 * すべてシンプルな線形近似（複利考慮なし）。
 */
export function calcSuggestions({
  shortfall,
  yearsToFire,
  annualSaving,
  postFireYears,
}: SuggestionParams): Suggestion[] {
  // 達成済み
  if (shortfall >= 0) {
    return [
      {
        type: 'success',
        label: 'この条件なら達成可能です',
        detail: `${shortfall > 0 ? `${Math.round(shortfall).toLocaleString()}万円の余裕があります。` : ''}計画通りに継続しましょう。`,
      },
    ];
  }

  const deficit = -shortfall; // 正値に変換
  const years = Math.max(1, yearsToFire);
  const postYears = Math.max(1, postFireYears);
  const saving = Math.max(1, annualSaving);

  // 1. 毎月の積立増加額（deficit を残年数 × 12 ヶ月で割る）
  const monthlySavingIncrease = Math.ceil(deficit / years / 12);

  // 2. FIRE年齢を遅らせる年数（追加年数 × 年間貯蓄 ≈ deficit）
  const delayYears = Math.ceil(deficit / saving);

  // 3. FIRE後の年間生活費削減額（削減額 × 後年数 ≈ deficit）
  const annualExpenseReduction = Math.ceil(deficit / postYears);
  const monthlyExpenseReduction = Math.ceil(annualExpenseReduction / 12);

  return [
    {
      type: 'saving',
      label: '毎月の積立を増やす',
      detail: `月 ${monthlySavingIncrease.toLocaleString()} 万円増やすことで不足分を補えます（利回り効果を除く概算）`,
    },
    {
      type: 'delay',
      label: 'FIRE年齢を遅らせる',
      detail: `約 ${delayYears} 年遅らせると現役期間が延び、資産を積み上げられます`,
    },
    {
      type: 'expense',
      label: 'FIRE後の生活費を見直す',
      detail: `年間 ${annualExpenseReduction.toLocaleString()} 万円（月 ${monthlyExpenseReduction.toLocaleString()} 万円）削減すると必要資産が減ります`,
    },
  ];
}
