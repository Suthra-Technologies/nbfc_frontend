import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { CheckCircle, AlertCircle, X, Info, AlertTriangle } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message?: string;
    duration?: number; // ms, 0 = sticky
}

interface NotificationContextValue {
    notify: (opts: Omit<Notification, 'id'>) => void;
    success: (title: string, message?: string) => void;
    error: (title: string, message?: string) => void;
    warning: (title: string, message?: string) => void;
    info: (title: string, message?: string) => void;
    dismiss: (id: string) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const NotificationContext = createContext<NotificationContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const dismiss = useCallback((id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    const notify = useCallback((opts: Omit<Notification, 'id'>) => {
        const id = `notif-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        const duration = opts.duration ?? 4000;
        setNotifications(prev => [...prev, { ...opts, id }]);
        if (duration > 0) {
            setTimeout(() => dismiss(id), duration);
        }
    }, [dismiss]);

    const success  = useCallback((title: string, message?: string) => notify({ type: 'success', title, message }), [notify]);
    const error    = useCallback((title: string, message?: string) => notify({ type: 'error',   title, message, duration: 5000 }), [notify]);
    const warning  = useCallback((title: string, message?: string) => notify({ type: 'warning', title, message }), [notify]);
    const info     = useCallback((title: string, message?: string) => notify({ type: 'info',    title, message }), [notify]);

    return (
        <NotificationContext.Provider value={{ notify, success, error, warning, info, dismiss }}>
            {children}
            <NotificationContainer notifications={notifications} dismiss={dismiss} />
        </NotificationContext.Provider>
    );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useNotification() {
    const ctx = useContext(NotificationContext);
    if (!ctx) throw new Error('useNotification must be used inside <NotificationProvider>');
    return ctx;
}

// ─── Config map ───────────────────────────────────────────────────────────────

const CONFIG: Record<NotificationType, {
    icon: typeof CheckCircle;
    bg: string;
    border: string;
    iconColor: string;
    titleColor: string;
    msgColor: string;
    bar: string;
}> = {
    success: {
        icon: CheckCircle,
        bg: '#f0fdf4',
        border: '#86efac',
        iconColor: '#16a34a',
        titleColor: '#166534',
        msgColor: '#15803d',
        bar: '#16a34a',
    },
    error: {
        icon: AlertCircle,
        bg: '#fef2f2',
        border: '#fca5a5',
        iconColor: '#dc2626',
        titleColor: '#991b1b',
        msgColor: '#b91c1c',
        bar: '#dc2626',
    },
    warning: {
        icon: AlertTriangle,
        bg: '#fffbeb',
        border: '#fcd34d',
        iconColor: '#d97706',
        titleColor: '#92400e',
        msgColor: '#b45309',
        bar: '#d97706',
    },
    info: {
        icon: Info,
        bg: '#f0f9ff',
        border: '#7dd3fc',
        iconColor: '#0284c7',
        titleColor: '#0c4a6e',
        msgColor: '#0369a1',
        bar: '#0284c7',
    },
};

// ─── Container (renders all toasts) ───────────────────────────────────────────

function NotificationContainer({
    notifications,
    dismiss,
}: {
    notifications: Notification[];
    dismiss: (id: string) => void;
}) {
    if (notifications.length === 0) return null;

    return (
        <div style={{
            position: 'fixed',
            top: '1.25rem',
            right: '1.25rem',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
            maxWidth: '380px',
            width: '100%',
            pointerEvents: 'none',
        }}>
            {notifications.map(n => (
                <NotificationItem key={n.id} notification={n} dismiss={dismiss} />
            ))}
        </div>
    );
}

// ─── Single notification card ─────────────────────────────────────────────────

function NotificationItem({ notification: n, dismiss }: { notification: Notification; dismiss: (id: string) => void }) {
    const cfg = CONFIG[n.type];
    const Icon = cfg.icon;

    return (
        <div
            style={{
                pointerEvents: 'auto',
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                borderRadius: '10px',
                padding: '0',
                boxShadow: '0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                animation: 'notif-slide-in 0.3s cubic-bezier(0.175,0.885,0.32,1.275)',
            }}
        >
            {/* Accent bar */}
            <div style={{ height: '3px', background: cfg.bar }} />

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.875rem 1rem' }}>
                {/* Icon */}
                <div style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: 'white', border: `1.5px solid ${cfg.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                }}>
                    <Icon size={16} color={cfg.iconColor} />
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: '0.85rem', color: cfg.titleColor }}>{n.title}</p>
                    {n.message && (
                        <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: cfg.msgColor, lineHeight: 1.4 }}>{n.message}</p>
                    )}
                </div>

                {/* Close */}
                <button
                    onClick={() => dismiss(n.id)}
                    style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: cfg.titleColor, opacity: 0.5, padding: '2px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        borderRadius: '4px', flexShrink: 0,
                        transition: 'opacity 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}
                >
                    <X size={14} />
                </button>
            </div>

            <style>{`
                @keyframes notif-slide-in {
                    from { opacity: 0; transform: translateX(40px) scale(0.95); }
                    to   { opacity: 1; transform: translateX(0) scale(1); }
                }
            `}</style>
        </div>
    );
}
