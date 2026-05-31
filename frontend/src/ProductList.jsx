import { useState, useEffect } from 'react';

function ProductList({ addToCart, openProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

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

  const filteredProducts = products.filter((product) => {
    const text = search.toLowerCase();
    return (
      product.name.toLowerCase().includes(text) ||
      (product.description && product.description.toLowerCase().includes(text))
    );
  });

  const searchWrapStyle = {
    maxWidth: '600px',
    margin: '0 auto 30px',
    display: 'flex',
    justifyContent: 'center',
  };
 const searchInputStyle = {
    width: '100%',
    padding: '14px 20px',
    borderRadius: '30px',
    border: '2px solid #14532d',
    fontSize: '16px',
    outline: 'none',
    background: 'white',
    color: '#14532d',
    caretColor: '#14532d',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: 'clamp(16px, 3vw, 24px)',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
    border: '1px solid #ece5d3',
  };

  const nameStyle = { fontSize: '20px', fontWeight: 'bold', color: '#14532d', margin: '0 0 8px' };
  const descStyle = { color: '#7a7a6d', fontSize: '14px', minHeight: '40px' };
  const priceStyle = { fontSize: '24px', fontWeight: 'bold', color: '#f0932b', margin: '12px 0 4px' };
  const stockStyle = { fontSize: '13px', color: '#14532d' };
  const buttonStyle = {
    width: '100%',
    padding: '10px',
    marginTop: '12px',
    borderRadius: '24px',
    border: 'none',
    background: '#f0932b',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '14px',
  };

  if (loading) {
    return <p style={{ color: '#14532d', textAlign: 'center' }}>Loading products...</p>;
  }

  return (
    <div>
      <div style={searchWrapStyle}>
        <input
          style={searchInputStyle}
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p style={{ color: '#14532d', textAlign: 'center' }}>
          No products found for "{search}"
        </p>
      ) : (
        <div style={gridStyle}>
          {filteredProducts.map((product) => (
            <div key={product.id} style={cardStyle}>
              <h2
                style={{ ...nameStyle, cursor: 'pointer' }}
                onClick={() => openProduct(product.id)}
              >
                {product.name}
              </h2>
              <p style={descStyle}>{product.description}</p>
              <p style={priceStyle}>${product.price}</p>
              <p style={stockStyle}>{product.stock} in stock</p>
              <button style={buttonStyle} onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;