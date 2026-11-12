import React, { Suspense, lazy } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { UIProvider, useUI } from './context/UIContext';

const HomePage       = lazy(() => import('./pages/HomePage'));
const CollectionPage = lazy(() => import('./pages/CollectionPage'));
const ProductPage    = lazy(() => import('./pages/ProductPage'));
const WishlistPage   = lazy(() => import('./pages/WishlistPage'));
const CartDrawer     = lazy(() => import('./components/cart/CartDrawer'));
const SearchOverlay  = lazy(() => import('./components/search/SearchOverlay'));
const ProductQuickViewModal = lazy(() => import('./components/product/ProductQuickViewModal'));
const Header         = lazy(() => import('./components/layout/Header'));
const Footer         = lazy(() => import('./components/layout/Footer'));

function GlobalSearch() {
  const { searchOpen, toggleSearch } = useUI();
  const navigate = useNavigate();

  return (
    <SearchOverlay
      open={searchOpen}
      onClose={toggleSearch}
      onNavigate={(path) => navigate(path)}
    />
  );
}

function GlobalCart() {
  const { items, isOpen, toggleCart, updateQty, removeItem } = useCart();
  const navigate = useNavigate();

  return (
    <CartDrawer
      open={isOpen}
      items={items}
      onClose={toggleCart}
      onQtyChange={updateQty}
      onRemove={removeItem}
      onContinueShopping={() => {
        toggleCart();
        navigate('/collections/rings');
      }}
      onCheckout={() => {
        alert('Thank you for exploring Carats by Grace! Checkout feature active.');
      }}
    />
  );
}

function GlobalProductModal() {
  const { quickViewProduct, closeQuickView } = useUI();

  return (
    <ProductQuickViewModal
      product={quickViewProduct}
      isOpen={Boolean(quickViewProduct)}
      onClose={closeQuickView}
    />
  );
}

function AppRoutes() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      {!isHome && <Header />}
      <Routes>
        <Route path="/"                   element={<HomePage />} />
        <Route path="/collections"        element={<CollectionPage />} />
        <Route path="/collections/:slug"  element={<CollectionPage />} />
        <Route path="/products/:slug"     element={<ProductPage />} />
        <Route path="/product/:slug"      element={<ProductPage />} />
        <Route path="/wishlist"           element={<WishlistPage />} />
        <Route path="/account"            element={<WishlistPage />} />
      </Routes>
      {!isHome && <Footer />}
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <UIProvider>
          <Suspense fallback={null}>
            {/* Global overlays — always mounted, toggled by context */}
            <GlobalProductModal />
            <GlobalCart />
            <GlobalSearch />
            <AppRoutes />
          </Suspense>
        </UIProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
