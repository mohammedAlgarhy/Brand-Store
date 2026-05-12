"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

type Language = "ar" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// الترجمات
const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.shop": "Shop",
    "nav.about": "About us",
    "nav.contact": "Contact",
    "nav.allProducts": "All Products",
    "nav.spring": "Spring Collection",
    "nav.summer": "Summer Collection",
    
    // Hero
    "hero.autumn": "Autumn Collection",
    "hero.warm": "Warm & Stylish",
    "hero.discover": "Discover More",
    "hero.venice": "Venice Haute Couture",
    "hero.limited": "Limited Edition",
    "hero.view": "View Collection",
    "hero.premium": "Premium Quality",
    "hero.exclusive": "Exclusive Design",
    "hero.explore": "Explore",
    
    // Sections
    "season.title": "Season Collection",
    "arrivals.title": "New Arrivals",
    
    // Cart
    "cart.title": "Your Cart",
    "cart.empty": "Your cart is empty.",
    "cart.total": "Total",
    "cart.checkout": "Checkout",
    "cart.clear": "Clear Cart",
    "cart.continue": "Continue Shopping",
    
    // Buttons
    "button.addToCart": "Add to Cart",
    "button.buyNow": "Buy Now",
    
    // Footer
    "footer.rights": "All rights reserved.",
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.shop": "المتجر",
    "nav.about": "من نحن",
    "nav.contact": "اتصل بنا",
    "nav.allProducts": "جميع المنتجات",
    "nav.spring": "مجموعة الربيع",
    "nav.summer": "مجموعة الصيف",
    
    // Hero
    "hero.autumn": "مجموعة الخريف",
    "hero.warm": "دافئ وأنيق",
    "hero.discover": "اكتشف المزيد",
    "hero.venice": "الأزياء الراقية البندقية",
    "hero.limited": "إصدار محدود",
    "hero.view": "عرض المجموعة",
    "hero.premium": "جودة ممتازة",
    "hero.exclusive": "تصميم حصري",
    "hero.explore": "استكشف",
    
    // Sections
    "season.title": "مجموعة الموسم",
    "arrivals.title": "الوافدون الجدد",
    
    // Cart
    "cart.title": "سلة التسوق",
    "cart.empty": "سلة التسوق فارغة",
    "cart.total": "المجموع",
    "cart.checkout": "إتمام الشراء",
    "cart.clear": "تفريغ السلة",
    "cart.continue": "مواصلة التسوق",
    
    // Buttons
    "button.addToCart": "أضف إلى السلة",
    "button.buyNow": "اشتر الآن",
    
    // Footer
    "footer.rights": "جميع الحقوق محفوظة.",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  const pathname = usePathname();
  const router = useRouter();

  // تحميل اللغة من localStorage عند بدء التشغيل
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "ar" || savedLanguage === "en")) {
      setLanguage(savedLanguage);
      setDir(savedLanguage === "ar" ? "rtl" : "ltr");
      document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = savedLanguage;
    }
  }, []);

  // تغيير اللغة
  const setLanguageAndStore = (lang: Language) => {
    setLanguage(lang);
    setDir(lang === "ar" ? "rtl" : "ltr");
    localStorage.setItem("language", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    
    // إعادة تحميل الصفحة لتحديث المحتوى
    router.refresh();
  };

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    setLanguageAndStore(newLang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: setLanguageAndStore,
        toggleLanguage,
        t,
        dir,
      }}
    >
      <div dir={dir} className={language === "ar" ? "font-arabic" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};