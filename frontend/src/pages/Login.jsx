import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiClient, setToken } from "../api/client";
import ThemeToggle from "../components/ThemeToggle";

const APP_NAME = "Fashion Fit AI";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await apiClient.post("/auth/login", { email, password }, { auth: false });
      setToken(response.data.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-viewport auth-viewport--center">
      <ThemeToggle />

      <div className="auth-center">
        <p className="auth-wordmark">{APP_NAME}</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field-underline">
            <label htmlFor="login-email" className="sr-only">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="email"
              required
            />
          </div>

          <div className="field-underline">
            <label htmlFor="login-password" className="sr-only">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              required
            />
          </div>

          <div className="auth-forgot">
            <button type="button" className="auth-link-muted">
              Forgot Password?
            </button>
          </div>

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="btn-accent" disabled={loading}>
            {loading ? "Logging in…" : "Log In"}
          </button>
        </form>

        <div className="auth-divider">
          <span>Or continue with</span>
        </div>

        <div className="auth-social-row">
          <button type="button" className="auth-social-btn" disabled aria-label="Continue with Google" />
          <button type="button" className="auth-social-btn" disabled aria-label="Continue with Apple" />
          <button type="button" className="auth-social-btn" disabled aria-label="Continue with Facebook" />
        </div>

        <p className="auth-switch">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="auth-switch-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
