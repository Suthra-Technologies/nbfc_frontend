// CreateBank.tsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    ArrowLeft,
    Building2,
    MapPin,
    ShieldCheck,
    AlertCircle,
    CheckCircle2,
    X,
    Image as ImageIcon,
    Loader2,
} from "lucide-react";

import { bankService } from "@/services/bank.service";
import { cn } from "@/lib/utils";

import "./CreateBank.css";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const createBankSchema = z.object({
    name: z.string().min(3, "Institution name must be at least 3 characters"),
    email: z.string().email("Please enter a valid official email address"),
    phone: z.string().min(10, "Valid phone number is required"),
    logo: z.any().optional(),
    maxBranches: z.number().min(1, "Minimum 1 node required").max(1000),
    line1: z.string().min(5, "Full address line is required"),
    city: z.string().min(2, "City name is required"),
    state: z.string().min(2, "State selection is required"),
    pincode: z.string().regex(/^\d{6}$/, "Pincode must be exactly 6 digits"),
    adminName: z.string().min(3, "Administrator full name is required"),
    adminEmail: z.string().email("Valid administrator email is required"),
    adminMobile: z.string().min(10, "Administrator mobile is required"),
    adminPassword: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Include at least one uppercase letter")
        .regex(/[0-9]/, "Include at least one number"),
    branchName: z.string().min(3, "Primary branch name is required"),
    branchCode: z.string().min(3, "Branch code is required (e.g., HO001)"),
});

type CreateBankForm = z.infer<typeof createBankSchema>;

export function CreateBank() {
    const navigate = useNavigate();
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        resetField,
    } = useForm<CreateBankForm>({
        resolver: zodResolver(createBankSchema),
        mode: "onBlur", // Validate on blur for better UX
        defaultValues: {
            maxBranches: 5,
        },
    });

    const logoFile = watch("logo");

    useEffect(() => {
        if (logoFile instanceof File) {
            const url = URL.createObjectURL(logoFile);
            setLogoPreview(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [logoFile]);

    const institutionName = watch("name");
    useEffect(() => {
        if (institutionName) {
            // Only auto-fill if the field is currently empty or was previously auto-filled
            setValue("branchName", `${institutionName} - Head Office`, { shouldValidate: true });
            setValue("branchCode", "HO001", { shouldValidate: true });
        }
    }, [institutionName, setValue]);

    const onSubmit = async (data: CreateBankForm) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            let logoUrl = "";

            if (data.logo instanceof File) {
                const { uploadService } = await import("@/services/upload.service");
                const uploadRes = await uploadService.uploadSingle(data.logo);
                logoUrl = uploadRes.url;
            }

            const payload = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                logo: logoUrl,
                maxBranches: Number(data.maxBranches),
                address: {
                    line1: data.line1,
                    city: data.city,
                    state: data.state,
                    pincode: data.pincode,
                },
                adminName: data.adminName,
                adminEmail: data.adminEmail,
                adminMobile: data.adminMobile,
                adminPassword: data.adminPassword,
                branchName: data.branchName,
                branchCode: data.branchCode,
            };

            await bankService.create(payload);
            setSubmitSuccess(true);
            setTimeout(() => navigate("/super-admin/banks"), 2000);
        } catch (err: any) {
            setSubmitError(err.message || "Network error. Failed to initialize registry node.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                setSubmitError("Logo size exceeds 2MB limit.");
                return;
            }
            if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
                setSubmitError("Unsupported image format.");
                return;
            }
            setValue("logo", file, { shouldValidate: true });
        }
    };

    return (
        <div className="create-bank-container">
            <header className="create-bank-header">
                <div className="header-content">
                    <button onClick={() => navigate("/super-admin/banks")} className="back-button">
                        <ArrowLeft size={18} />
                        Network Registry
                    </button>
                    <span className="version">SECURE CORE v4.5</span>
                </div>
            </header>

            <main className="create-bank-main">
                <div className="page-header">
                    <h1>Register Institution</h1>
                    <p>Initialize a new banking node on the distributed network</p>
                </div>

                {submitSuccess ? (
                    <div className="success-overlay animate-success-pop">
                        <div className="flex flex-col items-center">
                            <CheckCircle2 size={80} className="text-[#009BB0] animate-check" strokeWidth={1.5} />
                            <h2 className="text-3xl font-extrabold mt-6 text-slate-900">Node Initialized</h2>
                            <p className="text-slate-500 mt-2">Institution successfully registered in the multi-tenant core.</p>
                            <div className="mt-8 flex items-center gap-2 text-[#009BB0] font-bold">
                                <Loader2 className="animate-spin h-5 w-5" />
                                Synchronizing Registry...
                            </div>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="form-container" noValidate>
                        {submitError && (
                            <div className="alert alert-error animate-shake">
                                <AlertCircle size={18} />
                                {submitError}
                            </div>
                        )}

                        {/* Profile Section */}
                        <section className="form-section animate-fade-in" style={{ animationDelay: "0.1s" }}>
                            <div className="section-header">
                                <Building2 size={20} className="text-[#009BB0]" />
                                <h2>Entity Profile</h2>
                            </div>

                            <div className="form-group logo-group">
                                <label>Corporate Identity (Logo)</label>
                                <div
                                    className={cn(
                                        "logo-dropzone transition-all duration-300",
                                        errors.logo && "border-[#ef4444] bg-[#fef2f2]"
                                    )}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {logoPreview ? (
                                        <div className="logo-preview-wrapper relative group">
                                            <img src={logoPreview} alt="Logo preview" className="logo-preview" />
                                            <button
                                                type="button"
                                                className="remove-logo opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    resetField("logo");
                                                    setLogoPreview(null);
                                                }}
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="logo-placeholder">
                                            <ImageIcon size={24} strokeWidth={1.2} className="text-[#009BB0] mb-2" />
                                            <span className="text-xs font-bold text-slate-400">UPLOAD LOGO</span>
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                />
                                <p className="input-hint">SVG, PNG, JPG • Recommended 512x512</p>
                            </div>

                            <div className="grid-2">
                                <div className="form-group">
                                    <label>Institution Legal Name *</label>
                                    <input
                                        className={cn("input", errors.name && "input-error-border")}
                                        placeholder="Apex Global Finance"
                                        {...register("name")}
                                    />
                                    {errors.name && <p className="input-error">{errors.name.message}</p>}
                                </div>

                                <div className="form-group">
                                    <label>Official Registry Email *</label>
                                    <input
                                        className={cn("input", errors.email && "input-error-border")}
                                        placeholder="registry@institution.com"
                                        {...register("email")}
                                    />
                                    {errors.email && <p className="input-error">{errors.email.message}</p>}
                                </div>

                                <div className="form-group">
                                    <label>Primary Phone *</label>
                                    <input
                                        className={cn("input", errors.phone && "input-error-border")}
                                        placeholder="+91 22 4567 8901"
                                        {...register("phone")}
                                    />
                                    {errors.phone && <p className="input-error">{errors.phone.message}</p>}
                                </div>

                                <div className="form-group">
                                    <label>Node Capacity (Max Branches)</label>
                                    <input
                                        type="number"
                                        className={cn("input", errors.maxBranches && "input-error-border")}
                                        {...register("maxBranches", { valueAsNumber: true })}
                                    />
                                    {errors.maxBranches && <p className="input-error">{errors.maxBranches.message}</p>}
                                </div>
                            </div>
                        </section>

                        {/* Location Section */}
                        <section className="form-section animate-fade-in" style={{ animationDelay: "0.2s" }}>
                            <div className="section-header">
                                <MapPin size={20} className="text-[#009BB0]" />
                                <h2>Geographic Presence</h2>
                            </div>

                            <div className="form-group mb-5">
                                <label>Corporate Headquarters Address *</label>
                                <input
                                    className={cn("input", errors.line1 && "input-error-border")}
                                    placeholder="Financial Tower, BKC Area"
                                    {...register("line1")}
                                />
                                {errors.line1 && <p className="input-error">{errors.line1.message}</p>}
                            </div>

                            <div className="grid-2">
                                <div className="form-group">
                                    <label>City *</label>
                                    <input
                                        className={cn("input", errors.city && "input-error-border")}
                                        placeholder="Mumbai"
                                        {...register("city")}
                                    />
                                    {errors.city && <p className="input-error">{errors.city.message}</p>}
                                </div>

                                <div className="form-group">
                                    <label>State / Region *</label>
                                    <input
                                        className={cn("input", errors.state && "input-error-border")}
                                        placeholder="Maharashtra"
                                        {...register("state")}
                                    />
                                    {errors.state && <p className="input-error">{errors.state.message}</p>}
                                </div>

                                <div className="form-group">
                                    <label>Postal Pincode *</label>
                                    <input
                                        className={cn("input", errors.pincode && "input-error-border")}
                                        placeholder="400051"
                                        {...register("pincode")}
                                    />
                                    {errors.pincode && <p className="input-error">{errors.pincode.message}</p>}
                                </div>
                            </div>
                        </section>
                        {/* Branch Initialization Section */}
                        <section className="form-section animate-fade-in" style={{ animationDelay: "0.25s" }}>
                            <div className="section-header">
                                <Building2 size={20} className="text-[#009BB0]" />
                                <h2>Primary Branch Node</h2>
                            </div>

                            <div className="grid-2">
                                <div className="form-group">
                                    <label>Initial Branch Name *</label>
                                    <input
                                        className={cn("input", errors.branchName && "input-error-border")}
                                        placeholder="Head Office"
                                        {...register("branchName")}
                                    />
                                    {errors.branchName && <p className="input-error">{errors.branchName.message}</p>}
                                </div>

                                <div className="form-group">
                                    <label>Internal Branch Code *</label>
                                    <input
                                        className={cn("input", errors.branchCode && "input-error-border")}
                                        placeholder="HO001"
                                        {...register("branchCode")}
                                    />
                                    {errors.branchCode && <p className="input-error">{errors.branchCode.message}</p>}
                                </div>
                            </div>
                            <p className="input-hint mt-2">The administrator will be automatically assigned to this primary branch node.</p>
                        </section>

                        {/* Admin Account Section */}
                        <section className="form-section animate-fade-in" style={{ animationDelay: "0.3s" }}>
                            <div className="section-header">
                                <ShieldCheck size={20} className="text-[#009BB0]" />
                                <h2>Node Administrator</h2>
                            </div>

                            <div className="grid-2">
                                <div className="form-group">
                                    <label>Administrator Full Name *</label>
                                    <input
                                        className={cn("input", errors.adminName && "input-error-border")}
                                        placeholder="Sarah Connor"
                                        {...register("adminName")}
                                    />
                                    {errors.adminName && <p className="input-error">{errors.adminName.message}</p>}
                                </div>

                                <div className="form-group">
                                    <label>Admin Access Email *</label>
                                    <input
                                        className={cn("input", errors.adminEmail && "input-error-border")}
                                        placeholder="admin@institution.com"
                                        {...register("adminEmail")}
                                    />
                                    {errors.adminEmail && <p className="input-error">{errors.adminEmail.message}</p>}
                                </div>

                                <div className="form-group">
                                    <label>Security Mobile *</label>
                                    <input
                                        className={cn("input", errors.adminMobile && "input-error-border")}
                                        placeholder="+91 98765 43210"
                                        {...register("adminMobile")}
                                    />
                                    {errors.adminMobile && <p className="input-error">{errors.adminMobile.message}</p>}
                                </div>

                                <div className="form-group">
                                    <label>Access Password *</label>
                                    <input
                                        type="password"
                                        className={cn("input", errors.adminPassword && "input-error-border")}
                                        placeholder="••••••••"
                                        {...register("adminPassword")}
                                    />
                                    {errors.adminPassword && <p className="input-error">{errors.adminPassword.message}</p>}
                                </div>
                            </div>
                        </section>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={cn(
                                "submit-button w-full h-14 relative overflow-hidden transition-all duration-300",
                                isSubmitting ? "bg-slate-400" : "bg-[#009BB0] hover:bg-[#008aa0]"
                            )}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-3">
                                    <Loader2 className="animate-spin h-5 w-5" />
                                    <span>Establishing Connection...</span>
                                </div>
                            ) : (
                                <span className="font-bold text-lg">Initialize Institution Node</span>
                            )}
                        </button>
                    </form>
                )}
            </main>
        </div>
    );
}
