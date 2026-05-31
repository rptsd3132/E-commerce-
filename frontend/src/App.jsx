import { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  const pageStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #6c2bd9, #2563eb)',
    fontFamily: 'sans-serif',
    padding: '30px',
    margin: 0,
  };

  const headerStyle = {
    color: 'white',
    fontSize: '40px',
    textAlign: 'center',
    marginBottom: '30px',
    textShadow: '0 4px 12px rgba(0,0,0,0.3)',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '24px',
    maxWidth: '1100px',
    margin: '0 auto',
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
  };

  const nameStyle = { fontSize: '20px', fontWeight: 'bold', color: '#1e1b4b', margin: '0 0 8px' };
  const descStyle = { color: '#555', fontSize: '14px', minHeight: '40px' };
  const priceStyle = { fontSize: '22px', fontWeight: 'bold', color: '#6c2bd9', margin: '12px 0 4px' };
  const stockStyle = { fontSize: '13px', color: '#16a34a' };

  return (
    <div style={pageStyle}>
      <h1 style={headerStyle}>🛒 My Mini Amazon</h1>

      {loading ? (
        <p style={{ color: 'white', textAlign: 'center' }}>Loading products...</p>
      ) : (
        <div style={gridStyle}>
          {products.map((product) => (
            <div key={product.id} style={cardStyle}>
              <h2 style={nameStyle}>{product.name}</h2>
              <p style={descStyle}>{product.description}</p>
              <p style={priceStyle}>${product.price}</p>
              <p style={stockStyle}>{product.stock} in stock</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;


