import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

/**
 * 10. Exceptional Condition Mishandling - Component to catch UI errors 
 * and prevent the entire application from crashing.
 */
class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // 9. Security Logging - Log the error to an internal system (mocked here as console)
        console.error('Uncaught error (Security Audit):', error, errorInfo);
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: undefined });
        window.location.href = '/dashboard';
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
                    <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
                        <div className="w-20 h-20 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-amber-500/20">
                            <AlertCircle className="text-amber-500 w-10 h-10" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Circuit Interrupted</h1>
                        <p className="text-slate-400 mb-8">
                            An unexpected condition occurred. Our security systems have neutralized the exception to protect your session.
                        </p>
                        <button
                            onClick={this.handleReset}
                            className="w-full bg-indigo-600 hover:bg-indigo-550 text-white font-bold py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 group"
                        >
                            <RotateCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                            Restore Session
                        </button>
                        <p className="mt-6 text-[10px] text-slate-600 font-mono uppercase tracking-[0.2em]">
                            ERR-TOKEN: {Math.random().toString(36).substring(2, 10).toUpperCase()}
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
