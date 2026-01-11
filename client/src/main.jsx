import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import App from './App.jsx';
import ErrorBoundary from './component/ErrorBoundary.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ErrorBoundary>
      <App/>
   </ErrorBoundary>
  </StrictMode>,
)