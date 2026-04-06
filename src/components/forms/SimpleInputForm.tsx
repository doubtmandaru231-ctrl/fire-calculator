"use client";

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { SimpleInput } from '@/types';
import { SIMPLE_INPUT_KEY, loadFromStorage, saveToStorage } from '@/lib/storage';

const DEFAULT_INPUT: SimpleInput = {
  currentAge: 35,
  retirementAge: 55,
  currentAssets: 500,
  monthlyIncome: 50,
  monthlySaving: 15,
  monthlyExpenseAfterFire: 25,
  expectedReturn: 0.05,
};

const presets: Array<{ label: string; data: SimpleInput }> = [
  {
    label: '30代サラリーマン',
    data: {
      currentAge: 35,
      retirementAge: 55,
      currentAssets: 500,
      monthlyIncome: 50,
      monthlySaving: 15,
      monthlyExpenseAfterFire: 25,
      expectedReturn: 0.05,
    },
  },
  {
    label: '子育て世帯',
    data: {
      currentAge: 35,
      retirementAge: 60,
      currentAssets: 300,
      monthlyIncome: 45,
      monthlySaving: 10,
      monthlyExpenseAfterFire: 30,
      expectedReturn: 0.05,
    },
  },
  {
    label: '高収入パターン',
    data: {
      currentAge: 35,
      retirementAge: 50,
      currentAssets: 1000,
      monthlyIncome: 80,
      monthlySaving: 30,
      monthlyExpenseAfterFire: 40,
      expectedReturn: 0.06,
    },
  },
];

interface FieldConfig {
  key: keyof SimpleInput;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  description: string;
  format?: (v: number) => string;
}

const fields: FieldConfig[] = [
  {
    key: 'currentAge',
    label: '現在の年齢',
    unit: '歳',
    min: 20,
    max: 70,
    step: 1,
    description: '今何歳ですか？',
  },
  {
    key: 'retirementAge',
    label: 'FIRE予定年齢',
    unit: '歳',
    min: 30,
    max: 75,
    step: 1,
    description: '何歳でFIREを目指しますか？',
  },
  {
    key: 'currentAssets',
    label: '現在の総資産',
    unit: '万円',
    min: 0,
    max: 10000,
    step: 50,
    description: '貯蓄・投資の合計（万円）',
  },
  {
    key: 'monthlyIncome',
    label: '月収（手取り）',
    unit: '万円',
    min: 10,
    max: 200,
    step: 1,
    description: '税引き後の月収',
  },
  {
    key: 'monthlySaving',
    label: '月間積立額',
    unit: '万円',
    min: 0,
    max: 100,
    step: 1,
    description: '毎月投資・貯蓄に回す金額',
  },
  {
    key: 'monthlyExpenseAfterFire',
    label: 'FIRE後の月間生活費',
    unit: '万円',
    min: 5,
    max: 100,
    step: 1,
    description: 'FIRE達成後に毎月使う金額',
  },
  {
    key: 'expectedReturn',
    label: '年間運用利回り',
    unit: '%',
    min: 0,
    max: 15,
    step: 0.5,
    description: 'インデックス投資の想定利回り（目安: 5〜7%）',
    format: (v) => `${(v * 100).toFixed(1)}%`,
  },
];

export default function SimpleInputForm() {
  const router = useRouter();
  const [input, setInput] = useState<SimpleInput>(DEFAULT_INPUT);
  const mountedRef = useRef(false);

  useEffect(() => {
    setInput(loadFromStorage(SIMPLE_INPUT_KEY, DEFAULT_INPUT));
  }, []);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    saveToStorage(SIMPLE_INPUT_KEY, input);
  }, [input]);

  const handleChange = (key: keyof SimpleInput, raw: string) => {
    const value = parseFloat(raw);
    if (!Number.isNaN(value)) {
      setInput((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handlePresetSelect = (preset: SimpleInput) => {
    setInput(preset);
  };

  const handleSubmit = () => {
    const params = new URLSearchParams({
      currentAge: String(input.currentAge),
      retirementAge: String(input.retirementAge),
      currentAssets: String(input.currentAssets),
      monthlyIncome: String(input.monthlyIncome),
      monthlySaving: String(input.monthlySaving),
      monthlyExpenseAfterFire: String(input.monthlyExpenseAfterFire),
      expectedReturn: String(input.expectedReturn),
    });
    router.push(`/simple/result?${params.toString()}`);
  };

  const displayValue = (field: FieldConfig): string => {
    const v = input[field.key] as number;
    return field.format ? field.format(v) : `${v}${field.unit}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-700 mb-2">📋 あなたの情報を入力</h2>
      <p className="text-sm text-gray-500 mb-5">
        まずはプリセットを選ぶと、すぐに試せます。
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => handlePresetSelect(preset.data)}
            className="px-3 py-2 text-sm rounded-full border border-gray-300 bg-white hover:bg-gray-100 transition-colors"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="space-y-5">
        {fields.map((field) => (
          <div key={field.key}>
            <div className="flex justify-between items-center mb-1 gap-3">
              <label className="text-sm font-medium text-gray-700">{field.label}</label>
              <span className="text-lg font-bold text-emerald-600 shrink-0">
                {displayValue(field)}
              </span>
            </div>
            <input
              type="range"
              min={field.min}
              max={field.max}
              step={field.step}
              value={input[field.key] as number}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1 gap-2">
              <span className="shrink-0">
                {field.min}
                {field.unit}
              </span>
              <span className="text-gray-400 text-center flex-1 px-2">{field.description}</span>
              <span className="shrink-0">
                {field.max}
                {field.unit}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
        <p>
          月間貯蓄率:{' '}
          <span className="font-bold text-emerald-600">
            {input.monthlyIncome > 0
              ? Math.round((input.monthlySaving / input.monthlyIncome) * 100)
              : 0}
            %
          </span>
        </p>
        <p>
          年間積立額:{' '}
          <span className="font-bold text-emerald-600">
            {(input.monthlySaving * 12).toLocaleString()}万円
          </span>
        </p>
        <p>
          FIRE後 年間生活費:{' '}
          <span className="font-bold text-blue-600">
            {(input.monthlyExpenseAfterFire * 12).toLocaleString()}万円
          </span>
        </p>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-5 w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors"
      >
        シミュレーションを実行 →
      </button>
    </div>
  );
}
