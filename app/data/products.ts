// app/data/products.ts
export interface Product {
  id: number;
  name: string;
  price: string;      // نص السعر كما يظهر للمستخدم (مثل "$129")
  priceNumber: number; // سعر رقمي لاستخدامه في السلة
  image: string;
  season: 'all' | 'spring' | 'summer';
}

export const products: Product[] = [
  { id: 1, name: "Classic Leather Jacket", price: "$129", priceNumber: 129, image: "/filrs/brand-1.png", season: "summer" },
  { id: 2, name: "Summer Dress", price: "$59", priceNumber: 59, image: "/filrs/brand-2.png", season: "summer" },
  { id: 3, name: "Wool Sweater", price: "$89", priceNumber: 89, image: "/filrs/brand-3.png", season: "spring" },
  { id: 4, name: "Denim Jeans", price: "$79", priceNumber: 79, image: "/filrs/brand-4.png", season: "all" },
  { id: 5, name: "Sports Shoes", price: "$99", priceNumber: 99, image: "/filrs/brand-5.png", season: "summer" },
  { id: 6, name: "Leather Bag", price: "$149", priceNumber: 149, image: "/filrs/brand-6.png", season: "all" },
  { id: 7, name: "Sunglasses", price: "$49", priceNumber: 49, image: "/filrs/brand-7.png", season: "summer" },
  { id: 8, name: "Scarf", price: "$29", priceNumber: 29, image: "/filrs/brand-8.png", season: "spring" },
  { id: 9, name: "Floral Blouse", price: "$69", priceNumber: 69, image: "/filrs/brand-9.png", season: "spring" },
  { id: 10, name: "Beach Hat", price: "$39", priceNumber: 39, image: "/filrs/brand-10.png", season: "summer" },
];