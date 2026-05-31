import { useState } from 'react';

function Complaints({ user }) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');
  const [sending, setSending] = useState(false);

  async function handleSubmit() {
    if (!user) {
      setFeedback('Please log in to submit a complaint.');
      return;
    }
    if (!subject || !message) {
      setFeedback('Please fill in both subject and message.');
      return;
    }

    const token = localStorage.getItem('token');
    setSending(true);
    setFeedback('');

    try {
      const res = await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ subject, message }),
      });
      const data = await res.json();

      if (!res.ok) {
        setFeedback(data.error || 'Submission failed.');
        setSending(false);
        return;
      }

      setFeedback('✅ Complaint submitted! We will review it.');
      setSubject('');
      setMessage('');
    } catch (err) {
      setFeedback('Network error. Is the backend running?');
    }
    setSending(false);
  }

  const boxStyle = {
    background: 'white', borderRadius: '12px', padding: '24px',
    maxWidth: '600px', margin: '0 auto', boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
    border: '1px solid #ece5d3',
  };
  const inputStyle = {
    width: '100%', padding: '12px', margin: '8px 0', borderRadius: '8px',
    border: '1px solid #ccc', fontSize: '15px', boxSizing: 'border-box',
  };
  const textareaStyle = { ...inputStyle, minHeight: '120px', resize: 'vertical', fontFamily: 'sans-serif' };
  const buttonStyle = {
    width: '100%', padding: '14px', marginTop: '12px', borderRadius: '24px',
    border: 'none', background: '#f0932b', color: 'white', fontWeight: 'bold',
    fontSize: '16px', cursor: 'pointer',
  };

  return (
    <div style={boxStyle}>
      <h2 style={{ color: '#14532d', marginBottom: '16px', textAlign: 'center' }}>Submit a Complaint</h2>
      <input
        style={inputStyle}
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        style={textareaStyle}
        placeholder="Describe your issue..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button style={buttonStyle} onClick={handleSubmit} disabled={sending}>
        {sending ? 'Submitting...' : 'Submit Complaint'}
      </button>
      {feedback && (
        <p style={{ textAlign: 'center', marginTop: '12px', color: '#14532d' }}>{feedback}</p>
      )}
    </div>
  );
}

export default Complaints;