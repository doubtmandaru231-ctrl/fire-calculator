"use client";

import { useEffect, useState } from 'react';
import { runAdvancedSimulation } from '@/lib/calculator/simulator';
import type { AdvancedInput, SimulationResult } from '@/types';
import { ADVANCED_INPUT_KEY, loadFromStorage } from '@/lib/storage';
import ResultSummary from '@/components/results/ResultSummary';
import BreakdownTable from '@/components/results/BreakdownTable';
import AssetChart from '@/components/results/AssetChart';
import CashFlowTable from '@/components/results/CashFlowTable';

/** @deprecated storage.ts の ADVANCED_INPUT_KEY を使ってください */
export const ADVANCED_INPUT_STORAGE_KEY = ADVANCED_INPUT_KEY;

interface Props {
  fallbackInput: AdvancedInput;
}

export default function ResultView({ fallbackInput }: Props) {
  const [result, setResult] = useState<SimulationResult>(() =>
    runAdvancedSimulation(fallbackInput),
  );
  const [isFromStorage, setIsFromStorage] = useState(false);

  useEffect(() => {
    const stored = loadFromStorage<AdvancedInput | null>(ADVANCED_INPUT_KEY, null);
    if (stored) {
      setResult(runAdvancedSimulation(stored));
      setIsFromStorage(true);
    }
  }, []);

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-gray-800 mb-2">📊 シミュレーション結果</h1>
        <p className="text-gray-500 text-sm">
          {isFromStorage
            ? '詳細モードで入力した条件によるシミュレーション'
            : 'サンプルデータ：35歳・年収700万・55歳FIRE想定'}
        </p>
        {isFromStorage && (
          <a
            href="/advanced"
            className="mt-2 inline-block text-sm text-emerald-600 hover:text-emerald-700 underline"
          >
            ← 条件を変更する
          </a>
        )}
      </div>

      <div className="space-y-5">
        <ResultSummary result={result} />
        {result.breakdown && <BreakdownTable breakdown={result.breakdown} />}
        <AssetChart snapshots={result.snapshots} fireAge={result.fireAge} />
        <CashFlowTable snapshots={result.snapshots} fireAge={result.fireAge} />
      </div>
    </>
  );
}
