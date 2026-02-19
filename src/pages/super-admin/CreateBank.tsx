import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Building2,
    MapPin,
    ShieldCheck,
    AlertCircle,
    CheckCircle2,
    X,
    Image as ImageIcon,
} from "lucide-react";
import { bankService } from "@/services/bank.service";
import "./CreateBank.css";

interface CreateBankFormData {
    name: string;
    email: string;
    phone: string;
    logo: string;
    maxBranches: number;
    line1: string;
    city: string;
    state: string;
    pincode: string;
    adminName: string;
    adminEmail: string;
    adminMobile: string;
    adminPassword: string;
}

export function CreateBank() {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [logoFile, setLogoFile] = useState<File | null>(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState<CreateBankFormData>({
        name: "",
        email: "",
        phone: "",
        logo: "",
        maxBranches: 5,
        line1: "",
        city: "",
        state: "",
        pincode: "",
        adminName: "",
        adminEmail: "",
        adminMobile: "",
        adminPassword: "",
    });

    const handleChange = (field: keyof CreateBankFormData, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            setError("Logo must be under 2MB.");
            return;
        }

        setLogoFile(file);
        setLogoPreview(URL.createObjectURL(file));
        setError("");
    };

    const removeLogo = (e: React.MouseEvent) => {
        e.stopPropagation();
        setLogoPreview(null);
        setLogoFile(null);
        handleChange("logo", "");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.adminEmail || !formData.adminPassword) {
            setError("Please fill all required fields.");
            return;
        }

        try {
            setIsSubmitting(true);

            let logoUrl = formData.logo;

            if (logoFile) {
                const { uploadService } = await import("@/services/upload.service");
                logoUrl = await uploadService.uploadFile(logoFile);
            }

            const payload = {
                ...formData,
                logo: logoUrl,
                maxBranches: Number(formData.maxBranches),
                address: {
                    line1: formData.line1,
                    city: formData.city,
                    state: formData.state,
                    pincode: formData.pincode,
                },
            };

            await bankService.create(payload);

            setSuccess(true);
            setTimeout(() => navigate("/super-admin/banks"), 1400);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "Failed to create institution.";
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="create-bank-container">
            <header className="create-bank-header">
                <div className="header-content">
                    <button onClick={() => navigate("/super-admin/banks")} className="back-button">
                        <ArrowLeft size={16} />
                        Back
                    </button>
                    <span className="version">v4.2 • Core Protocol</span>
                </div>
            </header>

            <main className="create-bank-main">
                <div className="page-header">
                    <h1>New Institution</h1>
                    <p>Register a new banking node</p>
                </div>

                <form onSubmit={handleSubmit} className="form-container">
                    {error && (
                        <div className="alert alert-error">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="alert alert-success">
                            <CheckCircle2 size={16} />
                            Institution registered. Redirecting...
                        </div>
                    )}

                    {/* Profile Section */}
                    <section className="form-section">
                        <div className="section-header">
                            <Building2 size={16} />
                            <h2>Profile</h2>
                        </div>

                        <div className="form-group logo-group">
                            <label>Logo</label>
                            <div
                                className="logo-dropzone"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {logoPreview ? (
                                    <div className="logo-preview-wrapper">
                                        <img src={logoPreview} alt="Logo preview" className="logo-preview" />
                                        <button className="remove-logo" onClick={removeLogo}>
                                            <X size={14} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="logo-placeholder">
                                        <ImageIcon size={20} strokeWidth={1.5} />
                                        <span>Upload logo</span>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            <p className="input-hint">PNG, JPG • max 2MB</p>
                        </div>

                        <div className="grid-2">
                            <div className="form-group">
                                <label>Legal Name *</label>
                                <input
                                    className="input"
                                    placeholder="e.g. Apex Banking"
                                    value={formData.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Contact Email *</label>
                                <input
                                    className="input"
                                    type="email"
                                    placeholder="contact@apexbank.com"
                                    value={formData.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    className="input"
                                    placeholder="+91 98765 43210"
                                    value={formData.phone}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Max Branches</label>
                                <input
                                    type="number"
                                    className="input"
                                    min="1"
                                    value={formData.maxBranches}
                                    onChange={(e) => handleChange("maxBranches", Number(e.target.value))}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Location Section */}
                    <section className="form-section">
                        <div className="section-header">
                            <MapPin size={16} />
                            <h2>Location</h2>
                        </div>

                        <div className="grid-2">
                            <div className="form-group span-2">
                                <label>Address Line</label>
                                <input
                                    className="input"
                                    placeholder="123 Financial Street"
                                    value={formData.line1}
                                    onChange={(e) => handleChange("line1", e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>City</label>
                                <input
                                    className="input"
                                    value={formData.city}
                                    onChange={(e) => handleChange("city", e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>State / Region</label>
                                <input
                                    className="input"
                                    value={formData.state}
                                    onChange={(e) => handleChange("state", e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Pincode</label>
                                <input
                                    className="input"
                                    value={formData.pincode}
                                    onChange={(e) => handleChange("pincode", e.target.value)}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Admin Section */}
                    <section className="form-section">
                        <div className="section-header">
                            <ShieldCheck size={16} />
                            <h2>Admin Account</h2>
                        </div>

                        <div className="grid-2">
                            <div className="form-group">
                                <label>Full Name *</label>
                                <input
                                    className="input"
                                    placeholder="Jane Cooper"
                                    value={formData.adminName}
                                    onChange={(e) => handleChange("adminName", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Admin Email *</label>
                                <input
                                    className="input"
                                    type="email"
                                    placeholder="admin@apexbank.com"
                                    value={formData.adminEmail}
                                    onChange={(e) => handleChange("adminEmail", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Mobile</label>
                                <input
                                    className="input"
                                    value={formData.adminMobile}
                                    onChange={(e) => handleChange("adminMobile", e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Password *</label>
                                <input
                                    type="password"
                                    className="input"
                                    placeholder="••••••••"
                                    value={formData.adminPassword}
                                    onChange={(e) => handleChange("adminPassword", e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    <button type="submit" disabled={isSubmitting} className="submit-button">
                        {isSubmitting ? (
                            <>
                                <span className="spinner" />
                                Creating...
                            </>
                        ) : (
                            "Create Institution"
                        )}
                    </button>
                </form>
            </main>
        </div>
    );
}
