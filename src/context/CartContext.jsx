import React, { createContext, useContext, useReducer, useMemo } from 'react';

/* ── Types ──────────────────────────────────────────────────
   item: { id, name, price, metal, size, qty, image }
   ────────────────────────────────────────────────────────── */

const CartContext = createContext(null);

const initialState = {
  items: [],
  isOpen: false,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item } = action;
      // Match by id + metal + size to allow same product in different variants
      const existing = state.items.find(
        (i) => i.id === item.id && i.metal === item.metal && i.size === item.size
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i === existing ? { ...i, qty: i.qty + (item.qty ?? 1) } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...item, qty: item.qty ?? 1 }] };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((i) => i._cartKey !== action.cartKey && i.id !== action.cartKey),
      };
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items
          .map((i) =>
            (i._cartKey === action.cartKey || i.id === action.cartKey) ? { ...i, qty: action.qty } : i
          )
          .filter((i) => i.qty > 0),
      };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
}

/** Stable cart key for each line item (id + metal + size) */
function makeCartKey(item) {
  return `${item.id}__${item.metal ?? ''}__${item.size ?? ''}`;
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item) => {
    const keyed = { ...item, _cartKey: makeCartKey(item) };
    dispatch({ type: 'ADD_ITEM', item: keyed });
    dispatch({ type: 'OPEN_CART' });
  };

  const removeItem = (cartKey) => dispatch({ type: 'REMOVE_ITEM', cartKey });

  const updateQty = (cartKey, qty) => dispatch({ type: 'UPDATE_QTY', cartKey, qty });

  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const totalItems = useMemo(
    () => state.items.reduce((acc, i) => acc + i.qty, 0),
    [state.items]
  );

  const subtotal = useMemo(
    () => state.items.reduce((acc, i) => acc + i.price * i.qty, 0),
    [state.items]
  );

  const value = useMemo(
    () => ({
      items: state.items,
      isOpen: state.isOpen,
      totalItems,
      subtotal,
      addItem,
      removeItem,
      updateQty,
      toggleCart,
      clearCart,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state, totalItems, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
