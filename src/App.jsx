import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { UIProvider } from './context/UIContext';

const HomePage       = lazy(() => import('./pages/HomePage'));
const CollectionPage = lazy(() => import('./pages/CollectionPage'));
const ProductPage    = lazy(() => import('./pages/ProductPage'));
const WishlistPage   = lazy(() => import('./pages/WishlistPage'));
const CartDrawer     = lazy(() => import('./components/cart/CartDrawer'));
// const SearchOverlay  = lazy(() => import('./components/search/SearchOverlay'));

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <UIProvider>
          <Suspense fallback={null}>
            {/* Global overlays — always mounted, toggled by context */}
            <CartDrawer />
            {/* <SearchOverlay /> */}

            <Routes>
              <Route path="/"                   element={<HomePage />} />
              <Route path="/collections/:slug"  element={<CollectionPage />} />
              <Route path="/products/:slug"     element={<ProductPage />} />
              <Route path="/wishlist"           element={<WishlistPage />} />
            </Routes>
          </Suspense>
        </UIProvider>
       </WishlistProvider>
     </CartProvider>
  );
}

export default App;
