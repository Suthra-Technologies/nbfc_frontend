// SuperAdminLogin.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Loader2 
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/auth.service';
import './SuperAdminAuth.css';

export function SuperAdminAuth() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Email and password are required');
      return;
    }

    try {
      setIsLoading(true);
      const response = await authService.login({ email, password });

      setAuth(response);

      // Super admin routing logic
      if (response.user?.isSuperAdmin || response.user?.role === 'SUPER_ADMIN') {
        navigate('/super-admin/dashboard', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid credentials';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="super-admin-login-page">
      <div className="background-layer" />

      <div className="login-card-wrapper">
        <div className="login-card animate-fade-in">
          <div className="login-header">
            <div className="shield-wrapper">
              <Shield size={32} strokeWidth={1.8} />
            </div>
            <h1>Super Admin Portal</h1>
            <p>Restricted access — Banking Core Systems</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-alert animate-shake">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <div className="form-field">
              <label>Email</label>
              <div className="input-wrapper">
                <Mail className="field-icon" size={18} />
                <input
                  type="email"
                  placeholder="admin@bank.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="form-field">
              <label>Passphrase</label>
              <div className="input-wrapper">
                <Lock className="field-icon" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Verifying...
                </>
              ) : (
                'Secure Access'
              )}
            </button>
          </form>

          <div className="security-footer">
            <div className="security-badge">
              <Shield size={14} />
              <span>End-to-end encrypted</span>
            </div>
            <p className="security-note">
              All access attempts are logged and monitored. Unauthorized use is prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}