import { useState, useEffect, useCallback } from 'react';

export interface StorageConfig {
  key: string;
  serialize?: <T>(data: T) => string;
  deserialize?: <T>(data: string) => T;
}

const defaultSerialize = <T,>(data: T): string => JSON.stringify(data);
const defaultDeserialize = <T,>(data: string): T => JSON.parse(data);

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  config?: StorageConfig
) {
  const serialize = config?.serialize || defaultSerialize;
  const deserialize = config?.deserialize || defaultDeserialize;

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? deserialize(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, serialize(valueToStore));
        window.dispatchEvent(new StorageEvent('local-storage-sync', { key }));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, serialize, storedValue]);

  const removeValue = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(deserialize(e.newValue));
        } catch (error) {
          console.error(`Error syncing localStorage key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, deserialize]);

  return [storedValue, setValue, removeValue] as const;
}

export function clearAllAppData() {
  const keys = ['auracore_orders', 'auracore_user', 'auracore_inventory', 'auracore_sessions'];
  keys.forEach(key => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error clearing localStorage key "${key}":`, error);
    }
  });
}

export function exportData() {
  const data: Record<string, string> = {};
  const keys = ['auracore_orders', 'auracore_user', 'auracore_inventory', 'auracore_sessions'];
  keys.forEach(key => {
    const item = localStorage.getItem(key);
    if (item) data[key] = item;
  });
  return data;
}

export function importData(data: Record<string, string>) {
  Object.entries(data).forEach(([key, value]) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error importing data for key "${key}":`, error);
    }
  });
}