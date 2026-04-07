"use client";

import { useState } from "react";
import { FireResult, FireInputs, formatWan } from "@/lib/fireCalculator";
import PremiumModal from "@/components/PremiumModal";

interface Props {
  result: FireResult;
  inputs: FireInputs;
}

export default function ResultSummary({ result, inputs }: Props) {
  const { targetAssets, fireYear, fireAge, monthlySavings } = result;
  const savingsRate =
    inputs.monthlyIncome > 0
      ? Math.round((monthlySavings / inputs.monthlyIncome) * 100)
      : 0;

  const [isPremiumOpen, setIsPremiumOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-700 mb-5">📊 計算結果</h2>

      {/* メインの結果 */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-5 text-center">
        {fireYear !== null ? (
          <>
            <p className="text-sm text-emerald-600 mb-1">FIRE達成まで</p>
            <p className="text-5xl font-black text-emerald-600 mb-1">
              {fireYear}
              <span className="text-2xl font-bold ml-1">年</span>
            </p>
            <p className="text-gray-500 text-sm">
              {fireAge}歳でFIREを達成できます 🎉
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-red-500 mb-1">現在の条件では</p>
            <p className="text-2xl font-bold text-red-500 mb-1">
              60年以内にFIRE達成できません
            </p>
            <p className="text-gray-500 text-sm">
              貯蓄額を増やすか、生活費を減らしてみましょう
            </p>
          </>
        )}
      </div>

      {/* 危機感アラート */}
      {fireYear === null && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          ⚠️ このままだとFIRE達成はかなり難しい状態です。戦略の見直しが必要です。
        </div>
      )}

      {fireYear !== null && fireYear > 25 && (
        <div className="mb-5 rounded-xl border border-orange-200 bg-orange-50 p-4 text-sm text-orange-700">
          ⏳ FIREまでやや時間がかかります。積立額を増やすと前倒しできる可能性があります。
        </div>
      )}

      {fireYear !== null && fireYear <= 15 && (
        <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          🔥 とても良いペースです。このままでもFIRE達成可能性は高いです。
        </div>
      )}

      {/* 詳細数値 */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="目標資産額"
          value={formatWan(targetAssets)}
          description="この金額でFIRE可能"
          color="blue"
        />
        <StatCard
          label="月の貯蓄額"
          value={`${monthlySavings}万円`}
          description={`貯蓄率 ${savingsRate}%`}
          color={monthlySavings > 0 ? "green" : "red"}
        />
        <StatCard
          label="年間生活費"
          value={`${inputs.monthlyExpense * 12}万円`}
          description="FIRE後もこの額で生活"
          color="purple"
        />
        <StatCard
          label="運用利回り"
          value={`${inputs.annualReturnRate}%`}
          description="年間の想定リターン"
          color="orange"
        />
      </div>

      {/* 改善提案 */}
      <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
        <p className="font-bold mb-2">📈 改善するとどうなる？</p>

        {fireYear === null ? (
          <p>
            👉 毎月の積立を
            <span className="font-bold text-emerald-600"> +5万円 </span>
            増やすことで、FIRE達成が現実的になる可能性があります。
          </p>
        ) : (
          <p>
            👉 今のペースなら
            <span className="font-bold text-emerald-600"> 前倒しFIRE </span>
            も可能です。積立額を増やすとさらに早まります。
          </p>
        )}
      </div>

      {/* 有料導線 */}
      <div className="mt-6 text-center">
        <button
          onClick={() => setIsPremiumOpen(true)}
          className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 py-4 text-lg font-bold text-white"
        >
          より詳細な改善プランを見る
        </button>

        <p className="mt-2 text-xs text-gray-400">
          積立額・支出・FIRE年齢を最適化した具体プランを自動生成
        </p>
      </div>

      {/* モーダル */}
      <PremiumModal
        isOpen={isPremiumOpen}
        onClose={() => setIsPremiumOpen(false)}
      />

      {/* 既存アラート */}
      {monthlySavings <= 0 && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600 font-medium">⚠️ 支出が収入を超えています</p>
          <p className="text-xs text-red-500 mt-1">
            月収より生活費が多いため、資産が増えません。収入を増やすか支出を減らしましょう。
          </p>
        </div>
      )}
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  description: string;
  color: "blue" | "green" | "red" | "purple" | "orange";
}

const colorMap = {
  blue: "bg-blue-50 border-blue-100 text-blue-700",
  green: "bg-green-50 border-green-100 text-green-700",
  red: "bg-red-50 border-red-100 text-red-700",
  purple: "bg-purple-50 border-purple-100 text-purple-700",
  orange: "bg-orange-50 border-orange-100 text-orange-700",
};

function StatCard({ label, value, description, color }: StatCardProps) {
  return (
    <div className={`rounded-lg border p-3 ${colorMap[color]}`}>
      <p className="text-xs opacity-70 mb-1">{label}</p>
      <p className="font-bold text-base leading-tight">{value}</p>
      <p className="text-xs opacity-60 mt-1">{description}</p>
    </div>
  );
}
