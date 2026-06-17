import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Temporary alert check until we connect our backend later
    if (email === 'test@fashion.com' && password === 'password123') {
      setSuccess('Login successful! Welcome back.');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.card}>
        <h2 style={styles.title}>Fashion Fit AI</h2>
        
        {error && <div style={styles.errorBox}>{error}</div>}
        {success && <div style={styles.successBox}>{success}</div>}
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email Address</label>
          <input 
            type="email" 
            required 
            placeholder="enter your email"
            style={styles.input} 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
        </div>
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input 
            type="password" 
            required 
            placeholder="enter your password"
            style={styles.input} 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
        </div>
        
        <button type="submit" style={styles.button}>Sign In</button>
      </form>
    </div>
  );
}

// Inline CSS styling for immediate rendering without layout issues
const styles = {
  container: { display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9', fontFamily: 'sans-serif' },
  card: { backgroundColor: '#ffffff', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', width: '100%', maxWidth: '380px' },
  title: { textAlign: 'center', marginBottom: '2rem', color: '#1e293b', fontSize: '24px', fontWeight: 'bold' },
  inputGroup: { marginBottom: '1.25rem' },
  label: { display: 'block', fontSize: '14px', fontWeight: '500', color: '#475569', marginBottom: '0.5rem' },
  input: { width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '0.7rem', backgroundColor: '#4f46e5', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '15px', marginTop: '0.5rem' },
  errorBox: { color: '#dc2626', backgroundColor: '#fef2f2', padding: '0.6rem', borderRadius: '6px', marginBottom: '1.25rem', fontSize: '14px', textAlign: 'center', border: '1px solid #fca5a5' },
  successBox: { color: '#16a34a', backgroundColor: '#f0fdf4', padding: '0.6rem', borderRadius: '6px', marginBottom: '1.25rem', fontSize: '14px', textAlign: 'center', border: '1px solid #86efac' }
};