"use client";

import { FireResult, FireInputs, formatWan } from "@/lib/fireCalculator";

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

      {/* アドバイス */}
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
