import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@src/App';

const styleElement = document.getElementById('style_loading_page');
styleElement?.parentNode?.removeChild(styleElement);
document.querySelector('.r_loading_page')?.remove();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
