function Cart({ cart, changeQuantity, removeFromCart, clearCart, user }) {
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const boxStyle = {
    background: 'white', borderRadius: '12px', padding: '24px',
    maxWidth: '600px', margin: '0 auto', boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
    border: '1px solid #ece5d3',
  };
  const rowStyle = {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '12px 0', borderBottom: '1px solid #ece5d3',
  };
  const qtyBtn = {
    background: '#14532d', color: 'white', border: 'none', width: '28px',
    height: '28px', borderRadius: '6px', cursor: 'pointer', fontSize: '16px',
  };
  const checkoutBtn = {
    width: '100%', padding: '14px', marginTop: '20px', borderRadius: '24px',
    border: 'none', background: '#f0932b', color: 'white', fontWeight: 'bold',
    fontSize: '16px', cursor: 'pointer',
  };

  if (cart.length === 0) {
    return (
      <div style={boxStyle}>
        <h2 style={{ color: '#14532d', textAlign: 'center' }}>Your cart is empty 🛒</h2>
      </div>
    );
  }

  function handleCheckout() {
    if (!user) {
      alert('Please log in to checkout.');
      return;
    }
    alert('Checkout coming next — backend not wired yet!');
  }

  return (
    <div style={boxStyle}>
      <h2 style={{ color: '#14532d', marginBottom: '16px' }}>Your Cart</h2>
      {cart.map((item) => (
        <div key={item.id} style={rowStyle}>
          <div>
            <strong style={{ color: '#14532d' }}>{item.name}</strong>
            <div style={{ color: '#7a7a6d', fontSize: '13px' }}>${item.price} each</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button style={qtyBtn} onClick={() => changeQuantity(item.id, -1)}>-</button>
            <span>{item.quantity}</span>
            <button style={qtyBtn} onClick={() => changeQuantity(item.id, 1)}>+</button>
            <button
              style={{ ...qtyBtn, background: '#c0392b', marginLeft: '8px' }}
              onClick={() => removeFromCart(item.id)}
            >
              ×
            </button>
          </div>
        </div>
      ))}
      <h3 style={{ color: '#f0932b', textAlign: 'right', marginTop: '16px' }}>
        Total: ${total.toFixed(2)}
      </h3>
      <button style={checkoutBtn} onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default Cart;