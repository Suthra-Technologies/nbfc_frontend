import { useState, useEffect, useCallback } from 'react';
import {
    ShieldCheck, Save, RotateCcw, Loader2, Users, Building2, UserCog,
    Briefcase, DollarSign, BarChart2, Key, UserPlus,
    Mail, Phone, Lock, CheckCircle, XCircle, Search, X,
    Eye, EyeOff, Edit2, Power,
} from 'lucide-react';
import { bankRoleService, bankUserService, type BankRole, type BankUser } from '@/services/bank-user.service';
import { useToast } from '@/hooks/use-toast';
import './UserRights.css';

// ── All permissions ───────────────────────────────────────────────────
const ALL_PERMISSIONS: { code: string; label: string; description: string; group: string }[] = [
    { code: 'CREATE_BANK', label: 'Create Bank', description: 'Register a new banking entity', group: 'Bank' },
    { code: 'VIEW_BANK', label: 'View Bank', description: 'View bank details & profile', group: 'Bank' },
    { code: 'SUSPEND_BANK', label: 'Suspend Bank', description: 'Freeze / suspend bank operations', group: 'Bank' },
    { code: 'CREATE_BRANCH', label: 'Create Branch', description: 'Open a new branch', group: 'Branch' },
    { code: 'VIEW_BRANCH', label: 'View Branch', description: 'Read branch information', group: 'Branch' },
    { code: 'CREATE_USER', label: 'Create User', description: 'Onboard new staff / users', group: 'Staff' },
    { code: 'VIEW_USER', label: 'View Users', description: 'Browse staff directory', group: 'Staff' },
    { code: 'CREATE_CUSTOMER', label: 'Create Customer', description: 'Register a new bank customer', group: 'Customers' },
    { code: 'VIEW_CUSTOMER', label: 'View Customers', description: 'Browse customer registry', group: 'Customers' },
    { code: 'CREATE_LOAN', label: 'Create Loan', description: 'Initiate a new loan application', group: 'Loans' },
    { code: 'APPROVE_LOAN', label: 'Approve Loan', description: 'Sanction / approve loan requests', group: 'Loans' },
    { code: 'VIEW_LOAN', label: 'View Loans', description: 'Browse loan portfolio', group: 'Loans' },
    { code: 'COLLECT_EMI', label: 'Collect EMI', description: 'Accept / process EMI payments', group: 'Loans' },
    // Producer Company
    { code: 'MANAGE_PRODUCER_MEMBERS', label: 'Manage Members', description: 'Create & manage producer members', group: 'Producer' },
    { code: 'MANAGE_SHARE_CAPITAL', label: 'Share Capital', description: 'Manage share capital transactions', group: 'Producer' },
    { code: 'MANAGE_DEPOSITS', label: 'Manage Deposits', description: 'Handle FDs, RDs and savings', group: 'Producer' },
    { code: 'MANAGE_INSURANCE', label: 'Manage Insurance', description: 'Handle insurance modules', group: 'Producer' },
    // Accounting
    { code: 'MANAGE_ACCOUNTS', label: 'Manage Accounts', description: 'Chart of accounts management', group: 'Accounting' },
    { code: 'MANAGE_VOUCHERS', label: 'Manage Vouchers', description: 'Create & post vouchers', group: 'Accounting' },
    { code: 'VIEW_LEDGER', label: 'View Ledger', description: 'Read general ledger entries', group: 'Accounting' },
    { code: 'MANAGE_CHEQUES', label: 'Manage Cheques', description: 'Cheque issuance & clearance', group: 'Accounting' },
    // Reports
    { code: 'VIEW_REPORTS', label: 'View Reports', description: 'Access analytics & ledger reports', group: 'Reports' },
    { code: 'VIEW_ANALYTICS', label: 'View Analytics', description: 'MIS dashboards & KPIs', group: 'Reports' },
    { code: 'VIEW_MIS_REPORTS', label: 'MIS Reports', description: 'Management Information System reports', group: 'Reports' },
];

const GROUP_ICONS: Record<string, React.ElementType> = {
    Bank: Building2, Branch: Building2, Staff: Users, Customers: UserCog,
    Loans: Briefcase, Producer: DollarSign, Accounting: BarChart2, Reports: BarChart2,
};
const GROUPS = ['Bank', 'Branch', 'Staff', 'Customers', 'Loans', 'Producer', 'Accounting', 'Reports'];

const ROLE_ICON_MAP: Record<string, React.ElementType> = {
    BANK_ADMIN: ShieldCheck, BRANCH_ADMIN: Building2, MANAGER: UserCog,
    STAFF: Users, CASHIER: DollarSign, ACCOUNTANT: BarChart2,
};
const roleIcon = (code: string): React.ElementType => ROLE_ICON_MAP[code] ?? Key;

interface DraftMap { [roleId: string]: string[] }

// ── Staff Form Modal ──────────────────────────────────────────────────
interface StaffFormProps {
    roles: BankRole[];
    initial?: BankUser | null;
    onClose: () => void;
    onSaved: () => void;
}

function StaffFormModal({ roles, initial, onClose, onSaved }: StaffFormProps) {
    const { toast } = useToast();
    const isEdit = !!initial;
    const [form, setForm] = useState({
        fullName: initial?.fullName ?? '',
        email: initial?.email ?? '',
        mobile: initial?.mobile ?? '',
        password: '',
        roleId: initial?.roleId?._id ?? '',
        branchId: '',
    });
    const [showPwd, setShowPwd] = useState(false);
    const [saving, setSaving] = useState(false);

    const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.roleId) { toast({ title: 'Role required', description: 'Please select a role for this staff member.', variant: 'destructive' }); return; }
        setSaving(true);
        try {
            if (isEdit) {
                const payload: any = { fullName: form.fullName, mobile: form.mobile, roleId: form.roleId };
                if (form.password) payload.password = form.password;
                await bankUserService.update(initial!._id, payload);
                toast({ title: 'Staff Updated', description: `${form.fullName}'s details have been updated.` });
            } else {
                await bankUserService.create({ ...form });
                toast({ title: 'Staff Added', description: `${form.fullName} has been onboarded successfully.` });
            }
            onSaved();
            onClose();
        } catch (err: any) {
            const msg = err?.response?.data?.message ?? 'Failed to save staff member.';
            toast({ title: 'Error', description: msg, variant: 'destructive' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="ur-modal-overlay" onClick={onClose}>
            <div className="ur-modal" onClick={e => e.stopPropagation()}>
                <div className="ur-modal-header">
                    <div className="ur-modal-title-row">
                        <div className="ur-modal-icon"><UserPlus size={20} /></div>
                        <div>
                            <p className="ur-modal-title">{isEdit ? 'Edit Staff Member' : 'Add New Staff'}</p>
                            <p className="ur-modal-sub">{isEdit ? 'Update the staff member\'s information.' : 'Onboard a new employee to the system.'}</p>
                        </div>
                    </div>
                    <button className="ur-modal-close" onClick={onClose}><X size={18} /></button>
                </div>

                <form onSubmit={handleSubmit} className="ur-modal-body" autoComplete="off">
                    {/* Hidden fields trick browser into not autofilling visible fields */}
                    <input type="text" name="prevent_autofill" style={{ display: 'none' }} readOnly />
                    <input type="password" name="prevent_password" style={{ display: 'none' }} readOnly />
                    <div className="ur-form-grid">
                        <div className="ur-form-field ur-form-full">
                            <label className="ur-form-label">Full Name *</label>
                            <div className="ur-form-input-wrap">
                                <Users size={15} className="ur-form-icon" />
                                <input className="ur-form-input" value={form.fullName}
                                    autoComplete="name"
                                    onChange={e => set('fullName', e.target.value)}
                                    placeholder="e.g. Ravi Kumar" required />
                            </div>
                        </div>
                        <div className="ur-form-field">
                            <label className="ur-form-label">Email Address *</label>
                            <div className="ur-form-input-wrap">
                                <Mail size={15} className="ur-form-icon" />
                                <input className="ur-form-input" type="email" value={form.email}
                                    autoComplete="off"
                                    onChange={e => set('email', e.target.value)}
                                    placeholder="staff@bank.com" required disabled={isEdit} />
                            </div>
                        </div>
                        <div className="ur-form-field">
                            <label className="ur-form-label">Mobile Number *</label>
                            <div className="ur-form-input-wrap">
                                <Phone size={15} className="ur-form-icon" />
                                <input className="ur-form-input" type="tel" value={form.mobile}
                                    autoComplete="off"
                                    name="staff_mobile"
                                    onChange={e => set('mobile', e.target.value)}
                                    placeholder="9876543210" required />
                            </div>
                        </div>
                        <div className="ur-form-field">
                            <label className="ur-form-label">{isEdit ? 'New Password (leave blank to keep)' : 'Password *'}</label>
                            <div className="ur-form-input-wrap">
                                <Lock size={15} className="ur-form-icon" />
                                <input className="ur-form-input" type={showPwd ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    name="staff_password"
                                    value={form.password} onChange={e => set('password', e.target.value)}
                                    placeholder="••••••••" required={!isEdit} style={{ paddingRight: 40 }} />
                                <button type="button" className="ur-pwd-toggle" onClick={() => setShowPwd(p => !p)}>
                                    {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                                </button>
                            </div>
                        </div>
                        <div className="ur-form-field ur-form-full">
                            <label className="ur-form-label">Assign Role *</label>
                            <div className="ur-role-selector">
                                {roles.map(r => {
                                    const Icon = roleIcon(r.code);
                                    const active = form.roleId === r._id;
                                    return (
                                        <button key={r._id} type="button"
                                            className={`ur-role-chip ${active ? 'active' : ''}`}
                                            onClick={() => set('roleId', r._id)}>
                                            <Icon size={14} />
                                            {r.name}
                                            {active && <CheckCircle size={13} className="ur-chip-check" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="ur-modal-footer">
                        <button type="button" className="ur-btn-reset" onClick={onClose}>Cancel</button>
                        <button type="submit" className="ur-btn-save" disabled={saving}>
                            {saving ? <Loader2 size={15} className="spin" /> : <Save size={15} />}
                            {saving ? 'Saving…' : (isEdit ? 'Update Staff' : 'Add Staff')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ── Main Component ────────────────────────────────────────────────────
type PageTab = 'staff' | 'rights';

export function UserRights() {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState<PageTab>('staff');

    // ── Rights state ──
    const [roles, setRoles] = useState<BankRole[]>([]);
    const [isLoadingRoles, setIsLoadingRoles] = useState(true);
    const [activeRoleId, setActiveRoleId] = useState<string | null>(null);
    const [drafts, setDrafts] = useState<DraftMap>({});
    const [originalDrafts, setOriginalDrafts] = useState<DraftMap>({});
    const [saving, setSaving] = useState(false);

    // ── Staff state ──
    const [staff, setStaff] = useState<BankUser[]>([]);
    const [isLoadingStaff, setIsLoadingStaff] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState<BankUser | null>(null);
    const [togglingId, setTogglingId] = useState<string | null>(null);

    // ── Fetch roles ──
    const fetchRoles = useCallback(async () => {
        setIsLoadingRoles(true);
        try {
            const data = await bankRoleService.getAll();
            setRoles(data);
            const init: DraftMap = {};
            for (const r of data) init[r._id] = [...(r.permissions ?? [])];
            setDrafts(init);
            setOriginalDrafts(init);
            if (data.length > 0 && !activeRoleId) setActiveRoleId(data[0]._id);
        } catch {
            toast({ title: 'Error', description: 'Failed to load roles', variant: 'destructive' });
        } finally {
            setIsLoadingRoles(false);
        }
    }, []); // eslint-disable-line

    // ── Fetch staff ──
    const fetchStaff = useCallback(async () => {
        setIsLoadingStaff(true);
        try {
            const data = await bankUserService.getAll();
            setStaff(data);
        } catch {
            toast({ title: 'Error', description: 'Failed to load staff', variant: 'destructive' });
        } finally {
            setIsLoadingStaff(false);
        }
    }, []); // eslint-disable-line

    useEffect(() => { fetchRoles(); fetchStaff(); }, []); // eslint-disable-line

    // ── Rights helpers ──
    const activeRole = roles.find(r => r._id === activeRoleId) ?? null;
    const activePerms = activeRoleId ? (drafts[activeRoleId] ?? []) : [];
    const isDirty = activeRoleId
        ? JSON.stringify([...(drafts[activeRoleId] ?? [])].sort()) !== JSON.stringify([...(originalDrafts[activeRoleId] ?? [])].sort())
        : false;

    const togglePermission = (permCode: string) => {
        if (!activeRoleId) return;
        setDrafts(prev => {
            const current = prev[activeRoleId] ?? [];
            const next = current.includes(permCode) ? current.filter(p => p !== permCode) : [...current, permCode];
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

    // ── Staff helpers ──
    const handleToggleActive = async (user: BankUser) => {
        setTogglingId(user._id);
        try {
            await bankUserService.update(user._id, { isActive: !user.isActive });
            toast({ title: user.isActive ? 'Staff Deactivated' : 'Staff Activated', description: `${user.fullName} is now ${user.isActive ? 'inactive' : 'active'}.` });
            fetchStaff();
        } catch {
            toast({ title: 'Error', description: 'Failed to update status', variant: 'destructive' });
        } finally {
            setTogglingId(null);
        }
    };

    const filteredStaff = staff.filter(u =>
        u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.roleId?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openAdd = () => { setEditingUser(null); setShowModal(true); };
    const openEdit = (u: BankUser) => { setEditingUser(u); setShowModal(true); };

    return (
        <div className="ur-container animate-fade-in">
            {/* ── Header ── */}
            <div className="ur-header">
                <div className="ur-header-left">
                    <h1>Staff Management &amp; User Rights</h1>
                    <p>Onboard staff, assign roles, and define permissions across the bank.</p>
                    <span className="ur-header-badge"><ShieldCheck size={12} /> Role-Based Access Control</span>
                </div>
            </div>

            {/* ── Page Tabs ── */}
            <div className="ur-page-tabs">
                <button className={`ur-page-tab ${activeTab === 'staff' ? 'active' : ''}`} onClick={() => setActiveTab('staff')}>
                    <Users size={15} /> Staff Management
                    <span className="ur-page-tab-count">{staff.length}</span>
                </button>
                <button className={`ur-page-tab ${activeTab === 'rights' ? 'active' : ''}`} onClick={() => setActiveTab('rights')}>
                    <ShieldCheck size={15} /> User Rights
                    {isDirty && <span className="ur-dirty-dot" title="Unsaved changes" />}
                </button>
            </div>

            {/* ════════════════ STAFF MANAGEMENT TAB ════════════════ */}
            {activeTab === 'staff' && (
                <>
                    <div className="ur-staff-toolbar">
                        <div className="ur-search-wrap">
                            <Search size={15} className="ur-search-icon" />
                            <input className="ur-search-input" placeholder="Search by name, email or role…"
                                value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                            {searchQuery && <button className="ur-search-clear" onClick={() => setSearchQuery('')}><X size={14} /></button>}
                        </div>
                        <button className="ur-btn-add" onClick={openAdd}>
                            <UserPlus size={15} /> Add Staff Member
                        </button>
                    </div>

                    {isLoadingStaff ? (
                        <div className="ur-loading"><div className="ur-loading-spinner" /><p style={{ fontSize: 13, fontWeight: 600 }}>Loading staff…</p></div>
                    ) : filteredStaff.length === 0 ? (
                        <div className="ur-empty">
                            <Users size={40} />
                            <p>{searchQuery ? 'No staff match your search.' : 'No staff members yet. Add your first employee!'}</p>
                            {!searchQuery && <button className="ur-btn-add" onClick={openAdd}><UserPlus size={14} /> Add First Staff</button>}
                        </div>
                    ) : (
                        <div className="ur-staff-table-wrap">
                            <table className="ur-staff-table">
                                <thead>
                                    <tr>
                                        <th>Staff Member</th>
                                        <th>Contact</th>
                                        <th>Assigned Role</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStaff.map(user => {
                                        const RoleIcon = roleIcon(user.roleId?.code ?? '');
                                        const initials = user.fullName.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
                                        return (
                                            <tr key={user._id}>
                                                <td>
                                                    <div className="ur-staff-name-cell">
                                                        <div className="ur-avatar">{initials}</div>
                                                        <div>
                                                            <p className="ur-staff-name">{user.fullName}</p>
                                                            <p className="ur-staff-id">ID: {user.userId || '—'}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="ur-staff-contact">
                                                        <span><Mail size={12} /> {user.email}</span>
                                                        <span><Phone size={12} /> {user.mobile || '—'}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    {user.roleId ? (
                                                        <span className="ur-role-pill">
                                                            <RoleIcon size={11} />
                                                            {user.roleId.name}
                                                        </span>
                                                    ) : <span className="ur-no-role">No role</span>}
                                                </td>
                                                <td>
                                                    <span className={`ur-status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                                                        {user.isActive ? <CheckCircle size={11} /> : <XCircle size={11} />}
                                                        {user.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="ur-actions-cell">
                                                        <button className="ur-action-icon" title="Edit" onClick={() => openEdit(user)}>
                                                            <Edit2 size={14} />
                                                        </button>
                                                        <button
                                                            className={`ur-action-icon ${user.isActive ? 'danger' : 'success'}`}
                                                            title={user.isActive ? 'Deactivate' : 'Activate'}
                                                            onClick={() => handleToggleActive(user)}
                                                            disabled={togglingId === user._id}
                                                        >
                                                            {togglingId === user._id
                                                                ? <Loader2 size={14} className="spin" />
                                                                : <Power size={14} />
                                                            }
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}

            {/* ════════════════ USER RIGHTS TAB ════════════════ */}
            {activeTab === 'rights' && (
                <>
                    {isLoadingRoles ? (
                        <div className="ur-loading"><div className="ur-loading-spinner" /><p style={{ fontSize: 13, fontWeight: 600 }}>Loading role definitions…</p></div>
                    ) : (
                        <>
                            {/* Role Tabs */}
                            <div className="ur-tabs">
                                {roles.map(role => {
                                    const Icon = roleIcon(role.code);
                                    const isActive = role._id === activeRoleId;
                                    const hasDirty = JSON.stringify([...(drafts[role._id] ?? [])].sort()) !== JSON.stringify([...(originalDrafts[role._id] ?? [])].sort());
                                    return (
                                        <button key={role._id} className={`ur-tab ${isActive ? 'active' : ''}`} onClick={() => setActiveRoleId(role._id)}>
                                            <Icon size={14} /> {role.name}
                                            {hasDirty && <span className="ur-dirty-dot" title="Unsaved changes" />}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Permission Matrix */}
                            {activeRole && (
                                <div className="ur-card">
                                    <div className="ur-card-header">
                                        <div className="ur-role-badge">
                                            <div className="ur-role-icon">{(() => { const Icon = roleIcon(activeRole.code); return <Icon size={20} />; })()}</div>
                                            <div>
                                                <p className="ur-role-name">{activeRole.name}</p>
                                                <p className="ur-role-code">{activeRole.code}</p>
                                            </div>
                                        </div>
                                        <span className="ur-perm-count">{activePerms.length} / {ALL_PERMISSIONS.length} permissions active</span>
                                    </div>

                                    {/* ── Assigned Staff strip ── */}
                                    {(() => {
                                        const assigned = staff.filter(u => u.roleId?._id === activeRole._id);
                                        return (
                                            <div className="ur-assigned-staff-bar">
                                                <span className="ur-assigned-label">
                                                    <Users size={13} />
                                                    Assigned Staff
                                                    <span className="ur-assigned-count">{assigned.length}</span>
                                                </span>
                                                <div className="ur-assigned-list">
                                                    {assigned.length === 0 ? (
                                                        <span className="ur-assigned-empty">No staff assigned to this role yet.</span>
                                                    ) : (
                                                        assigned.map(u => {
                                                            const initials = u.fullName.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
                                                            return (
                                                                <div key={u._id} className="ur-assigned-chip" title={u.email}>
                                                                    <div className="ur-assigned-avatar">{initials}</div>
                                                                    <div className="ur-assigned-info">
                                                                        <span className="ur-assigned-name">{u.fullName}</span>
                                                                        <span className={`ur-assigned-status ${u.isActive ? 'on' : 'off'}`}>
                                                                            {u.isActive ? 'Active' : 'Inactive'}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })()}

                                    <div className="ur-groups">
                                        {GROUPS.map(group => {
                                            const GroupIcon = GROUP_ICONS[group] ?? Key;
                                            const groupPerms = ALL_PERMISSIONS.filter(p => p.group === group);
                                            if (!groupPerms.length) return null;
                                            return (
                                                <div className="ur-group" key={group}>
                                                    <div className="ur-group-title">
                                                        <GroupIcon size={13} /> {group} Management
                                                        <div className="ur-group-line" />
                                                        <span style={{ fontSize: 10, fontWeight: 700, color: '#009BB0', whiteSpace: 'nowrap' }}>
                                                            {groupPerms.filter(p => activePerms.includes(p.code)).length}/{groupPerms.length}
                                                        </span>
                                                    </div>
                                                    <div className="ur-permissions-grid">
                                                        {groupPerms.map(perm => {
                                                            const enabled = activePerms.includes(perm.code);
                                                            return (
                                                                <div key={perm.code}
                                                                    className={`ur-perm-row ${enabled ? 'enabled' : ''}`}
                                                                    onClick={() => togglePermission(perm.code)}
                                                                    role="checkbox" aria-checked={enabled} tabIndex={0}
                                                                    onKeyDown={e => e.key === 'Enter' && togglePermission(perm.code)}>
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

                            {/* Sticky Action Bar */}
                            <div className="ur-action-bar">
                                <div className="ur-action-info">
                                    <strong>{isDirty ? '⚠ Unsaved changes detected' : 'All changes saved'}</strong>
                                    <span>
                                        {isDirty
                                            ? `You have pending permission changes for "${activeRole?.name}". Click Save to apply.`
                                            : 'Role permissions are up-to-date with the system.'}
                                    </span>
                                </div>
                                <div className="ur-action-btns">
                                    <button className="ur-btn-reset" onClick={handleReset} disabled={!isDirty}><RotateCcw size={14} style={{ display: 'inline', marginRight: 6 }} />Reset</button>
                                    <button className="ur-btn-save" onClick={handleSave} disabled={!isDirty || saving}>
                                        {saving ? <Loader2 size={15} style={{ animation: 'spin 0.7s linear infinite' }} /> : <Save size={15} />}
                                        {saving ? 'Saving…' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}

            {/* ── Staff Modal ── */}
            {showModal && (
                <StaffFormModal
                    roles={roles}
                    initial={editingUser}
                    onClose={() => setShowModal(false)}
                    onSaved={fetchStaff}
                />
            )}
        </div>
    );
}
