"use client";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function PremiumModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-3">
          🚀 有料プラン
        </h2>

        <ul className="text-sm text-gray-600 space-y-2 mb-4">
          <li>・最適な積立額を自動計算</li>
          <li>・最短FIREプラン提示</li>
          <li>・複数シナリオ比較</li>
        </ul>

        <a
          href="https://buy.stripe.com/aFa4gBaaIcc34eJ4Ng93y00"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-emerald-600 text-white py-3 rounded-xl font-bold mb-2 hover:bg-emerald-700 transition"
        >
          ¥980で購入する
        </a>

        <button
          onClick={onClose}
          className="w-full text-sm text-gray-400"
        >
          閉じる
        </button>
      </div>
    </div>
  );
}//
//  PremiumModal.tsx
//
//
//  Created by 杉本健 on 2026/04/06.
//

