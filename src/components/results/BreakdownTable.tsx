"use client";

import type { RequiredAssetsBreakdown } from '@/types';
import { toManEn } from '@/lib/calculator/utils';

interface Props {
  breakdown: RequiredAssetsBreakdown;
}

interface Row {
  label: string;
  value: number;
  description: string;
}

export default function BreakdownTable({ breakdown }: Props) {
  const rows: Row[] = [
    {
      label: 'FIRE後生活費',
      value: breakdown.livingExpenseTotal,
      description: '退職後の生活費合計',
    },
    {
      label: 'ローン返済',
      value: breakdown.debtTotal,
      description: 'FIRE後に残るローン返済額',
    },
    {
      label: '教育費',
      value: breakdown.educationTotal,
      description: 'FIRE後にかかる教育費',
    },
    {
      label: '緊急予備費',
      value: breakdown.emergencyBuffer,
      description: '生活費1年分の予備',
    },
  ];

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-700 mb-4">必要資産の内訳</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500">
            <th className="text-left pb-2 font-medium">項目</th>
            <th className="text-left pb-2 font-medium hidden sm:table-cell">説明</th>
            <th className="text-right pb-2 font-medium">金額</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-gray-100 last:border-0">
              <td className="py-3 text-gray-700 font-medium">{row.label}</td>
              <td className="py-3 text-gray-400 text-xs hidden sm:table-cell">
                {row.description}
              </td>
              <td className="py-3 text-right font-mono text-gray-800">
                {toManEn(Math.round(row.value))}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-gray-300">
            <td className="pt-3 font-bold text-gray-800">合計</td>
            <td className="hidden sm:table-cell" />
            <td className="pt-3 text-right font-bold font-mono text-blue-700 text-base">
              {toManEn(Math.round(breakdown.total))}
            </td>
          </tr>
        </tfoot>
      </table>
    </section>
  );
}
