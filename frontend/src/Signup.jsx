import { useState } from 'react';

function Signup({ goToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit() {
    setMessage('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || 'Signup failed.');
        return;
      }

      setMessage('Account created! You can now log in.');
    } catch (err) {
      setMessage('Network error. Is the backend running?');
    }
  }

  const boxStyle = {
    background: 'white', borderRadius: '16px', padding: '32px',
    maxWidth: '380px', margin: '40px auto', boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
  };
  const inputStyle = {
    width: '100%', padding: '12px', margin: '8px 0', borderRadius: '8px',
    border: '1px solid #ccc', fontSize: '15px', boxSizing: 'border-box',
  };
  const buttonStyle = {
    width: '100%', padding: '12px', marginTop: '12px', borderRadius: '8px',
    border: 'none', background: '#6c2bd9', color: 'white', fontSize: '16px',
    fontWeight: 'bold', cursor: 'pointer',
  };
  const titleStyle = { textAlign: 'center', color: '#1e1b4b', marginBottom: '16px' };
  const linkStyle = { color: '#6c2bd9', cursor: 'pointer', textAlign: 'center', marginTop: '14px' };

  return (
    <div style={boxStyle}>
      <h2 style={titleStyle}>Create Account</h2>
      <input style={inputStyle} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input style={inputStyle} placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input style={inputStyle} placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button style={buttonStyle} onClick={handleSubmit}>Sign Up</button>
      {message && <p style={{ textAlign: 'center', marginTop: '12px', color: '#333' }}>{message}</p>}
      <p style={linkStyle} onClick={goToLogin}>Already have an account? Log in</p>
    </div>
  );
}

export default Signup;