"use client";

import type { YearlySnapshot } from '@/types';

interface Props {
  snapshots: YearlySnapshot[];
  /** FIRE達成年齢（行ハイライト用） */
  fireAge?: number;
}

function fmt(value: number): string {
  return value.toLocaleString('ja-JP', { maximumFractionDigits: 0 });
}

function cell(value: number, isNegative?: boolean): string {
  return isNegative && value < 0 ? 'text-red-600' : 'text-gray-800';
}

export default function CashFlowTable({ snapshots, fireAge }: Props) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-700 mb-4">年次キャッシュフロー表</h2>
      <p className="text-xs text-gray-400 mb-3">単位：万円</p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500 text-xs">
              <th className="text-right pb-2 pr-3 font-medium">年齢</th>
              <th className="text-right pb-2 pr-3 font-medium">収入</th>
              <th className="text-right pb-2 pr-3 font-medium">支出計</th>
              <th className="text-right pb-2 pr-3 font-medium">教育費</th>
              <th className="text-right pb-2 pr-3 font-medium">返済額</th>
              <th className="text-right pb-2 pr-3 font-medium">CF</th>
              <th className="text-right pb-2 font-medium">資産残高</th>
            </tr>
          </thead>
          <tbody>
            {snapshots.map((s) => {
              const isFireAge = s.age === fireAge;
              return (
                <tr
                  key={s.age}
                  className={`border-b border-gray-50 last:border-0 ${
                    isFireAge ? 'bg-amber-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="py-1.5 pr-3 text-right font-medium text-gray-600">
                    {s.age}歳
                    {isFireAge && (
                      <span className="ml-1 text-amber-500 text-xs">🎉</span>
                    )}
                  </td>
                  <td className={`py-1.5 pr-3 text-right font-mono ${cell(s.totalIncome)}`}>
                    {fmt(Math.round(s.totalIncome))}
                  </td>
                  <td className={`py-1.5 pr-3 text-right font-mono ${cell(s.totalExpense)}`}>
                    {fmt(Math.round(s.totalExpense))}
                  </td>
                  <td className={`py-1.5 pr-3 text-right font-mono ${cell(s.educationCost)}`}>
                    {s.educationCost > 0 ? fmt(Math.round(s.educationCost)) : '—'}
                  </td>
                  <td className={`py-1.5 pr-3 text-right font-mono ${cell(s.debtPayment)}`}>
                    {s.debtPayment > 0 ? fmt(Math.round(s.debtPayment)) : '—'}
                  </td>
                  <td
                    className={`py-1.5 pr-3 text-right font-mono font-medium ${cell(s.netCashFlow, true)}`}
                  >
                    {s.netCashFlow >= 0 ? '+' : ''}
                    {fmt(Math.round(s.netCashFlow))}
                  </td>
                  <td className="py-1.5 text-right font-mono font-bold text-gray-800">
                    {fmt(Math.round(s.assets))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
