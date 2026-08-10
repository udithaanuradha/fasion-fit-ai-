import React, { useState } from 'react';
import heroImage from './assets/hero.png';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const isLogin = mode === 'login';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (isLogin) {
      if (email === 'test@fashion.com' && password === 'password123') {
        setMessage('Login successful! Welcome back.');
      } else {
        setError('Invalid email or password.');
      }
      return;
    }

    if (!name) {
      setError('Please enter your full name to create an account.');
      return;
    }

    if (password.length < 6) {
      setError('A strong password needs at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setMessage(`Welcome, ${name}! Your account has been created.`);
  };

  return (
    <div style={styles.page}>
      <div style={styles.panel}>
        <div style={styles.headerBar}>
          <div style={styles.brand}>
            <span style={styles.brandAccent}>Fashion</span> Fit AI
          </div>
          <div style={styles.toggleGroup}>
            <button
              type="button"
              style={{
                ...styles.toggleButton,
                ...(isLogin ? styles.toggleActive : {}),
              }}
              onClick={() => setMode('login')}
            >
              Login
            </button>
            <button
              type="button"
              style={{
                ...styles.toggleButton,
                ...(!isLogin ? styles.toggleActive : {}),
              }}
              onClick={() => setMode('signup')}
            >
              Sign Up
            </button>
          </div>
        </div>

        <div style={styles.contentGrid}>
          <div style={styles.leftColumn}>
            <div style={styles.heroIntro}>
              <p style={styles.smallHeadline}>Welcome to the future of style</p>
              <h1 style={styles.heroTitle}>Dress smart. Feel powerful.</h1>
              <p style={styles.heroCopy}>
                Elevate your daily wardrobe with curated looks for men and women.
                Sign in to discover fashion inspiration powered by intelligent style.
              </p>
            </div>

            <div style={styles.formCard}>
              <div style={styles.formHeader}>
                <p style={styles.sectionLabel}>{isLogin ? 'Login' : 'Create account'}</p>
                <h2 style={styles.sectionTitle}>{isLogin ? 'Welcome back' : 'Start your style journey'}</h2>
              </div>

              {error && <div style={styles.errorBox}>{error}</div>}
              {message && <div style={styles.successBox}>{message}</div>}

              <form onSubmit={handleSubmit} style={styles.form}>
                {!isLogin && (
                  <label style={styles.inputLabel}>
                    Full Name
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={styles.input}
                    />
                  </label>
                )}

                <label style={styles.inputLabel}>
                  Email Address
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                  />
                </label>

                <label style={styles.inputLabel}>
                  Password
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                  />
                </label>

                {!isLogin && (
                  <label style={styles.inputLabel}>
                    Confirm Password
                    <input
                      type="password"
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      style={styles.input}
                    />
                  </label>
                )}

                <button type="submit" style={styles.submitButton}>
                  {isLogin ? 'Sign In' : 'Create account'}
                </button>
              </form>
            </div>
          </div>

          <div style={styles.rightColumn}>
            <div style={styles.imageFrame}>
              <img src={heroImage} alt="Fashionable models" style={styles.heroImage} />
              <div style={styles.imageOverlay}>
                <span style={styles.overlayTag}>Modern style for everyone</span>
                <h3 style={styles.overlayTitle}>Fashion for men and women</h3>
                <p style={styles.overlayText}>A premium visual experience with the latest runway-inspired looks.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    background: 'radial-gradient(circle at top, rgba(99, 102, 241, 0.18), transparent 28%), linear-gradient(180deg, #020617 0%, #09090b 100%)',
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  panel: {
    width: '100%',
    maxWidth: '1180px',
    borderRadius: '32px',
    overflow: 'hidden',
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    boxShadow: '0 50px 120px rgba(0,0,0,0.35)',
    border: '1px solid rgba(148, 163, 184, 0.12)',
  },
  headerBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    padding: '1.5rem 2rem 0',
  },
  brand: {
    color: '#f8fafc',
    fontSize: '1.3rem',
    fontWeight: '700',
    letterSpacing: '0.02em',
  },
  brandAccent: {
    color: '#8b5cf6',
  },
  toggleGroup: {
    display: 'inline-flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },
  toggleButton: {
    border: '1px solid rgba(148, 163, 184, 0.3)',
    background: 'transparent',
    color: '#cbd5e1',
    padding: '0.8rem 1.2rem',
    borderRadius: '999px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 180ms ease',
  },
  toggleActive: {
    background: 'linear-gradient(135deg, #7c3aed, #4338ca)',
    color: '#ffffff',
    borderColor: 'transparent',
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1.05fr 0.95fr',
    minHeight: 'calc(100vh - 4rem)',
  },
  leftColumn: {
    padding: '2rem 2.5rem 2.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '2rem',
  },
  heroIntro: {
    maxWidth: '520px',
  },
  smallHeadline: {
    color: '#a5b4fc',
    textTransform: 'uppercase',
    letterSpacing: '0.24em',
    fontSize: '0.78rem',
    marginBottom: '1rem',
  },
  heroTitle: {
    fontSize: '3.1rem',
    lineHeight: '1.02',
    margin: 0,
    color: '#f8fafc',
  },
  heroCopy: {
    marginTop: '1.2rem',
    maxWidth: '560px',
    fontSize: '1rem',
    lineHeight: '1.8',
    color: '#cbd5e1',
  },
  formCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.96)',
    border: '1px solid rgba(148, 163, 184, 0.12)',
    borderRadius: '28px',
    padding: '2rem',
    boxShadow: '0 30px 80px rgba(0,0,0,0.18)',
  },
  formHeader: {
    marginBottom: '1.5rem',
  },
  sectionLabel: {
    color: '#a5b4fc',
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    letterSpacing: '0.24em',
    marginBottom: '0.5rem',
    display: 'block',
  },
  sectionTitle: {
    color: '#f8fafc',
    fontSize: '1.8rem',
    margin: 0,
    lineHeight: '1.1',
  },
  errorBox: {
    color: '#fecaca',
    backgroundColor: 'rgba(254, 202, 202, 0.16)',
    border: '1px solid rgba(248, 113, 113, 0.4)',
    borderRadius: '18px',
    padding: '0.95rem 1rem',
    marginBottom: '1rem',
  },
  successBox: {
    color: '#bbf7d0',
    backgroundColor: 'rgba(134, 239, 172, 0.14)',
    border: '1px solid rgba(110, 231, 183, 0.35)',
    borderRadius: '18px',
    padding: '0.95rem 1rem',
    marginBottom: '1rem',
  },
  form: {
    display: 'grid',
    gap: '1rem',
  },
  inputLabel: {
    display: 'grid',
    gap: '0.5rem',
    color: '#f8fafc',
    fontSize: '0.95rem',
    fontWeight: '600',
  },
  input: {
    width: '100%',
    minHeight: '3rem',
    padding: '0.95rem 1rem',
    borderRadius: '16px',
    border: '1px solid rgba(148, 163, 184, 0.24)',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    color: '#e5e7eb',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 180ms ease-in-out, box-shadow 180ms ease-in-out',
  },
  submitButton: {
    marginTop: '0.5rem',
    width: '100%',
    padding: '1rem',
    borderRadius: '20px',
    border: 'none',
    background: 'linear-gradient(135deg, #8b5cf6, #4f46e5)',
    color: '#f8fafc',
    fontWeight: '700',
    fontSize: '1rem',
    cursor: 'pointer',
    boxShadow: '0 20px 30px rgba(79, 70, 229, 0.25)',
  },
  rightColumn: {
    position: 'relative',
    overflow: 'hidden',
    minHeight: '100%',
  },
  imageFrame: {
    position: 'relative',
    minHeight: '100%',
    width: '100%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    aspectRatio: '4 / 5',
    filter: 'brightness(0.75) contrast(1.05)',
  },
  imageOverlay: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '2rem',
    background: 'linear-gradient(180deg, transparent 40%, rgba(15, 23, 42, 0.88) 100%)',
  },
  overlayTag: {
    color: '#a5b4fc',
    textTransform: 'uppercase',
    fontSize: '0.78rem',
    letterSpacing: '0.22em',
    marginBottom: '1rem',
  },
  overlayTitle: {
    color: '#ffffff',
    fontSize: '2.1rem',
    margin: 0,
    lineHeight: '1.05',
  },
  overlayText: {
    marginTop: '1rem',
    color: '#cbd5e1',
    maxWidth: '18rem',
    lineHeight: '1.8',
  },
};
