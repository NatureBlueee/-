"use client";

/**
 * 语言上下文
 *
 * 全局语言状态管理，支持中英文切换
 * 语言偏好持久化到 localStorage
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

export type Language = "zh" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (zh: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const STORAGE_KEY = "preferred-language";

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>("zh");
  const [isHydrated, setIsHydrated] = useState(false);

  // 从 localStorage 恢复语言偏好
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored && (stored === "zh" || stored === "en")) {
      setLanguageState(stored);
    }
    setIsHydrated(true);
  }, []);

  // 设置语言并持久化
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }, []);

  // 切换语言
  const toggleLanguage = useCallback(() => {
    setLanguage(language === "zh" ? "en" : "zh");
  }, [language, setLanguage]);

  // 翻译辅助函数
  const t = useCallback(
    (zh: string, en: string) => {
      return language === "zh" ? zh : en;
    },
    [language]
  );

  // 避免 hydration mismatch
  if (!isHydrated) {
    return (
      <LanguageContext.Provider
        value={{
          language: "zh",
          setLanguage: () => {},
          toggleLanguage: () => {},
          t: (zh) => zh,
        }}
      >
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, toggleLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * 使用语言上下文的 Hook
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

