import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      {/* ヘッダー */}
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">🔥</div>
        <h1 className="text-4xl font-black text-gray-800 mb-3">FIRE計算機</h1>
        <p className="text-gray-500 text-base">あなたのFIRE可能性を診断</p>
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 inline-block">
          <p className="text-xs text-amber-700 leading-relaxed">
            <strong>FIREとは？</strong> 資産運用の収益だけで生活できる状態になり、<br className="hidden sm:block" />
            働かなくてもよい経済的自由を手に入れることです
          </p>
        </div>
      </div>

      {/* 選択カード */}
      <div className="w-full max-w-2xl grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* 簡易版 */}
        <Link
          href="/simple"
          className="group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200 p-7 hover:border-emerald-300 hover:shadow-md transition-all"
        >
          <div className="text-4xl mb-4">⚡</div>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl font-bold text-gray-800">簡易版</h2>
            <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
              3分で診断
            </span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            年齢・収入・貯蓄額など基本情報を入力するだけ。
            まずはFIRE可能性をざっくり確認したい方に。
          </p>
          <div className="mt-auto">
            <ul className="text-xs text-gray-400 space-y-1 mb-5">
              <li>✓ 入力項目7つのみ</li>
              <li>✓ スライダーで直感的に操作</li>
              <li>✓ 資産推移グラフ付き</li>
            </ul>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 group-hover:gap-2 transition-all">
              診断を始める
              <span>→</span>
            </span>
          </div>
        </Link>

        {/* 詳細版 */}
        <Link
          href="/advanced"
          className="group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200 p-7 hover:border-blue-300 hover:shadow-md transition-all"
        >
          <div className="text-4xl mb-4">📊</div>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl font-bold text-gray-800">詳細版</h2>
            <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
              本格シミュレーション
            </span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            ローン・教育費・複数資産口座まで細かく設定。
            より精度の高い将来シミュレーションができます。
          </p>
          <div className="mt-auto">
            <ul className="text-xs text-gray-400 space-y-1 mb-5">
              <li>✓ 資産口座を複数管理</li>
              <li>✓ ローン・負債を考慮</li>
              <li>✓ 子どもの教育費も計算</li>
            </ul>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
              詳細入力へ
              <span>→</span>
            </span>
          </div>
        </Link>
      </div>

      <footer className="mt-12 text-xs text-gray-400 text-center">
        ※ このシミュレーターは教育目的です。実際の投資判断は専門家にご相談ください。
      </footer>
    </main>
  );
}
