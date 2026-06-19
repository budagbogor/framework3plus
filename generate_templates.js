const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'public', 'templates');
if (!fs.existsSync(templatesDir)) {
    fs.mkdirSync(templatesDir, { recursive: true });
}

// Helper to generate a minimal package.json
const makePkg = (name, deps = {}, devDeps = {}, scripts = {}) => JSON.stringify({
  name,
  version: "1.0.0",
  private: true,
  scripts: {
    dev: "vite --host",
    build: "vite build",
    preview: "vite preview",
    ...scripts
  },
  dependencies: deps,
  devDependencies: devDeps
}, null, 2);

// 1. E-Commerce (Next.js + Supabase + Midtrans) -> we will mock with Vite/React for WebContainer compat
const ecommerce = {
  "package.json": makePkg("ecommerce-template", {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@supabase/supabase-js": "^2.38.0",
    "midtrans-client": "^1.3.1"
  }, {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24"
  }),
  "index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>E-Commerce Store</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,
  "vite.config.js": `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({ plugins: [react()] });`,
  "src/main.jsx": `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  "src/index.css": `body { font-family: system-ui, sans-serif; margin: 0; padding: 2rem; background: #f9fafb; }
.product-card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 1rem; }`,
  "src/App.jsx": `import React from 'react';

function App() {
  return (
    <div>
      <header>
        <h1 style={{fontSize: '2rem', fontWeight: 'bold', color: '#111827'}}>🛒 My E-Commerce Store</h1>
        <p style={{color: '#6b7280'}}>Built with React, Supabase, and Midtrans integrations.</p>
      </header>
      <div className="product-card">
        <h2 style={{fontSize: '1.25rem', fontWeight: 'bold'}}>Smartphone X-Pro</h2>
        <p style={{margin: '0.5rem 0'}}>Rp 12.000.000</p>
        <button style={{background: '#3b82f6', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', cursor: 'pointer'}}>Beli Sekarang</button>
      </div>
    </div>
  );
}

export default App;`
};

// 2. Dashboard (Next.js + Supabase + shadcn) -> Vite/React mock
const dashboard = {
  "package.json": makePkg("dashboard-template", {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.292.0",
    "recharts": "^2.9.0"
  }, {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0"
  }),
  "index.html": ecommerce["index.html"].replace("E-Commerce Store", "Admin Dashboard"),
  "vite.config.js": ecommerce["vite.config.js"],
  "src/main.jsx": ecommerce["src/main.jsx"],
  "src/index.css": `body { font-family: system-ui, sans-serif; margin: 0; background: #0f172a; color: white; }
.dashboard { display: grid; grid-template-columns: 250px 1fr; height: 100vh; }
.sidebar { background: #1e293b; padding: 2rem; }
.content { padding: 2rem; }
.card { background: #1e293b; padding: 1.5rem; border-radius: 8px; margin-top: 1rem; }`,
  "src/App.jsx": `import React from 'react';
import { LayoutDashboard, Users, Settings } from 'lucide-react';

function App() {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2 style={{marginBottom: '2rem', fontWeight: 'bold'}}>Admin Panel</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', color: '#94a3b8'}}>
          <div style={{display: 'flex', gap: '0.5rem'}}><LayoutDashboard size={20}/> Dashboard</div>
          <div style={{display: 'flex', gap: '0.5rem'}}><Users size={20}/> Users</div>
          <div style={{display: 'flex', gap: '0.5rem'}}><Settings size={20}/> Settings</div>
        </div>
      </div>
      <div className="content">
        <h1>📊 Overview</h1>
        <div className="card">
          <h3>Total Revenue</h3>
          <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#10b981'}}>$24,500</p>
        </div>
      </div>
    </div>
  );
}

export default App;`
};

// 3. Mobile App (React Native + Supabase) -> Mock basic Expo structure
const mobileapp = {
  "package.json": makePkg("mobile-template", {
    "react": "18.2.0",
    "react-native": "0.72.6",
    "expo": "~49.0.15"
  }, {}, {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios"
  }),
  "App.js": `import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📱 My Mobile App</Text>
      <Text style={styles.subtitle}>Powered by React Native & Supabase</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { color: '#666', marginBottom: 20 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8 },
  buttonText: { color: 'white', fontWeight: 'bold' }
});`,
  "app.json": JSON.stringify({
    "expo": {
      "name": "My Mobile App",
      "slug": "my-mobile-app",
      "version": "1.0.0"
    }
  }, null, 2)
};

// 4. Desktop Tool (Electron + SQLite) -> Node script
const desktoptool = {
  "package.json": makePkg("desktop-template", {
    "sqlite3": "^5.1.6"
  }, {
    "electron": "^27.0.0",
    "electron-builder": "^24.6.4"
  }, {
    "start": "electron ."
  }),
  "main.js": `const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});`,
  "index.html": `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>My Desktop Tool</title>
    <style>
      body { font-family: sans-serif; padding: 2rem; background: #f0f2f5; }
      .container { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>🖥️ Desktop Utility</h1>
      <p>Running on Electron, ready for SQLite integration.</p>
    </div>
  </body>
</html>`
};

// 5. AI Chatbot (Langchain + Claude) -> Node scripts / Vite react
const aichatbot = {
  "package.json": makePkg("chatbot-template", {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "langchain": "^0.0.196",
    "@anthropic-ai/sdk": "^0.9.1"
  }, {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0"
  }),
  "index.html": ecommerce["index.html"].replace("E-Commerce Store", "AI Chatbot"),
  "vite.config.js": ecommerce["vite.config.js"],
  "src/main.jsx": ecommerce["src/main.jsx"],
  "src/index.css": `body { font-family: system-ui, sans-serif; margin: 0; background: #fafafa; }
.chat-container { max-width: 600px; margin: 2rem auto; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); height: 80vh; display: flex; flexDirection: column; overflow: hidden; }
.chat-header { background: #6366f1; color: white; padding: 1rem; font-weight: bold; font-size: 1.2rem; }
.chat-messages { flex: 1; padding: 1rem; overflow-y: auto; }
.chat-input { display: flex; padding: 1rem; border-top: 1px solid #e5e7eb; }
.chat-input input { flex: 1; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 6px; margin-right: 0.5rem; }
.chat-input button { background: #6366f1; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer; }`,
  "src/App.jsx": `import React, { useState } from 'react';

function App() {
  const [msgs, setMsgs] = useState([{role:'ai', text:'Halo! Saya AI assistant Anda yang ditenagai oleh Claude dan LangChain. Ada yang bisa saya bantu?'}]);
  
  return (
    <div className="chat-container">
      <div className="chat-header">🤖 AI Chatbot</div>
      <div className="chat-messages">
        {msgs.map((m, i) => (
          <div key={i} style={{marginBottom:'1rem', textAlign: m.role==='user'?'right':'left'}}>
            <span style={{background: m.role==='user'?'#6366f1':'#f3f4f6', color: m.role==='user'?'white':'black', padding:'0.5rem 1rem', borderRadius:'8px', display:'inline-block'}}>
              {m.text}
            </span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Ketik pesan..." />
        <button>Kirim</button>
      </div>
    </div>
  );
}

export default App;`
};

fs.writeFileSync(path.join(templatesDir, 'ecommerce.json'), JSON.stringify(ecommerce));
fs.writeFileSync(path.join(templatesDir, 'dashboard.json'), JSON.stringify(dashboard));
fs.writeFileSync(path.join(templatesDir, 'mobileapp.json'), JSON.stringify(mobileapp));
fs.writeFileSync(path.join(templatesDir, 'desktoptool.json'), JSON.stringify(desktoptool));
fs.writeFileSync(path.join(templatesDir, 'aichatbot.json'), JSON.stringify(aichatbot));

console.log("Templates successfully generated in public/templates/");
