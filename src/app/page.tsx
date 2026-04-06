export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-center">
      {/* ヘッダー */}
      <h1 className="text-4xl font-black text-gray-900 mb-4">
        🔥 あなたは何歳でFIREできる？
      </h1>

      <p className="text-lg text-gray-600 mb-4">
        3分でわかる、あなたの資産寿命
      </p>

      <p className="text-sm text-red-500 mb-8">
        このままだと何歳で資産が尽きるか知ってますか？
      </p>

      {/* CTA */}
      <div className="space-y-4">
        <a
          href="/simple"
          className="block bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition"
        >
          無料で診断する →
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
        <p>✔ あなたのFIRE可能年齢がわかる</p>
        <p>✔ 将来の資産推移が見える</p>
        <p>✔ 破綻リスクを事前に把握できる</p>
      </div>

      {/* フッター */}
      <p className="mt-12 text-xs text-gray-400">
        ※ 教育目的のシミュレーターです
      </p>
    </main>
  );
}
