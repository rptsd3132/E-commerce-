import { useState, useEffect } from 'react';

function ProductDetail({ productId, user, goBack }) {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [feedback, setFeedback] = useState('');

  function loadReviews() {
    fetch(`http://localhost:5000/api/reviews/${productId}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
    loadReviews();
  }, [productId]);

  async function submitReview() {
    if (!user) {
      setFeedback('Please log in to leave a review.');
      return;
    }
    const token = localStorage.getItem('token');
    setFeedback('');
    try {
      const res = await fetch(`http://localhost:5000/api/reviews/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating: Number(rating), comment }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFeedback(data.error || 'Failed to add review.');
        return;
      }
      setFeedback('✅ Review added!');
      setComment('');
      setRating(5);
      loadReviews();
    } catch (err) {
      setFeedback('Network error.');
    }
  }

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  const boxStyle = {
    background: 'white', borderRadius: '12px', padding: '24px',
    maxWidth: '700px', margin: '0 auto', boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
    border: '1px solid #ece5d3',
  };
  const backBtn = {
    background: '#14532d', color: 'white', border: 'none', padding: '8px 16px',
    borderRadius: '20px', cursor: 'pointer', marginBottom: '16px',
  };
  const inputStyle = {
    width: '100%', padding: '10px', margin: '8px 0', borderRadius: '8px',
    border: '1px solid #ccc', fontSize: '15px', boxSizing: 'border-box',
  };
  const submitBtn = {
    background: '#f0932b', color: 'white', border: 'none', padding: '12px 24px',
    borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', marginTop: '8px',
  };
  const reviewCard = {
    background: '#faf6ec', borderRadius: '8px', padding: '12px', margin: '8px 0',
    border: '1px solid #ece5d3',
  };

  if (!product) {
    return <div style={boxStyle}><p>Loading...</p></div>;
  }

  return (
    <div style={boxStyle}>
      <button style={backBtn} onClick={goBack}>← Back to products</button>

      <h2 style={{ color: '#14532d', margin: '0 0 8px' }}>{product.name}</h2>
      <p style={{ color: '#7a7a6d' }}>{product.description}</p>
      <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#f0932b' }}>${product.price}</p>
      <p style={{ color: '#14532d' }}>{product.stock} in stock</p>

      <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #ece5d3' }} />

      <h3 style={{ color: '#14532d' }}>
        Reviews {avgRating && <span style={{ color: '#f0932b' }}>★ {avgRating} / 5</span>}
      </h3>

      {reviews.length === 0 ? (
        <p style={{ color: '#7a7a6d' }}>No reviews yet. Be the first!</p>
      ) : (
        reviews.map((r) => (
          <div key={r.id} style={reviewCard}>
            <strong style={{ color: '#14532d' }}>{r.user_name}</strong>
            <span style={{ color: '#f0932b', marginLeft: '8px' }}>{'★'.repeat(r.rating)}</span>
            <p style={{ margin: '6px 0 0', color: '#555' }}>{r.comment}</p>
          </div>
        ))
      )}

      <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #ece5d3' }} />

      <h3 style={{ color: '#14532d' }}>Add a Review</h3>
      <label style={{ color: '#14532d', display: 'block', marginBottom: '4px' }}>Rating:</label>
      <select style={inputStyle} value={rating} onChange={(e) => setRating(e.target.value)}>
        <option value="5">★★★★★ (5)</option>
        <option value="4">★★★★ (4)</option>
        <option value="3">★★★ (3)</option>
        <option value="2">★★ (2)</option>
        <option value="1">★ (1)</option>
      </select>
      <textarea
        style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button style={submitBtn} onClick={submitReview}>Submit Review</button>
      {feedback && <p style={{ color: '#14532d', marginTop: '10px' }}>{feedback}</p>}
    </div>
  );
}

export default ProductDetail;