const { items, isOpen, closeCart, increment, decrement, removeItem, setGiftWrap, giftWrap, note, setNote, checkout } = useCart();
<CartDrawer
  open={isOpen}
  items={items}
  onClose={closeCart}
  onQtyChange={(id, qty) => setQty(id, qty)}   // or use increment/decrement
  onRemove={(id) => removeItem(id)}
  onCheckout={checkout}
  onContinueShopping={() => { closeCart(); navigate("/collections"); }}
/>