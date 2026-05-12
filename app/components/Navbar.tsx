"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

const WhatsAppIconSimple = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="#25D366"
    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
    role="img"
    aria-label="Chat on WhatsApp"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.165-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.67-.51-.173-.01-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.552 4.121 1.518 5.858L0 24l6.306-1.563A11.91 11.91 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.831 0-3.58-.488-5.076-1.385l-.364-.216-3.74.928.997-3.64-.238-.377A9.96 9.96 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z" />
  </svg>
);

// ========== CartDrawer Component ==========
const CartDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCart();
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 h-full w-[85vw] max-w-[90vw] sm:w-96 bg-white dark:bg-gray-900 shadow-2xl rounded-l-2xl flex flex-col p-4 overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
            {t("cart.title")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1"
            aria-label="Close"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6L18 18" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              {t("cart.empty")}
            </p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 border-b pb-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base truncate">
                    {item.name}
                  </h3>
                  <p className="text-yellow-600 text-sm sm:text-base">
                    ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-200 rounded text-sm"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded text-sm"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto text-red-500 text-xs sm:text-sm"
                    >
                      {t("cart.remove")}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="border-t pt-4">
            <div className="flex justify-between text-base sm:text-lg font-bold">
              <span>{t("cart.total")}:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition text-sm sm:text-base">
              {t("cart.checkout")}
            </button>
            <button
              onClick={clearCart}
              className="w-full mt-2 text-red-500 text-xs sm:text-sm"
            >
              {t("cart.clear")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ========== Navbar Component ==========
const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { totalItems } = useCart();
  const { t, language, toggleLanguage, dir } = useLanguage();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsShopDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const shopDropdownLinks = [
    { href: "/shop", labelKey: "nav.allProducts" },
    { href: "/shop/spring", labelKey: "nav.spring" },
    { href: "/shop/summer", labelKey: "nav.summer" },
  ];

  const handleCartClick = () => setIsCartOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const closeCartDrawer = () => setIsCartOpen(false);
  const toggleShopDropdown = () => setIsShopDropdownOpen(!isShopDropdownOpen);
  const closeShopDropdown = () => setIsShopDropdownOpen(false);

  // الأيقونات (على اليسار)
  const LeftIcons = () => (
    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
      {/* زر تبديل اللغة */}
      <button
        onClick={toggleLanguage}
        className="text-white transition duration-300 hover:text-yellow-400 bg-transparent border border-white/30 rounded-lg px-2 py-1 text-xs sm:text-sm font-medium"
        aria-label={
          language === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"
        }
      >
        {language === "en" ? "عربي" : "English"}
      </button>

      <Link
        href="/wishlist"
        className="text-white transition duration-300 hover:text-yellow-400"
        aria-label="Wishlist"
      >
        <svg
          width="18"
          height="18"
          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.499 3C14.759 3 13.089 3.81 11.999 5.09C10.909 3.81 9.23902 3 7.49902 3C4.41902 3 1.99902 5.42 1.99902 8.5C1.99902 12.28 5.39902 15.36 10.549 20.04L11.999 21.35L13.449 20.03C18.599 15.36 21.999 12.28 21.999 8.5C21.999 5.42 19.579 3 16.499 3ZM12.099 18.55L11.999 18.65L11.899 18.55C7.13902 14.24 3.99902 11.39 3.99902 8.5C3.99902 6.5 5.49902 5 7.49902 5C9.03902 5 10.539 5.99 11.069 7.36H12.939C13.459 5.99 14.959 5 16.499 5C18.499 5 19.999 6.5 19.999 8.5C19.999 11.39 16.859 14.24 12.099 18.55Z"
            fill="currentColor"
          />
        </svg>
      </Link>
      <button
        className="text-white transition duration-300 bg-transparent border-none cursor-pointer p-0 hover:text-yellow-400"
        aria-label="Login"
      >
        <svg
          width="18"
          height="18"
          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.5135 13.4632C16.9738 12.4019 17.9285 10.6699 17.9285 8.72727C17.9285 5.51811 15.3262 2.9 12.134 2.9C8.94183 2.9 6.33952 5.51811 6.33952 8.72727C6.33952 10.6699 7.29429 12.4019 8.75453 13.4632C5.90407 14.7677 3.89902 17.6528 3.89902 21V21.1H3.99902H5.62602H5.72602V21C5.72602 17.4304 8.58624 14.5545 12.134 14.5545C15.6818 14.5545 18.542 17.4304 18.542 21V21.1H18.642H20.269H20.369V21C20.369 17.6528 18.364 14.7677 15.5135 13.4632ZM12.134 4.73636C14.3344 4.73636 16.1015 6.51278 16.1015 8.72727C16.1015 10.9418 14.3344 12.7182 12.134 12.7182C9.9336 12.7182 8.16652 10.9418 8.16652 8.72727C8.16652 6.51278 9.9336 4.73636 12.134 4.73636Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.2"
          />
        </svg>
      </button>
      <button
        onClick={handleCartClick}
        className="relative text-white transition duration-300 bg-transparent border-none cursor-pointer p-0 hover:text-yellow-400"
        aria-label="Shopping cart"
      >
        <svg
          width="18"
          height="18"
          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.875 10.9378V6.96889C15.875 4.77693 14.252 3 12.25 3C10.248 3 8.625 4.77693 8.625 6.96889V10.9378C11.4563 10.9378 13.0437 10.9378 15.875 10.9378ZM5.90625 8.95333H18.5938L19.5 20.86H5L5.90625 8.95333Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] sm:text-xs rounded-full min-w-[16px] h-4 sm:min-w-[18px] sm:h-5 flex items-center justify-center px-1">
            {totalItems}
          </span>
        )}
      </button>
      <a
        href="https://wa.me/201227138195"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center transition duration-300 hover:scale-110"
      >
        <WhatsAppIconSimple />
      </a>
    </div>
  );

  // الروابط (على اليمين)
  const RightLinks = () => (
    <div className="hidden lg:flex items-center gap-4 xl:gap-6">
      <Link
        href="/"
        className="text-white font-medium hover:text-yellow-400 tracking-[2px] xl:tracking-[3px] transition duration-300 text-sm xl:text-base whitespace-nowrap"
      >
        {t("nav.home")}
      </Link>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleShopDropdown}
          className="text-white font-medium hover:text-yellow-400 tracking-[2px] xl:tracking-[3px] transition duration-300 text-sm xl:text-base whitespace-nowrap flex items-center gap-1 focus:outline-none"
        >
          {t("nav.shop")}
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isShopDropdownOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ transformOrigin: "center" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <div
          className={`absolute top-full mt-2 w-48 bg-black/90 backdrop-blur-md rounded-lg shadow-xl border border-white/20 py-2 z-50 transition-all duration-200 origin-top ${isShopDropdownOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"} ${dir === "rtl" ? "right-0" : "left-0"}`}
        >
          {shopDropdownLinks.map((dropdownLink) => (
            <Link
              key={dropdownLink.href}
              href={dropdownLink.href}
              onClick={closeShopDropdown}
              className="block px-4 py-2 text-white hover:text-yellow-400 hover:bg-white/10 transition duration-300 text-sm"
            >
              {t(dropdownLink.labelKey)}
            </Link>
          ))}
        </div>
      </div>
      <Link
        href="/about"
        className="text-white font-medium hover:text-yellow-400 tracking-[2px] xl:tracking-[3px] transition duration-300 text-sm xl:text-base whitespace-nowrap"
      >
        {t("nav.about")}
      </Link>
      <Link
        href="/contact"
        className="text-white font-medium hover:text-yellow-400 tracking-[2px] xl:tracking-[3px] transition duration-300 text-sm xl:text-base whitespace-nowrap"
      >
        {t("nav.contact")}
      </Link>
    </div>
  );

  const MobileShopDropdown = () => {
    const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);
    return (
      <div className="w-full">
        <button
          onClick={() => setIsMobileShopOpen(!isMobileShopOpen)}
          className="text-white font-medium hover:text-yellow-400 transition duration-300 text-base py-3 px-2 w-full text-left border-b border-white/10 hover:border-yellow-400 flex items-center justify-between"
        >
          <span>{t("nav.shop")}</span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isMobileShopOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ transformOrigin: "center" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <div
          className={`overflow-hidden transition-all duration-200 ${isMobileShopOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="pl-4 mt-2 space-y-2 mb-2">
            {shopDropdownLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeDrawer}
                className="block text-white/80 hover:text-yellow-400 transition duration-300 text-sm py-2 px-2"
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 w-full backdrop-blur-md bg-black/70 shadow-lg z-50 px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between gap-2 border-b border-white/10">
        {/* الجهة اليمنى - الروابط */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="lg:hidden">
            <h1 className="text-white text-base sm:text-xl font-bold tracking-wider">
              <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent golden-hour-text">
                Golden
              </span>
              <span className="hidden xs:inline text-white"> Hour</span>
            </h1>
          </Link>
          <RightLinks />
        </div>

        {/* المنتصف - الشعار */}
     <Link href="/" className="hidden lg:block absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
  <h1 className="text-white text-center">
    <span className="block text-xl md:text-2xl lg:text-3xl font-bold tracking-wider golden-hour-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
      Golden Hour
    </span>
  </h1>
</Link>

        {/* الجهة اليسرى - الأيقونات */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
          <LeftIcons />
        </div>

        {/* زر القائمة للشاشات الصغيرة */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="lg:hidden text-white hover:text-yellow-400 transition duration-300 bg-transparent border-none cursor-pointer p-1 ml-2"
          aria-label="Menu"
        >
          <svg
            width="20"
            height="20"
            className="sm:w-6 sm:h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12H21M3 6H21M3 18H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </nav>

      {isDrawerOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeDrawer}
          />
          <div
            className={`absolute top-0 h-full w-[75vw] max-w-[280px] bg-black/90 backdrop-blur-xl shadow-2xl rounded-l-2xl flex flex-col gap-6 p-5 border-l border-white/10 overflow-y-auto ${dir === "rtl" ? "left-0 rounded-r-2xl rounded-l-none" : "right-0 rounded-l-2xl"}`}
          >
            <button
              onClick={closeDrawer}
              className="self-end text-white hover:text-yellow-400 transition p-1"
              aria-label="Close"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6L18 18" />
              </svg>
            </button>
            <div className="flex flex-col gap-1 w-full">
              <Link
                href="/"
                onClick={closeDrawer}
                className="text-white font-medium hover:text-yellow-400 transition duration-300 text-base py-3 px-2 w-full text-left border-b border-white/10 hover:border-yellow-400"
              >
                {t("nav.home")}
              </Link>
              <MobileShopDropdown />
              <Link
                href="/about"
                onClick={closeDrawer}
                className="text-white font-medium hover:text-yellow-400 transition duration-300 text-base py-3 px-2 w-full text-left border-b border-white/10 hover:border-yellow-400"
              >
                {t("nav.about")}
              </Link>
              <Link
                href="/contact"
                onClick={closeDrawer}
                className="text-white font-medium hover:text-yellow-400 transition duration-300 text-base py-3 px-2 w-full text-left border-b border-white/10 hover:border-yellow-400"
              >
                {t("nav.contact")}
              </Link>
            </div>
          </div>
        </div>
      )}

      <CartDrawer isOpen={isCartOpen} onClose={closeCartDrawer} />
    </>
  );
};

export default Navbar;
