"use client";

import type { YearlySnapshot } from '@/types';
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
} from 'recharts';

interface Props {
  snapshots: YearlySnapshot[];
  fireAge?: number;
}

interface TooltipPayloadEntry {
  value: number;
  name: string;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: number;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm">
      <p className="font-bold text-gray-700 mb-2">{label}歳</p>
      {payload.map((p, i) => (
        <p key={i} className="text-gray-600">
          {p.name === 'assets' ? '💰 資産残高' : '📊 収入'}:{' '}
          <span className="font-bold">
            {Math.round(p.value).toLocaleString('ja-JP')}万円
          </span>
        </p>
      ))}
    </div>
  );
}

export default function AssetChart({ snapshots, fireAge }: Props) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-700 mb-5">資産推移グラフ</h2>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart
          data={snapshots}
          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="assetsGradientAdv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="age"
            tickFormatter={(v) => `${v}歳`}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
          />
          <YAxis
            tickFormatter={(v) =>
              v >= 10000
                ? `${Math.round(v / 10000)}億`
                : `${Math.round(v / 100) * 100}万`
            }
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            width={65}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (value === 'assets' ? '資産残高' : value)}
          />
          {fireAge !== undefined && (
            <ReferenceLine
              x={fireAge}
              stroke="#f59e0b"
              strokeDasharray="4 4"
              label={{
                value: '🎉 FIRE',
                position: 'top',
                fontSize: 12,
                fill: '#f59e0b',
              }}
            />
          )}
          <Area
            type="monotone"
            dataKey="assets"
            name="assets"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#assetsGradientAdv)"
          />
        </AreaChart>
      </ResponsiveContainer>

      <p className="text-xs text-gray-400 text-center mt-2">
        ※ 税金・インフレは考慮していません。あくまで目安としてご活用ください。
      </p>
    </section>
  );
}
