import SimpleInputForm from '@/components/forms/SimpleInputForm';

export default function SimplePage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-gray-800 mb-2">🔥 FIRE計算機（簡易版）</h1>
        <p className="text-gray-500 text-sm">
          基本情報を入力するだけで、FIRE達成シミュレーションができます
        </p>
        <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 inline-block">
          <p className="text-xs text-amber-700">
            <strong>FIREとは？</strong> 資産運用の利益だけで生活できる状態になり、
            <br />
            働かなくてもよい経済的自由を手に入れることです
          </p>
        </div>
      </div>

      <SimpleInputForm />

      <footer className="text-center mt-8 text-xs text-gray-400 space-y-1">
        <p>※ このシミュレーターは教育目的です。実際の投資判断は専門家にご相談ください。</p>
        <p>計算式: 必要資産額 = 年間生活費 ÷ 4%ルール</p>
      </footer>
    </main>
  );
}
