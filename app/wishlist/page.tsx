"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";

// واجهة المنتج في قائمة الأمنيات
interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  originalPrice?: number;
  isSale?: boolean;
}

export default function WishlistPage() {
  const { addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // تحميل المنتجات من localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    } else {
      // منتجات تجريبية للعرض
      const demoWishlist: WishlistItem[] = [
        {
          id: 1,
          name: "Classic Leather Jacket",
          price: 129,
          originalPrice: 199,
          isSale: true,
          image: "/filrs/brand-1.png",
        },
        {
          id: 2,
          name: "Summer Dress",
          price: 59,
          image: "/filrs/brand-2.png",
        },
        {
          id: 3,
          name: "Wool Sweater",
          price: 89,
          originalPrice: 129,
          isSale: true,
          image: "/filrs/brand-3.png",
        },
        {
          id: 4,
          name: "Designer Sunglasses",
          price: 49,
          image: "/filrs/brand-4.png",
        },
      ];
      setWishlistItems(demoWishlist);
      localStorage.setItem("wishlist", JSON.stringify(demoWishlist));
    }
    setIsLoading(false);
  }, []);

  // حفظ التغييرات في localStorage
  const updateWishlist = (newWishlist: WishlistItem[]) => {
    setWishlistItems(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
  };

  // إزالة منتج من قائمة الأمنيات
  const removeFromWishlist = (id: number) => {
    const newWishlist = wishlistItems.filter((item) => item.id !== id);
    updateWishlist(newWishlist);
  };

  // نقل المنتج إلى السلة
  const moveToCart = (item: WishlistItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    removeFromWishlist(item.id);
  };

  // إضافة الكل إلى السلة
  const moveAllToCart = () => {
    wishlistItems.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      });
    });
    updateWishlist([]);
  };

  // تنظيف قائمة الأمنيات
  const clearWishlist = () => {
    if (confirm("Are you sure you want to clear your wishlist?")) {
      updateWishlist([]);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "oklch(15.3% 0.006 107.1)" }}>
        <div className="text-white text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent"></div>
          <p className="mt-4">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6" style={{ backgroundColor: "oklch(15.3% 0.006 107.1)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              My Wishlist
            </h1>
            <p className="text-white/60">
              {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
            </p>
          </div>
          
          {wishlistItems.length > 0 && (
            <div className="flex gap-3">
              <button
                onClick={moveAllToCart}
                className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add All to Cart
              </button>
              <button
                onClick={clearWishlist}
                className="border border-red-500 text-red-500 px-4 py-2 rounded-lg font-medium hover:bg-red-500 hover:text-white transition"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Wishlist Items */}
        {wishlistItems.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 text-center">
            <svg
              className="w-24 h-24 mx-auto text-white/30 mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-white mb-4">Your wishlist is empty</h2>
            <p className="text-white/60 mb-8">
              Save your favorite items here and they will appear in your wishlist.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                {/* Product Image */}
                <div className="relative w-full h-64 overflow-hidden">
                  {item.isSale && (
                    <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                      SALE
                    </div>
                  )}
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  
                  {/* Overlay Buttons */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                      onClick={() => moveToCart(item)}
                      className="bg-yellow-500 text-black px-3 py-2 rounded-lg text-sm font-medium hover:bg-yellow-400 transition flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M18 13l1.5 6M9 21h6M12 18v3" />
                      </svg>
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-4 text-center">
                  <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    {item.originalPrice && (
                      <span className="text-white/50 line-through text-sm">
                        ${item.originalPrice}
                      </span>
                    )}
                    <span className="text-yellow-400 font-bold text-xl">
                      ${item.price}
                    </span>
                  </div>
                  <button
                    onClick={() => moveToCart(item)}
                    className="w-full mt-2 bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-500 hover:text-black transition"
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Continue Shopping Button */}
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-white/70 hover:text-yellow-400 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}