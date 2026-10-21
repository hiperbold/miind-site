import './review-navigation';

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'


// Performance optimization with concurrent mode
const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");
const root = createRoot(container);

// Preload critical resources
const preconnectUrls = [
  "https://fonts.googleapis.com",
  "https://fonts.gstatic.com"
];

preconnectUrls.forEach(url => {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = url;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
});

// Render the app
root.render(<App />);

// Register service worker for better performance (commented for now)
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js')
//       .then(registration => {
//         console.log('SW registered: ', registration);
//       })
//       .catch(registrationError => {
//         console.log('SW registration failed: ', registrationError);
//       });
//   });
// }
