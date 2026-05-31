import { useState, useEffect } from 'react';
import ProductList from './ProductList';
import Login from './Login';
import Signup from './Signup';

function App() {
  const [view, setView] = useState('home');
  const [user, setUser] = useState(null);

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

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setView('home');
  }

  const pageStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #6c2bd9, #2563eb)',
    fontFamily: 'sans-serif',
    padding: '30px',
    margin: 0,
  };
  const navStyle = {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    maxWidth: '1100px', margin: '0 auto 30px',
  };
  const titleStyle = {
    color: 'white', fontSize: '32px', cursor: 'pointer',
    textShadow: '0 4px 12px rgba(0,0,0,0.3)', margin: 0,
  };
  const navButton = {
    background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid white',
    padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px',
    marginLeft: '10px',
  };

  return (
    <div style={pageStyle}>
      <div style={navStyle}>
        <h1 style={titleStyle} onClick={() => setView('home')}>🛒 My Mini Amazon</h1>
        <div>
          {user ? (
            <>
              <span style={{ color: 'white', marginRight: '12px' }}>Hi, {user.name}</span>
              <button style={navButton} onClick={handleLogout}>Log Out</button>
            </>
          ) : (
            <>
              <button style={navButton} onClick={() => setView('login')}>Log In</button>
              <button style={navButton} onClick={() => setView('signup')}>Sign Up</button>
            </>
          )}
        </div>
      </div>

      {view === 'home' && <ProductList />}
      {view === 'login' && <Login onLoginSuccess={handleLoginSuccess} goToSignup={() => setView('signup')} />}
      {view === 'signup' && <Signup goToLogin={() => setView('login')} />}
    </div>
  );
}

export default App;