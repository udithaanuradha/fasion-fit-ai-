import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiClient, setToken } from "../api/client";
import ThemeToggle from "../components/ThemeToggle";

const APP_NAME = "Fashion Fit AI";

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function EyeIcon({ visible }) {
  if (visible) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 3l18 18" />
      <path d="M10.6 10.6a3 3 0 0 0 4.2 4.2" />
      <path d="M9.9 5.2A10.4 10.4 0 0 1 12 5c6.4 0 10 7 10 7a15.5 15.5 0 0 1-4.2 4.9M6.1 6.1C3.6 7.8 2 12 2 12a15.6 15.6 0 0 0 5 5.6" />
    </svg>
  );
}

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await apiClient.post(
        "/auth/register",
        { fullName, email, password },
        { auth: false }
      );
      setToken(response.data.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-viewport auth-viewport--split">
      <ThemeToggle />

      <div className="auth-banner">
        <div className="auth-banner-overlay">
          <h1 className="auth-banner-headline">Made to Fit.</h1>
          <p className="auth-banner-subhead">
            Join {APP_NAME} and get outfit and color guidance built around you.
          </p>
        </div>
      </div>

      <div className="auth-panel">
        <div className="auth-card">
          <h2 className="auth-card-title">Create Account</h2>
          <p className="auth-card-subtext">Step into your personalized fitting room.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="field-underline" htmlFor="register-name">
              <span className="field-label">Full Name</span>
              <span className="field-input-row">
                <input
                  id="register-name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  autoComplete="name"
                  required
                />
                <span className="field-icon">
                  <PersonIcon />
                </span>
              </span>
            </label>

            <label className="field-underline" htmlFor="register-email">
              <span className="field-label">Email Address</span>
              <span className="field-input-row">
                <input
                  id="register-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  autoComplete="email"
                  required
                />
                <span className="field-icon">
                  <EnvelopeIcon />
                </span>
              </span>
            </label>

            <label className="field-underline" htmlFor="register-password">
              <span className="field-label">Password</span>
              <span className="field-input-row">
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
                <button
                  type="button"
                  className="field-icon-btn"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  <EyeIcon visible={showPassword} />
                </button>
              </span>
            </label>

            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}

            <button type="submit" className="btn-accent" disabled={loading}>
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <div className="auth-divider--plain" />

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login" className="auth-switch-link">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
