'use client';
import { useEffect, useState } from 'react';
import AdvancedInputForm from '@/components/forms/AdvancedInputForm';
import PremiumModal from '@/components/PremiumModal';

export default function AdvancedPage() {
  const [isPremium, setIsPremium] = useState(false);
  const [isPremiumOpen, setIsPremiumOpen] = useState(false);

  useEffect(() => {
    const flag = localStorage.getItem('isPremium');
    if (flag === 'true') setIsPremium(true);
  }, []);

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

      {isPremium ? (
        <AdvancedInputForm />
      ) : (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            🔒 詳細シミュレーションは有料版で解放
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            資産口座・ローン・教育費を考慮した高精度シミュレーションが利用できます。
          </p>
          <button
            type="button"
            onClick={() => {
              (window as any).gtag?.("event", "click_premium", {
                location: "advanced_input_gate",
              });
              setIsPremiumOpen(true);
            }}
            className="rounded-xl bg-emerald-600 px-6 py-3 text-white font-bold hover:bg-emerald-700 transition"
          >
            詳細シミュレーションを解放する（¥980）
          </button>
        </div>
      )}

      <footer className="text-center mt-8 text-xs text-gray-400">
        ※ このシミュレーターは教育目的です。実際の投資判断は専門家にご相談ください。
      </footer>

      <PremiumModal
        isOpen={isPremiumOpen}
        onClose={() => setIsPremiumOpen(false)}
      />
    </main>
  );
}
