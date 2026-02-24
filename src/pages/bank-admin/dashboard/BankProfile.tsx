import { useState, useEffect } from 'react';
import {
    Building2,
    Mail,
    Phone,
    MapPin,
    Shield,
    Calendar,
    Globe,
    ExternalLink,
    Loader2
} from 'lucide-react';
import { bankService, type Bank } from '@/services/bank.service';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import './BankProfile.css';

export function BankProfile() {
    const [bank, setBank] = useState<Bank | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        fetchBankProfile();
    }, []);

    const fetchBankProfile = async () => {
        setIsLoading(true);
        try {
            const data = await bankService.getProfile();
            setBank(data);
        } catch (error) {
            toast({
                title: 'Data Unavailable',
                description: 'We could not synchronize your institutional profile at this time.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-slate-400">
                <Loader2 size={48} className="animate-spin mb-4 opacity-10" />
                <p className="text-sm font-bold tracking-widest uppercase opacity-40">Decrypting Secure Identity...</p>
            </div>
        );
    }

    if (!bank) return null;

    return (
        <div className="profile-container animate-fade-in">
            <header className="profile-header">
                <div className="profile-hero">
                    <div className="profile-logo-wrapper">
                        {bank.logo ? (
                            <img src={bank.logo} alt={bank.name} className="profile-logo" />
                        ) : (
                            <Building2 size={48} className="text-[#009BB0]" />
                        )}
                    </div>
                    <div className="profile-title-section">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="profile-name">{bank.name}</h1>
                            <Badge variant="outline" className="border-[#009BB0]/20 text-[#009BB0] bg-[#009BB0]/5">
                                {bank.isActive ? 'Active Node' : 'Suspended'}
                            </Badge>
                        </div>
                        <p className="profile-id">System Identifier: {bank.id}</p>
                    </div>
                </div>
            </header>

            <div className="profile-content-grid">
                {/* Core Identity Card */}
                <div className="identity-card">
                    <h2 className="section-title">Institutional Identity</h2>
                    <div className="detail-list">
                        <div className="detail-item">
                            <Mail className="detail-icon" size={18} />
                            <div>
                                <label>Official Registry Email</label>
                                <p>{bank.email}</p>
                            </div>
                        </div>
                        <div className="detail-item">
                            <Phone className="detail-icon" size={18} />
                            <div>
                                <label>Contact Hotline</label>
                                <p>{bank.phone}</p>
                            </div>
                        </div>
                        <div className="detail-item">
                            <Globe className="detail-icon" size={18} />
                            <div>
                                <label>Domain Namespace</label>
                                <p className="subdomain-tag">
                                    {bank.subdomain}.Finware.com
                                    <ExternalLink size={12} className="ml-2" />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Operations HQ Card */}
                <div className="identity-card">
                    <h2 className="section-title">Operations HQ</h2>
                    <div className="detail-list">
                        <div className="detail-item">
                            <MapPin className="detail-icon" size={18} />
                            <div>
                                <label>Geographic Node</label>
                                <p>{bank.address.line1}</p>
                                <p className="text-slate-400">{bank.address.city}, {bank.address.state} - {bank.address.pincode}</p>
                            </div>
                        </div>
                        <div className="detail-item">
                            <Shield className="detail-icon" size={18} />
                            <div>
                                <label>Network Capacity</label>
                                <p>{bank.maxBranches} Validated Sub-Branches</p>
                            </div>
                        </div>
                        <div className="detail-item">
                            <Calendar className="detail-icon" size={18} />
                            <div>
                                <label>Inauguration Date</label>
                                <p>{new Date(bank.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="profile-footer">
                <div className="security-banner">
                    <Shield size={16} />
                    <span>Cryptographically verified institutional record. For modifications, please contact System Orchestrators.</span>
                </div>
            </footer>
        </div>
    );
}
