"use client";

import type { Debt, DebtType } from '@/types';
import { UnitInput } from './UnitInput';

interface Props {
  debts: Debt[];
  onChange: (debts: Debt[]) => void;
}

const DEBT_TYPE_LABELS: Record<DebtType, string> = {
  mortgage: '住宅ローン',
  carLoan: 'カーローン',
  educationLoan: '教育ローン',
  other: 'その他',
};

function newDebt(): Debt {
  return {
    id: crypto.randomUUID(),
    label: '',
    type: 'mortgage',
    startAge: 35,
    durationYears: 30,
    principal: 3000,
    annualRate: 0.015,
  };
}

export default function DebtsSection({ debts, onChange }: Props) {
  const update = (id: string, patch: Partial<Debt>) => {
    onChange(debts.map((d) => (d.id === id ? { ...d, ...patch } : d)));
  };

  const remove = (id: string) => {
    onChange(debts.filter((d) => d.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold text-gray-700">ローン・負債</h3>
        <button
          type="button"
          onClick={() => onChange([...debts, newDebt()])}
          className="text-xs px-3 py-1 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
        >
          ＋ 追加
        </button>
      </div>

      {debts.length === 0 && (
        <p className="text-xs text-gray-400 py-2">ローン・負債はありません。</p>
      )}

      <div className="space-y-3">
        {debts.map((debt) => (
          <div key={debt.id} className="bg-gray-50 rounded-xl p-4 space-y-3">
            {/* ローン名 + 種別 + 削除 */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="ローン名（例: 住宅ローン）"
                value={debt.label}
                onChange={(e) => update(debt.id, { label: e.target.value })}
                className="min-w-0 flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white"
              />
              <select
                value={debt.type}
                onChange={(e) => update(debt.id, { type: e.target.value as DebtType })}
                className="shrink-0 text-sm border border-gray-200 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white"
              >
                {(Object.keys(DEBT_TYPE_LABELS) as DebtType[]).map((t) => (
                  <option key={t} value={t}>
                    {DEBT_TYPE_LABELS[t]}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => remove(debt.id)}
                className="shrink-0 text-xs text-red-400 hover:text-red-600 px-2 py-1"
              >
                削除
              </button>
            </div>

            {/* 数値4項目: モバイル2列 / lg以上4列 */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <UnitInput
                label="借入開始年齢"
                unit="歳"
                value={debt.startAge}
                min={18}
                max={80}
                integer
                ringClass="focus:ring-orange-300"
                onChange={(v) => update(debt.id, { startAge: v })}
              />
              <UnitInput
                label="返済期間"
                unit="年"
                value={debt.durationYears}
                min={1}
                max={50}
                integer
                ringClass="focus:ring-orange-300"
                onChange={(v) => update(debt.id, { durationYears: v })}
              />
              <UnitInput
                label="元本"
                unit="万円"
                value={debt.principal}
                min={0}
                step={100}
                ringClass="focus:ring-orange-300"
                onChange={(v) => update(debt.id, { principal: v })}
              />
              <UnitInput
                label="年利"
                unit="%"
                value={parseFloat((debt.annualRate * 100).toFixed(2))}
                min={0}
                max={30}
                step={0.1}
                ringClass="focus:ring-orange-300"
                onChange={(v) => update(debt.id, { annualRate: v / 100 })}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
