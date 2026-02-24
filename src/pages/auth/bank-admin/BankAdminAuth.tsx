import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Lock,
    Mail,
    Eye,
    EyeOff,
    Building2,
    AlertCircle,
    ShieldCheck,
    ChevronRight,
    ArrowRight,
    Loader2
} from 'lucide-react';
import { useTenant } from '@/hooks/useTenant';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/auth.service';
import './BankAdminAuth.css';

export function BankAdminAuth() {
    const navigate = useNavigate();
    const { bank, bankName, isResolving, isResolved, error: tenantError, resolveTenant } = useTenant();
    const { setAuth, isAuthenticated } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Redirect if already authenticated
        if (isAuthenticated) {
            navigate('/dashboard');
        }

        resolveTenant();
    }, [isAuthenticated, navigate, resolveTenant]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('System requires valid Operator ID and Security Key to proceed.');
            return;
        }

        if (!bank && isResolved) {
            setError('Instance Resolution Error: Institutional context is missing.');
            return;
        }

        try {
            setIsLoading(true);

            const response = await authService.login({
                email,
                password,
            });

            // Set global auth state
            setAuth(response);

            // Navigate to personalized dashboard
            navigate('/dashboard', { replace: true });
        } catch (err: any) {
            console.error('Authentication Error:', err);
            setError(err.response?.data?.message || 'Access Denied: Invalid security credentials or unauthorized node.');
        } finally {
            setIsLoading(false);
        }
    };

    // 1. Loading State during Tenant Resolution
    if (isResolving && !bank) {
        return (
            <div className="bank-admin-login-container">
                <div className="flex flex-col items-center gap-6 animate-pulse">
                    <div className="h-16 w-16 rounded-2xl bg-indigo-600/20 flex items-center justify-center border border-indigo-500/30">
                        <Building2 className="text-indigo-400 h-8 w-8" />
                    </div>
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-slate-100">Synchronizing Node</h2>
                        <p className="text-slate-500 text-sm mt-2">Connecting to secure banking infrastructure...</p>
                    </div>
                </div>
            </div>
        );
    }

    // 2. State if no bank is selected (Main Domain)
    if (isResolved && !bank && !tenantError) {
        return (
            <div className="bank-admin-login-container">
                <div className="bank-login-card animate-fade-in border-amber-500/20">
                    <div className="bank-brand-header">
                        <div className="bank-brand-logo bg-amber-500">
                            <ShieldCheck size={32} />
                        </div>
                        <h1>Access Gateway</h1>
                        <p>Please use your institution's specific portal URL to continue.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-200 text-sm">
                            Multi-tenant protection active. Direct access to high-security nodes is restricted to verified institution domains.
                        </div>
                        <button
                            className="bank-login-btn bg-slate-800 hover:bg-slate-700 font-bold"
                            onClick={() => navigate('/auth/super-admin')}
                        >
                            Super Admin Portal
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // 3. Error State if Tenant Resolution Fails (Invalid Subdomain)
    if (tenantError) {
        return (
            <div className="bank-admin-login-container">
                <div className="bank-login-card border-red-500/20">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                            <AlertCircle className="h-8 w-8 text-red-500" />
                        </div>
                        <h2 className="text-2xl font-black text-white">Instance Not Found</h2>
                        <p className="text-slate-400 mt-2">The requested banking node is not active on our network.</p>
                    </div>
                    <button
                        className="bank-login-btn bg-slate-800 hover:bg-slate-700 font-bold"
                        onClick={() => window.location.reload()}
                    >
                        Retry Protocol
                    </button>
                </div>
            </div>
        );
    }

    // 3. Main Login Interface
    return (
        <div className="bank-admin-login-container">
            <div className="bank-login-card animate-fade-in">
                <div className="bank-brand-header">
                    <div className="bank-brand-logo">
                        {bank?.logo ? (
                            <img src={bank.logo} alt={bankName} className="w-10 h-10 object-contain" />
                        ) : (
                            <Building2 size={32} />
                        )}
                    </div>
                    <h1>{bankName || 'Institution Login'}</h1>
                    <p>Secure Operations & Management Portal</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && (
                        <div className="login-error-alert animate-shake">
                            <AlertCircle size={18} />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="login-form-group">
                        <label>Operator ID</label>
                        <div className="input-wrapper">
                            <Mail size={20} />
                            <input
                                type="email"
                                placeholder="operator@bank.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                                required
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className="login-form-group">
                        <div className="flex justify-between items-center mb-2">
                            <label style={{ marginBottom: 0 }}>Security Key</label>
                            <a href="#" className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-wider">Forgot Key?</a>
                        </div>
                        <div className="input-wrapper">
                            <Lock size={20} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bank-login-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="login-spinner" />
                                <span>Authenticating Instance...</span>
                            </>
                        ) : (
                            <>
                                <span>Initialize Session</span>
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </form>

                <div className="security-footer">
                    <p>
                        <ShieldCheck size={14} className="text-emerald-500" />
                        End-to-End Encrypted Node Connection
                    </p>
                    <div className="mt-4 text-[10px] text-slate-500 font-mono tracking-widest uppercase">
                        NODE-ID: {bank?.subdomain || 'SCANNING...'}
                    </div>
                </div>
            </div>
        </div>
    );
}
