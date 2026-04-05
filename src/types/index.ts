export type Age = number;
export type Yen = number; // 万円
export type Rate = number; // 0.05 = 5%

export type EducationStage =
  | 'nursery'
  | 'preschool'
  | 'elementary'
  | 'juniorHigh'
  | 'highSchool'
  | 'university';

export type SchoolType = 'public' | 'private';

export interface ChildEducationPlan {
  /** 子どもの現在年齢 */
  currentAge: Age;
  /** 各教育ステージごとの学校種別 */
  stages: Record<EducationStage, SchoolType>;
}

export type EducationCostByAge = Record<Age, Yen>;

export type DebtType = 'mortgage' | 'carLoan' | 'educationLoan' | 'other';

export interface Debt {
  id: string;
  label: string;
  type: DebtType;
  /** 借入開始時の本人年齢 */
  startAge: Age;
  /** 返済期間（年） */
  durationYears: number;
  /** 元本総額（万円） */
  principal: Yen;
  /** 年利（0.015 = 1.5%） */
  annualRate: Rate;
}

export type DebtPaymentByAge = Record<Age, Yen>;

export interface IncomeSource {
  id: string;
  label: string;
  /** 受取開始年齢 */
  startAge: Age;
  /** 受取終了年齢（undefined = 継続） */
  endAge?: Age;
  /** 年額（万円） */
  annualAmount: Yen;
  /** 毎年の増加率 */
  growthRate: Rate;
}

export interface ExpenseCategory {
  id: string;
  label: string;
  /** 発生開始年齢 */
  startAge: Age;
  /** 発生終了年齢（undefined = 継続） */
  endAge?: Age;
  /** 年額（万円） */
  annualAmount: Yen;
  /** 毎年の増加率 */
  growthRate: Rate;
}

export interface SimulationInput {
  /** 本人の現在年齢 */
  currentAge: Age;
  /** 試算終了年齢 */
  endAge: Age;
  /** 現在の総資産（万円） */
  currentAssets: Yen;
  /** 運用利回り */
  investmentReturn: Rate;
  /** インフレ率 */
  inflationRate: Rate;
  incomeSources: IncomeSource[];
  expenseCategories: ExpenseCategory[];
  children: ChildEducationPlan[];
  debts: Debt[];
}

export interface YearlySnapshot {
  age: Age;
  totalIncome: Yen;
  totalExpense: Yen;
  educationCost: Yen;
  debtPayment: Yen;
  netCashFlow: Yen;
  /** 年末時点の資産残高（万円） */
  assets: Yen;
}

export type SuggestionType = 'success' | 'saving' | 'delay' | 'expense';

export interface Suggestion {
  type: SuggestionType;
  /** 提案タイトル */
  label: string;
  /** 具体的な数値を含む説明 */
  detail: string;
}

export interface SimulationResult {
  snapshots: YearlySnapshot[];
  /** 資産がゼロになる年齢（ならない場合は undefined） */
  depletionAge?: Age;
  /** FIRE可能かどうか */
  canFire: boolean;
  /** FIRE可能な最短年齢 */
  fireAge?: Age;
  /** 必要資産総額（万円） */
  requiredAssets?: Yen;
  /** 退職時点の予測資産額（万円） */
  currentProjectedAssets?: Yen;
  /** 余剰／不足額（万円、マイナスは不足） */
  shortfall?: Yen;
  /** 必要資産の内訳 */
  breakdown?: RequiredAssetsBreakdown;
  /** 改善提案（不足時は3件、達成時は1件） */
  suggestions?: Suggestion[];
  /** 計算日時（ISO 8601） */
  calculatedAt?: string;
  /** シミュレーションモード */
  mode?: 'simple' | 'advanced';
}

// ── 簡易モード用型定義 ───────────────────────────────

export interface SimpleInput {
  /** 現在年齢 */
  currentAge: Age;
  /** 退職（FIRE）予定年齢 */
  retirementAge: Age;
  /** 現在の総資産（万円） */
  currentAssets: Yen;
  /** 月収（手取り・万円） */
  monthlyIncome: Yen;
  /** 月間積立額（万円） */
  monthlySaving: Yen;
  /** FIRE後の月間生活費（万円） */
  monthlyExpenseAfterFire: Yen;
  /** 期待利回り（0.05 = 5%） */
  expectedReturn: Rate;
}

// ── 詳細モード用型定義 ───────────────────────────────

export interface AdvancedProfile {
  /** 本人の現在年齢 */
  currentAge: Age;
  /** 退職（FIRE）予定年齢 */
  retirementAge: Age;
  /** 寿命（試算終了年齢） */
  lifeExpectancy: Age;
}

export interface AdvancedCashFlow {
  /** 現役時の年収（万円） */
  annualIncome: Yen;
  /** 現役時の年間支出（万円） */
  annualExpense: Yen;
  /** FIRE後の年間生活費（万円） */
  retirementExpense: Yen;
}

export interface AssetAccount {
  id: string;
  label: string;
  /** 現在の残高（万円） */
  currentBalance: Yen;
  /** 年間積立額（万円） */
  annualContribution: Yen;
  /** 期待利回り */
  expectedReturn: Rate;
}

export interface AdvancedInput {
  profile: AdvancedProfile;
  cashFlow: AdvancedCashFlow;
  assets: AssetAccount[];
  debts: Debt[];
  educationPlans: ChildEducationPlan[];
}

export interface RequiredAssetsBreakdown {
  /** FIRE後生活費の総額（万円） */
  livingExpenseTotal: Yen;
  /** FIRE後のローン返済総額（万円） */
  debtTotal: Yen;
  /** FIRE後の教育費総額（万円） */
  educationTotal: Yen;
  /** 緊急予備費（万円） */
  emergencyBuffer: Yen;
  /** 合計必要資産額（万円） */
  total: Yen;
}
