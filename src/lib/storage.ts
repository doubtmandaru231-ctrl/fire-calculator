/** localStorage のキー定数 */
export const SIMPLE_INPUT_KEY = 'fire-simple-input';
export const ADVANCED_INPUT_KEY = 'fire-advanced-input';

/**
 * localStorage から JSON を読み込む。
 * SSR 環境・データ破損・キー未存在すべてで fallback を返す。
 */
export function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/**
 * 値を JSON にシリアライズして localStorage に保存する。
 * SSR 環境・容量超過などは静かに無視する。
 */
export function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // QuotaExceededError など無視
  }
}
