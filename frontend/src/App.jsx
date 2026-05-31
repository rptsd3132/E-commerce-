import { useState, useEffect } from 'react';
import Cart from './Cart';
import Complaints from './Complaints';
import { Headphones } from 'lucide-react';
import ProductDetail from './ProductDetail';


import ProductList from './ProductList';
import Login from './Login';
import Signup from './Signup';

function App() {
  const [view, setView] = useState('home');
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  function handleLoginSuccess(loggedInUser) {
    setUser(loggedInUser);
    setView('home');
  }

  function openProduct(id) {
  setSelectedProductId(id);
  setView('product');
}

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setView('home');
  }

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }

  function changeQuantity(productId, delta) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function clearCart() {
    setCart([]);
  }

  const pageStyle = {
    minHeight: '100vh',
    background: '#faf6ec',
    fontFamily: 'sans-serif',
    margin: 0,
    
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#14532d',
    flexWrap: 'wrap',
    gap: '12px',
    padding: 'clamp(14px, 3vw, 20px) clamp(16px, 5vw, 40px)',
    marginBottom: '30px',
  };
  const titleStyle = {
    color: '#faf6ec',
    cursor: 'pointer',
    margin: 0,
    fontWeight: 'bold',
    fontSize: 'clamp(20px, 4vw, 28px)'
  };

  const navButton = {
    background: '#f0932b',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '24px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    marginLeft: '10px',
  };

  const naviButton = {
    background: '#4b0701',
    color: 'white',
    border: 'none',
    padding: '10px 10px',
    borderRadius: '24px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    marginLeft: '10px',
  };

  const iconButton = {
  background: '#f0932b',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '24px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  };

  

  return (
    <div style={pageStyle}>
      <div style={navStyle}>
        <h1 style={titleStyle} onClick={() => setView('home')}>🛒 My Mini Amazon</h1>
        <div>
                 <button
                  style={{ ...navButton, display: 'flex', gap: '6px' }}
                   onClick={() => setView('complaints')} >
          
                   <Headphones size={18} color="white" />
                     Help Center
                   </button>
              </div>
        <div>
          {user ? (
            <>
              
              <span style={{ color: '#e4cf0f', marginRight: '12px', fontWeight: 'bold' }}>Hi, {user.name}</span>
              <button style={navButton} onClick={handleLogout}>Log Out</button>
              <button style={naviButton} onClick={() => setView('cart')}>
                    🛒cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
               </button>
              
            </>
          ) : (
            <>
             
              <button style={navButton} onClick={() => setView('login')}>Log In</button>
              <button style={navButton} onClick={() => setView('signup')}>Sign Up</button>
            </>
          )}
        </div>
      </div>
      <div style={{ padding: '0 clamp(16px, 5vw, 40px) 40px' }}>
        {view === 'home' && <ProductList addToCart={addToCart} openProduct={openProduct} />}
        {view === 'complaints' && <Complaints user={user} />}
        {view === 'login' && <Login onLoginSuccess={handleLoginSuccess} goToSignup={() => setView('signup')} />}
        {view === 'signup' && <Signup goToLogin={() => setView('login')} />}
        {view === 'cart' && (
          <Cart
            cart={cart}
            changeQuantity={changeQuantity}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            user={user}
          />
        )}
        {view === 'product' && (
          <ProductDetail
            productId={selectedProductId}
            user={user}
            goBack={() => setView('home')}
          />
        )}
        
      </div>
    </div>
  );
}

export default App;