import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, Building2, AlertCircle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useTenant } from '@/hooks/useTenant';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/auth.service';
import './BankAdminAuth.css';

export function BankAdminAuth() {
    const navigate = useNavigate();
    const { branch, branchName, isResolving, isResolved, error: tenantError, resolveTenant } = useTenant();
    const { setAuth } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        resolveTenant().catch((err: unknown) => {
            console.error('Failed to resolve branch:', err);
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        if (!branch) {
            setError('Branch information not available. Please wait for the page to load completely.');
            resolveTenant();
            return;
        }

        try {
            setIsLoading(true);

            const response = await authService.login({
                email,
                password,
            });

            setAuth(response);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    if (isResolving || (!isResolved && !tenantError)) {
        return (
            <div className="bank-login-loading">
                <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">
                    <div className="relative">
                        <div className="h-16 w-16 rounded-2xl bg-indigo-600 animate-bounce shadow-xl flex items-center justify-center">
                            <Building2 className="text-white h-8 w-8" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-emerald-500 border-4 border-white"></div>
                    </div>
                    <div className="text-center space-y-2">
                        <h2 className="text-xl font-bold text-slate-800">Initializing Portal</h2>
                        <p className="text-slate-400 text-sm animate-pulse">Mapping secure connection to your branch...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (tenantError) {
        return (
            <div className="bank-login-error">
                <Card className="w-full max-w-md border-none shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
                    <div className="h-2 bg-red-500"></div>
                    <CardHeader className="text-center pt-8">
                        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="h-8 w-8 text-red-500" />
                        </div>
                        <CardTitle className="text-2xl font-black text-slate-800 tracking-tight">Access Denied</CardTitle>
                        <CardDescription className="text-slate-500 text-base">
                            We couldn't locate this branch on our network
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pb-8">
                        <Alert variant="destructive" className="bg-red-50 border-red-100 text-red-800 rounded-xl">
                            <AlertDescription className="font-medium text-center">{tenantError}</AlertDescription>
                        </Alert>
                        <div className="text-center">
                            <Button
                                variant="outline"
                                className="w-full h-12 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50"
                                onClick={() => window.location.reload()}
                            >
                                Retry Connection
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="bank-admin-login-container">
            <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-2">
                        <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
                        <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-widest">Branch Access</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight text-gradient">Bank Admin</h1>
                    <p className="text-slate-500 font-medium">Enterprise Portal Infrastructure</p>
                </div>

                <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-3xl overflow-hidden bg-white">
                    <div className="bg-indigo-600 p-8 text-white text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                        <Building2 className="h-10 w-10 mx-auto mb-3 opacity-90" />
                        <h2 className="text-xl font-bold">{branchName || 'Institution Login'}</h2>
                        <p className="text-indigo-100 text-sm opacity-80 mt-1">Authenticated Entry Protocol</p>
                    </div>

                    <CardContent className="p-8 pt-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <Alert variant="destructive" className="bg-red-50 border-red-100 text-red-700 rounded-xl">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription className="font-medium">{error}</AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                    Operator ID / Email
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="operator@bank.com"
                                        value={email}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                        className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all text-base"
                                        required
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <label htmlFor="password" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        Security Key
                                    </label>
                                    <a href="#" className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700">Restore Access?</a>
                                </div>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                        <Lock className="h-5 w-5" />
                                    </div>
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                        className="h-14 pl-12 pr-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all text-base"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 text-lg font-bold group transition-all"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-3">
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white"></div>
                                        <span>Verifying...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <span>Initialize Session</span>
                                        <Building2 className="h-5 w-5 opacity-50 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="text-center pt-4">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        System Terminal ID: {branch?.id?.substring(0, 8) || 'UNK-NODE'}
                    </p>
                </div>
            </div>
        </div>
    );
}
