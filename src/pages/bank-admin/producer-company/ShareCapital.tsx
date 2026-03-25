import { useState, useEffect } from 'react';
import { Save, RotateCcw, Coins, Loader2, Table } from 'lucide-react';
import './producer.css';
import { memberService } from '@/services/member.service';
import type { Member } from '@/services/member.service';
import { shareService } from '@/services/share.service';
import type { ShareIssue } from '@/services/share.service';
import { useNotification } from '@/components/common/NotificationProvider';

const EMPTY_FORM = {
    memberType: '',
    membershipId: '',
    admissionNo: '',
    customerName: '',
    nomineeAge: '',
    sharesEachOf: '100',
    noOfSharesHeld: '',
    mobileNo: '',
    customerAge: '',
    nomineeName: '',
    relation: '',
    issuedDate: new Date().toISOString().split('T')[0],
    totalAmount: '',
};

export function ShareCapital() {
    const [form, setForm] = useState(EMPTY_FORM);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [members, setMembers] = useState<Member[]>([]);
    const [shareIssues, setShareIssues] = useState<ShareIssue[]>([]);
    const [loadingMembers, setLoadingMembers] = useState(false);
    const [loadingShares, setLoadingShares] = useState(false);
    const [fetchingDetails, setFetchingDetails] = useState(false);
    const { success, error: notifyError } = useNotification();

    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));


    // Fetch data on mount
    useEffect(() => {
        const fetchData = async () => {
            setLoadingMembers(true);
            setLoadingShares(true);
            try {
                const [membersData, sharesData] = await Promise.all([
                    memberService.getAllMembers(),
                    shareService.getAllShareIssues()
                ]);
                setMembers(membersData);
                setShareIssues(sharesData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
                notifyError('Failed to load data', 'Could not fetch members or share history.');
            } finally {
                setLoadingMembers(false);
                setLoadingShares(false);
            }
        };
        fetchData();
    }, []);

    const fetchShareIssues = async () => {
        try {
            const data = await shareService.getAllShareIssues();
            setShareIssues(data);
        } catch (error) {
            console.error('Error refreshing shares:', error);
        }
    };

    // Auto-fill details when member is selected
    useEffect(() => {
        if (!form.membershipId) return;

        const fillDetails = async () => {
            setFetchingDetails(true);
            try {
                const member = await memberService.getMemberById(form.membershipId);
                if (member) {
                    setForm(prev => ({
                        ...prev,
                        customerName: member.name || '',
                        customerAge: member.age?.toString() || '',
                        mobileNo: member.mobile1 || '',
                        nomineeName: member.nominee?.name || '',
                        relation: member.nominee?.relation || '',
                        nomineeAge: member.nominee?.age?.toString() || '',
                    }));
                }
            } catch (error) {
                console.error('Failed to fetch member details:', error);
            } finally {
                setFetchingDetails(false);
            }
        };

        fillDetails();
    }, [form.membershipId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const memberRecord = members.find(m => m.memberId === form.membershipId);
            if (!memberRecord?._id) {
                throw new Error("Invalid member selection. Please select a member from the list.");
            }

            await shareService.createShareIssue({
                memberId: memberRecord._id,
                admissionNo: form.admissionNo,
                sharesEachOf: Number(form.sharesEachOf),
                noOfSharesHeld: Number(form.noOfSharesHeld),
                totalAmount: Number(form.totalAmount),
                issuedDate: form.issuedDate
            });

            success('Share Issued Successfully!', 'The share capital record has been saved.');
            setForm(EMPTY_FORM);
            fetchShareIssues();
        } catch (error: any) {
            console.error('Submit error:', error);
            notifyError('Failed to Issue Shares', error?.response?.data?.message || error.message || 'Something went wrong.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pc-container animate-fade-in">

            <div className="pc-header">
                <div className="pc-header-left">
                    <h1>Share Capital</h1>
                    <p>Issue and manage shares for Producer Company members.</p>
                    <span className="pc-badge"><Coins size={11} /> Member Shares</span>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="pc-card">
                    <div className="pc-card-header">
                        <div className="pc-card-icon"><Coins size={18} /></div>
                        <div>
                            <p className="pc-card-title">Share Issue Form</p>
                            <p className="pc-card-sub">Allocate new shares to registered members</p>
                        </div>
                    </div>

                    <div className="pc-form">
                        <div className="pc-grid">
                            <div className="pc-field">
                                <label className="pc-label">Member Type *</label>
                                <select className="pc-select" value={form.memberType} onChange={e => set('memberType', e.target.value)} required>
                                    <option value="">Select Member Type</option>
                                    <option value="MEMBER">Member</option>
                                    <option value="ASSOCIATE">Associate</option>
                                </select>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Membership No. / ID *</label>
                                <div style={{ position: 'relative' }}>
                                    <select 
                                        className="pc-select" 
                                        value={form.membershipId} 
                                        onChange={e => set('membershipId', e.target.value)} 
                                        required
                                        disabled={loadingMembers}
                                    >
                                        <option value="">{loadingMembers ? 'Loading members...' : 'Select Member'}</option>
                                        {members
                                            .filter(m => !form.memberType || m.memberType === form.memberType)
                                            .map(m => (
                                                <option key={m.memberId} value={m.memberId!}>
                                                    {m.memberId} - {m.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                    {(loadingMembers || fetchingDetails) && (
                                        <div style={{ position: 'absolute', right: '40px', top: '50%', transform: 'translateY(-50%)' }}>
                                            <Loader2 size={16} className="animate-spin" color="#64748b" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Admission No.</label>
                                <input className="pc-input" placeholder="e.g. ADM1024" value={form.admissionNo} onChange={e => set('admissionNo', e.target.value)} />
                            </div>

                            <div className="pc-field">
                                <label className="pc-label">Customer Name *</label>
                                <input className="pc-input" placeholder="Full Name" value={form.customerName} onChange={e => set('customerName', e.target.value)} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Customer Age *</label>
                                <input type="number" className="pc-input" placeholder="Years" value={form.customerAge} onChange={e => set('customerAge', e.target.value)} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Mobile Number *</label>
                                <input type="tel" className="pc-input" placeholder="10-digit number" value={form.mobileNo} onChange={e => set('mobileNo', e.target.value)} required />
                            </div>

                            <div className="pc-field">
                                <label className="pc-label">Issued Date *</label>
                                <input type="date" className="pc-input" value={form.issuedDate} onChange={e => set('issuedDate', e.target.value)} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Shares Each Of (₹) *</label>
                                <input type="number" className="pc-input" value={form.sharesEachOf} onChange={e => {
                                    const val = e.target.value;
                                    set('sharesEachOf', val);
                                    if (form.noOfSharesHeld && val) {
                                        set('totalAmount', (Number(form.noOfSharesHeld) * Number(val)).toString());
                                    }
                                }} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">No. Of Shares Held *</label>
                                <input type="number" className="pc-input" value={form.noOfSharesHeld} onChange={e => {
                                    const num = e.target.value;
                                    set('noOfSharesHeld', num);
                                    if (num && form.sharesEachOf) {
                                        set('totalAmount', (Number(num) * Number(form.sharesEachOf)).toString());
                                    }
                                }} required />
                            </div>

                            <div className="pc-field">
                                <label className="pc-label">Nominee's Name *</label>
                                <input className="pc-input" placeholder="Nominee Full Name" value={form.nomineeName} onChange={e => set('nomineeName', e.target.value)} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Relation *</label>
                                <input className="pc-input" placeholder="e.g. Spouse, Son" value={form.relation} onChange={e => set('relation', e.target.value)} required />
                            </div>
                            <div className="pc-field">
                                <label className="pc-label">Nominee's Age *</label>
                                <input type="number" className="pc-input" placeholder="Years" value={form.nomineeAge} onChange={e => set('nomineeAge', e.target.value)} required />
                            </div>

                            <div className="pc-field pc-grid-full">
                                <label className="pc-label">Total Amount (₹) *</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <input type="text" className="pc-input"
                                        value={form.totalAmount ? `₹ ${form.totalAmount}` : ''}
                                        readOnly
                                        placeholder="Calculated automatically"
                                        style={{ background: '#f8fafc', color: '#0f172a', fontWeight: 600, maxWidth: '200px' }}
                                    />
                                    {fetchingDetails && (
                                        <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Loader2 size={14} className="animate-spin" /> Fetching details...
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pc-submit-bar">
                        <span className="pc-submit-info">* All fields marked with asterisk are required.</span>
                        <div className="pc-submit-actions">
                            <button type="button" className="pc-btn-ghost" onClick={() => setForm(EMPTY_FORM)} disabled={isSubmitting}>
                                <RotateCcw size={14} /> Clear
                            </button>
                            <button type="submit" className="pc-btn-primary" style={{ backgroundColor: '#009BB0' }} disabled={isSubmitting}>
                                {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                                {isSubmitting ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {/* List Table */}
            <div className="pc-card" style={{ marginTop: '24px' }}>
                <div className="pc-card-header" style={{ padding: '16px 20px', backgroundColor: '#009BB0'}}>
                    <div className="pc-card-icon" style={{ backgroundColor: 'transparent', color: 'white', marginRight: '8px' }}><Table size={18} /></div>
                    <div>
                        <p className="pc-card-title" style={{ color: 'white', fontSize: '14px', margin: 0 }}>Issued Shares History</p>
                    </div>
                </div>

                <div style={{ padding: '16px', overflowX: 'auto' }}>
                    {loadingShares ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                            <Loader2 size={40} className="animate-spin" color="#64748b" />
                        </div>
                    ) : shareIssues.length > 0 ? (
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #cbd5e1', textAlign: 'left' }}>
                                    <th style={{ padding: '12px', fontWeight: 700, color: '#475569' }}>S.No.</th>
                                    <th style={{ padding: '12px', fontWeight: 700, color: '#475569' }}>Customer Name</th>
                                    <th style={{ padding: '12px', fontWeight: 700, color: '#475569' }}>Membership ID</th>
                                    <th style={{ padding: '12px', fontWeight: 700, color: '#475569' }}>No. Of Shares</th>
                                    <th style={{ padding: '12px', fontWeight: 700, color: '#475569' }}>Total Amount</th>
                                    <th style={{ padding: '12px', fontWeight: 700, color: '#475569' }}>Distinctive Nos.</th>
                                    <th style={{ padding: '12px', fontWeight: 700, color: '#475569' }}>Issued Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shareIssues.map((row, i) => (
                                    <tr key={row._id} style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: i % 2 === 0 ? 'white' : '#f8fafc' }}>
                                        <td style={{ padding: '12px', color: '#0f172a' }}>{i + 1}</td>
                                        <td style={{ padding: '12px', color: '#0f172a' }}>{row.memberId?.name || 'N/A'}</td>
                                        <td style={{ padding: '12px', color: '#0f172a' }}>{row.memberId?.memberId || 'N/A'}</td>
                                        <td style={{ padding: '12px', color: '#0f172a', fontWeight: 600 }}>{row.noOfSharesHeld}</td>
                                        <td style={{ padding: '12px', color: '#009BB0', fontWeight: 700 }}>₹ {row.totalAmount}</td>
                                        <td style={{ padding: '12px', color: '#64748b' }}>{row.distinctiveNos}</td>
                                        <td style={{ padding: '12px', color: '#64748b' }}>{new Date(row.issuedDate).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                            <Coins size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                            <p>No share issues found. Use the form above to issue shares.</p>
                        </div>
                    )}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .pc-field span {
                    color: red;
                    margin-left: 2px;
                }
                .pc-field {
                    margin-bottom: 8px;
                }
                .pc-grid {
                    row-gap: 12px;
                    column-gap: 20px;
                }
            `}} />
        </div>
    );
}
