"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts";
import { YearlyData, formatWan } from "@/lib/fireCalculator";

interface Props {
  data: YearlyData[];
  fireYear: number | null;
}

// カスタムツールチップ
function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; name: string }[];
  label?: number;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm">
      <p className="font-bold text-gray-700 mb-2">{label}年後（{payload[0] && (payload[0] as unknown as { payload: YearlyData }).payload?.age}歳）</p>
      {payload.map((p, i) => (
        <p key={i} className="text-gray-600">
          {p.name === "assets" ? "💰 資産額" : "🎯 目標額"}:{" "}
          <span className="font-bold">{formatWan(p.value)}</span>
        </p>
      ))}
    </div>
  );
}

export default function AssetChart({ data, fireYear }: Props) {
  // グラフに表示するデータを間引く（多すぎると見づらいため）
  const displayData = data.filter((d) => d.year % 5 === 0 || d.year === fireYear);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-700 mb-5">📈 資産推移グラフ</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={displayData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="assetsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="year"
            tickFormatter={(v) => `${v}年後`}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
          />
          <YAxis
            tickFormatter={(v) => `${Math.round(v / 100) * 100}万`}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (value === "assets" ? "資産額" : "目標額")}
          />
          {fireYear !== null && (
            <ReferenceLine
              x={fireYear}
              stroke="#f59e0b"
              strokeDasharray="4 4"
              label={{ value: "🎉 FIRE!", position: "top", fontSize: 12, fill: "#f59e0b" }}
            />
          )}
          <Area
            type="monotone"
            dataKey="target"
            name="target"
            stroke="#3b82f6"
            strokeWidth={2}
            strokeDasharray="5 5"
            fill="url(#targetGradient)"
          />
          <Area
            type="monotone"
            dataKey="assets"
            name="assets"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#assetsGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-400 text-center mt-2">
        ※ 税金・インフレは考慮していません。あくまで目安としてご活用ください。
      </p>
    </div>
  );
}
