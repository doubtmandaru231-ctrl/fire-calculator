"use client";

import { FireInputs } from "@/lib/fireCalculator";

interface Props {
  inputs: FireInputs;
  onChange: (inputs: FireInputs) => void;
}

interface FieldConfig {
  key: keyof FireInputs;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  description: string;
}

const fields: FieldConfig[] = [
  {
    key: "currentAge",
    label: "現在の年齢",
    unit: "歳",
    min: 18,
    max: 70,
    step: 1,
    description: "今何歳ですか？",
  },
  {
    key: "currentAssets",
    label: "現在の資産",
    unit: "万円",
    min: 0,
    max: 10000,
    step: 10,
    description: "今持っている貯蓄・投資額の合計",
  },
  {
    key: "monthlyIncome",
    label: "月収（手取り）",
    unit: "万円",
    min: 10,
    max: 200,
    step: 1,
    description: "税引き後の月収",
  },
  {
    key: "monthlyExpense",
    label: "月の生活費",
    unit: "万円",
    min: 5,
    max: 100,
    step: 1,
    description: "家賃・食費・光熱費などすべての支出",
  },
  {
    key: "annualReturnRate",
    label: "年間運用利回り",
    unit: "%",
    min: 0,
    max: 15,
    step: 0.5,
    description: "インデックス投資の想定利回り（目安: 5〜7%）",
  },
  {
    key: "safeWithdrawalRate",
    label: "安全引出率",
    unit: "%",
    min: 2,
    max: 6,
    step: 0.5,
    description: "毎年取り崩す割合（4%ルールが一般的）",
  },
];

export default function InputForm({ inputs, onChange }: Props) {
  const handleChange = (key: keyof FireInputs, value: string) => {
    onChange({ ...inputs, [key]: parseFloat(value) || 0 });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-700 mb-5">📋 あなたの情報を入力</h2>
      <div className="space-y-5">
        {fields.map((field) => (
          <div key={field.key}>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <span className="text-lg font-bold text-emerald-600">
                {inputs[field.key]}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  {field.unit}
                </span>
              </span>
            </div>
            <input
              type="range"
              min={field.min}
              max={field.max}
              step={field.step}
              value={inputs[field.key]}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{field.min}{field.unit}</span>
              <span className="text-gray-400 text-center flex-1 px-2">{field.description}</span>
              <span>{field.max}{field.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
