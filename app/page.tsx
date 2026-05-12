"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useCart } from "@/app/context/CartContext";
import { useLanguage } from "@/app/context/LanguageContext";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

gsap.registerPlugin(ScrollTrigger);

// ========== Interfaces ==========
interface Slide {
  id: number;
  titleKey: string;
  subtitleKey: string;
  image: string;
  ctaKey: string;
}

interface Product {
  id: number;
  nameKey: string;
  price: string;
  image: string;
  category?: string;
}

interface NewCard {
  id: number;
  nameKey: string;
  regularPrice: number;
  salePrice: number | null;
  isSale: boolean;
  shippingTextKey: string;
  image: string;
  category?: string;
}

interface HeroSliderProps {
  slides?: Slide[];
  products?: Product[];
  newCards?: NewCard[];
}

// Default slides with translation keys
const DEFAULT_SLIDES: Slide[] = [
  {
    id: 1,
    titleKey: "hero.autumn",
    subtitleKey: "hero.warm",
    image:
      "https://next.minimog.co/cdn/shop/files/1_1_31478ff3-36bf-4602-b0af-409615973f08.jpg?v=1629631317",
    ctaKey: "hero.discover",
  },
  {
    id: 2,
    titleKey: "hero.venice",
    subtitleKey: "hero.limited",
    image:
      "https://next.minimog.co/cdn/shop/files/3_1_4c399f8d-c825-4537-abd5-ea14a6721905.jpg?v=1629631337",
    ctaKey: "hero.view",
  },
  {
    id: 3,
    titleKey: "hero.premium",
    subtitleKey: "hero.exclusive",
    image: "https://next.minimog.co/cdn/shop/files/2_1.jpg?v=1629631337",
    ctaKey: "hero.explore",
  },
];

// Generate products with translation keys and categories
const generateProducts = (): Product[] => {
  const productsList: Product[] = [];
  const productNameKeys = [
    "product.jacket",
    "product.dress",
    "product.sweater",
    "product.jeans",
    "product.shoes",
    "product.bag",
    "product.sunglasses",
    "product.scarf",
    "product.tshirt",
    "product.coat",
    "product.shorts",
    "product.hoodie",
    "product.jeansJacket",
    "product.flipFlops",
    "product.backpack",
    "product.watch",
    "product.belt",
    "product.hat",
    "product.gloves",
    "product.socks",
    "product.silkScarf",
    "product.boots",
    "product.cashmere",
    "product.belt",
  ];

  const prices = [
    "$129",
    "$59",
    "$89",
    "$79",
    "$99",
    "$149",
    "$49",
    "$29",
    "$39",
    "$199",
    "$45",
    "$69",
    "$109",
    "$25",
    "$89",
    "$159",
    "$35",
    "$19",
    "$15",
    "$12",
    "$55",
    "$179",
    "$299",
    "$89",
  ];

  const categories = [
    "men", "women", "women", "men", "accessories", 
    "accessories", "accessories", "accessories", "men", "women",
    "men", "men", "women", "accessories", "accessories",
    "accessories", "accessories", "accessories", "accessories", "accessories",
    "accessories", "men", "women", "accessories"
  ];

  for (let i = 0; i < 24; i++) {
    productsList.push({
      id: i + 1,
      nameKey: productNameKeys[i % productNameKeys.length],
      price: prices[i % prices.length],
      image: `/filrs/brand-${(i % 8) + 1}.png`,
      category: categories[i % categories.length],
    });
  }
  return productsList;
};

const DEFAULT_PRODUCTS: Product[] = generateProducts();

const DEFAULT_NEW_CARDS: NewCard[] = [
  {
    id: 1,
    nameKey: "card.sunTshirt",
    regularPrice: 39.99,
    salePrice: 26.99,
    isSale: true,
    shippingTextKey: "cart.shipping",
    image: "/filrs/brand-a.png",
    category: "women",
  },
  {
    id: 2,
    nameKey: "card.whiteShirt",
    regularPrice: 89.99,
    salePrice: null,
    isSale: false,
    shippingTextKey: "cart.shipping",
    image: "/filrs/brand-b.png",
    category: "men",
  },
  {
    id: 3,
    nameKey: "card.summerHoodie",
    regularPrice: 79.99,
    salePrice: 69.99,
    isSale: true,
    shippingTextKey: "cart.shipping",
    image: "/filrs/brand-c.png",
    category: "men",
  },
  {
    id: 4,
    nameKey: "product.jacket",
    regularPrice: 129.99,
    salePrice: null,
    isSale: false,
    shippingTextKey: "cart.shipping",
    image: "/filrs/brand-d.png",
    category: "women",
  },
  {
    id: 5,
    nameKey: "card.woolCoat",
    regularPrice: 149.99,
    salePrice: 129.99,
    isSale: true,
    shippingTextKey: "cart.shipping",
    image: "/filrs/brand-e.png",
    category: "women",
  },
  {
    id: 6,
    nameKey: "product.shoes",
    regularPrice: 59.99,
    salePrice: null,
    isSale: false,
    shippingTextKey: "cart.shipping",
    image: "/filrs/brand-f.png",
    category: "accessories",
  },
  {
    id: 7,
    nameKey: "card.sunglasses",
    regularPrice: 39.99,
    salePrice: 29.99,
    isSale: true,
    shippingTextKey: "cart.shipping",
    image: "/filrs/brand-g.png",
    category: "accessories",
  },
  {
    id: 8,
    nameKey: "card.scarf",
    regularPrice: 109.99,
    salePrice: null,
    isSale: false,
    shippingTextKey: "cart.shipping",
    image: "/filrs/brand-h.png",
    category: "accessories",
  },
  {
    id: 9,
    nameKey: "product.bag",
    regularPrice: 109.99,
    salePrice: 89.99,
    isSale: true,
    shippingTextKey: "cart.shipping",
    image: "/filrs/brand-i.png",
    category: "accessories",
  },
  {
    id: 10,
    nameKey: "product.watch",
    regularPrice: 109.99,
    salePrice: null,
    isSale: false,
    shippingTextKey: "cart.shipping",
    image: "/filrs/brand-j.png",
    category: "accessories",
  },
  {
    id: 11,
    nameKey: "card.beanie",
    regularPrice: 109.99,
    salePrice: 99.99,
    isSale: true,
    shippingTextKey: "cart.shipping",
    image: "/filrs/brand-k.png",
    category: "accessories",
  },
  {
    id: 12,
    nameKey: "card.gloves",
    regularPrice: 109.99,
    salePrice: null,
    isSale: false,
    shippingTextKey: "cart.shipping",
    image: "/filrs/brand-l.png",
    category: "accessories",
  },
  {
    id: 13,
    nameKey: "card.tie",
    regularPrice: 109.99,
    salePrice: 95.99,
    isSale: true,
    shippingTextKey: "cart.shipping",
    image: "/filrs/brand-m.png",
    category: "men",
  },
  {
    id: 14,
    nameKey: "product.watch",
    regularPrice: 109.99,
    salePrice: null,
    isSale: false,
    shippingTextKey: "cart.shipping",
    image: "/filrs/brand-n.png",
    category: "accessories",
  },
  {
    id: 15,
    nameKey: "product.belt",
    regularPrice: 79.99,
    salePrice: 59.99,
    isSale: true,
    shippingTextKey: "cart.shipping",
    image: "/filrs/brand-a.png",
    category: "men",
  },
  {
    id: 16,
    nameKey: "card.eveningDress",
    regularPrice: 199.99,
    salePrice: null,
    isSale: false,
    shippingTextKey: "cart.shipping",
    image: "/filrs/brand-b.png",
    category: "women",
  },
];

const parsePrice = (priceString: string): number => {
  return parseFloat(priceString.replace(/[^0-9.-]+/g, ""));
};

// ========== Horizontal Filter Component ==========
interface FilterProps {
  categories: { id: string; nameKey: string }[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: { min: number; max: number };
  onPriceRangeChange: (range: { min: number; max: number }) => void;
  showOnlySales: boolean;
  onShowOnlySalesChange: (show: boolean) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalProducts: number;
  t: (key: string) => string;
}

const HorizontalFilter = ({
  categories,
  activeCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  showOnlySales,
  onShowOnlySalesChange,
  sortBy,
  onSortChange,
  totalProducts,
  t,
}: FilterProps) => {
  const [localMaxPrice, setLocalMaxPrice] = useState(priceRange.max);

  useEffect(() => {
    setLocalMaxPrice(priceRange.max);
  }, [priceRange.max]);

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setLocalMaxPrice(value);
    onPriceRangeChange({ min: priceRange.min, max: value });
  };

  return (
    <div className="w-full mb-8">
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-white/50 text-sm">{t("filter.category")}:</span>
              <select
                value={activeCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white text-sm cursor-pointer hover:border-yellow-400 transition focus:outline-none focus:border-yellow-400"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {t(cat.nameKey)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white/50 text-sm">{t("filter.sortBy")}:</span>
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white text-sm cursor-pointer hover:border-yellow-400 transition focus:outline-none focus:border-yellow-400"
              >
                <option value="default">{t("filter.default")}</option>
                <option value="price-asc">{t("filter.priceLowToHigh")}</option>
                <option value="price-desc">{t("filter.priceHighToLow")}</option>
                <option value="name-asc">{t("filter.nameAsc")}</option>
                <option value="name-desc">{t("filter.nameDesc")}</option>
              </select>
            </div>

            <button
              onClick={() => onShowOnlySalesChange(!showOnlySales)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                ${showOnlySales
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md"
                  : "bg-white/10 text-white hover:bg-white/20"
                }
              `}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t("filter.saleOnly")}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-white/50 text-sm">{t("filter.maxPrice")}:</span>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 font-semibold">${localMaxPrice}</span>
              <input
                type="range"
                min={0}
                max={500}
                value={localMaxPrice}
                onChange={handleMaxPriceChange}
                className="w-32 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-yellow-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 text-center">
        <p className="text-white/60 text-sm">
          {t("filter.found")} <span className="text-yellow-400 font-semibold">{totalProducts}</span> {t("filter.products")}
        </p>
      </div>
    </div>
  );
};

// ========== InlineCheckout Component ==========
const InlineCheckout = ({
  onContinueShopping,
}: {
  onContinueShopping: () => void;
}) => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCart();
  const { t } = useLanguage();

  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberRaw, setCardNumberRaw] = useState("");
  const [expiry, setExpiry] = useState("");
  const [expiryRaw, setExpiryRaw] = useState("");
  const [cvc, setCvc] = useState("");
  const [cvcRaw, setCvcRaw] = useState("");
  const [cardType, setCardType] = useState<string>("visa");

  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<{
    cardNumber?: string;
    expiry?: string;
    cvc?: string;
  }>({});
  const [focused, setFocused] = useState<
    "cardNumber" | "expiry" | "cvc" | null
  >(null);

  const detectCardType = (number: string): string => {
    const cleaned = number.replace(/\D/g, "");
    if (cleaned.startsWith("4")) return "visa";
    if (/^5[1-5]/.test(cleaned)) return "mastercard";
    if (/^3[47]/.test(cleaned)) return "amex";
    if (/^6011|65|64[4-9]/.test(cleaned)) return "discover";
    return "visa";
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    let formatted = "";
    for (let i = 0; i < cleaned.length && i < 16; i++) {
      if (i > 0 && i % 4 === 0) formatted += " ";
      formatted += cleaned[i];
    }
    return formatted;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length === 0) return "";
    let formatted = cleaned.slice(0, 2);
    if (cleaned.length > 2) formatted += "/" + cleaned.slice(2, 4);
    return formatted.slice(0, 5);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = formatCardNumber(raw);
    setCardNumber(formatted);
    setCardNumberRaw(raw);
    setCardType(detectCardType(raw));
    if (errors.cardNumber && raw.length >= 13) {
      setErrors((prev) => ({ ...prev, cardNumber: undefined }));
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    const formatted = formatExpiry(raw);
    setExpiry(formatted);
    setExpiryRaw(raw);
    if (errors.expiry && raw.length === 4) {
      setErrors((prev) => ({ ...prev, expiry: undefined }));
    }
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxLength = cardType === "amex" ? 4 : 3;
    const raw = e.target.value.replace(/\D/g, "").slice(0, maxLength);
    setCvc(raw);
    setCvcRaw(raw);
    if (errors.cvc && raw.length === maxLength) {
      setErrors((prev) => ({ ...prev, cvc: undefined }));
    }
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (cardNumberRaw.length < 13)
      newErrors.cardNumber = t("cart.cardError");
    if (expiryRaw.length !== 4) newErrors.expiry = t("cart.expiryError");
    else {
      const month = parseInt(expiryRaw.slice(0, 2));
      const year = parseInt(expiryRaw.slice(2, 4));
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      if (month < 1 || month > 12) newErrors.expiry = t("cart.invalidMonth");
      else if (
        year < currentYear ||
        (year === currentYear && month < currentMonth)
      ) {
        newErrors.expiry = t("cart.expired");
      }
    }
    const cvcMax = cardType === "amex" ? 4 : 3;
    if (cvcRaw.length !== cvcMax)
      newErrors.cvc = `${t("cart.cvcError")} ${cvcMax} ${t("cart.digits")}`;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const processPayment = async (amount: number) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (cardNumberRaw.startsWith("4242")) {
          resolve({ success: true, transactionId: "demo_" + Date.now() });
        } else if (cardNumberRaw.length >= 13) {
          resolve({ success: true, transactionId: "demo_" + Date.now() });
        } else {
          reject(new Error("Invalid card details"));
        }
      }, 1500);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsProcessing(true);
    try {
      await processPayment(totalPrice);
      alert(`✅ ${t("cart.paymentSuccess")} $${totalPrice.toFixed(2)}! (Demo)`);
      clearCart();
      onContinueShopping();
    } catch (err) {
      setErrors({
        cardNumber: t("cart.paymentFailed"),
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getCardIcon = () => {
    const icons: Record<string, JSX.Element> = {
      visa: (
        <svg width="40" height="30" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" key="visa">
          <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"/>
          <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"/>
          <path d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z" fill="#142688"/>
        </svg>
      ),
      mastercard: (
        <svg width="40" height="30" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" key="mastercard">
          <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"/>
          <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"/>
          <circle fill="#EB001B" cx="15" cy="12" r="7"/>
          <circle fill="#F79E1B" cx="23" cy="12" r="7"/>
          <path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"/>
        </svg>
      ),
      amex: (
        <svg width="40" height="30" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" key="amex">
          <path fill="#000" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3Z" opacity=".07"/>
          <path fill="#006FCF" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32Z"/>
          <path fill="#FFF" d="M22.012 19.936v-8.421L37 11.528v2.326l-1.732 1.852L37 17.573v2.375h-2.766l-1.47-1.622-1.46 1.628-9.292-.02Z"/>
          <path fill="#006FCF" d="M23.013 19.012v-6.57h5.572v1.513h-3.768v1.028h3.678v1.488h-3.678v1.01h3.768v1.531h-5.572Z"/>
        </svg>
      ),
      discover: (
        <svg width="40" height="30" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" key="discover">
          <path fill="#000" opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"/>
          <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"/>
          <path d="M20.16 12.86a2.931 2.931 0 100-5.862 2.931 2.931 0 000 5.862z" fill="#f48020"/>
        </svg>
      ),
    };
    return icons[cardType] || icons.visa;
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white/10 backdrop-blur-sm rounded-lg p-8">
        <p className="text-white mb-4">{t("cart.empty")}</p>
        <button onClick={onContinueShopping} className="bg-yellow-500 text-black px-4 py-2 rounded">
          {t("cart.continue")}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-xl shadow-xl p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
              <span className="text-2xl">🛍️</span> {t("cart.title")}
            </h2>
            <button onClick={clearCart} className="text-red-400 text-sm hover:underline">
              {t("cart.clear")}
            </button>
          </div>
          <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-white/20 pb-3 hover:bg-white/5 transition rounded-lg p-2">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg shadow" />
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{item.name}</h3>
                  <p className="text-yellow-400 font-bold">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 bg-white/20 rounded-full hover:bg-white/30 text-white">-</button>
                    <span className="font-medium text-white">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 bg-white/20 rounded-full hover:bg-white/30 text-white">+</button>
                    <button onClick={() => removeFromCart(item.id)} className="ml-auto text-red-400 text-sm hover:underline">{t("cart.remove")}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-3 border-t border-white/20">
            <div className="flex justify-between text-xl font-bold text-white">
              <span>{t("cart.total")}:</span>
              <span className="text-yellow-400">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">💳 {t("cart.securePayment")}</h2>
            {getCardIcon()}
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-5">
              <label className="block text-white text-sm font-medium mb-1">{t("cart.cardNumber")}</label>
              <div className={`relative border border-white/30 rounded-xl overflow-hidden transition-all ${focused === "cardNumber" ? "ring-2 ring-yellow-500 border-yellow-500" : "hover:border-white/50"}`}>
                <input type="text" placeholder="1234 5678 9012 3456" value={cardNumber} onChange={handleCardNumberChange} onFocus={() => setFocused("cardNumber")} onBlur={() => setFocused(null)} className="w-full px-4 py-3 text-white bg-transparent outline-none placeholder-white/50" autoComplete="off" />
              </div>
              {errors.cardNumber && <p className="text-red-400 text-xs mt-1">{errors.cardNumber}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-white text-sm font-medium mb-1">{t("cart.expiry")}</label>
                <input type="text" placeholder="MM/YY" value={expiry} onChange={handleExpiryChange} onFocus={() => setFocused("expiry")} onBlur={() => setFocused(null)} className={`w-full px-4 py-3 border border-white/30 rounded-xl outline-none transition-all bg-transparent text-white placeholder-white/50 ${focused === "expiry" ? "ring-2 ring-yellow-500 border-yellow-500" : "hover:border-white/50"}`} autoComplete="off" />
                {errors.expiry && <p className="text-red-400 text-xs mt-1">{errors.expiry}</p>}
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-1">{t("cart.cvc")}</label>
                <input type="text" placeholder={cardType === "amex" ? "1234" : "123"} value={cvc} onChange={handleCvcChange} onFocus={() => setFocused("cvc")} onBlur={() => setFocused(null)} className={`w-full px-4 py-3 border border-white/30 rounded-xl outline-none transition-all bg-transparent text-white placeholder-white/50 ${focused === "cvc" ? "ring-2 ring-yellow-500 border-yellow-500" : "hover:border-white/50"}`} autoComplete="off" />
                {errors.cvc && <p className="text-red-400 text-xs mt-1">{errors.cvc}</p>}
              </div>
            </div>
            <div className="mb-5">
              <div className="flex items-center gap-2 text-xs text-white/60 mb-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="7" width="18" height="12" rx="2" ry="2"></rect>
                  <path d="M7 11h10M7 15h6"></path>
                </svg>
                <span>{t("cart.encrypted")}</span>
              </div>
              <button type="submit" disabled={isProcessing} className="w-full bg-yellow-500 text-black py-3 rounded-xl font-semibold hover:bg-yellow-400 transition shadow-md disabled:opacity-70">
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t("cart.processing")}...
                  </span>
                ) : (
                  `${t("cart.pay")} $${totalPrice.toFixed(2)} ${t("cart.securely")}`
                )}
              </button>
            </div>
            <div className="flex justify-center gap-3 mt-2">
              <img src="https://cdn.simpleicons.org/visa/white/24" className="h-6 w-auto opacity-70" alt="visa" />
              <img src="https://cdn.simpleicons.org/mastercard/white/24" className="h-6 w-auto opacity-70" alt="mastercard" />
              <img src="https://cdn.simpleicons.org/amex/white/24" className="h-6 w-auto opacity-70" alt="amex" />
              <img src="https://cdn.simpleicons.org/paypal/white/24" className="h-6 w-auto opacity-70" alt="paypal" />
            </div>
          </form>
          <button onClick={onContinueShopping} className="w-full mt-4 text-yellow-400 text-sm hover:underline text-center">
            ← {t("cart.continueShopping")}
          </button>
          <p className="text-xs text-white/40 mt-4 text-center">{t("cart.demoNote")}</p>
        </div>
      </div>
    </div>
  );
};

// ========== Main HeroSlider Component with Horizontal Filter ==========
const HeroSlider = ({
  slides = DEFAULT_SLIDES,
  products = DEFAULT_PRODUCTS,
  newCards = DEFAULT_NEW_CARDS,
}: HeroSliderProps) => {
  const router = useRouter();
  const { addToCart, items, clearCart } = useCart();
  const { t, language, dir } = useLanguage();
  const [showCheckout, setShowCheckout] = useState(false);
  
  // Filter states
  const [activeCategory, setActiveCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [showOnlySales, setShowOnlySales] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filteredNewCards, setFilteredNewCards] = useState<NewCard[]>(newCards);

  // Categories for filter
  const categories = [
    { id: "all", nameKey: "filter.all" },
    { id: "men", nameKey: "filter.men" },
    { id: "women", nameKey: "filter.women" },
    { id: "accessories", nameKey: "filter.accessories" },
    { id: "sale", nameKey: "filter.sale" },
  ];

  const goToProduct = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...products];
    let filteredCards = [...newCards];

    // Filter by category
    if (activeCategory !== "all") {
      if (activeCategory === "sale") {
        filtered = filtered.filter(p => {
          const card = newCards.find(c => c.nameKey === p.nameKey);
          return card?.isSale === true;
        });
        filteredCards = filteredCards.filter(c => c.isSale === true);
      } else {
        filtered = filtered.filter(p => p.category === activeCategory);
        filteredCards = filteredCards.filter(c => c.category === activeCategory);
      }
    }

    // Filter by price
    filtered = filtered.filter(p => {
      const price = parsePrice(p.price);
      return price >= priceRange.min && price <= priceRange.max;
    });
    filteredCards = filteredCards.filter(c => {
      const price = c.isSale && c.salePrice ? c.salePrice : c.regularPrice;
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Filter by sales only
    if (showOnlySales) {
      filtered = filtered.filter(p => {
        const card = newCards.find(c => c.nameKey === p.nameKey);
        return card?.isSale === true;
      });
      filteredCards = filteredCards.filter(c => c.isSale === true);
    }

    // Sorting
    const sortProducts = (a: Product, b: Product) => {
      const priceA = parsePrice(a.price);
      const priceB = parsePrice(b.price);
      switch (sortBy) {
        case "price-asc":
          return priceA - priceB;
        case "price-desc":
          return priceB - priceA;
        case "name-asc":
          return t(a.nameKey).localeCompare(t(b.nameKey));
        case "name-desc":
          return t(b.nameKey).localeCompare(t(a.nameKey));
        default:
          return a.id - b.id;
      }
    };

    const sortCards = (a: NewCard, b: NewCard) => {
      const priceA = a.isSale && a.salePrice ? a.salePrice : a.regularPrice;
      const priceB = b.isSale && b.salePrice ? b.salePrice : b.regularPrice;
      switch (sortBy) {
        case "price-asc":
          return priceA - priceB;
        case "price-desc":
          return priceB - priceA;
        case "name-asc":
          return t(a.nameKey).localeCompare(t(b.nameKey));
        case "name-desc":
          return t(b.nameKey).localeCompare(t(a.nameKey));
        default:
          return a.id - b.id;
      }
    };

    filtered.sort(sortProducts);
    filteredCards.sort(sortCards);

    setFilteredProducts(filtered);
    setFilteredNewCards(filteredCards);
  }, [activeCategory, priceRange, showOnlySales, sortBy, products, newCards, t]);

  useEffect(() => {
    setShowCheckout(items.length > 0);
  }, [items]);

  const heroSectionRef = useRef<HTMLElement>(null);
  const seasonSectionRef = useRef<HTMLElement>(null);
  const newArrivalsSectionRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  const productCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const newCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleAddProductToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: t(product.nameKey),
      price: parsePrice(product.price),
      image: product.image,
    });
  };

  const handleAddNewCardToCart = (card: NewCard) => {
    const finalPrice =
      card.isSale && card.salePrice ? card.salePrice : card.regularPrice;
    addToCart({
      id: card.id,
      name: t(card.nameKey),
      price: finalPrice,
      image: card.image,
    });
  };

  const handleReset = () => {
    clearCart();
    setShowCheckout(false);
  };

  useGSAP(() => {
    if (!showCheckout) {
      gsap.fromTo(
        heroSectionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 },
      );
    }

    if (seasonSectionRef.current && !showCheckout) {
      gsap.fromTo(
        ".season-title",
        { opacity: 0, scale: 0.95, letterSpacing: "0px" },
        {
          opacity: 1,
          scale: 1,
          letterSpacing: "1px",
          duration: 0.6,
          scrollTrigger: {
            trigger: seasonSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    if (!showCheckout) {
      productCardsRef.current.forEach((card, idx) => {
        if (card) {
          gsap.fromTo(
            card,
            { rotation: 5, opacity: 0, scale: 0.95 },
            {
              rotation: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              delay: idx * 0.02,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });

      newCardsRef.current.forEach((card, idx) => {
        if (card) {
          const direction = idx % 2 === 0 ? -40 : 40;
          gsap.fromTo(
            card,
            { x: direction, opacity: 0, rotateY: 10 },
            {
              x: 0,
              opacity: 1,
              rotateY: 0,
              duration: 0.6,
              delay: idx * 0.02,
              ease: "back.out(0.6)",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });

      if (newArrivalsSectionRef.current) {
        gsap.fromTo(
          newArrivalsSectionRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: newArrivalsSectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      if (footerRef.current) {
        gsap.fromTo(
          footerRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [filteredProducts, filteredNewCards, showCheckout, t]);

  return (
    <div 
      className="Home w-full h-full overflow-hidden" 
      style={{ backgroundColor: "oklch(15.3% 0.006 107.1)" }}
      dir={dir}
    >
      <div className="w-full md:w-[90%] mx-auto">
        {!showCheckout ? (
          <section
            ref={heroSectionRef}
            className="flex items-center justify-center pt-16"
          >
            <div className="w-full h-[500px] md:h-[550px]">
              <Swiper
                modules={[Autoplay, Pagination, EffectFade, Navigation]}
                effect="fade"
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation={true}
                loop={true}
                className="w-full h-full rounded-xl [&_.swiper-pagination]:!bottom-4 [&_.swiper-button-next]:!text-white [&_.swiper-button-prev]:!text-white [&_.swiper-button-next]:!bg-black/30 [&_.swiper-button-prev]:!bg-black/30 [&_.swiper-button-next]:!rounded-full [&_.swiper-button-prev]:!rounded-full [&_.swiper-button-next]:!w-10 [&_.swiper-button-prev]:!w-10 [&_.swiper-button-next]:!h-10 [&_.swiper-button-prev]:!h-10"
              >
                {slides.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-black/20 z-10 rounded-xl"></div>
                      <Image
                        src={slide.image}
                        alt={t(slide.titleKey)}
                        fill
                        className="object-cover rounded-xl"
                        priority
                        sizes="(max-width: 768px) 100vw, 90vw"
                        unoptimized
                      />
                      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-8 lg:px-24">
                        <h4 className="text-sm md:text-base tracking-wider mb-2 uppercase">
                          {t(slide.titleKey)}
                        </h4>
                        <h1 className="text-4xl md:text-7xl font-bold mb-4">
                          {t(slide.subtitleKey)}
                        </h1>
                        <button
                          className="border-2 border-white px-6 md:px-8 py-2 md:py-3 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
                          aria-label={t(slide.ctaKey)}
                        >
                          {t(slide.ctaKey)}
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
        ) : (
          <section className="pt-16">
            <div className="w-full min-h-[450px] rounded-lg shadow-lg p-4">
              <InlineCheckout onContinueShopping={handleReset} />
            </div>
          </section>
        )}
      </div>

      {/* Season Collection Section with Horizontal Filter */}
      <section ref={seasonSectionRef} className="w-full py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="season-title text-3xl md:text-4xl font-bold text-white text-center mb-8 tracking-wide">
            {t("season.title")}
          </h2>
          
          {/* Horizontal Filter Component */}
          <HorizontalFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            showOnlySales={showOnlySales}
            onShowOnlySalesChange={setShowOnlySales}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalProducts={filteredProducts.length}
            t={t}
          />
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              <div
                key={product.id}
                ref={(el) => {
                  productCardsRef.current[idx] = el;
                }}
                onClick={() => goToProduct(product.id)}
                className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group"
              >
                <div className="relative w-full h-64 overflow-hidden">
                  {/* Add to Cart Button Overlay */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddProductToCart(product);
                    }}
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-400 transition opacity-0 group-hover:opacity-100 z-10 shadow-lg whitespace-nowrap"
                  >
                    {t("button.addToCart")}
                  </button>
                  <Image
                    src={product.image}
                    alt={t(product.nameKey)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-white text-lg font-semibold group-hover:text-yellow-400 transition">
                    {t(product.nameKey)}
                  </h3>
                  <p className="text-yellow-400 text-xl font-bold mt-1">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* No results message */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/60">{t("filter.noProducts")}</p>
            </div>
          )}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section ref={newArrivalsSectionRef} className="w-full py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 tracking-wide">
            {t("arrivals.title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredNewCards.map((item, idx) => (
              <div
                key={item.id}
                ref={(el) => {
                  newCardsRef.current[idx] = el;
                }}
                onClick={() => goToProduct(item.id)}
                className="w-full bg-white/10 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
              >
                <div className="relative w-full aspect-video bg-white/5 overflow-hidden">
                  {item.isSale && (
                    <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                      SALE
                    </div>
                  )}
                  {/* Add to Cart Button Overlay */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddNewCardToCart(item);
                    }}
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-400 transition opacity-0 group-hover:opacity-100 z-10 shadow-lg whitespace-nowrap"
                  >
                    {t("button.addToCart")}
                  </button>
                  <Image
                    src={item.image}
                    alt={t(item.nameKey)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition">
                    {t(item.nameKey)}
                  </h3>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    {item.isSale ? (
                      <>
                        <span className="text-white/50 line-through text-sm">
                          ${item.regularPrice.toFixed(2)} USD
                        </span>
                        <span className="text-yellow-400 text-xl font-bold">
                          ${item.salePrice?.toFixed(2)} USD
                        </span>
                      </>
                    ) : (
                      <span className="text-yellow-400 text-xl font-bold">
                        ${item.regularPrice.toFixed(2)} USD
                      </span>
                    )}
                  </div>
                  <p className="text-white/50 text-xs mt-2">
                    {t(item.shippingTextKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSlider;