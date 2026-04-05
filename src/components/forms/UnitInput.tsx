"use client";

interface UnitInputProps {
  label: string;
  unit?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (v: number) => void;
  /** focus:ring-* クラス（デフォルト: emerald） */
  ringClass?: string;
  /** parseInt を使う場合 true（デフォルト: parseFloat） */
  integer?: boolean;
}

/**
 * ラベル / [input] 単位 の3点セットを統一レイアウトで表示するコンポーネント。
 *
 * - input には min-w-0 + w-full を付与してグリッド内で縮まないようにする
 * - 単位テキストは shrink-0 で潰れない
 */
export function UnitInput({
  label,
  unit,
  value,
  min,
  max,
  step = 1,
  onChange,
  ringClass = 'focus:ring-emerald-300',
  integer = false,
}: UnitInputProps) {
  const handleChange = (raw: string) => {
    const n = integer ? parseInt(raw) : parseFloat(raw);
    onChange(Number.isNaN(n) ? 0 : n);
  };

  return (
    <label className="block">
      <span className="block text-xs font-medium text-gray-500 mb-1.5">{label}</span>
      <div className="flex items-center gap-1.5">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className={`min-w-0 w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${ringClass} bg-white`}
        />
        {unit && (
          <span className="shrink-0 text-xs text-gray-400 whitespace-nowrap">{unit}</span>
        )}
      </div>
    </label>
  );
}
