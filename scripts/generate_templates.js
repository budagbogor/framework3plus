const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '../public/templates');

// Shared Base Files
const packageJson = JSON.stringify({
  "name": "world-class-template",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite --host",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "lucide-react": "^0.292.0",
    "recharts": "^2.10.3",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24"
  }
}, null, 2);

const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({ plugins: [react()] });`;

const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}`;

const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Preview</title>
  </head>
  <body class="bg-gray-50 text-gray-900 antialiased overflow-x-hidden">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`;

const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .glass {
    @apply bg-white/70 backdrop-blur-md border border-white/20 shadow-lg;
  }
  .glass-dark {
    @apply bg-gray-900/70 backdrop-blur-md border border-gray-700/50 shadow-xl;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}`;

const mainJsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);`;

// 1. E-COMMERCE TEMPLATE
const ecommerceApp = `import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, Star, ChevronRight, Heart, ShoppingBag, X, CheckCircle2, ArrowLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

const allProducts = [
  { id: 1, name: 'Premium Wireless Headphones', price: 299, rating: 4.8, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800', category: 'Audio', desc: 'Experience studio-quality sound with active noise cancellation and 30-hour battery life. Hand-crafted with premium materials for ultimate comfort.' },
  { id: 2, name: 'Minimalist Smart Watch', price: 199, rating: 4.6, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800', category: 'Wearables', desc: 'Track your health and stay connected with elegant precision. Features an always-on retina display and titanium case.' },
  { id: 3, name: 'Professional DSLR Camera', price: 899, rating: 4.9, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800', category: 'Photography', desc: 'Capture stunning 4K video and 45MP stills with our flagship full-frame mirrorless camera. Perfect for professionals.' },
  { id: 4, name: 'Ergonomic Workspace Chair', price: 349, rating: 4.7, image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800', category: 'Furniture', desc: 'Designed for 8+ hours of comfortable seating. Features dynamic lumbar support and breathable mesh back.' },
  { id: 5, name: 'Studio Microphones Set', price: 150, rating: 4.5, image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800', category: 'Audio', desc: 'Broadcast-quality dynamic microphone ideal for podcasting, streaming, and vocal recording.' },
  { id: 6, name: 'Mechanical Keyboard', price: 129, rating: 4.8, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800', category: 'Workspace', desc: 'Tactile, clicky mechanical switches enclosed in a solid aluminum frame. Customizable RGB backlight.' },
  { id: 7, name: 'Curved Ultrawide Monitor', price: 599, rating: 4.9, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800', category: 'Workspace', desc: 'Immersive 34-inch curved display with 144Hz refresh rate and true 1ms response time.' },
  { id: 8, name: 'Portable SSD 2TB', price: 219, rating: 4.7, image: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&q=80&w=800', category: 'Accessories', desc: 'Blazing fast NVMe portable drive with read speeds up to 1050 MB/s. Drop resistant and pocket sized.' }
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState(null);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    setToast(\`Added \${product.name} to cart!\`);
    setTimeout(() => setToast(null), 3000);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  
  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(wid => wid !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative overflow-x-hidden">
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] bg-black text-white px-6 py-3 rounded-full font-medium shadow-2xl flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" /> {toast}
        </div>
      )}

      <nav className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 active:scale-95">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">LUXE</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
          <Link to="/" className={\`transition-colors hover:text-black \${location.pathname === '/' ? 'text-black font-bold' : ''}\`}>Home</Link>
          <Link to="/shop" className={\`transition-colors hover:text-black \${location.pathname.startsWith('/shop') ? 'text-black font-bold' : ''}\`}>Shop</Link>
          <Link to="/about" className={\`transition-colors hover:text-black \${location.pathname === '/about' ? 'text-black font-bold' : ''}\`}>About</Link>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-gray-600 hover:text-black transition-colors hidden sm:block"><Search className="w-5 h-5" /></button>
          <button className="text-gray-600 hover:text-black transition-colors relative" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>
          <button className="md:hidden text-gray-600 hover:text-black"><Menu className="w-5 h-5" /></button>
        </div>
      </nav>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-up md:animate-fade-in">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">Your Cart ({cartItemsCount})</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 mt-20 flex flex-col items-center">
                  <ShoppingCart className="w-16 h-16 mb-4 opacity-20" />
                  <p>Your cart is empty.</p>
                  <Link to="/shop" onClick={() => setIsCartOpen(false)} className="mt-4 text-black font-bold underline">Continue Shopping</Link>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.image} className="w-20 h-20 object-cover rounded-lg bg-gray-100" />
                    <div className="flex-1">
                      <h4 className="font-semibold line-clamp-1">{item.name}</h4>
                      <p className="text-gray-500 text-sm mb-2">Qty: {item.quantity}</p>
                      <div className="flex items-center justify-between">
                        <p className="font-bold">$\{(item.price * item.quantity).toFixed(2)}</p>
                        <button onClick={() => removeFromCart(item.id)} className="text-sm text-red-500 hover:underline">Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between mb-4">
                <span className="font-semibold text-gray-600">Subtotal</span>
                <span className="font-bold text-xl">$\{cartTotal.toFixed(2)}</span>
              </div>
              <Link 
                to="/checkout"
                onClick={() => setIsCartOpen(false)}
                className={\`w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 flex justify-center transition-transform active:scale-95 \${cart.length === 0 ? 'opacity-50 pointer-events-none' : ''}\`}
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}

      <main className="min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Home products={allProducts} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
          <Route path="/shop" element={<Shop products={allProducts} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
          <Route path="/product/:id" element={<ProductDetail products={allProducts} addToCart={addToCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} total={cartTotal} clearCart={() => setCart([])} />} />
          <Route path="/success" element={<Success />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <footer className="bg-black text-white py-12 px-6 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center"><ShoppingBag className="w-5 h-5 text-black" /></div>
              <span className="text-xl font-bold tracking-tight">LUXE</span>
            </div>
            <p className="text-gray-400 text-sm">Premium electronics and lifestyle accessories for the modern world.</p>
          </div>
          <div><h4 className="font-bold mb-4">Shop</h4><ul className="space-y-2 text-sm text-gray-400"><li><Link to="/shop">All Products</Link></li><li><Link to="/shop">New Arrivals</Link></li></ul></div>
          <div><h4 className="font-bold mb-4">Support</h4><ul className="space-y-2 text-sm text-gray-400"><li>FAQ</li><li>Shipping</li><li>Returns</li></ul></div>
          <div><h4 className="font-bold mb-4">Newsletter</h4><p className="text-sm text-gray-400 mb-2">Subscribe for 10% off your first order.</p><div className="flex"><input type="email" placeholder="Your email" className="bg-white/10 px-3 py-2 rounded-l-lg outline-none text-sm w-full" /><button className="bg-white text-black px-4 font-bold rounded-r-lg">Join</button></div></div>
        </div>
      </footer>
    </div>
  );
}

function Home({ products, addToCart, wishlist, toggleWishlist }) {
  const trending = products.slice(0, 4);
  return (
    <div className="animate-fade-in">
      <section className="relative px-6 py-20 md:py-32 overflow-hidden bg-black text-white">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000" alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-4 block animate-fade-in">Spring Collection 2026</span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight animate-slide-up">
            Elevate Your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Everyday Style.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl animate-fade-in" style={{animationDelay:'200ms'}}>
            Discover our curated selection of premium electronics and lifestyle accessories designed for the modern aesthetic.
          </p>
          <Link to="/shop" className="bg-white inline-flex text-black px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-transform hover:scale-105 active:scale-95 items-center gap-2">
            Shop the Collection <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div><h2 className="text-3xl font-bold tracking-tight mb-2">Trending Now</h2><p className="text-gray-500">Our most popular premium picks.</p></div>
          <Link to="/shop" className="text-sm font-semibold hover:underline hidden md:block">View All</Link>
        </div>
        <ProductGrid products={trending} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />
      </section>
    </div>
  );
}

function Shop({ products, addToCart, wishlist, toggleWishlist }) {
  const [category, setCategory] = useState('All');
  const filtered = category === 'All' ? products : products.filter(p => p.category === category);
  const categories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4 md:mb-0">All Products</h1>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto hide-scrollbar">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} className={\`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors \${category === cat ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}\`}>
              {cat}
            </button>
          ))}
        </div>
      </div>
      <ProductGrid products={filtered} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />
    </div>
  );
}

function ProductGrid({ products, addToCart, wishlist, toggleWishlist }) {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product, idx) => (
        <div key={product.id} className="group cursor-pointer animate-slide-up" style={{animationDelay: \`\${(idx%4) * 100}ms\`}} onClick={() => navigate(\`/product/\${product.id}\`)}>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-gray-100 shadow-sm group-hover:shadow-xl transition-all duration-300">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <button onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }} className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
              <Heart className={\`w-4 h-4 \${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-900'}\`} />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button onClick={(e) => { e.stopPropagation(); addToCart(product); }} className="w-full bg-black/90 backdrop-blur-md text-white py-3 rounded-xl font-medium hover:bg-black active:scale-95 transition-transform">
                Add to Cart
              </button>
            </div>
          </div>
          <div className="flex items-start justify-between gap-4 px-1">
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-black line-clamp-1">{product.name}</h3>
              <span className="text-sm text-gray-500">{product.category}</span>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">$\{product.price}</p>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{product.rating}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductDetail({ products, addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));

  if(!product) return <div className="text-center py-32"><h1 className="text-2xl font-bold">Product not found</h1><button onClick={() => navigate('/shop')} className="mt-4 underline">Go back to shop</button></div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition-colors"><ArrowLeft className="w-4 h-4" /> Back</button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 shadow-xl">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-indigo-600 font-semibold mb-2">{product.category}</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{product.name}</h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold">$\{product.price}</span>
            <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm font-medium"><Star className="w-4 h-4 fill-yellow-500 text-yellow-500" /> {product.rating} Rating</div>
          </div>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">{product.desc}</p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-sm text-gray-600"><ShieldCheck className="w-5 h-5 text-emerald-500" /> 2-Year Premium Warranty included</div>
            <div className="flex items-center gap-3 text-sm text-gray-600"><Truck className="w-5 h-5 text-blue-500" /> Free shipping on orders over $100</div>
            <div className="flex items-center gap-3 text-sm text-gray-600"><RotateCcw className="w-5 h-5 text-purple-500" /> 30-day hassle-free returns</div>
          </div>

          <div className="flex gap-4">
            <button onClick={() => addToCart(product)} className="flex-1 bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-transform active:scale-95 shadow-lg shadow-black/20">Add to Cart</button>
            <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-black transition-colors"><Heart className="w-6 h-6" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Checkout({ cart, total, clearCart }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if(cart.length === 0) {
    return <div className="text-center py-32 animate-fade-in"><h1 className="text-2xl font-bold mb-4">Your cart is empty</h1><Link to="/shop" className="bg-black text-white px-6 py-3 rounded-xl font-bold inline-block">Go Shopping</Link></div>;
  }

  const handlePay = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      clearCart();
      navigate('/success');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Secure Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <form onSubmit={handlePay} className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <input required type="email" placeholder="Email Address" className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black transition-all" />
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="First Name" className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-black outline-none" />
                <input required type="text" placeholder="Last Name" className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-black outline-none" />
                <input required type="text" placeholder="Address" className="col-span-2 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-black outline-none" />
                <input required type="text" placeholder="City" className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-black outline-none" />
                <input required type="text" placeholder="Postal Code" className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-black outline-none" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="space-y-4">
                <input required type="text" placeholder="Card Number" className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-black outline-none" />
                <div className="grid grid-cols-2 gap-4">
                  <input required type="text" placeholder="MM/YY" className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-black outline-none" />
                  <input required type="text" placeholder="CVC" className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-black outline-none" />
                </div>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-transform active:scale-95 disabled:opacity-50 flex justify-center items-center gap-2 shadow-xl shadow-black/10">
              {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : \`Pay $\${total.toFixed(2)}\`}
            </button>
          </form>
        </div>
        <div className="lg:col-span-5">
          <div className="bg-gray-100 p-8 rounded-3xl sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <img src={item.image} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold line-clamp-1">{item.name}</p>
                    <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold">$\{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-300 pt-4 space-y-2 mb-4 text-sm">
              <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span className="font-semibold">$\{total.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Shipping</span><span className="text-emerald-600 font-semibold">Free</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Taxes</span><span className="font-semibold">$0.00</span></div>
            </div>
            <div className="border-t border-gray-300 pt-4 flex justify-between items-center">
              <span className="font-bold text-lg">Total</span>
              <span className="font-extrabold text-2xl">$\{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Success() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 animate-fade-in">
      <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="w-12 h-12" />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight mb-4">Payment Successful!</h1>
      <p className="text-gray-500 max-w-md mb-8">Thank you for your order. We've sent a confirmation email to you with the order details.</p>
      <Link to="/shop" className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors inline-block">Continue Shopping</Link>
    </div>
  );
}

function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center animate-fade-in">
      <h1 className="text-5xl font-extrabold tracking-tight mb-8">Crafting the Future</h1>
      <p className="text-xl text-gray-600 leading-relaxed mb-8">LUXE is a premier destination for modern lifestyle tech and design. We believe that everyday objects should inspire creativity and elevate your environment. Every product in our collection is strictly vetted for uncompromising quality, durability, and aesthetics.</p>
      <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200" className="rounded-3xl shadow-2xl w-full" />
    </div>
  );
}`;

// 2. DASHBOARD TEMPLATE
const dashboardApp = `import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, CreditCard, Activity, Bell, Search, Settings, MoreVertical, ArrowUpRight, ArrowDownRight, Menu, X, Loader2, PieChart, TrendingUp, BarChart3, Database, ShieldCheck, Download } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, users: 2400 },
  { name: 'Feb', revenue: 3000, users: 1398 },
  { name: 'Mar', revenue: 2000, users: 9800 },
  { name: 'Apr', revenue: 2780, users: 3908 },
  { name: 'May', revenue: 1890, users: 4800 },
  { name: 'Jun', revenue: 2390, users: 3800 },
  { name: 'Jul', revenue: 3490, users: 4300 },
];

const customerData = [
  { id: 1, name: 'Alex Johnson', email: 'alex@example.com', status: 'Active', spent: '$1,200', joined: 'Oct 24, 2023' },
  { id: 2, name: 'Sarah Williams', email: 'sarah.w@example.com', status: 'Inactive', spent: '$340', joined: 'Sep 12, 2023' },
  { id: 3, name: 'Michael Chen', email: 'm.chen@example.com', status: 'Active', spent: '$2,450', joined: 'Nov 01, 2023' },
  { id: 4, name: 'Emma Davis', email: 'emma.d@example.com', status: 'Active', spent: '$890', joined: 'Oct 15, 2023' },
  { id: 5, name: 'James Wilson', email: 'j.wilson@example.com', status: 'Pending', spent: '$0', joined: 'Dec 02, 2023' },
];

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/' },
    { icon: Activity, label: 'Analytics', path: '/analytics' },
    { icon: Users, label: 'Customers', path: '/customers' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 flex font-sans text-gray-900">
      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={\`fixed lg:sticky top-0 h-screen bg-white border-r border-gray-200 w-72 flex flex-col transition-transform duration-300 z-50 \${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}\`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
            {isSidebarOpen && <span className="font-bold text-xl tracking-tight text-gray-900">NEXUS</span>}
          </div>
          {isMobile && (
            <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-gray-900">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => isMobile && setSidebarOpen(false)}
                className={\`flex items-center gap-3 px-4 py-3 rounded-xl transition-all \${isActive ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}\`}
              >
                <item.icon className={\`w-5 h-5 \${isActive ? 'text-indigo-600' : 'text-gray-400'}\`} />
                {isSidebarOpen && <span>{item.label}</span>}
              </Link>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-30 sticky top-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg lg:hidden">
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden sm:block w-64 lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search anything..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/settings" element={<SettingsView />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}

function Overview() {
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm mt-1">Here's what's happening with your projects today.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', trend: 'up', icon: CreditCard },
          { title: 'Active Users', value: '2,350', change: '+15.2%', trend: 'up', icon: Users },
          { title: 'New Signups', value: '1,203', change: '-4.1%', trend: 'down', icon: Activity },
          { title: 'Conversion Rate', value: '3.24%', change: '+1.2%', trend: 'up', icon: TrendingUp },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={\`flex items-center gap-1 text-sm font-medium \${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}\`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Analytics() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Analytics</h1>
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6">User Growth</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
              <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="users" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function Customers() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Customers</h1>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Spent</th>
              </tr>
            </thead>
            <tbody>
              {customerData.map((c) => (
                <tr key={c.id} className="border-b border-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{c.name}</td>
                  <td className="px-6 py-4">{c.status}</td>
                  <td className="px-6 py-4 text-gray-900">{c.spent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <p className="text-gray-500">Settings page content goes here.</p>
      </div>
    </div>
  );
}
`;

// 3. MOBILE APP TEMPLATE
const mobileApp = `import React, { useState } from 'react';
import { Home, Search, Compass, MessageCircle, User, Bell, Heart, Share2, MoreHorizontal, Plus, X } from 'lucide-react';

const initialPosts = [
  { id: 1, user: 'Sarah Jenkins', avatar: 'https://i.pravatar.cc/150?img=47', image: 'https://images.unsplash.com/photo-1516483638261-f40af5aa339b?auto=format&fit=crop&q=80&w=600', likes: 1240, liked: false, caption: 'Exploring the hidden gems of Kyoto 🌸✨ #travel #japan' },
  { id: 2, user: 'David Chen', avatar: 'https://i.pravatar.cc/150?img=12', image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=600', likes: 842, liked: true, caption: 'Morning coffee aesthetics ☕️' },
];

export default function MobileApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [posts, setPosts] = useState(initialPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleLike = (id) => {
    setPosts(posts.map(p => {
      if(p.id === id) {
        return { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 };
      }
      return p;
    }));
  };

  const renderContent = () => {
    if (activeTab === 'home') {
      return (
        <>
          {/* Stories */}
          <div className="flex gap-4 px-4 py-4 overflow-x-auto hide-scrollbar bg-white border-b border-gray-100">
            <div className="flex flex-col items-center gap-1 min-w-[72px] cursor-pointer">
              <div className="w-16 h-16 rounded-full p-[2px] bg-gray-200 relative">
                <img src="https://i.pravatar.cc/150?img=33" className="w-full h-full rounded-full border-2 border-white object-cover" alt="Me" />
                <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center border-2 border-white text-xs font-bold">+</div>
              </div>
              <span className="text-[10px] font-medium text-gray-500 truncate w-full text-center">Your Story</span>
            </div>
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="flex flex-col items-center gap-1 min-w-[72px] cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-red-500 to-fuchsia-600">
                  <img src={\`https://i.pravatar.cc/150?img=\${i+20}\`} className="w-full h-full rounded-full border-2 border-white object-cover" alt="Story" />
                </div>
                <span className="text-[10px] font-medium text-gray-800 truncate w-full text-center">User {i}</span>
              </div>
            ))}
          </div>

          {/* Feed */}
          <div className="space-y-2 bg-gray-50">
            {posts.map(post => (
              <article key={post.id} className="bg-white pb-4 animate-fade-in">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3 cursor-pointer">
                    <img src={post.avatar} className="w-9 h-9 rounded-full object-cover border border-gray-100" alt={post.user} />
                    <span className="font-semibold text-sm hover:underline">{post.user}</span>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded-full"><MoreHorizontal className="w-5 h-5 text-gray-500" /></button>
                </div>
                
                <div 
                  className="aspect-[4/5] bg-gray-100 relative cursor-pointer group"
                  onDoubleClick={() => { if(!post.liked) toggleLike(post.id); }}
                >
                  <img src={post.image} className="w-full h-full object-cover" alt="Post content" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-active:opacity-100 transition-opacity duration-300">
                    <Heart className="w-24 h-24 text-white fill-white drop-shadow-2xl animate-pulse-fast" />
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <button onClick={() => toggleLike(post.id)} className="transition-transform active:scale-75">
                        <Heart className={\`w-7 h-7 \${post.liked ? 'fill-red-500 text-red-500' : 'text-gray-800 hover:text-gray-500'}\`} />
                      </button>
                      <button className="hover:opacity-70"><MessageCircle className="w-7 h-7 text-gray-800" /></button>
                      <button className="hover:opacity-70"><Share2 className="w-6 h-6 text-gray-800" /></button>
                    </div>
                  </div>
                  <p className="font-bold text-sm mb-1">{post.likes.toLocaleString()} likes</p>
                  <p className="text-sm"><span className="font-semibold mr-2 cursor-pointer hover:underline">{post.user}</span>{post.caption}</p>
                  <p className="text-gray-400 text-xs mt-2 uppercase">2 HOURS AGO</p>
                </div>
              </article>
            ))}
          </div>
        </>
      );
    }
    
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 animate-fade-in p-8 text-center">
        <Compass className="w-16 h-16 mb-4 opacity-20" />
        <h2 className="text-xl font-bold text-gray-800 mb-2 capitalize">{activeTab} Page</h2>
        <p className="text-sm">This is a mock screen for the {activeTab} section. In a real app, this would route to a different component.</p>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-sans select-none">
      {/* Phone Frame Simulator */}
      <div className="w-full max-w-[400px] h-[800px] bg-white rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col border-[8px] border-gray-900">
        
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 h-7 bg-gray-900 rounded-b-3xl mx-auto w-40 z-50"></div>

        {/* New Post Modal */}
        {isModalOpen && (
          <div className="absolute inset-0 z-50 bg-white animate-slide-up flex flex-col">
            <div className="flex items-center justify-between p-4 pt-12 border-b border-gray-100">
              <button onClick={() => setIsModalOpen(false)}><X className="w-6 h-6" /></button>
              <h2 className="font-bold text-lg">New Post</h2>
              <button className="text-blue-500 font-semibold" onClick={() => setIsModalOpen(false)}>Share</button>
            </div>
            <div className="p-4 flex gap-4">
              <img src="https://i.pravatar.cc/150?img=33" className="w-10 h-10 rounded-full" alt="Me" />
              <textarea placeholder="Write a caption..." className="w-full resize-none outline-none mt-2" rows="4"></textarea>
            </div>
            <div className="px-4 py-8 mt-auto border-t border-gray-100 flex justify-center bg-gray-50">
               <div className="w-full aspect-square border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-100">
                 <Plus className="w-10 h-10 mb-2" />
                 <span>Upload Photo</span>
               </div>
            </div>
          </div>
        )}

        {/* App Header */}
        <header className="px-6 pt-12 pb-3 flex items-center justify-between bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100">
          <h1 className="text-2xl font-extrabold tracking-tight cursor-pointer" onClick={() => setActiveTab('home')}>VibeCheck</h1>
          <div className="flex gap-5">
            <button className="relative hover:scale-110 transition-transform">
              <Bell className="w-6 h-6 text-gray-800" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="hover:scale-110 transition-transform"><MessageCircle className="w-6 h-6 text-gray-800" /></button>
          </div>
        </header>

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto bg-white pb-20 relative">
          {renderContent()}
        </main>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-md border-t border-gray-200 px-6 py-3 pb-8 flex justify-between items-center z-40">
          <button onClick={() => setActiveTab('home')} className={\`\${activeTab === 'home' ? 'text-black' : 'text-gray-400'} hover:scale-110 transition-all\`}><Home className="w-6 h-6" fill={activeTab === 'home' ? 'currentColor' : 'none'} /></button>
          <button onClick={() => setActiveTab('search')} className={\`\${activeTab === 'search' ? 'text-black' : 'text-gray-400'} hover:scale-110 transition-all\`}><Search className="w-6 h-6" strokeWidth={activeTab === 'search' ? 3 : 2} /></button>
          
          <div 
            onClick={() => setIsModalOpen(true)}
            className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center -mt-8 shadow-lg shadow-purple-500/30 cursor-pointer hover:scale-110 active:scale-95 transition-all"
          >
            <Plus className="w-6 h-6 font-bold" />
          </div>
          
          <button onClick={() => setActiveTab('explore')} className={\`\${activeTab === 'explore' ? 'text-black' : 'text-gray-400'} hover:scale-110 transition-all\`}><Compass className="w-6 h-6" fill={activeTab === 'explore' ? 'currentColor' : 'none'} /></button>
          <button onClick={() => setActiveTab('profile')} className={\`\${activeTab === 'profile' ? 'text-black' : 'text-gray-400'} hover:scale-110 transition-all\`}><User className="w-6 h-6" fill={activeTab === 'profile' ? 'currentColor' : 'none'} /></button>
        </nav>
        
        {/* Home Indicator (iOS Bar) */}
        <div className="absolute bottom-2 inset-x-0 w-32 h-1 bg-gray-900 rounded-full mx-auto z-50"></div>
      </div>
    </div>
  );
}`;

// 4. DESKTOP TOOL TEMPLATE
const desktopApp = `import React, { useState } from 'react';
import { Folder, FolderOpen, File, ChevronRight, ChevronDown, Terminal, Search, Settings, Cloud, Database, Play, CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';

const mockFiles = {
  'init_schema.sql': {
    lang: 'SQL',
    code: \`CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX idx_users_email ON users(email);\`
  },
  'connection.js': {
    lang: 'JavaScript',
    code: \`const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD,
  database: 'myapp_db',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};\`,
  }
};

export default function DesktopTool() {
  const [activeTab, setActiveTab] = useState('init_schema.sql');
  const [openFiles, setOpenFiles] = useState(['init_schema.sql', 'connection.js']);
  const [foldersOpen, setFoldersOpen] = useState({ src: true, migrations: true });
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([
    { type: 'success', text: 'Connected to localhost:5432 (PostgreSQL 14.2)' }
  ]);
  const [bottomPaneTab, setBottomPaneTab] = useState('output');

  const toggleFolder = (folder) => setFoldersOpen(p => ({ ...p, [folder]: !p[folder] }));
  
  const openFile = (filename) => {
    if(!openFiles.includes(filename)) setOpenFiles([...openFiles, filename]);
    setActiveTab(filename);
  };

  const closeFile = (e, filename) => {
    e.stopPropagation();
    const newFiles = openFiles.filter(f => f !== filename);
    setOpenFiles(newFiles);
    if(activeTab === filename) setActiveTab(newFiles[newFiles.length - 1] || null);
  };

  const runQuery = () => {
    if(isRunning) return;
    setIsRunning(true);
    setBottomPaneTab('output');
    setLogs(p => [...p, { type: 'info', text: \`Executing \${activeTab}...\` }]);
    
    setTimeout(() => {
      setIsRunning(false);
      setLogs(p => [...p, { type: 'success', text: \`Execution completed successfully (42ms)\` }]);
      if(activeTab.endsWith('.sql')) {
        setLogs(p => [...p, { type: 'warning', text: 'Warning: No role specified for schema creation.' }]);
      }
    }, 1500);
  };

  return (
    <div className="h-screen bg-[#1e1e1e] text-[#cccccc] font-sans flex flex-col overflow-hidden select-none">
      {/* Titlebar */}
      <div className="h-9 bg-[#323233] flex items-center justify-between px-4 border-b border-[#111111] shadow-sm">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff4033] cursor-pointer"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffaa00] cursor-pointer"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#1fa133] cursor-pointer"></div>
        </div>
        <div className="text-xs font-medium opacity-70 flex items-center gap-2 tracking-wide">
          <Database className="w-3 h-3" /> DataGrip Studio Pro <span className="opacity-50">- {activeTab || 'Welcome'}</span>
        </div>
        <div className="w-12"></div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Activity Bar */}
        <div className="w-12 bg-[#333333] flex flex-col items-center py-4 gap-6 border-r border-[#252526] z-10 shadow-xl">
          <div className="p-2 bg-[#1e1e1e] rounded-lg text-blue-400 cursor-pointer border-l-2 border-blue-400"><Folder className="w-5 h-5" /></div>
          <div className="p-2 opacity-40 hover:opacity-100 cursor-pointer transition-opacity"><Search className="w-5 h-5" /></div>
          <div className="p-2 opacity-40 hover:opacity-100 cursor-pointer transition-opacity"><Database className="w-5 h-5" /></div>
          <div className="p-2 opacity-40 hover:opacity-100 cursor-pointer transition-opacity"><Cloud className="w-5 h-5" /></div>
          <div className="mt-auto p-2 opacity-40 hover:opacity-100 cursor-pointer transition-opacity"><Settings className="w-5 h-5" /></div>
        </div>

        {/* Sidebar */}
        <div className="w-64 bg-[#252526] border-r border-[#1e1e1e] flex flex-col shadow-lg z-0">
          <div className="h-9 px-4 flex items-center text-xs font-bold tracking-wider text-gray-400 uppercase">Explorer</div>
          <div className="flex-1 overflow-y-auto py-2 text-sm">
            {/* src Folder */}
            <div className="flex items-center gap-1.5 px-2 py-1 hover:bg-[#2a2d2e] cursor-pointer" onClick={() => toggleFolder('src')}>
              {foldersOpen.src ? <ChevronDown className="w-4 h-4 opacity-70" /> : <ChevronRight className="w-4 h-4 opacity-70" />}
              {foldersOpen.src ? <FolderOpen className="w-4 h-4 text-yellow-500" /> : <Folder className="w-4 h-4 text-yellow-500" />}
              <span>src</span>
            </div>
            {foldersOpen.src && (
              <div 
                className={\`flex items-center gap-1.5 px-2 py-1 ml-6 cursor-pointer \${activeTab === 'connection.js' ? 'bg-[#37373d] text-white' : 'hover:bg-[#2a2d2e]'}\`}
                onClick={() => openFile('connection.js')}
              >
                <File className="w-4 h-4 text-blue-400" /> <span>connection.js</span>
              </div>
            )}

            {/* migrations Folder */}
            <div className="flex items-center gap-1.5 px-2 py-1 hover:bg-[#2a2d2e] cursor-pointer mt-1" onClick={() => toggleFolder('migrations')}>
              {foldersOpen.migrations ? <ChevronDown className="w-4 h-4 opacity-70" /> : <ChevronRight className="w-4 h-4 opacity-70" />}
              {foldersOpen.migrations ? <FolderOpen className="w-4 h-4 text-emerald-500" /> : <Folder className="w-4 h-4 text-emerald-500" />}
              <span>migrations</span>
            </div>
            {foldersOpen.migrations && (
              <>
                <div 
                  className={\`flex items-center gap-1.5 px-2 py-1 ml-6 cursor-pointer \${activeTab === 'init_schema.sql' ? 'bg-[#37373d] text-white' : 'hover:bg-[#2a2d2e]'}\`}
                  onClick={() => openFile('init_schema.sql')}
                >
                  <Database className="w-4 h-4 text-emerald-400" /> <span>init_schema.sql</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e]">
          {/* Editor Tabs */}
          <div className="flex bg-[#2d2d2d] overflow-x-auto hide-scrollbar border-b border-[#1e1e1e]">
            {openFiles.length === 0 && <div className="p-2 text-sm opacity-50 italic">No files open</div>}
            {openFiles.map(file => (
              <div 
                key={file}
                onClick={() => setActiveTab(file)}
                className={\`group flex items-center gap-2 px-4 py-2 border-r border-[#1e1e1e] cursor-pointer text-sm \${activeTab === file ? 'bg-[#1e1e1e] text-white border-t-2 border-t-blue-500' : 'bg-[#2d2d2d] opacity-60 hover:bg-[#252526] hover:opacity-100 border-t-2 border-t-transparent'}\`}
              >
                {file.endsWith('.sql') ? <Database className="w-4 h-4 text-emerald-400" /> : <File className="w-4 h-4 text-blue-400" />}
                {file}
                <button onClick={(e) => closeFile(e, file)} className="opacity-0 group-hover:opacity-100 hover:bg-[#444] rounded p-0.5 ml-1"><X className="w-3 h-3" /></button>
              </div>
            ))}
          </div>

          {activeTab ? (
            <>
              {/* Breadcrumbs & Toolbar */}
              <div className="px-4 py-2 flex items-center justify-between border-b border-[#2d2d2d] bg-[#1e1e1e] shadow-sm z-10">
                <div className="text-xs opacity-60 flex items-center gap-1">
                  project <ChevronRight className="w-3 h-3" /> {activeTab.endsWith('.sql') ? 'migrations' : 'src'} <ChevronRight className="w-3 h-3" /> {activeTab}
                </div>
                <div className="flex gap-2 animate-fade-in">
                  <button 
                    onClick={runQuery}
                    disabled={isRunning}
                    className="flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold rounded transition-colors shadow-lg shadow-emerald-900/20"
                  >
                    {isRunning ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                    {activeTab.endsWith('.sql') ? 'Run Query' : 'Execute Script'}
                  </button>
                </div>
              </div>

              {/* Code Editor Mock */}
              <div className="flex-1 p-4 font-mono text-sm leading-relaxed overflow-y-auto bg-[#1e1e1e]">
                <div className="flex animate-fade-in">
                  <div className="w-8 text-right pr-4 opacity-30 select-none flex flex-col">
                    {mockFiles[activeTab].code.split('\\n').map((_, i) => <span key={i}>{i+1}</span>)}
                  </div>
                  <div className="flex-1 whitespace-pre">
                    {activeTab.endsWith('.sql') ? (
                      <>
                        <span className="text-[#569cd6]">CREATE TABLE</span> <span className="text-[#dcdcaa]">users</span> (<br/>
                        &nbsp;&nbsp;id <span className="text-[#569cd6]">UUID PRIMARY KEY DEFAULT</span> <span className="text-[#4ec9b0]">uuid_generate_v4()</span>,<br/>
                        &nbsp;&nbsp;email <span className="text-[#569cd6]">VARCHAR</span>(255) <span className="text-[#569cd6]">UNIQUE NOT NULL</span>,<br/>
                        &nbsp;&nbsp;password_hash <span className="text-[#569cd6]">VARCHAR</span>(255) <span className="text-[#569cd6]">NOT NULL</span>,<br/>
                        &nbsp;&nbsp;created_at <span className="text-[#569cd6]">TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP</span><br/>
                        );<br/>
                        <br/>
                        <span className="text-[#6A9955]">-- Create index on email for faster lookups</span><br/>
                        <span className="text-[#569cd6]">CREATE INDEX</span> idx_users_email <span className="text-[#569cd6]">ON</span> users(email);
                      </>
                    ) : (
                      <>
                        <span className="text-[#569cd6]">const</span> {'{'} Pool {'}'} = <span className="text-[#4ec9b0]">require</span>(<span className="text-[#ce9178]">'pg'</span>);<br/><br/>
                        <span className="text-[#569cd6]">const</span> pool = <span className="text-[#569cd6]">new</span> <span className="text-[#4ec9b0]">Pool</span>({'{'}<br/>
                        &nbsp;&nbsp;host: <span className="text-[#4fc1ff]">process</span>.env.DB_HOST || <span className="text-[#ce9178]">'localhost'</span>,<br/>
                        &nbsp;&nbsp;user: <span className="text-[#4fc1ff]">process</span>.env.DB_USER || <span className="text-[#ce9178]">'admin'</span>,<br/>
                        &nbsp;&nbsp;password: <span className="text-[#4fc1ff]">process</span>.env.DB_PASSWORD,<br/>
                        &nbsp;&nbsp;database: <span className="text-[#ce9178]">'myapp_db'</span>,<br/>
                        &nbsp;&nbsp;port: <span className="text-[#b5cea8]">5432</span>,<br/>
                        {'}'});<br/><br/>
                        <span className="text-[#4fc1ff]">module</span>.exports = {'{'}<br/>
                        &nbsp;&nbsp;<span className="text-[#dcdcaa]">query</span>: (text, params) <span className="text-[#569cd6]">=&gt;</span> pool.<span className="text-[#dcdcaa]">query</span>(text, params),<br/>
                        {'}'};
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center opacity-30 select-none">
              <Database className="w-24 h-24 mb-4" />
              <h2 className="text-xl">DataGrip Studio Pro</h2>
              <p>Select a file from the explorer to begin.</p>
            </div>
          )}

          {/* Bottom Panel (Terminal/Output) */}
          <div className="h-48 border-t border-[#2d2d2d] flex flex-col bg-[#1e1e1e]">
            <div className="flex border-b border-[#2d2d2d] px-2 bg-[#252526]">
              <div 
                onClick={() => setBottomPaneTab('output')}
                className={\`px-4 py-2 text-xs uppercase tracking-wider cursor-pointer \${bottomPaneTab === 'output' ? 'border-b border-blue-500 text-white' : 'opacity-50 hover:opacity-100'}\`}
              >
                Output
              </div>
              <div 
                onClick={() => setBottomPaneTab('terminal')}
                className={\`px-4 py-2 text-xs uppercase tracking-wider cursor-pointer \${bottomPaneTab === 'terminal' ? 'border-b border-blue-500 text-white' : 'opacity-50 hover:opacity-100'}\`}
              >
                Terminal
              </div>
            </div>
            
            <div className="flex-1 p-3 font-mono text-xs overflow-y-auto space-y-2">
              {bottomPaneTab === 'output' ? (
                logs.map((log, i) => (
                  <div key={i} className={\`flex gap-2 animate-slide-up \${log.type === 'success' ? 'text-emerald-400' : log.type === 'warning' ? 'text-yellow-400' : log.type === 'error' ? 'text-rose-400' : 'text-gray-400'}\`}>
                    {log.type === 'success' && <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
                    {log.type === 'warning' && <AlertCircle className="w-4 h-4 flex-shrink-0" />}
                    {log.type === 'info' && <Terminal className="w-4 h-4 flex-shrink-0" />}
                    <span>[{new Date().toLocaleTimeString()}] {log.text}</span>
                  </div>
                ))
              ) : (
                <div className="text-gray-400">
                  <span className="text-emerald-400">user@dev-machine</span>:<span className="text-blue-400">~/projects/myapp</span>$ <span className="animate-pulse">_</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="h-6 bg-[#007acc] text-white text-[11px] flex items-center justify-between px-3 font-mono">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 cursor-pointer hover:bg-white/20 px-1 rounded transition-colors"><Cloud className="w-3 h-3" /> main*</span>
          <span className="flex items-center gap-1 cursor-pointer hover:bg-white/20 px-1 rounded transition-colors"><CheckCircle2 className="w-3 h-3" /> 0 ⚠ 1</span>
        </div>
        <div className="flex items-center gap-4">
          {activeTab && <span>Ln 1, Col 1</span>}
          <span>UTF-8</span>
          {activeTab && <span>{mockFiles[activeTab]?.lang}</span>}
        </div>
      </div>
    </div>
  );
}`;

// 5. AI CHATBOT TEMPLATE
const chatbotApp = `import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, Command, Paperclip, ChevronDown, Plus, Trash2, Settings } from 'lucide-react';

const getBotResponse = (input) => {
  const text = input.toLowerCase();
  if(text.includes('code') || text.includes('script') || text.includes('function')) {
    return "Here is a React snippet to help you get started:\\n\\n\`\`\`jsx\\nfunction Example() {\\n  return <div>Hello AI</div>;\\n}\\n\`\`\`\\n\\nLet me know if you need modifications!";
  }
  if(text.includes('hello') || text.includes('hi')) {
    return "Hello there! I'm Nexus AI. How can I assist you with your project today?";
  }
  if(text.includes('database') || text.includes('sql')) {
    return "I recommend using PostgreSQL for relational data or Supabase if you want a complete Backend-as-a-Service. Do you need schema design help?";
  }
  return "That's an interesting point. As an AI, I'm analyzing your request. Could you provide a bit more context so I can give you the best technical solution?";
};

export default function ChatbotApp() {
  const [messages, setMessages] = useState([{ id: 1, role: 'ai', text: 'Hello! I am Nexus AI. I can write code, design architectures, or brainstorm ideas. What are we building today?' }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(scrollToBottom, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = { id: Date.now(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    
    const aiResponseText = getBotResponse(input);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(m => [...m, { id: Date.now()+1, role: 'ai', text: aiResponseText }]);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5s - 2.5s
  };

  const clearChat = () => setMessages([{ id: 1, role: 'ai', text: 'Chat cleared. Let\\'s start over!' }]);

  const formatText = (text) => {
    // Simple mock markdown formatting for code blocks
    if(text.includes('\`\`\`')) {
      const parts = text.split('\`\`\`');
      return (
        <div className="space-y-2">
          <p>{parts[0]}</p>
          <div className="bg-[#1e1e1e] text-emerald-400 p-3 rounded-lg font-mono text-xs overflow-x-auto shadow-inner">
            <pre>{parts[1].replace(/^jsx\\n/, '')}</pre>
          </div>
          <p>{parts[2]}</p>
        </div>
      );
    }
    return <p>{text}</p>;
  };

  return (
    <div className="flex h-screen bg-white text-gray-800 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="p-4 flex items-center gap-3 font-semibold text-lg cursor-pointer hover:bg-gray-100 rounded-lg mx-2 mt-2 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          Nexus AI
          <ChevronDown className="w-4 h-4 ml-auto text-gray-400" />
        </div>
        
        <div className="px-3 mt-4">
          <button onClick={clearChat} className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium bg-white border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 rounded-lg transition-all shadow-sm">
            <Plus className="w-4 h-4" /> New Chat
          </button>
        </div>

        <div className="px-4 mt-6 flex-1 overflow-y-auto">
          <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Recent Chats</p>
          <div className="space-y-1">
            {['React Component Refactor', 'Database Schema Design', 'Write a Python Script', 'Authentication flow bug'].map((chat, i) => (
              <div key={i} className={\`px-3 py-2 text-sm rounded-lg cursor-pointer truncate transition-colors \${i === 0 ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-200'}\`}>
                {chat}
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between px-3 py-2 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <img src="https://i.pravatar.cc/150?img=11" className="w-8 h-8 rounded-full" alt="User" />
              <div className="text-sm font-medium">Alex Doe</div>
            </div>
            <Settings className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative bg-white">
        {/* Header (Mobile) */}
        <div className="md:hidden border-b border-gray-200 p-4 flex justify-between items-center font-semibold bg-white/80 backdrop-blur sticky top-0 z-10">
          <div className="flex items-center"><Sparkles className="w-5 h-5 mr-2 text-indigo-600" /> Nexus AI</div>
          <button onClick={clearChat}><Trash2 className="w-5 h-5 text-gray-500" /></button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-3xl mx-auto space-y-8 pb-32">
            {messages.map((msg) => (
              <div key={msg.id} className={\`flex gap-4 animate-fade-in \${msg.role === 'user' ? 'flex-row-reverse' : ''}\`}>
                <div className={\`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm \${msg.role === 'ai' ? 'bg-gradient-to-tr from-indigo-600 to-purple-600' : 'bg-gray-100 border border-gray-200'}\`}>
                  {msg.role === 'ai' ? <Sparkles className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-gray-600" />}
                </div>
                <div className={\`flex flex-col \${msg.role === 'user' ? 'items-end' : 'items-start'}\`}>
                  <span className="text-xs font-medium text-gray-400 mb-1 px-1">{msg.role === 'ai' ? 'Nexus AI' : 'You'}</span>
                  <div className={\`px-5 py-3.5 rounded-2xl max-w-xl text-[15px] leading-relaxed shadow-sm border \${
                    msg.role === 'user' 
                      ? 'bg-[#0f0f0f] text-white rounded-tr-none border-[#0f0f0f]' 
                      : 'bg-white text-gray-800 rounded-tl-none border-gray-200'
                  }\`}>
                    {formatText(msg.text)}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-4 animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs font-medium text-gray-400 mb-1 px-1">Nexus AI</span>
                  <div className="px-5 py-4 rounded-2xl rounded-tl-none bg-white border border-gray-200 flex items-center gap-1.5 shadow-sm">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={endOfMessagesRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-white via-white to-transparent pt-10 pb-6 px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSend} className="relative flex items-end gap-2 bg-white border border-gray-300 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] p-2 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all">
              <button type="button" className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <textarea 
                rows="1"
                placeholder="Ask Nexus AI to build something..." 
                className="w-full bg-transparent border-none focus:outline-none py-3 text-[15px] resize-none max-h-32 placeholder-gray-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(e); } }}
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isTyping}
                className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
            <div className="text-center mt-3 text-xs text-gray-400 flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3" /> AI generated content may be inaccurate. Check output before use.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`;

const filesMap = {
  'ecommerce.json': ecommerceApp,
  'dashboard.json': dashboardApp,
  'mobileapp.json': mobileApp,
  'desktoptool.json': desktopApp,
  'aichatbot.json': chatbotApp
};

for (const [filename, reactCode] of Object.entries(filesMap)) {
  const vfs = {
    "package.json": packageJson,
    "vite.config.js": viteConfig,
    "postcss.config.js": postcssConfig,
    "tailwind.config.js": tailwindConfig,
    "index.html": indexHtml,
    "src/index.css": indexCss,
    "src/main.jsx": mainJsx,
    "src/App.jsx": reactCode
  };

  fs.writeFileSync(path.join(templatesDir, filename), JSON.stringify(vfs, null, 2));
  console.log('Generated ' + filename);
}

console.log('All interactive templates generated successfully!');
