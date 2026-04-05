// FIRE計算ロジック

export interface FireInputs {
  currentAge: number;        // 現在の年齢
  currentAssets: number;     // 現在の資産額（万円）
  monthlyIncome: number;     // 月収（万円）
  monthlyExpense: number;    // 月の生活費（万円）
  annualReturnRate: number;  // 年間運用利回り（%）
  safeWithdrawalRate: number; // 安全引出率（% デフォルト4%）
}

export interface YearlyData {
  year: number;
  age: number;
  assets: number;    // 資産額（万円）
  target: number;    // 目標資産額（万円）
}

export interface FireResult {
  targetAssets: number;      // 目標資産額（万円）
  fireYear: number | null;   // FIRE達成までの年数
  fireAge: number | null;    // FIRE達成時の年齢
  yearlyData: YearlyData[];  // 年ごとのデータ（グラフ用）
  monthlySavings: number;    // 月の貯蓄額（万円）
}

export function calculateFire(inputs: FireInputs): FireResult {
  const {
    currentAge,
    currentAssets,
    monthlyIncome,
    monthlyExpense,
    annualReturnRate,
    safeWithdrawalRate,
  } = inputs;

  // 目標資産額 = 年間生活費 ÷ 安全引出率
  // 例: 月30万円 × 12ヶ月 ÷ 0.04 = 9000万円
  const annualExpense = monthlyExpense * 12;
  const targetAssets = Math.round((annualExpense / (safeWithdrawalRate / 100)) * 10) / 10;

  const monthlySavings = monthlyIncome - monthlyExpense;
  const monthlyReturnRate = annualReturnRate / 100 / 12;

  const yearlyData: YearlyData[] = [];
  let assets = currentAssets;
  let fireYear: number | null = null;
  let fireAge: number | null = null;

  // 最大60年間シミュレーション
  for (let year = 0; year <= 60; year++) {
    const age = currentAge + year;

    yearlyData.push({
      year,
      age,
      assets: Math.round(assets * 10) / 10,
      target: targetAssets,
    });

    // FIRE達成チェック
    if (fireYear === null && assets >= targetAssets) {
      fireYear = year;
      fireAge = age;
    }

    // 1年分の資産増加を計算（毎月複利）
    for (let month = 0; month < 12; month++) {
      assets = assets * (1 + monthlyReturnRate) + monthlySavings;
    }
  }

  return {
    targetAssets,
    fireYear,
    fireAge,
    yearlyData,
    monthlySavings,
  };
}

// 数値を「1,234万円」形式にフォーマット
export function formatWan(value: number): string {
  if (value >= 10000) {
    const oku = Math.floor(value / 10000);
    const wan = Math.round(value % 10000);
    if (wan === 0) return `${oku.toLocaleString()}億円`;
    return `${oku.toLocaleString()}億${wan.toLocaleString()}万円`;
  }
  return `${value.toLocaleString()}万円`;
}
