export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-center">
      
      {/* ヘッダー */}
      <h1 className="text-4xl font-black text-gray-900 mb-4">
        🔥 40歳までにFIREできる？
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        年収・資産・生活費から<br />
        あなたのFIRE可能年齢を診断します
      </p>

      {/* CTA */}
      <div className="space-y-4">
        <a
          href="/simple"
          className="block bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition"
        >
          無料で診断する（簡単）
        </a>

        <a
          href="/advanced"
          className="block border border-gray-300 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition"
        >
          詳細シミュレーション
        </a>
      </div>

      {/* ベネフィット */}
      <div className="mt-12 text-left space-y-3 text-gray-700">
        <p>✔ 何歳でFIREできるかがわかる</p>
        <p>✔ 資産が増える or 減るが見える</p>
        <p>✔ 破綻リスクも可視化</p>
      </div>

      {/* フッター */}
      <p className="mt-12 text-xs text-gray-400">
        ※ 教育目的のシミュレーターです
      </p>
    </main>
  );
}
