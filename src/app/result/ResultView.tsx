"use client";

import { useEffect, useState } from "react";
import { runAdvancedSimulation } from "@/lib/calculator/simulator";
import type { AdvancedInput, SimulationResult } from "@/types";
import { ADVANCED_INPUT_KEY, loadFromStorage } from "@/lib/storage";
import ResultSummary from "@/components/results/ResultSummary";
import BreakdownTable from "@/components/results/BreakdownTable";
import AssetChart from "@/components/results/AssetChart";
import CashFlowTable from "@/components/results/CashFlowTable";
import PremiumModal from "@/components/PremiumModal";
import PremiumContent from "@/components/premium/PremiumContent";

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
  const [isPremium, setIsPremium] = useState(false);
  const [isPremiumOpen, setIsPremiumOpen] = useState(false);

  const activeInput =
    loadFromStorage<AdvancedInput | null>(ADVANCED_INPUT_KEY, null) ?? fallbackInput;

  const currentFireAge = result.fireAge ?? null;

  const investmentScenarios = Array.from({ length: 20 }, (_, i) => {
    const increase = i + 1;
    const simulated = runAdvancedSimulation({
      ...activeInput,
      monthlyInvestment: activeInput.monthlyInvestment + increase,
    });

    return {
      increase,
      fireAge: simulated.fireAge ?? null,
    };
  }).filter((item) => item.fireAge !== null);

  const expenseScenarios = Array.from({ length: 20 }, (_, i) => {
    const reduction = i + 1;
    const simulated = runAdvancedSimulation({
      ...activeInput,
      monthlyExpense: Math.max(0, activeInput.monthlyExpense - reduction),
    });

    return {
      reduction,
      fireAge: simulated.fireAge ?? null,
    };
  }).filter((item) => item.fireAge !== null);

  const bestInvestmentScenario = investmentScenarios.length
    ? investmentScenarios.reduce((best, current) => {
        if (best.fireAge === null) return current;
        if (current.fireAge === null) return best;
        return current.fireAge < best.fireAge ? current : best;
      })
    : null;

  const bestExpenseScenario = expenseScenarios.length
    ? expenseScenarios.reduce((best, current) => {
        if (best.fireAge === null) return current;
        if (current.fireAge === null) return best;
        return current.fireAge < best.fireAge ? current : best;
      })
    : null;

  const optimizedFireAgeCandidates = [
    currentFireAge,
    bestInvestmentScenario?.fireAge ?? null,
    bestExpenseScenario?.fireAge ?? null,
  ].filter((age): age is number => age !== null);

  const optimizedFireAge = optimizedFireAgeCandidates.length
    ? Math.min(...optimizedFireAgeCandidates)
    : null;

  const monthlyInvestmentIncrease = bestInvestmentScenario?.increase ?? 0;
  const monthlyExpenseReduction = bestExpenseScenario?.reduction ?? 0;

  useEffect(() => {
    const stored = loadFromStorage<AdvancedInput | null>(ADVANCED_INPUT_KEY, null);
    if (stored) {
      setResult(runAdvancedSimulation(stored));
      setIsFromStorage(true);
    }
    const premiumFlag = localStorage.getItem("isPremium");
    if (premiumFlag === "true") {
      setIsPremium(true);
    }
  }, []);

    const shareText = `診断したら「${result.fireAge ?? "?"}歳でFIRE」だった😇

    このままだと遅すぎるかも…

    あなたは何歳？
    無料で診断できる👇
    #FIRE #資産運用`;

  const shareUrl = "https://fire-calculator-bery1.vercel.app";

  const xShareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
    shareText,
  )}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-gray-800 mb-2">
          📊 シミュレーション結果
        </h1>
        <p className="text-gray-500 text-sm">
          {isFromStorage
            ? "詳細モードで入力した条件によるシミュレーション"
            : "サンプルデータ：35歳・年収700万・55歳FIRE想定"}
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

        {isPremium ? (
          <>
            <PremiumContent
              currentFireAge={currentFireAge}
              optimizedFireAge={optimizedFireAge}
              monthlyInvestmentIncrease={monthlyInvestmentIncrease}
              monthlyExpenseReduction={monthlyExpenseReduction}
            />
            {result.breakdown && <BreakdownTable breakdown={result.breakdown} />}
            <AssetChart snapshots={result.snapshots} fireAge={result.fireAge} />
            <CashFlowTable snapshots={result.snapshots} fireAge={result.fireAge} />
          </>
        ) : (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
            <h3 className="mb-2 text-lg font-bold text-gray-800">
              🔒 詳細シミュレーションは有料版で解放
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              あなた専用の最短FIRE戦略・資産推移・キャッシュフローを確認できます。
            </p>
            <button
              type="button"
              onClick={() => setIsPremiumOpen(true)}
              className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-700 transition"
            >
              最短FIREプランを解放する（¥980）
            </button>
          </div>
        )}
      </div>

      <PremiumModal
        isOpen={isPremiumOpen}
        onClose={() => setIsPremiumOpen(false)}
      />

      <div className="mt-8 text-center">
        <a href={xShareUrl} target="_blank" rel="noopener noreferrer">
          <button className="inline-flex items-center rounded-lg bg-black px-6 py-3 text-white font-bold hover:bg-gray-800 transition">
            Xでシェアする
          </button>
        </a>
      </div>
    </>
  );
}
