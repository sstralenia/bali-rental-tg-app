import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    // @ts-expect-error Telegram is not a key of window
    document.body.style.height = window.visualViewport.height + 'px';
  });
}
// This will ensure user never overscroll the page
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) window.scrollTo(0, 0);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
