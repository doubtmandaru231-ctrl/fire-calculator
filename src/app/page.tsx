export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <section className="text-center">
        <div className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-600 border border-red-100">
          将来のお金の不安を3分で見える化
        </div>

        <h1 className="mt-4 text-4xl md:text-5xl font-black text-gray-900 leading-tight">
          🔥 あなたは
          <br className="md:hidden" />
          何歳でFIREできる？
        </h1>

        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          年収・資産・生活費を入れるだけで、
          <br className="hidden sm:block" />
          FIRE可能年齢・資産寿命・破綻リスクをすぐに診断できます。
        </p>

        <p className="mt-3 text-sm text-red-500 font-medium">
          このままだと何歳で資産が尽きるか、把握できていますか？
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 max-w-2xl mx-auto">
          <a
            href="/simple"
            className="block rounded-2xl bg-black px-6 py-4 text-white font-bold text-lg hover:bg-gray-800 transition"
          >
            無料で診断する →
            <span className="mt-1 block text-sm font-medium text-gray-300">
              まずは簡単3分診断
            </span>
          </a>

          <a
            href="/advanced"
            className="block rounded-2xl border border-gray-300 bg-white px-6 py-4 font-bold text-lg text-gray-900 hover:bg-gray-50 transition"
          >
            詳細シミュレーション
            <span className="mt-1 block text-sm font-medium text-gray-500">
              教育費・ローン込みで確認
            </span>
          </a>
        </div>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-gray-900">① FIRE可能年齢がわかる</p>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            今の資産と積立額で、何歳ごろにFIREできるかを自動で試算します。
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-gray-900">② 資産推移が見える</p>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            将来の資産が増えるのか減るのかをグラフで確認できます。
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-gray-900">③ 破綻リスクを把握できる</p>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            教育費や生活費を踏まえた上で、資産が尽きるリスクも見えます。
          </p>
        </div>
      </section>

      <section className="mt-12 rounded-2xl bg-gray-50 border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900">こんな人におすすめ</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm text-gray-700">
          <p>・30代〜40代で本気でFIREを考え始めた人</p>
          <p>・住宅ローンや教育費込みで判断したい人</p>
          <p>・まずは無料でざっくり可能性を見たい人</p>
          <p>・将来の資産寿命を可視化したい人</p>
        </div>
      </section>

      <section className="mt-12 text-center">
        <a
          href="/simple"
          className="inline-flex items-center rounded-2xl bg-emerald-500 px-8 py-4 text-white font-bold text-lg hover:bg-emerald-600 transition"
        >
          いますぐ無料で診断する
        </a>
        <p className="mt-3 text-xs text-gray-400">
          ※ 教育目的のシミュレーターです。実際の投資判断はご自身でご検討ください。
        </p>
      </section>
    </main>
  );
}
