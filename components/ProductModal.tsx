"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { useLanguage } from "@/app/context/LanguageContext";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    nameKey?: string;
    price: number;
    originalPrice?: number;
    image: string;
    category?: string;
    description?: string;
    descriptionKey?: string;
    features?: string[];
    featuresKeys?: string[];
    brand?: string;
    brandKey?: string;
    rating?: number;
    inStock?: boolean;
    sku?: string;
  } | null;
}

const ProductModal = ({ isOpen, onClose, product }: ProductModalProps) => {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"details" | "specs">("details");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setQuantity(1);
      setSelectedImage(0);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const productName = product.nameKey ? t(product.nameKey) : product.name;
  const productDescription = product.descriptionKey ? t(product.descriptionKey) : product.description;
  const productBrand = product.brandKey ? t(product.brandKey) : product.brand || t("brand.islander");
  const productCategory = product.category || t("filter.all");
  
  const productFeatures = product.featuresKeys 
    ? product.featuresKeys.map(key => t(key))
    : product.features || [
      "100% genuine leather",
      "Premium quality material",
      "Free shipping on orders over $50",
      "30-day return policy"
    ];

  const productImages = [product.image, ...(product.image.includes("brand-1") ? ["/filrs/brand-2.png", "/filrs/brand-3.png"] : [product.image])];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: productName,
        price: product.price,
        image: product.image,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition flex items-center justify-center"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative w-full aspect-square bg-white/5 rounded-xl overflow-hidden">
              <Image
                src={productImages[selectedImage]}
                alt={productName}
                fill
                className="object-cover"
              />
            </div>
            {productImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === idx ? "border-yellow-400" : "border-white/20 hover:border-white/50"
                    }`}
                  >
                    <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-5">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/70">
                {productBrand}
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/70">
                {productCategory}
              </span>
              {product.originalPrice && (
                <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">SALE</span>
              )}
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-white">{productName}</h2>

            {/* SKU */}
            {product.sku && <p className="text-white/40 text-sm">SKU: {product.sku}</p>}

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < (product.rating || 4) ? "text-yellow-400" : "text-white/20"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white/50 text-sm">({product.rating || 4.5} / 5)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-yellow-400">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-white/40 line-through">${product.originalPrice}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-white/70 text-sm leading-relaxed">
              {productDescription || "Premium quality product made with the finest materials. Designed for comfort and style."}
            </p>

            {/* Tabs */}
            <div className="border-b border-white/10">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`pb-2 text-sm font-medium transition ${
                    activeTab === "details" ? "text-yellow-400 border-b-2 border-yellow-400" : "text-white/60 hover:text-white"
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`pb-2 text-sm font-medium transition ${
                    activeTab === "specs" ? "text-yellow-400 border-b-2 border-yellow-400" : "text-white/60 hover:text-white"
                  }`}
                >
                  Features
                </button>
              </div>
            </div>

            <div className="pt-2">
              {activeTab === "details" ? (
                <ul className="space-y-2">
                  <li className="flex justify-between text-sm">
                    <span className="text-white/50">Brand</span>
                    <span className="text-white">{productBrand}</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-white/50">Category</span>
                    <span className="text-white">{productCategory}</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-white/50">Availability</span>
                    <span className={product.inStock !== false ? "text-green-400" : "text-red-400"}>
                      {product.inStock !== false ? "In Stock" : "Out of Stock"}
                    </span>
                  </li>
                </ul>
              ) : (
                <ul className="space-y-2">
                  {productFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-white/70 text-sm">
                      <svg className="w-4 h-4 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
                >
                  -
                </button>
                <span className="text-white font-semibold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-black py-3 rounded-xl font-semibold hover:scale-105 transition"
              >
                Add to Cart • ${(product.price * quantity).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;