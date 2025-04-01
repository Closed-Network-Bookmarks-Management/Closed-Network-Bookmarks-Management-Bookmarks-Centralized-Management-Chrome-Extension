// src/utils/storage.ts
export const getStorage = <T>(key: string): Promise<T | null> =>
  new Promise((resolve) => {
    chrome.storage.local.get([key], (result) => {
      resolve(result[key] ?? null);
    });
  });

export const setStorage = <T>(key: string, value: T): Promise<void> =>
  new Promise((resolve) => {
    chrome.storage.local.set({ [key]: value }, () => resolve());
  });
