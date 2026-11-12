import React, { createContext, useContext, useReducer, useMemo } from 'react';

const WishlistContext = createContext(null);

const initialState = { items: [] };

function wishlistReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { items: [...state.items, action.product] };
    case 'REMOVE':
      return { items: state.items.filter((i) => i.id !== action.id) };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  const toggleWishlist = (product) => {
    const exists = state.items.some((i) => i.id === product.id);
    dispatch(exists ? { type: 'REMOVE', id: product.id } : { type: 'ADD', product });
  };

  const isWishlisted = (id) => state.items.some((i) => i.id === id);

  const clearWishlist = () => dispatch({ type: 'CLEAR' });

  const value = useMemo(
    () => ({ items: state.items, toggleWishlist, isWishlisted, clearWishlist }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.items]
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
