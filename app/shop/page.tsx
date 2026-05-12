'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  isSale?: boolean;
  isNew?: boolean;
  image: string;
  category: string;
}

// قائمة بجميع الصور الموجودة في مجلد filrs
const allImages = [
  "/filrs/brand-1.png", "/filrs/brand-2.png", "/filrs/brand-3.png", "/filrs/brand-4.png",
  "/filrs/brand-5.png", "/filrs/brand-6.png", "/filrs/brand-7.png", "/filrs/brand-8.png",
  "/filrs/brand-a.png", "/filrs/brand-aa.png", "/filrs/brand-aaa.png", "/filrs/brand-b.png",
  "/filrs/brand-bb.png", "/filrs/brand-bbb.png", "/filrs/brand-c.png", "/filrs/brand-cc.png",
  "/filrs/brand-ccc.png", "/filrs/brand-d.png", "/filrs/brand-dd.png", "/filrs/brand-ddd.png",
  "/filrs/brand-e.png", "/filrs/brand-f.png", "/filrs/brand-ff.png", "/filrs/brand-g.png",
  "/filrs/brand-gg.png", "/filrs/brand-h.png", "/filrs/brand-hh.png", "/filrs/brand-i.png",
  "/filrs/brand-J.png", "/filrs/brand-jj.png", "/filrs/brand-k.png", "/filrs/brand-kk.png",
  "/filrs/brand-l.png", "/filrs/brand-m.png", "/filrs/brand-mm.png", "/filrs/brand-n.png",
  "/filrs/brand-nn.png", "/filrs/brand-o.png", "/filrs/brand-p.png", "/filrs/brand-pp.png",
  "/filrs/brand-qq.png", "/filrs/brand-r.png", "/filrs/brand-rr.png", "/filrs/brand-s.png",
  "/filrs/brand-ss.png", "/filrs/brand-t.png", "/filrs/brand-u.png", "/filrs/brand-uu.png",
  "/filrs/brand-v.png", "/filrs/brand-vv.png", "/filrs/brand-w.png", "/filrs/brand-ww.png",
  "/filrs/brand-x.png", "/filrs/brand-xx.png", "/filrs/brand-yy.png", "/filrs/brand-z.png",
  "/filrs/brand-zz.png", "/filrs/brnad-ll.png", "/filrs/prand-ii.png"
];

// إنشاء 24 منتج مع صور مختلفة من المجلد
const generateProducts = (): Product[] => {
  const products: Product[] = [];
  
  const productNames = [
    "Classic Leather Jacket", "Summer Dress", "Wool Sweater", "Denim Jeans",
    "Sports Shoes", "Leather Bag", "Sunglasses", "Scarf", "Cotton T-Shirt",
    "Winter Coat", "Running Shorts", "Hoodie", "Jeans Jacket", "Flip Flops",
    "Backpack", "Watch", "Belt", "Hat", "Gloves", "Socks",
    "Silk Scarf", "Leather Boots", "Cashmere Sweater", "Designer Belt"
  ];
  
  const categories = [
    "Jackets", "Dresses", "Sweaters", "Jeans",
    "Shoes", "Bags", "Accessories", "Accessories",
    "T-Shirts", "Coats", "Sportswear", "Hoodies",
    "Jackets", "Shoes", "Bags", "Accessories",
    "Accessories", "Accessories", "Accessories", "Accessories",
    "Accessories", "Shoes", "Sweaters", "Accessories"
  ];
  
  const prices = [129, 59, 89, 79, 99, 149, 49, 29, 39, 199, 45, 69, 109, 25, 89, 159, 35, 19, 15, 12, 55, 179, 299, 89];
  const originalPrices = [199, 89, 129, 119, 149, 199, 79, 49, 59, 299, 69, 99, 159, 39, 129, 229, 59, 29, 25, 19, 79, 249, 399, 129];
  
  for (let i = 0; i < 24; i++) {
    const isSale = i % 4 === 0 || i % 7 === 0;
    const isNew = i % 6 === 0;
    const imageIndex = i % allImages.length;
    
    products.push({
      id: i + 1,
      name: productNames[i],
      price: prices[i],
      originalPrice: isSale ? originalPrices[i] : undefined,
      isSale: isSale,
      isNew: isNew,
      image: allImages[imageIndex],
      category: categories[i],
    });
  }
  
  return products;
};

// ========== Horizontal Filter Component ==========
interface FilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: number;
  onPriceRangeChange: (range: number) => void;
  showOnlySales: boolean;
  onShowOnlySalesChange: (show: boolean) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalProducts: number;
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
}: FilterProps) => {
  const [localMaxPrice, setLocalMaxPrice] = useState(priceRange);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  useEffect(() => {
    setLocalMaxPrice(priceRange);
  }, [priceRange]);

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setLocalMaxPrice(value);
    onPriceRangeChange(value);
  };

  return (
    <div className="w-full mb-8">
      {/* Categories Row */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6">
        <button
          onClick={() => onCategoryChange("all")}
          className={`
            px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300
            ${activeCategory === "all"
              ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg scale-105"
              : "bg-white/10 text-white hover:bg-white/20 hover:scale-105"
            }
          `}
        >
          All
        </button>
        {categories.filter(c => c !== "all").map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`
              px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300
              ${activeCategory === cat
                ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg scale-105"
                : "bg-white/10 text-white hover:bg-white/20 hover:scale-105"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
        {/* Results count */}
        <div className="text-white/70 text-sm">
          Found <span className="font-semibold text-yellow-400">{totalProducts}</span> products
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 bg-black/50 border border-white/20 rounded-lg text-white text-sm cursor-pointer hover:border-yellow-400 transition"
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
            <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Sale Only Toggle */}
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
            Sale
          </button>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
              ${showAdvancedFilters
                ? "bg-yellow-500 text-black"
                : "bg-white/10 text-white hover:bg-white/20"
              }
            `}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Max Price
          </button>
        </div>
      </div>

      {/* Advanced Filters Panel - Price Range */}
      {showAdvancedFilters && (
        <div className="mt-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1">
              <label className="block text-white/60 text-xs mb-1">Max Price</label>
              <div className="flex items-center gap-3">
                <span className="text-yellow-400 font-semibold">${localMaxPrice}</span>
                <input
                  type="range"
                  min={0}
                  max={500}
                  value={localMaxPrice}
                  onChange={handleMaxPriceChange}
                  className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ShopPage = () => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");
  const [priceRange, setPriceRange] = useState<number>(500);
  const [showOnlySales, setShowOnlySales] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 12;
  
  const pageTitleRef = useRef<HTMLHeadingElement>(null);
  const productsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const generatedProducts = generateProducts();
    setProducts(generatedProducts);
    setFilteredProducts(generatedProducts);
  }, []);
  
  // الحصول على الفئات الفريدة
  const categories = ["all", ...new Set(products.map(p => p.category))];
  
  // تطبيق الفلترة والترتيب
  useEffect(() => {
    let filtered = [...products];
    
    // فلترة حسب الفئة
    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    // فلترة حسب السعر
    filtered = filtered.filter(p => p.price <= priceRange);
    
    // فلترة التخفيضات فقط
    if (showOnlySales) {
      filtered = filtered.filter(p => p.isSale === true);
    }
    
    // ترتيب المنتجات
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        filtered.sort((a, b) => a.id - b.id);
    }
    
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [selectedCategory, sortBy, priceRange, showOnlySales, products]);
  
  // حساب المنتجات المعروضة في الصفحة الحالية
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  const goToProduct = (productId: number) => {
    router.push(`/product/${productId}`);
  };
  
  // GSAP Animations
  useEffect(() => {
    if (pageTitleRef.current) {
      gsap.fromTo(pageTitleRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
    
    productsRef.current.forEach((card, idx) => {
      if (card) {
        gsap.fromTo(card,
          { y: 50, opacity: 0, scale: 0.9 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.5, delay: idx * 0.05,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [currentProducts]);
  
  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16" style={{ backgroundColor: "oklch(15.3% 0.006 107.1)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* عنوان الصفحة */}
        <h1 
          ref={pageTitleRef}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-4"
        >
          Our Shop
        </h1>
        
        <p className="text-center text-white/70 mb-12 max-w-2xl mx-auto">
          Discover our latest collection of premium fashion items. 
          Quality meets style in every piece.
        </p>
        
        {/* Horizontal Filter Component */}
        <HorizontalFilter
          categories={categories}
          activeCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          showOnlySales={showOnlySales}
          onShowOnlySalesChange={setShowOnlySales}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalProducts={filteredProducts.length}
        />
        
        {/* شبكة المنتجات */}
        {currentProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-white/70 text-lg">No products found.</div>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setPriceRange(500);
                setShowOnlySales(false);
                setSortBy("default");
              }}
              className="mt-4 px-6 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProducts.map((product, idx) => (
                <div
                  key={product.id}
                  ref={(el) => { productsRef.current[idx] = el; }}
                  onClick={() => goToProduct(product.id)}
                  className="group bg-white/10 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/20 border border-white/10 cursor-pointer"
                >
                  {/* صورة المنتج */}
                  <div className="relative w-full pt-[100%] bg-white/5 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      loading={idx < 4 ? "eager" : "lazy"}
                      priority={idx < 4}
                    />
                    
                    {/* شارة العرض أو الجديد */}
                    {product.isSale && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow-md">
                        SALE
                      </div>
                    )}
                    {product.isNew && !product.isSale && (
                      <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow-md">
                        NEW
                      </div>
                    )}
                    
                    {/* Add to Cart Button Overlay */}
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-400 transition opacity-0 group-hover:opacity-100 z-10 shadow-lg whitespace-nowrap"
                    >
                      Add to Cart
                    </button>
                  </div>
                  
                  {/* معلومات المنتج */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition line-clamp-1">
                        {product.name}
                      </h3>
                      <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded whitespace-nowrap">
                        {product.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      {product.isSale && product.originalPrice ? (
                        <>
                          <span className="text-2xl font-bold text-red-400">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="text-sm text-white/40 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-yellow-400">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* ترقيم الصفحات */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12 flex-wrap">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition border border-white/20"
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-4 py-2 rounded-lg transition ${
                        currentPage === pageNum
                          ? "bg-yellow-500 text-black"
                          : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition border border-white/20"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>      
    </div>
  );
};

export default ShopPage;