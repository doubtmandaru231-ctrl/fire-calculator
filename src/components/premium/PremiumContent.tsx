"use client";

interface Props {
  currentFireAge: number | null;
  optimizedFireAge: number | null;
  monthlyInvestmentIncrease: number;
  monthlyExpenseReduction: number;
}

export default function PremiumContent({
  currentFireAge,
  optimizedFireAge,
  monthlyInvestmentIncrease,
  monthlyExpenseReduction,
}: Props) {
  const hasBothAges = currentFireAge !== null && optimizedFireAge !== null;
  const yearsShortened = hasBothAges
    ? Math.max(0, currentFireAge - optimizedFireAge)
    : null;

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <p className="mb-2 text-sm font-bold text-emerald-700">
          🔥 Premium限定レポート
        </p>
        <h2 className="text-xl font-black text-gray-900">
          最短FIREプラン
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          今の条件から、最短でFIREに近づくための改善アクションをまとめました。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold text-gray-500">現在の想定</p>
          <p className="mt-2 text-3xl font-black text-gray-900">
            {currentFireAge !== null ? `${currentFireAge}歳` : "試算不可"}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            現在の条件でのFIRE想定年齢
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold text-emerald-600">改善後の想定</p>
          <p className="mt-2 text-3xl font-black text-emerald-600">
            {optimizedFireAge !== null ? `${optimizedFireAge}歳` : "試算不可"}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            おすすめ改善を反映した場合の想定
          </p>
        </div>

        <div className="rounded-2xl border border-orange-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold text-orange-600">短縮できる年数</p>
          <p className="mt-2 text-3xl font-black text-orange-500">
            {yearsShortened !== null ? `${yearsShortened}年` : "-"}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            改善によって前倒しできる見込み
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="mb-3 text-lg font-bold text-gray-900">
          具体的な改善アクション
        </h3>

        <div className="space-y-3">
          <div className="rounded-xl bg-emerald-50 p-4">
            <p className="text-sm font-bold text-emerald-700">
              ① 毎月の積立を増やす
            </p>
            <p className="mt-1 text-base font-bold text-gray-900">
              毎月 +{monthlyInvestmentIncrease}万円 の積立を目指す
            </p>
            <p className="mt-1 text-sm text-gray-600">
              収入アップ、副収入、固定費見直しで原資を作るのがおすすめです。
            </p>
          </div>

          <div className="rounded-xl bg-blue-50 p-4">
            <p className="text-sm font-bold text-blue-700">
              ② 毎月の生活費を下げる
            </p>
            <p className="mt-1 text-base font-bold text-gray-900">
              毎月 -{monthlyExpenseReduction}万円 の支出改善を目指す
            </p>
            <p className="mt-1 text-sm text-gray-600">
              通信費、保険、住宅費、サブスクの見直しから着手すると効果が出やすいです。
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="mb-3 text-lg font-bold text-gray-900">
          優先順位
        </h3>
        <ol className="space-y-2 text-sm text-gray-700">
          <li>1. まずは固定費を削減して、確実に毎月の余剰資金を増やす</li>
          <li>2. 次に積立額を増やして、資産形成スピードを上げる</li>
          <li>3. 改善後の条件で再シミュレーションし、最短FIREルートを確認する</li>
        </ol>
      </div>
    </section>
  );
}
