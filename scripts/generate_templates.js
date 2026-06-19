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
    extend: {},
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
  <body class="bg-gray-50 text-gray-900 antialiased">
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
}`;

const mainJsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`;

// 1. E-COMMERCE TEMPLATE
const ecommerceApp = `import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, Star, ChevronRight, Heart, ShoppingBag } from 'lucide-react';

const products = [
  { id: 1, name: 'Premium Wireless Headphones', price: '$299', rating: 4.8, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800', category: 'Audio' },
  { id: 2, name: 'Minimalist Smart Watch', price: '$199', rating: 4.6, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800', category: 'Wearables' },
  { id: 3, name: 'Professional DSLR Camera', price: '$899', rating: 4.9, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800', category: 'Photography' },
  { id: 4, name: 'Ergonomic Workspace Chair', price: '$349', rating: 4.7, image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800', category: 'Furniture' },
];

export default function EcommerceApp() {
  const [cartCount, setCartCount] = useState(2);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">LUXE</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#" className="text-black">New Arrivals</a>
          <a href="#" className="hover:text-black transition-colors">Categories</a>
          <a href="#" className="hover:text-black transition-colors">Collections</a>
          <a href="#" className="hover:text-black transition-colors">About</a>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-gray-600 hover:text-black transition-colors"><Search className="w-5 h-5" /></button>
          <button className="text-gray-600 hover:text-black transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </button>
          <button className="md:hidden text-gray-600"><Menu className="w-5 h-5" /></button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32 overflow-hidden bg-black text-white">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000" alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-4 block">Spring Collection 2026</span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Elevate Your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Everyday Style.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl">
            Discover our curated selection of premium electronics and lifestyle accessories designed for the modern aesthetic.
          </p>
          <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-transform hover:scale-105 active:scale-95 flex items-center gap-2">
            Shop the Collection <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Trending Now</h2>
            <p className="text-gray-500">Our most popular premium picks.</p>
          </div>
          <button className="text-sm font-semibold hover:underline hidden md:block">View All</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-red-500">
                  <Heart className="w-4 h-4" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button 
                    onClick={() => setCartCount(c => c + 1)}
                    className="w-full bg-black/80 backdrop-blur-md text-white py-3 rounded-xl font-medium hover:bg-black"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-black line-clamp-1">{product.name}</h3>
                  <span className="text-sm text-gray-500">{product.category}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{product.price}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {product.rating}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}`;

// 2. DASHBOARD TEMPLATE
const dashboardApp = `import React from 'react';
import { LayoutDashboard, Users, CreditCard, Activity, Bell, Search, Settings, MoreVertical, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 4000 }, { name: 'Feb', value: 3000 }, { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 }, { name: 'May', value: 6000 }, { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 7000 },
];

const transactions = [
  { id: 1, name: 'Stripe Payment', date: 'Today, 10:23 AM', amount: '+$4,230.00', status: 'Completed', type: 'in' },
  { id: 2, name: 'AWS Services', date: 'Yesterday, 08:45 AM', amount: '-$1,240.50', status: 'Pending', type: 'out' },
  { id: 3, name: 'GitHub Enterprise', date: 'Oct 12, 14:30 PM', amount: '-$840.00', status: 'Completed', type: 'out' },
  { id: 4, name: 'Client Retainer', date: 'Oct 10, 09:15 AM', amount: '+$8,500.00', status: 'Completed', type: 'in' },
];

export default function DashboardApp() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex font-sans selection:bg-indigo-500/30">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 hidden lg:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg shadow-indigo-500/20" />
          <span className="text-xl font-bold tracking-wide">NEXUS</span>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-white/10 text-white rounded-xl font-medium transition-all">
            <LayoutDashboard className="w-5 h-5 text-indigo-400" /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all">
            <Activity className="w-5 h-5" /> Analytics
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all">
            <Users className="w-5 h-5" /> Customers
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all">
            <CreditCard className="w-5 h-5" /> Billing
          </a>
        </nav>

        <div className="p-4 border-t border-white/10">
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all">
            <Settings className="w-5 h-5" /> Settings
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-white/10 glass-dark px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#0A0A0A]"></span>
            </button>
            <div className="flex items-center gap-3 cursor-pointer pl-6 border-l border-white/10">
              <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-9 h-9 rounded-full border border-white/20" />
              <div className="hidden md:block">
                <p className="text-sm font-semibold">Alex Doe</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-2xl font-bold">Overview</h1>
                <p className="text-gray-400 text-sm mt-1">Here's what's happening with your projects today.</p>
              </div>
              <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                Download Report
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Total Revenue', value: '$128,430', trend: '+14.5%', up: true, color: 'text-emerald-400' },
                { label: 'Active Users', value: '45.2K', trend: '+8.2%', up: true, color: 'text-emerald-400' },
                { label: 'Churn Rate', value: '1.2%', trend: '-0.4%', up: false, color: 'text-rose-400' }
              ].map((stat, i) => (
                <div key={i} className="glass-dark p-6 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-indigo-500/20 transition-all"></div>
                  <h3 className="text-gray-400 text-sm font-medium mb-2">{stat.label}</h3>
                  <div className="flex items-end gap-4">
                    <span className="text-4xl font-bold tracking-tight">{stat.value}</span>
                    <span className={\`flex items-center text-sm font-medium \${stat.color} mb-1\`}>
                      {stat.up ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                      {stat.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Chart */}
              <div className="lg:col-span-2 glass-dark p-6 rounded-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-lg">Revenue Overview</h3>
                  <select className="bg-transparent border border-white/10 text-sm text-gray-300 rounded-lg px-3 py-1 outline-none">
                    <option>Last 7 months</option>
                    <option>This Year</option>
                  </select>
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                      <XAxis dataKey="name" stroke="#ffffff50" axisLine={false} tickLine={false} tick={{fontSize: 12}} dy={10} />
                      <YAxis stroke="#ffffff50" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                      <Tooltip contentStyle={{backgroundColor: '#171717', borderColor: '#ffffff20', borderRadius: '8px'}} itemStyle={{color: '#fff'}} />
                      <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="glass-dark p-6 rounded-2xl flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-lg">Recent Transfers</h3>
                  <button className="text-gray-400 hover:text-white"><MoreVertical className="w-5 h-5" /></button>
                </div>
                <div className="flex-1 space-y-6">
                  {transactions.map(t => (
                    <div key={t.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={\`w-10 h-10 rounded-full flex items-center justify-center \${t.type === 'in' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}\`}>
                          {t.type === 'in' ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{t.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{t.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={\`font-semibold text-sm \${t.type === 'in' ? 'text-emerald-400' : 'text-white'}\`}>{t.amount}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{t.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2.5 rounded-xl border border-white/10 text-sm font-medium text-gray-300 hover:bg-white/5 transition-colors">
                  View All Activity
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}`;

// 3. MOBILE APP TEMPLATE
const mobileApp = `import React, { useState } from 'react';
import { Home, Search, Compass, MessageCircle, User, Bell, Heart, Share2, MoreHorizontal } from 'lucide-react';

const posts = [
  { id: 1, user: 'Sarah Jenkins', avatar: 'https://i.pravatar.cc/150?img=47', image: 'https://images.unsplash.com/photo-1516483638261-f40af5aa339b?auto=format&fit=crop&q=80&w=600', likes: '1.2k', caption: 'Exploring the hidden gems of Kyoto 🌸✨ #travel #japan' },
  { id: 2, user: 'David Chen', avatar: 'https://i.pravatar.cc/150?img=12', image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=600', likes: '842', caption: 'Morning coffee aesthetics ☕️' },
];

export default function MobileApp() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Phone Frame Simulator */}
      <div className="w-full max-w-[400px] h-[800px] bg-white rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col border-[8px] border-gray-900">
        
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-2xl mx-auto w-40 z-50"></div>

        {/* App Header */}
        <header className="px-6 pt-12 pb-4 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100">
          <h1 className="text-2xl font-extrabold tracking-tight">VibeCheck</h1>
          <div className="flex gap-4">
            <button className="relative"><Bell className="w-6 h-6 text-gray-800" /><span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span></button>
            <button><MessageCircle className="w-6 h-6 text-gray-800" /></button>
          </div>
        </header>

        {/* Scrollable Feed */}
        <main className="flex-1 overflow-y-auto bg-gray-50 pb-20">
          {/* Stories */}
          <div className="flex gap-4 px-4 py-4 overflow-x-auto hide-scrollbar bg-white mb-2">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="flex flex-col items-center gap-1 min-w-[72px]">
                <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 to-fuchsia-600">
                  <img src={\`https://i.pravatar.cc/150?img=\${i+20}\`} className="w-full h-full rounded-full border-2 border-white object-cover" alt="Story" />
                </div>
                <span className="text-[10px] font-medium text-gray-600 truncate w-full text-center">User {i}</span>
              </div>
            ))}
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {posts.map(post => (
              <article key={post.id} className="bg-white pb-4">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <img src={post.avatar} className="w-9 h-9 rounded-full object-cover" alt={post.user} />
                    <span className="font-semibold text-sm">{post.user}</span>
                  </div>
                  <MoreHorizontal className="w-5 h-5 text-gray-500" />
                </div>
                
                <div className="aspect-[4/5] bg-gray-200">
                  <img src={post.image} className="w-full h-full object-cover" alt="Post content" />
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <Heart className="w-7 h-7 text-gray-800 hover:text-red-500 transition-colors cursor-pointer" />
                      <MessageCircle className="w-7 h-7 text-gray-800 cursor-pointer" />
                      <Share2 className="w-6 h-6 text-gray-800 cursor-pointer" />
                    </div>
                  </div>
                  <p className="font-bold text-sm mb-1">{post.likes} likes</p>
                  <p className="text-sm"><span className="font-semibold mr-2">{post.user}</span>{post.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 inset-x-0 bg-white border-t border-gray-100 px-6 py-4 pb-8 flex justify-between items-center">
          <button onClick={() => setActiveTab('home')} className={\`\${activeTab === 'home' ? 'text-black' : 'text-gray-400'} transition-colors\`}><Home className="w-6 h-6" fill={activeTab === 'home' ? 'currentColor' : 'none'} /></button>
          <button onClick={() => setActiveTab('search')} className={\`\${activeTab === 'search' ? 'text-black' : 'text-gray-400'} transition-colors\`}><Search className="w-6 h-6" /></button>
          <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center -mt-8 shadow-lg shadow-black/20 cursor-pointer hover:scale-105 transition-transform">
            <span className="text-2xl font-light leading-none">+</span>
          </div>
          <button onClick={() => setActiveTab('explore')} className={\`\${activeTab === 'explore' ? 'text-black' : 'text-gray-400'} transition-colors\`}><Compass className="w-6 h-6" /></button>
          <button onClick={() => setActiveTab('profile')} className={\`\${activeTab === 'profile' ? 'text-black' : 'text-gray-400'} transition-colors\`}><User className="w-6 h-6" /></button>
        </nav>
        
        {/* Home Indicator */}
        <div className="absolute bottom-2 inset-x-0 w-32 h-1 bg-gray-900 rounded-full mx-auto"></div>
      </div>
    </div>
  );
}`;

// 4. DESKTOP TOOL TEMPLATE
const desktopApp = `import React from 'react';
import { Folder, File, ChevronRight, Terminal, Search, Settings, Cloud, Database, Play, CheckCircle2, AlertCircle } from 'lucide-react';

export default function DesktopTool() {
  return (
    <div className="h-screen bg-[#1e1e1e] text-[#cccccc] font-sans flex flex-col overflow-hidden select-none">
      {/* Titlebar */}
      <div className="h-9 bg-[#323233] flex items-center justify-between px-4 border-b border-[#111111] drag-area">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="text-xs font-medium opacity-70 flex items-center gap-2">
          <Database className="w-3 h-3" /> DataGrip Studio Pro
        </div>
        <div className="w-12"></div> {/* Spacer for balance */}
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Activity Bar */}
        <div className="w-12 bg-[#333333] flex flex-col items-center py-4 gap-6 border-r border-[#252526]">
          <div className="p-2 bg-[#1e1e1e] rounded-lg text-blue-400 cursor-pointer"><Folder className="w-5 h-5" /></div>
          <div className="p-2 opacity-40 hover:opacity-100 cursor-pointer"><Search className="w-5 h-5" /></div>
          <div className="p-2 opacity-40 hover:opacity-100 cursor-pointer"><Database className="w-5 h-5" /></div>
          <div className="p-2 opacity-40 hover:opacity-100 cursor-pointer"><Cloud className="w-5 h-5" /></div>
          <div className="mt-auto p-2 opacity-40 hover:opacity-100 cursor-pointer"><Settings className="w-5 h-5" /></div>
        </div>

        {/* Sidebar */}
        <div className="w-64 bg-[#252526] border-r border-[#1e1e1e] flex flex-col">
          <div className="h-9 px-4 flex items-center text-xs font-bold tracking-wider text-gray-400 uppercase">Explorer</div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1 text-sm">
            <div className="flex items-center gap-1.5 px-2 py-1.5 hover:bg-[#2a2d2e] rounded cursor-pointer">
              <ChevronRight className="w-4 h-4 opacity-50" /><Folder className="w-4 h-4 text-yellow-500" /> <span>src</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1.5 hover:bg-[#2a2d2e] rounded cursor-pointer">
              <ChevronRight className="w-4 h-4 opacity-50" /><Folder className="w-4 h-4 text-blue-400" /> <span>migrations</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1.5 bg-[#37373d] text-white rounded cursor-pointer ml-4">
              <File className="w-4 h-4 text-emerald-400" /> <span>init_schema.sql</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1.5 hover:bg-[#2a2d2e] rounded cursor-pointer ml-4">
              <File className="w-4 h-4 text-purple-400" /> <span>seed_data.sql</span>
            </div>
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e]">
          {/* Editor Tabs */}
          <div className="flex bg-[#2d2d2d] overflow-x-auto hide-scrollbar">
            <div className="px-4 py-2 bg-[#1e1e1e] border-t-2 border-blue-500 flex items-center gap-2 text-sm text-white">
              <File className="w-4 h-4 text-emerald-400" /> init_schema.sql
            </div>
            <div className="px-4 py-2 border-r border-[#1e1e1e] flex items-center gap-2 text-sm opacity-60 hover:bg-[#1e1e1e] cursor-pointer">
              <Database className="w-4 h-4 text-blue-400" /> connection.js
            </div>
          </div>

          {/* Breadcrumbs & Toolbar */}
          <div className="px-4 py-2 flex items-center justify-between border-b border-[#2d2d2d] bg-[#1e1e1e]">
            <div className="text-xs opacity-60 flex items-center gap-1">
              db-project <ChevronRight className="w-3 h-3" /> migrations <ChevronRight className="w-3 h-3" /> init_schema.sql
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded transition-colors">
                <Play className="w-3 h-3" /> Run Query
              </button>
            </div>
          </div>

          {/* Code Editor Mock */}
          <div className="flex-1 p-4 font-mono text-sm leading-relaxed overflow-y-auto">
            <div className="flex">
              <div className="w-8 text-right pr-4 opacity-30 select-none">1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7</div>
              <div className="flex-1">
                <span className="text-blue-400">CREATE TABLE</span> <span className="text-yellow-300">users</span> (<br/>
                &nbsp;&nbsp;id <span className="text-blue-400">UUID PRIMARY KEY DEFAULT</span> <span className="text-emerald-400">uuid_generate_v4()</span>,<br/>
                &nbsp;&nbsp;email <span className="text-blue-400">VARCHAR</span>(255) <span className="text-blue-400">UNIQUE NOT NULL</span>,<br/>
                &nbsp;&nbsp;password_hash <span className="text-blue-400">VARCHAR</span>(255) <span className="text-blue-400">NOT NULL</span>,<br/>
                &nbsp;&nbsp;created_at <span className="text-blue-400">TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP</span><br/>
                );<br/>
                <br/>
                <span className="text-green-500 opacity-60">-- Create index on email for faster lookups</span>
              </div>
            </div>
          </div>

          {/* Bottom Panel (Terminal/Output) */}
          <div className="h-48 border-t border-[#2d2d2d] flex flex-col bg-[#1e1e1e]">
            <div className="flex border-b border-[#2d2d2d] px-2">
              <div className="px-4 py-2 text-xs uppercase tracking-wider border-b border-blue-500 text-white">Output</div>
              <div className="px-4 py-2 text-xs uppercase tracking-wider opacity-50 cursor-pointer hover:opacity-100">Terminal</div>
            </div>
            <div className="flex-1 p-3 font-mono text-xs overflow-y-auto space-y-2">
              <div className="flex gap-2 text-emerald-400"><CheckCircle2 className="w-4 h-4" /> <span>Connected to localhost:5432 (PostgreSQL 14.2)</span></div>
              <div className="flex gap-2 text-gray-400"><Terminal className="w-4 h-4" /> <span>Executing init_schema.sql...</span></div>
              <div className="flex gap-2 text-emerald-400"><CheckCircle2 className="w-4 h-4" /> <span>CREATE TABLE users - Success (42ms)</span></div>
              <div className="flex gap-2 text-yellow-400"><AlertCircle className="w-4 h-4" /> <span>Warning: No role specified for schema creation.</span></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="h-6 bg-[#007acc] text-white text-[11px] flex items-center justify-between px-3 font-mono">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Cloud className="w-3 h-3" /> main*</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> 0 ⚠ 1</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Ln 1, Col 1</span>
          <span>UTF-8</span>
          <span>SQL</span>
        </div>
      </div>
    </div>
  );
}`;

// 5. AI CHATBOT TEMPLATE
const chatbotApp = `import React, { useState } from 'react';
import { Bot, Send, User, Sparkles, Command, Paperclip, ChevronDown, Plus } from 'lucide-react';

const initialMessages = [
  { id: 1, role: 'ai', text: 'Hello! I am your advanced AI assistant. I can help you write code, analyze data, or brainstorm ideas. What would you like to build today?' },
];

export default function ChatbotApp() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = { id: Date.now(), role: 'user', text: input };
    setMessages([...messages, userMsg]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(m => [...m, { id: Date.now(), role: 'ai', text: 'This is a simulated response. In a real app, this would be connected to an LLM API like OpenAI or Anthropic.' }]);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-white text-gray-800 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="p-4 flex items-center gap-3 font-semibold text-lg cursor-pointer hover:bg-gray-100 rounded-lg mx-2 mt-2 transition-colors">
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          Nexus AI
          <ChevronDown className="w-4 h-4 ml-auto text-gray-400" />
        </div>
        
        <div className="px-4 mt-6 flex-1 overflow-y-auto">
          <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Recent Chats</p>
          <div className="space-y-1">
            {['React Component Refactor', 'Database Schema Design', 'Write a Python Script'].map((chat, i) => (
              <div key={i} className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg cursor-pointer truncate">
                {chat}
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
            <img src="https://i.pravatar.cc/150?img=11" className="w-8 h-8 rounded-full" alt="User" />
            <div className="text-sm font-medium">Alex Doe</div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative bg-white">
        {/* Header (Mobile) */}
        <div className="md:hidden border-b border-gray-200 p-4 flex justify-center items-center font-semibold">
          <Sparkles className="w-5 h-5 mr-2" /> Nexus AI
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-3xl mx-auto space-y-8 pb-24">
            {messages.map((msg) => (
              <div key={msg.id} className={\`flex gap-4 \${msg.role === 'user' ? 'flex-row-reverse' : ''}\`}>
                <div className={\`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 \${msg.role === 'ai' ? 'bg-indigo-600' : 'bg-gray-200'}\`}>
                  {msg.role === 'ai' ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-gray-600" />}
                </div>
                <div className={\`flex flex-col \${msg.role === 'user' ? 'items-end' : 'items-start'}\`}>
                  <span className="text-xs font-medium text-gray-400 mb-1 px-1">{msg.role === 'ai' ? 'Nexus AI' : 'You'}</span>
                  <div className={\`px-5 py-3.5 rounded-2xl max-w-[85%] text-[15px] leading-relaxed shadow-sm border \${
                    msg.role === 'user' 
                      ? 'bg-black text-white rounded-tr-none border-black' 
                      : 'bg-white text-gray-800 rounded-tl-none border-gray-200'
                  }\`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
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
          </div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-white via-white to-transparent pt-10 pb-6 px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSend} className="relative flex items-end gap-2 bg-white border border-gray-300 rounded-2xl shadow-lg shadow-gray-200/50 p-2 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all">
              <button type="button" className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                <Plus className="w-5 h-5" />
              </button>
              <textarea 
                rows="1"
                placeholder="Message Nexus AI..." 
                className="w-full bg-transparent border-none focus:outline-none py-3 text-[15px] resize-none max-h-32"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(e); } }}
              />
              <button 
                type="submit" 
                disabled={!input.trim()}
                className="p-2.5 bg-black text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
            <div className="text-center mt-3 text-xs text-gray-400">
              Nexus AI can make mistakes. Consider verifying important information.
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

console.log('All templates generated successfully!');
