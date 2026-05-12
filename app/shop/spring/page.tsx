'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductModal from "@/components/ProductModal";

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  isSale?: boolean;
  isNew?: boolean;
  image: string;
  description: string;
  category?: string;
  brand?: string;
  inStock?: boolean;
  sku?: string;
  rating?: number;
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

// منتجات مجموعة الربيع
const generateSpringProducts = (): Product[] => {
  const products: Product[] = [];
  
  const productNames = [
    "Spring Floral Dress", "Lightweight Cardigan", "Pastel Blazer", "Floral Print Skirt",
    "Spring Sandals", "Straw Hat", "Silk Scarf", "Linen Shirt",
    "Cropped Jeans", "Spring Jacket", "Pastel Handbag", "Garden Party Dress",
    "Butterfly Necklace", "Spring Earrings", "Floral Headband", "Pastel Sneakers",
    "Light Kimono", "Spring Perfume", "Flower Crown", "Picnic Blanket",
    "Spring Shawl", "Easter Bonnet", "Garden Gloves", "Spring Umbrella"
  ];
  
  const descriptions = [
    "Beautiful floral dress perfect for spring weather. Made from lightweight cotton with a flattering fit.",
    "Light and comfortable cardigan for cool spring evenings. Perfect for layering over any outfit.",
    "Elegant pastel blazer for spring occasions. Adds a touch of sophistication to any look.",
    "Colorful floral print skirt that brings spring joy. Pairs perfectly with a simple white blouse.",
    "Comfortable sandals for spring walks. Designed with cushioned sole for all-day comfort.",
    "Stylish straw hat for sunny spring days. Provides excellent sun protection.",
    "Elegant silk scarf in spring colors. Versatile accessory that can be worn multiple ways.",
    "Breathable linen shirt for warm spring days. Keeps you cool and stylish.",
    "Trendy cropped jeans perfect for spring. Pairs perfectly with sneakers or sandals.",
    "Light jacket for unpredictable spring weather. Water-resistant and windproof.",
    "Cute pastel handbag for spring outings. Spacious enough for all your essentials.",
    "Elegant dress for garden parties. Features delicate floral embroidery.",
    "Delicate butterfly necklace for spring. Made from sterling silver with crystal accents.",
    "Colorful spring-themed earrings. Lightweight and comfortable for all-day wear.",
    "Floral headband for a spring look. Adds a pop of color to any hairstyle.",
    "Comfortable pastel sneakers. Perfect for casual spring outings.",
    "Lightweight kimono for spring layering. Features beautiful spring patterns.",
    "Fresh spring fragrance. Notes of cherry blossom and fresh rain.",
    "Beautiful flower crown for spring festivals. Made with artificial flowers that last forever.",
    "Colorful picnic blanket for outdoor fun. Water-resistant and easy to clean.",
    "Elegant spring shawl. Made from soft, breathable fabric.",
    "Traditional Easter bonnet. Handcrafted with premium materials.",
    "Garden gloves for spring planting. Durable and comfortable.",
    "Colorful spring umbrella. Compact design fits easily in any bag."
  ];
  
  const categories = [
    "Dresses", "Cardigans", "Blazers", "Skirts",
    "Shoes", "Accessories", "Accessories", "Tops",
    "Jeans", "Jackets", "Bags", "Dresses",
    "Accessories", "Accessories", "Accessories", "Shoes",
    "Outerwear", "Fragrance", "Accessories", "Accessories",
    "Accessories", "Accessories", "Accessories", "Accessories"
  ];
  
  const prices = [89, 59, 129, 69, 79, 35, 29, 49, 65, 99, 119, 159, 25, 19, 15, 85, 55, 45, 22, 39, 49, 32, 18, 29];
  const originalPrices = [129, 89, 189, 99, 119, 55, 49, 79, 95, 149, 179, 229, 45, 35, 25, 125, 85, 75, 35, 59, 79, 55, 29, 49];
  
  for (let i = 0; i < 24; i++) {
    const isSale = i % 3 === 0;
    const isNew = i % 5 === 0;
    const imageIndex = i % allImages.length;
    
    products.push({
      id: i + 1,
      name: productNames[i],
      price: isSale ? originalPrices[i] * 0.7 : prices[i],
      originalPrice: isSale ? originalPrices[i] : undefined,
      isSale: isSale,
      isNew: isNew,
      image: allImages[imageIndex],
      description: descriptions[i],
      category: categories[i],
      brand: "Islander Spring",
      inStock: true,
      sku: `SPG-${(i + 1).toString().padStart(3, '0')}`,
      rating: 4.5,
    });
  }
  
  return products;
};

const SpringCollectionPage = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>("default");
  const [priceRange, setPriceRange] = useState<number>(300);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 12;
  
  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const pageTitleRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const generatedProducts = generateSpringProducts();
    setProducts(generatedProducts);
  }, []);
  
  let filteredProducts = [...products];
  
  // فلترة حسب السعر
  filteredProducts = filteredProducts.filter(p => p.price <= priceRange);
  
  // ترتيب المنتجات
  switch (sortBy) {
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      filteredProducts.sort((a, b) => a.id - b.id);
  }
  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  // فتح مودال المنتج
  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  
  useEffect(() => {
    if (pageTitleRef.current) {
      gsap.fromTo(pageTitleRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
    
    if (heroRef.current) {
      gsap.fromTo(heroRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power2.out", delay: 0.3 }
      );
    }
    
    productsRef.current.forEach((card, idx) => {
      if (card) {
        gsap.fromTo(card,
          { y: 50, opacity: 0, rotateX: 10 },
          {
            y: 0, opacity: 1, rotateX: 0, duration: 0.6, delay: idx * 0.05,
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
  
  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
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
        
        {/* Hero Section */}
        <div ref={heroRef} className="text-center mb-12">
          <h1 
            ref={pageTitleRef}
            className="text-4xl md:text-5xl font-bold text-center text-white mb-4"
          >
            Spring Collection
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Embrace the freshness of spring with our vibrant collection. 
            From floral dresses to lightweight jackets, discover the perfect pieces for the season of renewal.
          </p>
          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30">🌸 Fresh Arrivals</span>
            <span className="px-4 py-2 bg-yellow-500/20 text-yellow-300 rounded-full text-sm border border-yellow-500/30">🌷 Spring Colors</span>
            <span className="px-4 py-2 bg-pink-500/20 text-pink-300 rounded-full text-sm border border-pink-500/30">💐 Floral Prints</span>
          </div>
        </div>
        
        {/* فلترة وترتيب المنتجات */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-md p-6 mb-8 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* ترتيب حسب */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
              >
                <option value="default" className="bg-gray-800">Default</option>
                <option value="price-low" className="bg-gray-800">Price: Low to High</option>
                <option value="price-high" className="bg-gray-800">Price: High to Low</option>
                <option value="name-asc" className="bg-gray-800">Name: A to Z</option>
                <option value="name-desc" className="bg-gray-800">Name: Z to A</option>
              </select>
            </div>
            
            {/* فلترة حسب السعر */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Max Price: ${priceRange}
              </label>
              <input
                type="range"
                min="0"
                max="300"
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            {/* نتائج البحث */}
            <div className="flex items-center justify-end">
              <p className="text-white/70">
                Found <span className="font-bold text-green-400">{filteredProducts.length}</span> products
              </p>
            </div>
          </div>
        </div>
        
        {/* شبكة المنتجات */}
        {currentProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/70 text-lg">No products found in this price range.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProducts.map((product, idx) => (
                <div
                  key={product.id}
                  ref={(el) => { productsRef.current[idx] = el; }}
                  onClick={() => openProductModal(product)}
                  className="group bg-white/10 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/20 border border-white/10 cursor-pointer"
                >
                  <div className="relative w-full pt-[100%] bg-gradient-to-br from-green-900/30 to-yellow-900/30 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      loading={idx < 4 ? "eager" : "lazy"}
                      priority={idx < 4}
                    />
                    
                    {product.isSale && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow-md">
                        SPRING SALE
                      </div>
                    )}
                    {product.isNew && !product.isSale && (
                      <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow-md">
                        NEW SPRING
                      </div>
                    )}
                    
                    {/* Add to Cart Button Overlay */}
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-500 transition opacity-0 group-hover:opacity-100 z-10 shadow-lg whitespace-nowrap"
                    >
                      Add to Cart
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-white/60 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2 mb-3">
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
                        <span className="text-2xl font-bold text-green-400">
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
                          ? "bg-green-600 text-white"
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
      
      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
};

export default SpringCollectionPage;