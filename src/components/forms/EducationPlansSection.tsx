"use client";

import type { ChildEducationPlan, EducationStage, SchoolType } from '@/types';

interface Props {
  plans: ChildEducationPlan[];
  onChange: (plans: ChildEducationPlan[]) => void;
}

/** UIで表示する教育ステージ（保育園/幼稚園はデフォルト公立として扱う） */
const UI_STAGES: { key: EducationStage; label: string }[] = [
  { key: 'elementary', label: '小学校' },
  { key: 'juniorHigh', label: '中学校' },
  { key: 'highSchool', label: '高校' },
  { key: 'university', label: '大学' },
];

function newPlan(): ChildEducationPlan {
  return {
    currentAge: 0,
    stages: {
      nursery: 'public',
      preschool: 'public',
      elementary: 'public',
      juniorHigh: 'public',
      highSchool: 'public',
      university: 'private',
    },
  };
}

export default function EducationPlansSection({ plans, onChange }: Props) {
  const update = (index: number, patch: Partial<ChildEducationPlan>) => {
    onChange(plans.map((p, i) => (i === index ? { ...p, ...patch } : p)));
  };

  const updateStage = (index: number, stage: EducationStage, value: SchoolType) => {
    const plan = plans[index];
    update(index, { stages: { ...plan.stages, [stage]: value } });
  };

  const remove = (index: number) => {
    onChange(plans.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold text-gray-700">子どもの教育プラン</h3>
        <button
          type="button"
          onClick={() => onChange([...plans, newPlan()])}
          className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
        >
          ＋ 追加
        </button>
      </div>

      {plans.length === 0 && (
        <p className="text-xs text-gray-400 py-2">子どもの教育プランはありません。</p>
      )}

      <div className="space-y-3">
        {plans.map((plan, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 whitespace-nowrap">子どもの現在年齢</span>
                <input
                  type="number"
                  min={0}
                  max={21}
                  step={1}
                  value={plan.currentAge}
                  onChange={(e) =>
                    update(index, { currentAge: parseInt(e.target.value) || 0 })
                  }
                  className="w-16 text-sm border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
                <span className="text-gray-500">歳</span>
              </label>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-xs text-red-400 hover:text-red-600 px-2 py-1"
              >
                削除
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {UI_STAGES.map(({ key, label }) => (
                <label key={key} className="block">
                  <span className="text-xs text-gray-500">{label}</span>
                  <select
                    value={plan.stages[key]}
                    onChange={(e) => updateStage(index, key, e.target.value as SchoolType)}
                    className="mt-1 w-full text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  >
                    <option value="public">公立</option>
                    <option value="private">私立</option>
                  </select>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
