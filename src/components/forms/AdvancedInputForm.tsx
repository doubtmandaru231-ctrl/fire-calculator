"use client";

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { AdvancedInput } from '@/types';
import { ADVANCED_INPUT_KEY, loadFromStorage, saveToStorage } from '@/lib/storage';
import { UnitInput } from './UnitInput';
import AssetAccountsSection from './AssetAccountsSection';
import DebtsSection from './DebtsSection';
import EducationPlansSection from './EducationPlansSection';

const DEFAULT_INPUT: AdvancedInput = {
  profile: {
    currentAge: 35,
    retirementAge: 55,
    lifeExpectancy: 90,
  },
  cashFlow: {
    annualIncome: 700,
    annualExpense: 480,
    retirementExpense: 300,
  },
  assets: [
    {
      id: 'default-nisa',
      label: 'NISA・インデックス投資',
      currentBalance: 500,
      annualContribution: 120,
      expectedReturn: 0.05,
    },
  ],
  debts: [],
  educationPlans: [],
};

export default function AdvancedInputForm() {
  const router = useRouter();
  const [input, setInput] = useState<AdvancedInput>(DEFAULT_INPUT);
  const mountedRef = useRef(false);

  // マウント時に localStorage から復元
  useEffect(() => {
    setInput(loadFromStorage(ADVANCED_INPUT_KEY, DEFAULT_INPUT));
  }, []);

  // 入力変化時に自動保存（初回レンダーはスキップ）
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    saveToStorage(ADVANCED_INPUT_KEY, input);
  }, [input]);

  const setProfile = (patch: Partial<typeof input.profile>) =>
    setInput((prev) => ({ ...prev, profile: { ...prev.profile, ...patch } }));

  const setCashFlow = (patch: Partial<typeof input.cashFlow>) =>
    setInput((prev) => ({ ...prev, cashFlow: { ...prev.cashFlow, ...patch } }));

  const handleSubmit = () => {
    // useEffect による自動保存済みだが、念のため同期的にも保存してから遷移
    saveToStorage(ADVANCED_INPUT_KEY, input);
    router.push('/result');
  };

  const annualSaving = Math.max(0, input.cashFlow.annualIncome - input.cashFlow.annualExpense);

  return (
    <div className="space-y-6">
      {/* ── 1. プロフィール ── */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-base font-bold text-gray-700 mb-4">👤 プロフィール</h2>
        {/* モバイル: 1列 / sm以上: 3列 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <UnitInput
            label="現在の年齢"
            unit="歳"
            value={input.profile.currentAge}
            min={18}
            max={80}
            integer
            onChange={(v) => setProfile({ currentAge: v })}
          />
          <UnitInput
            label="FIRE予定年齢"
            unit="歳"
            value={input.profile.retirementAge}
            min={30}
            max={80}
            integer
            onChange={(v) => setProfile({ retirementAge: v })}
          />
          <UnitInput
            label="試算終了年齢"
            unit="歳"
            value={input.profile.lifeExpectancy}
            min={60}
            max={110}
            integer
            onChange={(v) => setProfile({ lifeExpectancy: v })}
          />
        </div>
      </section>

      {/* ── 2. 収支 ── */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-base font-bold text-gray-700 mb-4">💰 年間収支</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <UnitInput
            label="現役時の年収（手取り）"
            unit="万円"
            value={input.cashFlow.annualIncome}
            min={0}
            step={10}
            onChange={(v) => setCashFlow({ annualIncome: v })}
          />
          <UnitInput
            label="現役時の年間支出"
            unit="万円"
            value={input.cashFlow.annualExpense}
            min={0}
            step={10}
            onChange={(v) => setCashFlow({ annualExpense: v })}
          />
          <UnitInput
            label="FIRE後の年間生活費"
            unit="万円"
            value={input.cashFlow.retirementExpense}
            min={0}
            step={10}
            onChange={(v) => setCashFlow({ retirementExpense: v })}
          />
        </div>
        <div className="mt-4 text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2">
          年間貯蓄額：
          <span className="font-bold text-emerald-600">
            {annualSaving.toLocaleString()}万円
          </span>
          <span className="ml-2">
            （月あたり {Math.round((annualSaving / 12) * 10) / 10}万円）
          </span>
        </div>
      </section>

      {/* ── 3. 資産口座 ── */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-base font-bold text-gray-700 mb-4">📈 資産口座</h2>
        <AssetAccountsSection
          accounts={input.assets}
          onChange={(assets) => setInput((prev) => ({ ...prev, assets }))}
        />
      </section>

      {/* ── 4. ローン ── */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-base font-bold text-gray-700 mb-4">🏠 ローン・負債</h2>
        <DebtsSection
          debts={input.debts}
          onChange={(debts) => setInput((prev) => ({ ...prev, debts }))}
        />
      </section>

      {/* ── 5. 教育プラン ── */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-base font-bold text-gray-700 mb-4">🎓 子どもの教育プラン</h2>
        <EducationPlansSection
          plans={input.educationPlans}
          onChange={(educationPlans) => setInput((prev) => ({ ...prev, educationPlans }))}
        />
      </section>

      {/* ── 送信 ── */}
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base rounded-2xl transition-colors shadow-sm"
      >
        シミュレーションを実行 →
      </button>
    </div>
  );
}
