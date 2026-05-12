'use client';
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="About min-h-screen py-12 px-4 sm:px-6" style={{ backgroundColor: "oklch(15.3% 0.006 107.1)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="relative w-full h-[50vh] md:h-[60vh] rounded-3xl overflow-hidden shadow-2xl mb-16 group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
          <Image
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Islander Seasons fashion"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
            unoptimized
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
              About Us
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Where style meets individuality
            </p>
          </div>
        </section>

        {/* Main Content - Full width text */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-10 transition hover:shadow-2xl">
          <div className="prose prose-lg max-w-none text-white/80 space-y-6 leading-relaxed">
            <p className="leading-7 first-letter:text-5xl first-letter:font-bold first-letter:text-yellow-400 first-letter:mr-3 first-letter:float-left">
              Welcome to Islander Seasons, where we believe that fashion should be as vibrant and unique as 
              the individuals who wear it. We're not your average graphic apparel brand - we're here to make 
              a statement, turn heads, and spread some serious style vibes.
            </p>
            
            <p className="leading-7">
              At Islander Seasons, we're all about embracing the beauty of nature and expressing your 
              individuality. Our founder, <span className="font-semibold text-yellow-400">Megan Haines</span>, 
              started this business in 2024 with a vision to create eye-catching t-shirts that make people 
              stop and say, <em className="italic text-yellow-400">"Wow, where did you get that?!"</em>
            </p>
            
            <p className="leading-7">
              When you shop with us, you're not just buying a t-shirt - you're making a statement. 
              Our products, like the <strong className="text-yellow-400 font-semibold">'Bee Kind T-Shirt'</strong> and{" "}
              <strong className="text-yellow-400 font-semibold">'Bee More T-Shirt'</strong>, are designed to showcase 
              your love for nature and remind everyone to be kind to our planet (and look fabulous while doing it).
            </p>
            
            <p className="leading-7">
              But we're not just about pretty designs. We're also committed to quality. Each of our graphic 
              apparel pieces is carefully crafted using the finest materials and printing techniques. We want 
              you to feel as good as you look when you slip on one of our tees.
            </p>
            
            <p className="leading-7">
              So whether you're a nature lover, a trendsetter, or just someone who wants to add a pop of color 
              to their wardrobe, Islander Seasons has got you covered. Join our community of style enthusiasts 
              and let your fashion sense bloom!
            </p>
            
            <div className="bg-yellow-500/10 border-l-4 border-yellow-400 p-6 rounded-r-xl mt-8">
              <p className="text-white font-medium italic leading-7 m-0">
                Remember, life is too short to wear boring clothes. Embrace your individuality, make a statement, 
                and let Islander Seasons be your go-to destination for graphic apparel that's as unique as you are.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}