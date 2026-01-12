import { render } from 'preact'
import { App } from './app'
import './index.css'

// Service Worker registration for development
if (import.meta.env.DEV) {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}

render(<App />, document.getElementById('app')!)
