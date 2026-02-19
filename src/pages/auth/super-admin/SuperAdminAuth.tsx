import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';
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

        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        try {
            setIsLoading(true);

            const response = await authService.login({
                email,
                password,
            });

            // Set auth state
            setAuth(response);

            // Navigate based on role
            if (response.user.isSuperAdmin || response.user.role === 'SUPER_ADMIN') {
                navigate('/super-admin/dashboard');
            } else {
                navigate('/dashboard');
            }
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Invalid email or password';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="super-admin-login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="shield-icon-wrapper">
                        <Shield size={24} />
                    </div>
                    <h1 className="login-title">Super Admin Access</h1>
                    <p className="login-subtitle">Secure entrance to core protocols.</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <div className="login-alert">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    <div className="input-group">
                        <label className="input-label">Admin Credentials</label>
                        <div className="input-relative">
                            <Mail className="input-icon" />
                            <input
                                type="email"
                                className="login-input"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Security Key</label>
                        <div className="input-relative">
                            <Lock className="input-icon" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="login-input"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="login-submit-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Accessing...' : 'Sign In'}
                    </button>
                </form>

                <div className="login-footer">
                    <div className="security-info">
                        <Shield size={12} />
                        <span>Secure Session</span>
                    </div>
                    <p className="security-desc">Authorized personnel only. All access attempts are monitored and logged.</p>
                </div>
            </div>
        </div>
    );
}
