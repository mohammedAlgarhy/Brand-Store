"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useLanguage } from "@/app/context/LanguageContext";

interface ProductDetails {
  id: number;
  name: string;
  nameKey: string;
  price: number;
  originalPrice?: number;
  currency: string;
  category: string;
  categoryKey: string;
  brand: string;
  brandKey: string;
  description: string;
  descriptionKey: string;
  features: string[];
  featuresKeys: string[];
  images: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  sku: string;
  tags: string[];
}

// بيانات جميع المنتجات (24 منتج)
const getAllProducts = (t: (key: string) => string): { [key: number]: ProductDetails } => {
  const products: { [key: number]: ProductDetails } = {};

  // منتجات أساسية (1-16 من البيانات الموجودة)
  const baseProducts: { [key: number]: Partial<ProductDetails> } = {
    1: {
      name: "Classic Leather Jacket",
      nameKey: "product.jacket",
      price: 129,
      originalPrice: 199,
      category: "men",
      categoryKey: "filter.men",
      brand: "Islander Original",
      brandKey: "brand.islander",
      descriptionKey: "product.jacket.desc",
      featuresKeys: ["product.jacket.feature1", "product.jacket.feature2", "product.jacket.feature3", "product.jacket.feature4", "product.jacket.feature5"],
      images: ["/filrs/brand-1.png", "/filrs/brand-2.png", "/filrs/brand-3.png"],
      rating: 4.8,
      reviews: 234,
      sku: "IS-JKT-001",
      tags: ["leather", "jacket", "winter", "men"],
    },
    2: {
      name: "Summer Dress",
      nameKey: "product.dress",
      price: 59,
      category: "women",
      categoryKey: "filter.women",
      brand: "Islander Summer",
      brandKey: "brand.summer",
      descriptionKey: "product.dress.desc",
      featuresKeys: ["product.dress.feature1", "product.dress.feature2", "product.dress.feature3", "product.dress.feature4", "product.dress.feature5"],
      images: ["/filrs/brand-2.png", "/filrs/brand-a.png", "/filrs/brand-b.png"],
      rating: 4.6,
      reviews: 189,
      sku: "IS-DRS-002",
      tags: ["dress", "summer", "women", "floral"],
    },
    3: {
      name: "Wool Sweater",
      nameKey: "product.sweater",
      price: 89,
      originalPrice: 129,
      category: "women",
      categoryKey: "filter.women",
      brand: "Islander Winter",
      brandKey: "brand.winter",
      descriptionKey: "product.sweater.desc",
      featuresKeys: ["product.sweater.feature1", "product.sweater.feature2", "product.sweater.feature3", "product.sweater.feature4", "product.sweater.feature5"],
      images: ["/filrs/brand-3.png", "/filrs/brand-c.png", "/filrs/brand-d.png"],
      rating: 4.9,
      reviews: 456,
      sku: "IS-SWT-003",
      tags: ["sweater", "winter", "wool", "women"],
    },
    4: {
      name: "Designer Sunglasses",
      nameKey: "product.sunglasses",
      price: 49,
      originalPrice: 79,
      category: "accessories",
      categoryKey: "filter.accessories",
      brand: "Islander Luxe",
      brandKey: "brand.luxe",
      descriptionKey: "product.sunglasses.desc",
      featuresKeys: ["product.sunglasses.feature1", "product.sunglasses.feature2", "product.sunglasses.feature3", "product.sunglasses.feature4", "product.sunglasses.feature5"],
      images: ["/filrs/brand-4.png", "/filrs/brand-e.png", "/filrs/brand-f.png"],
      rating: 4.7,
      reviews: 312,
      sku: "IS-SUN-004",
      tags: ["sunglasses", "accessories", "summer", "uv-protection"],
    },
  };

  // إضافة المنتجات من 5 إلى 24 (للمنتجات الموسمية)
  const springProductNames = [
    "Spring Floral Dress", "Lightweight Cardigan", "Pastel Blazer", "Floral Print Skirt",
    "Spring Sandals", "Straw Hat", "Silk Scarf", "Linen Shirt", "Cropped Jeans",
    "Spring Jacket", "Pastel Handbag", "Garden Party Dress", "Butterfly Necklace",
    "Spring Earrings", "Floral Headband", "Pastel Sneakers", "Light Kimono",
    "Spring Perfume", "Flower Crown", "Picnic Blanket", "Spring Shawl",
    "Easter Bonnet", "Garden Gloves", "Spring Umbrella"
  ];

  const springDescriptions = [
    "Beautiful floral dress perfect for spring weather. Made from lightweight cotton.",
    "Light and comfortable cardigan for cool spring evenings.",
    "Elegant pastel blazer for spring occasions.",
    "Colorful floral print skirt that brings spring joy.",
    "Comfortable sandals for spring walks.",
    "Stylish straw hat for sunny spring days.",
    "Elegant silk scarf in spring colors.",
    "Breathable linen shirt for warm spring days.",
    "Trendy cropped jeans perfect for spring.",
    "Light jacket for unpredictable spring weather.",
    "Cute pastel handbag for spring outings.",
    "Elegant dress for garden parties.",
    "Delicate butterfly necklace for spring.",
    "Colorful spring-themed earrings.",
    "Floral headband for a spring look.",
    "Comfortable pastel sneakers.",
    "Lightweight kimono for spring layering.",
    "Fresh spring fragrance.",
    "Beautiful flower crown for spring festivals.",
    "Colorful picnic blanket for outdoor fun.",
    "Elegant spring shawl.",
    "Traditional Easter bonnet.",
    "Garden gloves for spring planting.",
    "Colorful spring umbrella."
  ];

  const springCategories = [
    "Dresses", "Cardigans", "Blazers", "Skirts", "Shoes", "Accessories",
    "Accessories", "Tops", "Jeans", "Jackets", "Bags", "Dresses",
    "Accessories", "Accessories", "Accessories", "Shoes", "Outerwear",
    "Fragrance", "Accessories", "Accessories", "Accessories", "Accessories",
    "Accessories", "Accessories"
  ];

  const springPrices = [89, 59, 129, 69, 79, 35, 29, 49, 65, 99, 119, 159, 25, 19, 15, 85, 55, 45, 22, 39, 49, 32, 18, 29];
  const springOriginalPrices = [129, 89, 189, 99, 119, 55, 49, 79, 95, 149, 179, 229, 45, 35, 25, 125, 85, 75, 35, 59, 79, 55, 29, 49];

  // دمج المنتجات الأساسية
  for (let i = 1; i <= 4; i++) {
    if (baseProducts[i]) {
      products[i] = {
        id: i,
        name: baseProducts[i].name || "",
        nameKey: baseProducts[i].nameKey || "",
        price: baseProducts[i].price || 0,
        originalPrice: baseProducts[i].originalPrice,
        currency: "USD",
        category: baseProducts[i].category || "",
        categoryKey: baseProducts[i].categoryKey || "",
        brand: baseProducts[i].brand || "",
        brandKey: baseProducts[i].brandKey || "",
        description: "",
        descriptionKey: baseProducts[i].descriptionKey || "",
        features: [],
        featuresKeys: baseProducts[i].featuresKeys || [],
        images: baseProducts[i].images || [],
        rating: baseProducts[i].rating || 4.5,
        reviews: baseProducts[i].reviews || 100,
        inStock: true,
        sku: baseProducts[i].sku || `IS-${i.toString().padStart(3, '0')}`,
        tags: baseProducts[i].tags || ["fashion", "style"],
      };
    }
  }

  // إضافة المنتجات الموسمية (5-24)
  for (let i = 5; i <= 24; i++) {
    const idx = i - 5;
    const isSale = (i + 2) % 3 === 0;
    products[i] = {
      id: i,
      name: springProductNames[idx],
      nameKey: `spring.product.${i}`,
      price: isSale ? springOriginalPrices[idx] * 0.7 : springPrices[idx],
      originalPrice: isSale ? springOriginalPrices[idx] : undefined,
      currency: "USD",
      category: springCategories[idx],
      categoryKey: `category.${springCategories[idx].toLowerCase()}`,
      brand: "Islander Spring",
      brandKey: "brand.spring",
      description: springDescriptions[idx],
      descriptionKey: `spring.product.${i}.desc`,
      features: ["Premium quality", "Spring collection", "Limited edition"],
      featuresKeys: [],
      images: [`/filrs/brand-${((i - 1) % 8) + 1}.png`],
      rating: 4.5,
      reviews: 50 + i,
      inStock: true,
      sku: `SPG-${i.toString().padStart(3, '0')}`,
      tags: ["spring", "seasonal", springCategories[idx].toLowerCase()],
    };
  }

  return products;
};

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { t, language, dir } = useLanguage();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "specs" | "reviews">("details");

  const productId = parseInt(params.id as string);

  useEffect(() => {
    setLoading(true);
    // محاكاة تحميل البيانات
    setTimeout(() => {
      const allProducts = getAllProducts(t);
      const foundProduct = allProducts[productId];
      setProduct(foundProduct || null);
      setLoading(false);
    }, 100);
  }, [productId, t]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          name: product.nameKey ? t(product.nameKey) : product.name,
          price: product.price,
          image: product.images[0],
        });
      }
      alert(`✅ Added ${quantity} ${product.nameKey ? t(product.nameKey) : product.name} to cart!`);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "oklch(15.3% 0.006 107.1)" }}>
        <div className="text-white text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent"></div>
          <p className="mt-4">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "oklch(15.3% 0.006 107.1)" }}>
        <div className="text-white text-center">
          <svg className="w-24 h-24 mx-auto text-white/30 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-white/60 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/" className="inline-block bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const productName = product.nameKey ? t(product.nameKey) : product.name;
  const productDescription = product.descriptionKey ? t(product.descriptionKey) : product.description;
  const productBrand = product.brandKey ? t(product.brandKey) : product.brand;
  const productCategory = product.categoryKey ? t(product.categoryKey) : product.category;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6" style={{ backgroundColor: "oklch(15.3% 0.006 107.1)" }} dir={dir}>
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
          <Link href="/" className="hover:text-yellow-400 transition">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-yellow-400 transition">Shop</Link>
          <span>/</span>
          <span className="text-yellow-400">{productName}</span>
        </div>

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative w-full aspect-square bg-white/5 rounded-2xl overflow-hidden">
              <Image
                src={product.images[selectedImage]}
                alt={productName}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === idx ? "border-yellow-400" : "border-white/20 hover:border-white/50"
                    }`}
                  >
                    <Image src={img} alt={`${productName} view ${idx + 1}`} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/70">
                {productBrand}
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/70">
                {productCategory}
              </span>
              {product.originalPrice && (
                <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">SALE</span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white">{productName}</h1>
            <p className="text-white/40 text-sm">SKU: {product.sku}</p>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-white/20"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white/60 text-sm">({product.reviews} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-yellow-400">${product.price} {product.currency}</span>
              {product.originalPrice && (
                <span className="text-xl text-white/50 line-through">${product.originalPrice} {product.currency}</span>
              )}
            </div>

            <p className="text-white/70 leading-relaxed">
              {productDescription}
            </p>

            <div className="flex items-center gap-4">
              <span className="text-white font-medium">Quantity:</span>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition">-</button>
                <span className="text-white text-xl font-semibold w-12 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition">+</button>
              </div>
              <span className="text-white/40 text-sm">In Stock: ✓</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button onClick={handleAddToCart} className="flex-1 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition">
                Add to Cart
              </button>
              <button onClick={handleBuyNow} className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
                Buy Now
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-4">
              <span className="text-white/50 text-sm">Tags:</span>
              {product.tags.map((tag, idx) => (
                <span key={idx} className="px-2 py-1 bg-white/5 rounded text-xs text-white/60">#{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden">
          <div className="flex border-b border-white/10">
            <button onClick={() => setActiveTab("details")} className={`px-6 py-4 text-sm font-medium transition ${activeTab === "details" ? "text-yellow-400 border-b-2 border-yellow-400" : "text-white/60 hover:text-white"}`}>
              Product Details
            </button>
            <button onClick={() => setActiveTab("specs")} className={`px-6 py-4 text-sm font-medium transition ${activeTab === "specs" ? "text-yellow-400 border-b-2 border-yellow-400" : "text-white/60 hover:text-white"}`}>
              Features
            </button>
            <button onClick={() => setActiveTab("reviews")} className={`px-6 py-4 text-sm font-medium transition ${activeTab === "reviews" ? "text-yellow-400 border-b-2 border-yellow-400" : "text-white/60 hover:text-white"}`}>
              Reviews ({product.reviews})
            </button>
          </div>

          <div className="p-6">
            {activeTab === "details" && (
              <div className="space-y-4">
                <p className="text-white/70 leading-relaxed">{productDescription}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Features</h4>
                    <ul className="space-y-2">
                      {product.features.length > 0 ? product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-white/60 text-sm">
                          <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      )) : (
                        <li className="text-white/60 text-sm">Premium quality materials</li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Product Information</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between py-2 border-b border-white/10">
                        <span className="text-white/50">Brand</span>
                        <span className="text-white">{productBrand}</span>
                      </li>
                      <li className="flex justify-between py-2 border-b border-white/10">
                        <span className="text-white/50">Category</span>
                        <span className="text-white">{productCategory}</span>
                      </li>
                      <li className="flex justify-between py-2 border-b border-white/10">
                        <span className="text-white/50">SKU</span>
                        <span className="text-white">{product.sku}</span>
                      </li>
                      <li className="flex justify-between py-2 border-b border-white/10">
                        <span className="text-white/50">Availability</span>
                        <span className="text-green-400">In Stock</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white/50 text-sm">Material</p>
                  <p className="text-white font-medium">Premium Quality</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white/50 text-sm">Origin</p>
                  <p className="text-white font-medium">Imported</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white/50 text-sm">Care Instructions</p>
                  <p className="text-white font-medium">Machine wash cold</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white/50 text-sm">Warranty</p>
                  <p className="text-white font-medium">1 Year Limited</p>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center gap-6 p-4 bg-white/5 rounded-xl">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-400">{product.rating}</div>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-white/20"}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-white/50 text-sm mt-1">Based on {product.reviews} reviews</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const percentage = star === 5 ? 80 : star === 4 ? 60 : star === 3 ? 40 : star === 2 ? 20 : 10;
                      return (
                        <div key={star} className="flex items-center gap-2">
                          <span className="text-white/60 text-sm w-8">{star}★</span>
                          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${percentage}%` }}></div>
                          </div>
                          <span className="text-white/40 text-sm">{percentage}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="text-center py-8">
                  <p className="text-white/50">Login to write a review</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/shop" className="inline-flex items-center gap-2 text-white/70 hover:text-yellow-400 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}