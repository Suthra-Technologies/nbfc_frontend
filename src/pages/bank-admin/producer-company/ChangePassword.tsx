import { useState } from 'react';
import {
    Save,
    X,
    Lock
} from 'lucide-react';
import './producer.css';

const INITIAL_FORM = {
    username: 'ramesh',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
};

export function ChangePassword() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [saved, setSaved] = useState(false);

    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (form.newPassword !== form.confirmPassword) {
            alert("New Password and Confirm Password do not match!");
            return;
        }
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleCancel = () => {
        setForm(INITIAL_FORM);
    };

    return (
        <div className="pc-container flex items-center justify-center min-h-[80vh]">
            <div className="pc-card w-full max-w-md shadow-2xl">
                <div className="pc-card-header bg-slate-800 text-white p-3 rounded-t-lg">
                    <div className="flex items-center gap-2">
                        <Lock size={16} />
                        <p className="pc-card-title text-white">Change Password</p>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-4">
                        <div className="pc-field">
                            <label className="pc-label">Username:</label>
                            <input 
                                className="pc-input bg-slate-50 cursor-not-allowed" 
                                value={form.username} 
                                readOnly 
                            />
                        </div>
                        <div className="pc-field">
                            <label className="pc-label">Old Password:</label>
                            <input 
                                type="password" 
                                className="pc-input" 
                                placeholder="********"
                                value={form.oldPassword} 
                                onChange={e => set('oldPassword', e.target.value)} 
                            />
                        </div>
                        <div className="pc-field">
                            <label className="pc-label">New Password:</label>
                            <input 
                                type="password" 
                                className="pc-input" 
                                placeholder="New Password"
                                value={form.newPassword} 
                                onChange={e => set('newPassword', e.target.value)} 
                            />
                        </div>
                        <div className="pc-field">
                            <label className="pc-label">Confirm Password:</label>
                            <input 
                                type="password" 
                                className="pc-input" 
                                placeholder="Confirm Password"
                                value={form.confirmPassword} 
                                onChange={e => set('confirmPassword', e.target.value)} 
                            />
                        </div>
                    </div>

                    <div className="flex justify-center gap-3 mt-8">
                        <button type="submit" className="pc-btn-primary flex items-center gap-2 px-6">
                            <Save size={14} /> Save
                        </button>
                        <button type="button" className="pc-btn-ghost flex items-center gap-2 px-6 border-red-200 text-red-600 hover:bg-red-50" onClick={handleCancel}>
                            <X size={14} /> Cancel
                        </button>
                    </div>
                </form>

                {saved && (
                    <div className="pc-alert absolute top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded shadow-lg animate-in fade-in slide-in-from-top-4">
                        Password Changed Successfully!
                    </div>
                )}
            </div>
        </div>
    );
}
export default ChangePassword;
