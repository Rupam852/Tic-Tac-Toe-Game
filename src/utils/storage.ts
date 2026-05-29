/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class MemoryStorage implements Storage {
  private data: Record<string, string> = {};

  get length(): number {
    return Object.keys(this.data).length;
  }

  clear(): void {
    this.data = {};
  }

  getItem(key: string): string | null {
    return Object.prototype.hasOwnProperty.call(this.data, key) ? this.data[key] : null;
  }

  key(index: number): string | null {
    const keys = Object.keys(this.data);
    return index >= 0 && index < keys.length ? keys[index] : null;
  }

  removeItem(key: string): void {
    delete this.data[key];
  }

  setItem(key: string, value: string): void {
    this.data[key] = String(value);
  }
}

function createSafeStorage(type: "localStorage" | "sessionStorage"): Storage {
  try {
    const storage = typeof window !== "undefined" ? window[type] : null;
    if (storage) {
      // Perform a quick write/read/delete test to ensure it is actually operational
      const testKey = `__storage_test_${type}__`;
      storage.setItem(testKey, testKey);
      const retrieved = storage.getItem(testKey);
      storage.removeItem(testKey);
      if (retrieved === testKey) {
        return storage;
      }
    }
  } catch (e) {
    console.warn(`[SafeStorage] ${type} is blocked, disabled or restricted. Using in-memory fallback.`, e);
  }
  return new MemoryStorage();
}

export const safeLocalStorage = createSafeStorage("localStorage");
export const safeSessionStorage = createSafeStorage("sessionStorage");
