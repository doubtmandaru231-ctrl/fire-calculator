"use client";

import type { AssetAccount } from '@/types';
import { UnitInput } from './UnitInput';

interface Props {
  accounts: AssetAccount[];
  onChange: (accounts: AssetAccount[]) => void;
}

function newAccount(): AssetAccount {
  return {
    id: crypto.randomUUID(),
    label: '',
    currentBalance: 100,
    annualContribution: 60,
    expectedReturn: 0.05,
  };
}

export default function AssetAccountsSection({ accounts, onChange }: Props) {
  const update = (id: string, patch: Partial<AssetAccount>) => {
    onChange(accounts.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  };

  const remove = (id: string) => {
    onChange(accounts.filter((a) => a.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold text-gray-700">資産口座</h3>
        <button
          type="button"
          onClick={() => onChange([...accounts, newAccount()])}
          className="text-xs px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
        >
          ＋ 追加
        </button>
      </div>

      {accounts.length === 0 && (
        <p className="text-xs text-gray-400 py-2">資産口座がありません。追加してください。</p>
      )}

      <div className="space-y-3">
        {accounts.map((account) => (
          <div key={account.id} className="bg-gray-50 rounded-xl p-4 space-y-3">
            {/* 口座名 + 削除 */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="口座名（例: NISA・投資信託）"
                value={account.label}
                onChange={(e) => update(account.id, { label: e.target.value })}
                className="min-w-0 flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-300 bg-white"
              />
              <button
                type="button"
                onClick={() => remove(account.id)}
                className="shrink-0 text-xs text-red-400 hover:text-red-600 px-2 py-1"
              >
                削除
              </button>
            </div>

            {/* 数値3項目: モバイル1列 / sm以上3列 */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <UnitInput
                label="現在残高"
                unit="万円"
                value={account.currentBalance}
                min={0}
                step={10}
                onChange={(v) => update(account.id, { currentBalance: v })}
              />
              <UnitInput
                label="年間積立"
                unit="万円"
                value={account.annualContribution}
                min={0}
                step={10}
                onChange={(v) => update(account.id, { annualContribution: v })}
              />
              <UnitInput
                label="期待利回り"
                unit="%"
                value={parseFloat((account.expectedReturn * 100).toFixed(1))}
                min={0}
                max={20}
                step={0.1}
                onChange={(v) => update(account.id, { expectedReturn: v / 100 })}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
