import { redirect } from "next/navigation";
import Link from "next/link";
import type { SimpleInput } from "@/types";
import { runSimpleSimulation } from "@/lib/calculator/simpleSimulator";
import ResultSummary from "@/components/results/ResultSummary";
import AssetChart from "@/components/results/AssetChart";
import CashFlowTable from "@/components/results/CashFlowTable";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function parseInput(
  params: Record<string, string | string[] | undefined>,
): SimpleInput | null {
  const get = (key: string): number | null => {
    const v = params[key];
    const n = parseFloat(typeof v === "string" ? v : "");
    return Number.isNaN(n) ? null : n;
  };

  const currentAge = get("currentAge");
  const retirementAge = get("retirementAge");
  const currentAssets = get("currentAssets");
  const monthlyIncome = get("monthlyIncome");
  const monthlySaving = get("monthlySaving");
  const monthlyExpenseAfterFire = get("monthlyExpenseAfterFire");
  const expectedReturn = get("expectedReturn");

  if (
    currentAge === null ||
    retirementAge === null ||
    currentAssets === null ||
    monthlyIncome === null ||
    monthlySaving === null ||
    monthlyExpenseAfterFire === null ||
    expectedReturn === null
  ) {
    return null;
  }

  return {
    currentAge,
    retirementAge,
    currentAssets,
    monthlyIncome,
    monthlySaving,
    monthlyExpenseAfterFire,
    expectedReturn,
  };
}

export default async function SimpleResultPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const input = parseInput(params);

  if (!input) {
    redirect("/simple");
  }

  const result = runSimpleSimulation(input);

    const shareText = `診断したら「${result.fireAge ?? "?"}歳でFIRE」だった😇

    このままだと遅すぎるかも…

    あなたは何歳？
    無料で診断できる👇
    #FIRE #資産運用`;

  const shareUrl = "https://fire-calculator-beryl.vercel.app";
  const xShareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
    shareText,
  )}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-gray-800 mb-2">
          📊 シミュレーション結果
        </h1>
        <p className="text-gray-500 text-sm">
          {input.currentAge}歳・月収{input.monthlyIncome}万円・
          {input.retirementAge}歳FIRE想定
        </p>
        <a
          href="/simple"
          className="mt-2 inline-block text-sm text-emerald-600 hover:text-emerald-700 underline"
        >
          ← 条件を変更する
        </a>
      </div>

      <div className="space-y-5">
        <ResultSummary result={result} />
        <AssetChart snapshots={result.snapshots} fireAge={result.fireAge} />
        <CashFlowTable snapshots={result.snapshots} fireAge={result.fireAge} />
      </div>

      <div className="mt-8 text-center">
        <a href={xShareUrl} target="_blank" rel="noopener noreferrer">
          <button className="inline-flex items-center rounded-lg bg-black px-6 py-3 text-white font-bold hover:bg-gray-800 transition">
            Xでシェアする
          </button>
        </a>
      </div>

      <div className="mt-4 text-center">
        <Link
          href="/"
          className="inline-block rounded-lg bg-gray-100 px-6 py-3 font-bold text-gray-700 hover:bg-gray-200 transition"
        >
          ← トップに戻る
        </Link>
      </div>

      <footer className="text-center mt-8 text-xs text-gray-400">
        ※ このシミュレーターは教育目的です。実際の投資判断は専門家にご相談ください。
      </footer>
    </main>
  );
}
