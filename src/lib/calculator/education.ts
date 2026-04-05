import type {
  Age,
  ChildEducationPlan,
  EducationCostByAge,
} from '@/types';
import {
  AGE_TO_EDUCATION_STAGE,
  EDUCATION_ANNUAL_COST,
} from '@/constants/defaults';
import { calcTargetAge } from './utils';

/**
 * 子ども1人分の教育費を「本人年齢 → 年額」マップで返す
 *
 * @param plan            子どもの教育プラン
 * @param ownerCurrentAge 本人（親）の現在年齢
 * @param ownerEndAge     シミュレーション終了年齢
 */
export function calcEducationCostByOwnerAge(
  plan: ChildEducationPlan,
  ownerCurrentAge: Age,
  ownerEndAge: Age,
): EducationCostByAge {
  const result: EducationCostByAge = {};

  for (let ownerAge = ownerCurrentAge; ownerAge <= ownerEndAge; ownerAge++) {
    const childAge = calcTargetAge(
      ownerCurrentAge,
      plan.currentAge,
      ownerAge,
    );

    const stage = AGE_TO_EDUCATION_STAGE[childAge];

    // 就学年齢外（22歳以上・対応ステージなし）はスキップ
    if (stage === undefined) continue;

    const schoolType = plan.stages[stage];
    const annualCost = EDUCATION_ANNUAL_COST[stage][schoolType];

    result[ownerAge] = annualCost;
  }

  return result;
}

/**
 * 複数の子どもの教育費マップを合算して返す
 *
 * @param plans           全子どもの教育プラン配列
 * @param ownerCurrentAge 本人の現在年齢
 * @param ownerEndAge     シミュレーション終了年齢
 */
export function calcTotalEducationCostByOwnerAge(
  plans: ChildEducationPlan[],
  ownerCurrentAge: Age,
  ownerEndAge: Age,
): EducationCostByAge {
  const result: EducationCostByAge = {};

  for (const plan of plans) {
    const costMap = calcEducationCostByOwnerAge(
      plan,
      ownerCurrentAge,
      ownerEndAge,
    );

    for (const [ageStr, cost] of Object.entries(costMap)) {
      const age = Number(ageStr);
      result[age] = (result[age] ?? 0) + cost;
    }
  }

  return result;
}
