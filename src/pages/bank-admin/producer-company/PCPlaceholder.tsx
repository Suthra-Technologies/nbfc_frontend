import { Factory } from 'lucide-react';
// import './producer.css';

export function PCPlaceholder({ title }: { title: string }) {
    return (
        <div className="pc-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', opacity: 0.8 }}>
            <div className="pc-card-icon" style={{ width: '80px', height: '80px', borderRadius: '24px', marginBottom: '20px' }}>
                <Factory size={40} />
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>{title}</h1>
            <p style={{ color: '#64748b', textAlign: 'center', maxWidth: '400px' }}>
                This module is currently being configured for the Producer Company administrative panel.
                Please check back soon for the full feature set.
            </p>
            <div className="pc-badge" style={{ marginTop: '24px' }}>Producer Company Module</div>
        </div>
    );
}
