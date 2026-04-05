import type {
  EducationStage,
  SchoolType,
  Rate,
} from '@/types';

// ── 教育費（年額・万円） ─────────────────

/**
 * [ステージ][公立/私立] の年間教育費
 * 単位は万円
 */
export const EDUCATION_ANNUAL_COST: Record<
  EducationStage,
  Record<SchoolType, number>
> = {
  nursery:     { public: 9.7,   private: 30.2 },
  preschool:   { public: 16.5,  private: 30.8 },
  elementary:  { public: 35.2,  private: 166.6 },
  juniorHigh:  { public: 53.9,  private: 143.6 },
  highSchool:  { public: 51.2,  private: 105.4 },
  university:  { public: 81.7,  private: 131.0 },
};

/** 各ステージの期間（年） */
export const EDUCATION_STAGE_DURATION: Record<EducationStage, number> = {
  nursery: 3,
  preschool: 3,
  elementary: 6,
  juniorHigh: 3,
  highSchool: 3,
  university: 4,
};

/**
 * 子どもの年齢 → 在籍ステージ
 */
export const AGE_TO_EDUCATION_STAGE: Partial<Record<number, EducationStage>> =
  Object.fromEntries([
    ...[0, 1, 2].map((a) => [a, 'nursery' as EducationStage]),
    ...[3, 4, 5].map((a) => [a, 'preschool' as EducationStage]),
    ...[6, 7, 8, 9, 10, 11].map((a) => [a, 'elementary' as EducationStage]),
    ...[12, 13, 14].map((a) => [a, 'juniorHigh' as EducationStage]),
    ...[15, 16, 17].map((a) => [a, 'highSchool' as EducationStage]),
    ...[18, 19, 20, 21].map((a) => [a, 'university' as EducationStage]),
  ]);

// ── シミュレーションのデフォルト値 ─────────────────

/** デフォルト運用利回り */
export const DEFAULT_INVESTMENT_RETURN: Rate = 0.05;

/** デフォルトインフレ率 */
export const DEFAULT_INFLATION_RATE: Rate = 0.02;

/** デフォルト試算終了年齢 */
export const DEFAULT_END_AGE = 90;

/** 4%ルール */
export const FIRE_WITHDRAWAL_RATE: Rate = 0.04;

// ── 負債デフォルト ─────────────────

/** 住宅ローンのデフォルト年利 */
export const DEFAULT_MORTGAGE_RATE: Rate = 0.015;

/** カーローンのデフォルト年利 */
export const DEFAULT_CAR_LOAN_RATE: Rate = 0.03;
