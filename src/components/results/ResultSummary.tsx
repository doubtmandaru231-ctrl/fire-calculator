"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { SimulationResult, SuggestionType } from '@/types';
import { toManEn } from '@/lib/calculator/utils';

import PremiumModal from '@/components/PremiumModal';

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
    green: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    red: 'bg-red-50 border-red-200 text-red-700',
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700',
    gray: 'bg-gray-50 border-gray-200 text-gray-700',
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
  saving: '💰',
  delay: '⏳',
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
  const surplusAmount = Math.max(0, shortfallAmount);
  const hasLargeSurplus = canFire && surplusAmount >= 500;
  const [isPremiumOpen, setIsPremiumOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const flag = localStorage.getItem('isPremium');
    if (flag === 'true') {
      setIsPremium(true);
    }
  }, []);

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-700 mb-4">結論</h2>

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
            <p className="text-2xl font-bold text-red-500 mb-1">FIRE達成が困難です</p>
            <p className="text-sm text-gray-500">資産の増加策や支出削減を検討してください</p>
          </>
        )}
      </div>

      {!canFire && (
        <div className="mt-4 mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          ⚠️ このままだと資産が不足する可能性があります。
          {isShortfall && (
            <span className="font-semibold"> あと{toManEn(Math.round(Math.abs(shortfallAmount)))}不足しています。</span>
          )}
        </div>
      )}

      {hasLargeSurplus && (
        <div className="mt-4 mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          🔥 かなり余裕があります。この条件ならFIRE成功確率は高めです。
        </div>
      )}

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

      {suggestions && suggestions.length > 0 && (
        <div className="mt-5 space-y-4">
          <div>
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
                  <span className="shrink-0 text-base leading-snug">{SUGGESTION_ICONS[s.type]}</span>
                  <div>
                    <p className="font-semibold leading-snug">{s.label}</p>
                    {s.detail && <p className="mt-0.5 text-xs opacity-80">{s.detail}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
            <p className="font-bold mb-2">📈 改善するとどうなる？</p>

            {!canFire ? (
              <p className="leading-relaxed">
                👉 毎月の積立を
                <span className="font-bold text-emerald-600"> +5万円 </span>
                増やせば、
                <span className="font-bold">FIRE達成年齢が約3〜5年早まる可能性</span>
                があります。
              </p>
            ) : (
              <p className="leading-relaxed">
                👉 今のペースなら
                <span className="font-bold text-emerald-600"> 前倒しFIRE </span>
                も狙えます。積立額の維持や生活費の最適化で、さらに余裕を作れます。
              </p>
            )}
          </div>
        </div>
      )}

      {!isPremium && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsPremiumOpen(true)}
            className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 py-4 text-lg font-bold text-white hover:opacity-90 transition"
          >
            最短でFIREする具体プランを見る（¥980）
          </button>

          <p className="mt-2 text-xs text-gray-400">
            あなた専用の最短FIRE戦略を自動生成します
          </p>
        </div>
      )}

      <PremiumModal
        isOpen={isPremiumOpen}
        onClose={() => setIsPremiumOpen(false)}
      />

      <div className="mt-6 text-center">
        <Link
          href="/"
          className="inline-block rounded-lg bg-gray-100 px-6 py-3 font-bold text-gray-700 hover:bg-gray-200 transition"
        >
          ← トップに戻る
        </Link>
      </div>
    </section>
  );
}
