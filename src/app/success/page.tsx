"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("isPremium", "true");

    // GA購入イベント
    (window as any).gtag?.("event", "purchase");

    setTimeout(() => {
      router.push("/result");
    }, 1500);
  }, [router]);

  return (
    <main className="mx-auto max-w-xl px-6 py-16 text-center">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">
        🎉 ご購入ありがとうございます！
      </h1>

      <p className="mb-6 text-gray-600">
        詳細シミュレーションがこのブラウザで解放されました。まもなく結果画面に移動します。
      </p>

      <a
        href="/result"
        className="inline-block rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-700 transition"
      >
        結果画面に戻る
      </a>
    </main>
  );
}
