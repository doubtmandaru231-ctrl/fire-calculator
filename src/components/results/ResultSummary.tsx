"use client";

import type { SimulationResult, SuggestionType } from '@/types';
import { toManEn } from '@/lib/calculator/utils';

interface Props {
  result: SimulationResult;
}

interface CardProps {
  label: string;
  value: string;
  sub?: string;
  accent?: 'green' | 'red' | 'blue' | 'orange' | 'gray';
}

function Card({ label, value, sub, accent = 'gray' }: CardProps) {
  const colors: Record<string, string> = {
    green:  'bg-emerald-50 border-emerald-200 text-emerald-700',
    red:    'bg-red-50 border-red-200 text-red-700',
    blue:   'bg-blue-50 border-blue-200 text-blue-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700',
    gray:   'bg-gray-50 border-gray-200 text-gray-700',
  };

  return (
    <div className={`rounded-xl border p-4 ${colors[accent]}`}>
      <p className="text-xs opacity-70 mb-1">{label}</p>
      <p className="text-xl font-bold leading-tight">{value}</p>
      {sub && <p className="text-xs opacity-60 mt-1">{sub}</p>}
    </div>
  );
}

const SUGGESTION_ICONS: Record<SuggestionType, string> = {
  success: '✅',
  saving:  '💰',
  delay:   '⏳',
  expense: '🏠',
};

export default function ResultSummary({ result }: Props) {
  const {
    canFire,
    fireAge,
    requiredAssets,
    currentProjectedAssets,
    shortfall,
    suggestions,
  } = result;

  const shortfallAmount = shortfall ?? 0;
  const isShortfall = shortfallAmount < 0;

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-700 mb-4">結論</h2>

      {/* FIRE判定バナー */}
      <div
        className={`rounded-xl p-5 mb-5 text-center border ${
          canFire
            ? 'bg-emerald-50 border-emerald-200'
            : 'bg-red-50 border-red-200'
        }`}
      >
        {canFire ? (
          <>
            <p className="text-sm text-emerald-600 mb-1">FIRE達成見込み</p>
            <p className="text-5xl font-black text-emerald-600 mb-1">
              {fireAge}
              <span className="text-2xl font-bold ml-1">歳</span>
            </p>
            <p className="text-sm text-emerald-500">で経済的自立を達成できます 🎉</p>
          </>
        ) : (
          <>
            <p className="text-sm text-red-500 mb-1">現在の条件では</p>
            <p className="text-2xl font-bold text-red-500 mb-1">
              FIRE達成が困難です
            </p>
            <p className="text-sm text-gray-500">資産の増加策や支出削減を検討してください</p>
          </>
        )}
      </div>

      {/* 数値カード */}
      <div className="grid grid-cols-2 gap-3">
        <Card
          label="必要資産額"
          value={requiredAssets !== undefined ? toManEn(Math.round(requiredAssets)) : '—'}
          sub="FIRE達成に必要な総額"
          accent="blue"
        />
        <Card
          label="退職時点の予測資産"
          value={
            currentProjectedAssets !== undefined
              ? toManEn(Math.round(currentProjectedAssets))
              : '—'
          }
          sub="退職年齢時点の見込み額"
          accent="orange"
        />
        <Card
          label={isShortfall ? '不足額' : '余裕額'}
          value={toManEn(Math.round(Math.abs(shortfallAmount)))}
          sub={isShortfall ? '追加で確保が必要' : '計画に余裕あり'}
          accent={isShortfall ? 'red' : 'green'}
        />
        <Card
          label="FIRE予定年齢"
          value={fireAge !== undefined ? `${fireAge}歳` : '未達成'}
          sub={canFire ? 'シミュレーション上の退職年齢' : '—'}
          accent={canFire ? 'green' : 'red'}
        />
      </div>

      {/* 改善提案 */}
      {suggestions && suggestions.length > 0 && (
        <div className="mt-5">
          <h3 className="text-sm font-bold text-gray-600 mb-3">
            {canFire ? '📌 アドバイス' : '💡 改善提案'}
          </h3>
          <ul className="space-y-2">
            {suggestions.map((s, i) => (
              <li
                key={i}
                className={`flex gap-3 rounded-xl p-3 text-sm border ${
                  s.type === 'success'
                    ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
                    : 'bg-amber-50 border-amber-100 text-amber-900'
                }`}
              >
                <span className="shrink-0 text-base leading-snug">
                  {SUGGESTION_ICONS[s.type]}
                </span>
                <div>
                  <p className="font-semibold leading-snug">{s.label}</p>
                  {s.detail && (
                    <p className="mt-0.5 text-xs opacity-80">{s.detail}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
