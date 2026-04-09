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

  const hasMeaningfulInvestmentAction = monthlyInvestmentIncrease > 0;
  const hasMeaningfulExpenseAction = monthlyExpenseReduction > 0;

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
          今の条件をもとに、最短FIREに近づくための現実的な改善アクションをまとめました。
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="mb-3 text-lg font-bold text-gray-900">
          現在の想定
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs font-bold text-gray-500">現在のFIRE想定年齢</p>
            <p className="mt-2 text-3xl font-black text-gray-900">
              {currentFireAge !== null ? `${currentFireAge}歳` : "試算不可"}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              現在の条件で到達できる想定ラインです。
            </p>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-xs font-bold text-emerald-700">Premiumで分かること</p>
            <p className="mt-2 text-lg font-bold text-gray-900">
              最短FIREに近づくための具体アクション
            </p>
            <p className="mt-2 text-sm text-gray-600">
              積立額アップと支出改善の両面から、今すぐ着手できる改善案を確認できます。
            </p>
          </div>
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
              {hasMeaningfulInvestmentAction
                ? `毎月 +${monthlyInvestmentIncrease}万円 の積立を目指す`
                : '現状の積立水準でもかなり良い水準です'}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              {hasMeaningfulInvestmentAction
                ? '収入アップ、副収入、固定費見直しで原資を作るのがおすすめです。'
                : '大きな積立増額をしなくても、現状の条件で十分戦える可能性があります。'}
            </p>
          </div>

          <div className="rounded-xl bg-blue-50 p-4">
            <p className="text-sm font-bold text-blue-700">
              ② 毎月の生活費を下げる
            </p>
            <p className="mt-1 text-base font-bold text-gray-900">
              {hasMeaningfulExpenseAction
                ? `毎月 -${monthlyExpenseReduction}万円 の支出改善を目指す`
                : '支出はすでにかなり最適化できています'}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              {hasMeaningfulExpenseAction
                ? '通信費、保険、住宅費、サブスクの見直しから着手すると効果が出やすいです。'
                : '無理に切り詰めるより、積立や収入面の改善を優先した方が良い可能性があります。'}
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
