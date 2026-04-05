import AdvancedInputForm from '@/components/forms/AdvancedInputForm';

export default function AdvancedPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-gray-800 mb-2">
          🔥 FIRE計算機（詳細版）
        </h1>
        <p className="text-gray-500 text-sm">
          資産口座・ローン・教育費を細かく設定して精度の高いシミュレーションができます
        </p>
        <div className="mt-3 flex justify-center gap-3 text-xs">
          <a href="/simple" className="text-emerald-600 hover:underline">
            ← 簡易版に戻る
          </a>
        </div>
      </div>

      <AdvancedInputForm />

      <footer className="text-center mt-8 text-xs text-gray-400">
        ※ このシミュレーターは教育目的です。実際の投資判断は専門家にご相談ください。
      </footer>
    </main>
  );
}
