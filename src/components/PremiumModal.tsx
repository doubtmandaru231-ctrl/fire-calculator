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
          🚀 最短FIREプラン
        </h2>

        <ul className="text-sm text-gray-600 space-y-2 mb-4">
          <li>・最短でFIREする具体プランを提示</li>
          <li>・毎月いくらで何年早まるかが分かる</li>
          <li>・積立 vs 支出改善の最適解を提示</li>
        </ul>

        <a
          href="https://buy.stripe.com/aFa4gBaaIcc34eJ4Ng93y00"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-emerald-600 text-white py-3 rounded-xl font-bold mb-2 hover:bg-emerald-700 transition"
        >
          最短FIREプランを手に入れる（¥980）
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

