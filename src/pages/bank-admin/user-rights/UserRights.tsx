import { useState, useEffect, useCallback } from 'react';
import {
    ShieldCheck,
    Save,
    RotateCcw,
    Loader2,
    Users,
    Building2,
    UserCog,
    Briefcase,
    DollarSign,
    BarChart2,
    Key,
} from 'lucide-react';
import { bankRoleService, type BankRole } from '@/services/bank-user.service';
import { useToast } from '@/hooks/use-toast';
import './UserRights.css';

// ── All permissions from backend ──────────────────────────────────
const ALL_PERMISSIONS: { code: string; label: string; description: string; group: string }[] = [
    // Bank Management
    { code: 'CREATE_BANK', label: 'Create Bank', description: 'Register a new banking entity', group: 'Bank' },
    { code: 'VIEW_BANK', label: 'View Bank', description: 'View bank details & profile', group: 'Bank' },
    { code: 'SUSPEND_BANK', label: 'Suspend Bank', description: 'Freeze / suspend bank operations', group: 'Bank' },

    // Branch
    { code: 'CREATE_BRANCH', label: 'Create Branch', description: 'Open a new branch', group: 'Branch' },
    { code: 'VIEW_BRANCH', label: 'View Branch', description: 'Read branch information', group: 'Branch' },

    // Users / Staff
    { code: 'CREATE_USER', label: 'Create User', description: 'Onboard new staff / users', group: 'Staff' },
    { code: 'VIEW_USER', label: 'View Users', description: 'Browse staff directory', group: 'Staff' },

    // Customers
    { code: 'CREATE_CUSTOMER', label: 'Create Customer', description: 'Register a new bank customer', group: 'Customers' },
    { code: 'VIEW_CUSTOMER', label: 'View Customers', description: 'Browse customer registry', group: 'Customers' },

    // Loans
    { code: 'CREATE_LOAN', label: 'Create Loan', description: 'Initiate a new loan application', group: 'Loans' },
    { code: 'APPROVE_LOAN', label: 'Approve Loan', description: 'Sanction / approve loan requests', group: 'Loans' },
    { code: 'VIEW_LOAN', label: 'View Loans', description: 'Browse loan portfolio', group: 'Loans' },
    { code: 'COLLECT_EMI', label: 'Collect EMI', description: 'Accept / process EMI payments', group: 'Loans' },

    // Reports
    { code: 'VIEW_REPORTS', label: 'View Reports', description: 'Access analytics & ledger reports', group: 'Reports' },
];

const GROUP_ICONS: Record<string, React.ElementType> = {
    Bank: Building2,
    Branch: Building2,
    Staff: Users,
    Customers: UserCog,
    Loans: Briefcase,
    Reports: BarChart2,
};

const GROUPS = ['Bank', 'Branch', 'Staff', 'Customers', 'Loans', 'Reports'];

const ROLE_ICON_MAP: Record<string, React.ElementType> = {
    BANK_ADMIN: ShieldCheck,
    BRANCH_ADMIN: Building2,
    MANAGER: UserCog,
    STAFF: Users,
    CASHIER: DollarSign,
    ACCOUNTANT: BarChart2,
};

// helper: derive a friendly label if the role code doesn't map exactly
const roleIcon = (code: string): React.ElementType =>
    ROLE_ICON_MAP[code] ?? Key;

interface DraftMap {
    [roleId: string]: string[];   // roleId → permissions
}

export function UserRights() {
    const { toast } = useToast();
    const [roles, setRoles] = useState<BankRole[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeRoleId, setActiveRoleId] = useState<string | null>(null);
    const [drafts, setDrafts] = useState<DraftMap>({});           // unsaved changes
    const [originalDrafts, setOriginalDrafts] = useState<DraftMap>({});
    const [saving, setSaving] = useState(false);

    const fetchRoles = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await bankRoleService.getAll();
            setRoles(data);

            // Initialise drafts from fetched permissions
            const init: DraftMap = {};
            for (const r of data) {
                init[r._id] = [...(r.permissions ?? [])];
            }
            setDrafts(init);
            setOriginalDrafts(init);

            if (data.length > 0 && !activeRoleId) {
                setActiveRoleId(data[0]._id);
            }
        } catch {
            toast({ title: 'Error', description: 'Failed to load roles', variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    }, [activeRoleId, toast]);

    useEffect(() => { fetchRoles(); }, []);     // eslint-disable-line react-hooks/exhaustive-deps

    const activeRole = roles.find(r => r._id === activeRoleId) ?? null;
    const activePerms = activeRoleId ? (drafts[activeRoleId] ?? []) : [];
    const isDirty = activeRoleId
        ? JSON.stringify([...(drafts[activeRoleId] ?? [])].sort()) !==
        JSON.stringify([...(originalDrafts[activeRoleId] ?? [])].sort())
        : false;

    const togglePermission = (permCode: string) => {
        if (!activeRoleId) return;
        setDrafts(prev => {
            const current = prev[activeRoleId] ?? [];
            const next = current.includes(permCode)
                ? current.filter(p => p !== permCode)
                : [...current, permCode];
            return { ...prev, [activeRoleId]: next };
        });
    };

    const handleSave = async () => {
        if (!activeRoleId) return;
        setSaving(true);
        try {
            await bankRoleService.updatePermissions(activeRoleId, drafts[activeRoleId] ?? []);
            setOriginalDrafts(prev => ({ ...prev, [activeRoleId]: [...(drafts[activeRoleId] ?? [])] }));
            toast({ title: 'Rights Updated', description: `Permissions saved for ${activeRole?.name}` });
        } catch {
            toast({ title: 'Error', description: 'Failed to save permissions', variant: 'destructive' });
        } finally {
            setSaving(false);
        }
    };

    const handleReset = () => {
        if (!activeRoleId) return;
        setDrafts(prev => ({ ...prev, [activeRoleId]: [...(originalDrafts[activeRoleId] ?? [])] }));
    };

    if (isLoading) {
        return (
            <div className="ur-container">
                <div className="ur-loading">
                    <div className="ur-loading-spinner" />
                    <p style={{ fontSize: 13, fontWeight: 600 }}>Loading role definitions…</p>
                </div>
            </div>
        );
    }

    return (
        <div className="ur-container animate-fade-in">
            {/* ── Header ── */}
            <div className="ur-header">
                <div className="ur-header-left">
                    <h1>User Rights &amp; Permissions</h1>
                    <p>Define exactly which actions each role is authorised to perform across the platform.</p>
                    <span className="ur-header-badge">
                        <ShieldCheck size={12} />
                        Role-Based Access Control
                    </span>
                </div>
            </div>

            {/* ── Role Tabs ── */}
            <div className="ur-tabs">
                {roles.map(role => {
                    const Icon = roleIcon(role.code);
                    const isActive = role._id === activeRoleId;
                    const hasDirty = JSON.stringify([...(drafts[role._id] ?? [])].sort()) !==
                        JSON.stringify([...(originalDrafts[role._id] ?? [])].sort());
                    return (
                        <button
                            key={role._id}
                            className={`ur-tab ${isActive ? 'active' : ''}`}
                            onClick={() => setActiveRoleId(role._id)}
                        >
                            <Icon size={14} />
                            {role.name}
                            {hasDirty && <span className="ur-dirty-dot" title="Unsaved changes" />}
                        </button>
                    );
                })}
            </div>

            {/* ── Permission Matrix Card ── */}
            {activeRole && (
                <div className="ur-card">
                    {/* Card Header */}
                    <div className="ur-card-header">
                        <div className="ur-role-badge">
                            <div className="ur-role-icon">
                                {(() => {
                                    const Icon = roleIcon(activeRole.code);
                                    return <Icon size={20} />;
                                })()}
                            </div>
                            <div>
                                <p className="ur-role-name">{activeRole.name}</p>
                                <p className="ur-role-code">{activeRole.code}</p>
                            </div>
                        </div>
                        <span className="ur-perm-count">
                            {activePerms.length} / {ALL_PERMISSIONS.length} permissions active
                        </span>
                    </div>

                    {/* Permission Groups */}
                    <div className="ur-groups">
                        {GROUPS.map(group => {
                            const GroupIcon = GROUP_ICONS[group] ?? Key;
                            const groupPerms = ALL_PERMISSIONS.filter(p => p.group === group);
                            if (!groupPerms.length) return null;
                            return (
                                <div className="ur-group" key={group}>
                                    <div className="ur-group-title">
                                        <GroupIcon size={13} />
                                        {group} Management
                                        <div className="ur-group-line" />
                                        <span style={{ fontSize: 10, fontWeight: 700, color: '#009BB0', whiteSpace: 'nowrap' }}>
                                            {groupPerms.filter(p => activePerms.includes(p.code)).length}/{groupPerms.length}
                                        </span>
                                    </div>
                                    <div className="ur-permissions-grid">
                                        {groupPerms.map(perm => {
                                            const enabled = activePerms.includes(perm.code);
                                            return (
                                                <div
                                                    key={perm.code}
                                                    className={`ur-perm-row ${enabled ? 'enabled' : ''}`}
                                                    onClick={() => togglePermission(perm.code)}
                                                    role="checkbox"
                                                    aria-checked={enabled}
                                                    tabIndex={0}
                                                    onKeyDown={e => e.key === 'Enter' && togglePermission(perm.code)}
                                                >
                                                    <div className="ur-perm-info">
                                                        <span className="ur-perm-label">{perm.label}</span>
                                                        <span className="ur-perm-desc">{perm.description}</span>
                                                    </div>
                                                    <div className={`ur-toggle ${enabled ? 'on' : ''}`}>
                                                        <div className="ur-toggle-knob" />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ── Sticky Action Bar ── */}
            <div className="ur-action-bar">
                <div className="ur-action-info">
                    <strong>
                        {isDirty ? '⚠ Unsaved changes detected' : 'All changes saved'}
                    </strong>
                    <span>
                        {isDirty
                            ? `You have pending permission changes for "${activeRole?.name}". Click Save to apply.`
                            : 'Role permissions are up-to-date with the system.'}
                    </span>
                </div>
                <div className="ur-action-btns">
                    <button
                        className="ur-btn-reset"
                        onClick={handleReset}
                        disabled={!isDirty}
                    >
                        <RotateCcw size={14} style={{ display: 'inline', marginRight: 6 }} />
                        Reset
                    </button>
                    <button
                        className="ur-btn-save"
                        onClick={handleSave}
                        disabled={!isDirty || saving}
                    >
                        {saving
                            ? <Loader2 size={15} style={{ animation: 'spin 0.7s linear infinite' }} />
                            : <Save size={15} />}
                        {saving ? 'Saving…' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
}
