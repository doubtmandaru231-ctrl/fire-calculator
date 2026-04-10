"use client";

interface Props {
  currentFireAge: number | null;
  optimizedFireAge: number | null;
  monthlyInvestmentIncrease: number;
  monthlyExpenseReduction: number;
}

export default function PremiumContent({
  currentFireAge,
}: Props) {
  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <p className="mb-2 text-sm font-bold text-emerald-700">
          🔥 Premium限定シミュレーション
        </p>
        <h2 className="text-xl font-black text-gray-900">
          詳細シミュレーション結果
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          教育費・住宅ローン・複数資産口座まで反映した上で、FIREまでの道のりと資産寿命をより精密に確認できます。
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
            <p className="text-xs font-bold text-emerald-700">有料版で見えること</p>
            <p className="mt-2 text-lg font-bold text-gray-900">
              未来の資産推移を高精度で把握
            </p>
            <p className="mt-2 text-sm text-gray-600">
              条件を変えながら、どこにリスクがあり、どの条件なら成立するかを比較できます。
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="mb-3 text-lg font-bold text-gray-900">
          有料版で確認できるシミュレーション
        </h3>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl bg-emerald-50 p-4">
            <p className="text-sm font-bold text-emerald-700">
              ① 教育費・ローン込みの将来推移
            </p>
            <p className="mt-1 text-base font-bold text-gray-900">
              家計の重いイベントを織り込んだ資産推移
            </p>
            <p className="mt-1 text-sm text-gray-600">
              子どもの進学や住宅ローン返済を反映したうえで、資産がどう増減するかを確認できます。
            </p>
          </div>

          <div className="rounded-xl bg-blue-50 p-4">
            <p className="text-sm font-bold text-blue-700">
              ② 資産寿命と破綻リスク
            </p>
            <p className="mt-1 text-base font-bold text-gray-900">
              FIRE後に資産が何歳まで持つかを可視化
            </p>
            <p className="mt-1 text-sm text-gray-600">
              退職後の生活費や取り崩し条件を踏まえて、資産が尽きるリスクを確認できます。
            </p>
          </div>

          <div className="rounded-xl bg-orange-50 p-4">
            <p className="text-sm font-bold text-orange-700">
              ③ 条件変更シミュレーション
            </p>
            <p className="mt-1 text-base font-bold text-gray-900">
              積立額・支出・退職年齢を変えて比較
            </p>
            <p className="mt-1 text-sm text-gray-600">
              条件を少し変えたときに、FIRE年齢や資産寿命がどう変わるかを比べられます。
            </p>
          </div>

          <div className="rounded-xl bg-purple-50 p-4">
            <p className="text-sm font-bold text-purple-700">
              ④ 複数口座をまとめた精密試算
            </p>
            <p className="mt-1 text-base font-bold text-gray-900">
              NISA・特定口座・現金をまとめて反映
            </p>
            <p className="mt-1 text-sm text-gray-600">
              保有資産ごとの残高・積立額・期待利回りを分けて入力し、より現実に近い試算ができます。
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="mb-3 text-lg font-bold text-gray-900">
          こんな人に向いています
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>・教育費や住宅ローンも含めて、将来のお金の流れを精密に見たい人</li>
          <li>・FIREできるかどうかだけでなく、資産が何歳まで持つかも確認したい人</li>
          <li>・積立額や支出を変えたときの差分を比較しながら意思決定したい人</li>
        </ul>
      </div>
    </section>
  );
}
