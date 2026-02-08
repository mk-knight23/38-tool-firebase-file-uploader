import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router';
import { GlobalErrorBoundary } from './components/common/GlobalErrorBoundary';
import { Toaster } from 'react-hot-toast';
import Router from './router'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GlobalErrorBoundary>
            <Toaster position="top-right" />
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </GlobalErrorBoundary>
    </StrictMode>
);
