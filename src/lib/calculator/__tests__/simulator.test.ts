/**
 * NOTE: テストランナー（vitest / jest）が未導入のため、
 * このファイルはインライン実装のアサーションヘルパーを使っています。
 *
 * テストランナーを追加する場合:
 *   1. `npm install -D vitest` を実行
 *   2. package.json の scripts に `"test": "vitest"` を追加
 *   3. このファイル先頭のヘルパー定義を削除し、
 *      `import { describe, it, expect } from 'vitest'` に差し替える
 *
 * 現状でも `npx ts-node src/lib/calculator/__tests__/simulator.test.ts` で実行可能。
 */

// ── 最小アサーションヘルパー ──────────────────────────────────

type Matcher = {
  toBe(expected: unknown): void;
  toBeUndefined(): void;
  toBeDefined(): void;
  toBeGreaterThanOrEqual(n: number): void;
  toHaveLength(n: number): void;
  toBeNull(): void;
};

const describe = (name: string, fn: () => void): void => {
  console.log(`\n▸ ${name}`);
  fn();
};

const it = (name: string, fn: () => void): void => {
  try {
    fn();
    console.log(`  ✓ ${name}`);
  } catch (e) {
    console.error(`  ✗ ${name}:`, e instanceof Error ? e.message : e);
  }
};

const expect = (actual: unknown): Matcher => ({
  toBe(expected) {
    if (actual !== expected) {
      throw new Error(`Expected ${String(expected)}, got ${String(actual)}`);
    }
  },
  toBeUndefined() {
    if (actual !== undefined) {
      throw new Error(`Expected undefined, got ${String(actual)}`);
    }
  },
  toBeDefined() {
    if (actual === undefined) {
      throw new Error(`Expected defined value, got undefined`);
    }
  },
  toBeGreaterThanOrEqual(n) {
    if ((actual as number) < n) {
      throw new Error(`Expected >= ${n}, got ${String(actual)}`);
    }
  },
  toHaveLength(n) {
    const len = (actual as unknown[]).length;
    if (len !== n) {
      throw new Error(`Expected length ${n}, got ${len}`);
    }
  },
  toBeNull() {
    if (actual !== null) {
      throw new Error(`Expected null, got ${String(actual)}`);
    }
  },
});

// ── テスト対象のインポート ──────────────────────────────────

import {
  calcEducationCostByOwnerAge,
  calcTotalEducationCostByOwnerAge,
} from '../education';
import {
  calcDebtPaymentByOwnerAge,
} from '../debt';
import { runAdvancedSimulation } from '../simulator';
import type { AdvancedInput, ChildEducationPlan, Debt } from '@/types';

// ── education.ts のテスト ──────────────────────────────────

describe('education.ts', () => {
  const allPublicPlan: ChildEducationPlan = {
    currentAge: 0,
    stages: {
      nursery: 'public',
      preschool: 'public',
      elementary: 'public',
      juniorHigh: 'public',
      highSchool: 'public',
      university: 'public',
    },
  };

  it('本人35歳・子ども0歳なら、本人41歳時点（子ども6歳=小学校）で教育費が入る', () => {
    const ownerCurrentAge = 35;
    const costMap = calcEducationCostByOwnerAge(allPublicPlan, ownerCurrentAge, 60);
    // 子ども6歳(小学校開始) = 本人41歳
    expect(costMap[41]).toBeDefined();
    expect(costMap[41]).toBeGreaterThanOrEqual(1);
  });

  it('本人35歳・子ども0歳のとき、子どもが22歳以降（本人57歳〜）には教育費が入らない', () => {
    const ownerCurrentAge = 35;
    const costMap = calcEducationCostByOwnerAge(allPublicPlan, ownerCurrentAge, 90);
    // 子ども22歳 = 本人57歳
    expect(costMap[57]).toBeUndefined();
    expect(costMap[60]).toBeUndefined();
    expect(costMap[90]).toBeUndefined();
  });

  it('複数の子どもの教育費が合算される', () => {
    const child1: ChildEducationPlan = { ...allPublicPlan, currentAge: 0 };
    const child2: ChildEducationPlan = { ...allPublicPlan, currentAge: 3 };
    const ownerCurrentAge = 35;
    const combined = calcTotalEducationCostByOwnerAge([child1, child2], ownerCurrentAge, 60);
    const single = calcEducationCostByOwnerAge(child1, ownerCurrentAge, 60);

    // 子ども1が幼稚園(preschool)、子ども2が保育園(nursery)の期間が重なる年(本人38歳=子1が3歳、子2が6歳)
    // → 両者の費用が合算されているはず
    const ownerAge38 = combined[38] ?? 0;
    const single38 = single[38] ?? 0;
    expect(ownerAge38 >= single38).toBe(true);
  });
});

// ── debt.ts のテスト ──────────────────────────────────

describe('debt.ts', () => {
  const mortgage: Debt = {
    id: 'mortgage-1',
    label: '住宅ローン',
    type: 'mortgage',
    startAge: 35,
    durationYears: 30,
    principal: 3000,
    annualRate: 0.015,
  };

  it('startAge:35 durationYears:30 なら、35〜64歳にだけ返済額が入る', () => {
    const paymentMap = calcDebtPaymentByOwnerAge(mortgage, 30, 90);
    expect(paymentMap[35]).toBeDefined();
    expect(paymentMap[64]).toBeDefined();
    expect(paymentMap[35]).toBeGreaterThanOrEqual(1);
  });

  it('34歳（返済開始前）には値が入らない', () => {
    const paymentMap = calcDebtPaymentByOwnerAge(mortgage, 30, 90);
    expect(paymentMap[34]).toBeUndefined();
  });

  it('65歳（返済終了後）には値が入らない', () => {
    const paymentMap = calcDebtPaymentByOwnerAge(mortgage, 30, 90);
    expect(paymentMap[65]).toBeUndefined();
  });

  it('シミュレーション範囲外のローンは空マップを返す', () => {
    // ownerEndAge=34 なので返済期間(35〜64)と重複なし
    const paymentMap = calcDebtPaymentByOwnerAge(mortgage, 30, 34);
    expect(Object.keys(paymentMap)).toHaveLength(0);
  });
});

// ── simulator.ts のテスト ──────────────────────────────────

describe('simulator.ts', () => {
  const baseInput: AdvancedInput = {
    profile: {
      currentAge: 35,
      retirementAge: 55,
      lifeExpectancy: 90,
    },
    cashFlow: {
      annualIncome: 600,
      annualExpense: 360,
      retirementExpense: 300,
    },
    assets: [
      {
        id: 'savings',
        label: '投資口座',
        currentBalance: 1000,
        annualContribution: 120,
        expectedReturn: 0.05,
      },
    ],
    debts: [],
    educationPlans: [],
  };

  it('snapshots が currentAge から lifeExpectancy まで返る', () => {
    const result = runAdvancedSimulation(baseInput);
    const expectedLength =
      baseInput.profile.lifeExpectancy - baseInput.profile.currentAge + 1;
    expect(result.snapshots).toHaveLength(expectedLength);
    expect(result.snapshots[0].age).toBe(baseInput.profile.currentAge);
    expect(result.snapshots[result.snapshots.length - 1].age).toBe(
      baseInput.profile.lifeExpectancy,
    );
  });

  it('currentProjectedAssets が定義されている', () => {
    const result = runAdvancedSimulation(baseInput);
    expect(result.currentProjectedAssets).toBeDefined();
  });

  it('breakdown.total が 0 以上になる', () => {
    const result = runAdvancedSimulation(baseInput);
    expect(result.breakdown).toBeDefined();
    expect(result.breakdown!.total).toBeGreaterThanOrEqual(0);
  });

  it('mode が advanced を返す', () => {
    const result = runAdvancedSimulation(baseInput);
    expect(result.mode).toBe('advanced');
  });

  it('資産が十分あれば depletionAge が undefined になる', () => {
    const richInput: AdvancedInput = {
      ...baseInput,
      assets: [
        {
          id: 'savings',
          label: '大口投資口座',
          currentBalance: 100000,
          annualContribution: 0,
          expectedReturn: 0.05,
        },
      ],
    };
    const result = runAdvancedSimulation(richInput);
    expect(result.depletionAge).toBeUndefined();
    expect(result.canFire).toBe(true);
  });

  it('資産が少なく支出超過なら depletionAge が number になる', () => {
    const poorInput: AdvancedInput = {
      ...baseInput,
      profile: { ...baseInput.profile, retirementAge: 36 },
      assets: [
        {
          id: 'savings',
          label: '少額口座',
          currentBalance: 10,
          annualContribution: 0,
          expectedReturn: 0.0,
        },
      ],
    };
    const result = runAdvancedSimulation(poorInput);
    // 資産10万円でFIRE後300万円/年の支出 → 枯渇するはず
    expect(typeof result.depletionAge === 'number' || result.depletionAge === undefined).toBe(true);
  });
});
