'use client';
import { useEffect, useState } from 'react';
import SimpleInputForm from '@/components/forms/SimpleInputForm';
import PremiumModal from '@/components/PremiumModal';

export default function SimplePage() {
  const [isPremium, setIsPremium] = useState(false);
  const [isPremiumOpen, setIsPremiumOpen] = useState(false);

  useEffect(() => {
    const flag = localStorage.getItem('isPremium');
    if (flag === 'true') setIsPremium(true);
  }, []);

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

      {!isPremium && (
        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            🔒 詳細シミュレーションは有料版で解放
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            最短FIREプラン・資産推移・キャッシュフローを確認できます。
          </p>
          <button
            type="button"
            onClick={() => {
              window.gtag?.("event", "click_premium", {
                location: "simple_input_gate",
              });
              setIsPremiumOpen(true);
            }}
            className="rounded-xl bg-emerald-600 px-6 py-3 text-white font-bold hover:bg-emerald-700 transition"
          >
            詳細シミュレーションを解放する（¥980）
          </button>
        </div>
      )}

      <footer className="text-center mt-8 text-xs text-gray-400 space-y-1">
        <p>※ このシミュレーターは教育目的です。実際の投資判断は専門家にご相談ください。</p>
        <p>計算式: 必要資産額 = 年間生活費 ÷ 4%ルール</p>
      </footer>

      <PremiumModal
        isOpen={isPremiumOpen}
        onClose={() => setIsPremiumOpen(false)}
      />
    </main>
  );
}
