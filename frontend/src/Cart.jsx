import { useState } from 'react';

function Cart({ cart, changeQuantity, removeFromCart, clearCart, user }) {
  const [message, setMessage] = useState('');
  const [placing, setPlacing] = useState(false);

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

  async function handleCheckout() {
    if (!user) {
      setMessage('Please log in to checkout.');
      return;
    }

    const token = localStorage.getItem('token');
    setPlacing(true);
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items: cart }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || 'Checkout failed.');
        setPlacing(false);
        return;
      }

      setMessage(`✅ Order placed! Order #${data.orderId}, total $${Number(data.total).toFixed(2)}`);
      clearCart();
    } catch (err) {
      setMessage('Network error. Is the backend running?');
    }
    setPlacing(false);
  }

  if (cart.length === 0) {
    return (
      <div style={boxStyle}>
        <h2 style={{ color: '#14532d', textAlign: 'center' }}>Your cart is empty 🛒</h2>
        {message && <p style={{ textAlign: 'center', color: '#14532d', marginTop: '12px' }}>{message}</p>}
      </div>
    );
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
      <button style={checkoutBtn} onClick={handleCheckout} disabled={placing}>
        {placing ? 'Placing order...' : 'Checkout'}
      </button>
      {message && <p style={{ textAlign: 'center', marginTop: '12px', color: '#14532d' }}>{message}</p>}
    </div>
  );
}

export default Cart;