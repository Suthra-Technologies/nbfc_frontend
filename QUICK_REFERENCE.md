# 🚀 Multi-Branch Banking Platform - Quick Reference

## 🔑 **Super Admin Access**

### Credentials
```
Employee ID: RAMU-123
Password: ramu1234
```

### Login URL
```
http://localhost:5173/admin/login
```

---

## 📍 **Quick Navigation**

### Super Admin Routes
| Page | URL | Description |
|------|-----|-------------|
| Admin Login | `/admin/login` | Purple-themed admin portal login |
| Admin Dashboard | `/admin/dashboard` | System overview with stats |
| Branch Management | `/admin/branches` | List all branches |
| Create Branch | `/admin/branches/create` | Add new branch form |

### Branch Routes (Demo)
| Page | URL | Description |
|------|-----|-------------|
| Branch Login | `/branch-login` | Tenant-aware login |
| Dashboard | `/dashboard` | Branch dashboard |

---

## 🎯 **How to Test**

### 1. Login as Super Admin
```bash
1. Go to: http://localhost:5173/admin/login
2. Enter: RAMU-123 / ramu1234
3. Click: "Access Admin Portal"
✓ You're now at the Admin Dashboard!
```

### 2. View Existing Branches
```bash
1. Click "Manage Branches" on dashboard
   OR go to: http://localhost:5173/admin/branches
2. You'll see 2 demo branches:
   - Vijayawada Main Branch (VJA001)
   - Guntur Branch (GNT001)
```

### 3. Create a New Branch
```bash
1. Click "Create New Branch"
   OR go to: http://localhost:5173/admin/branches/create
2. Fill the form (example):
   Branch Name: Hyderabad Regional Office
   City: Hyderabad
   Email: hyderabad@corebranch.com
   Phone: +91-40-12345678
3. Click "Create Branch"
✓ New branch created and saved to localStorage!
```

### 4. Test Branch Login
```bash
1. Open console (F12)
2. Type: localStorage.setItem('dev_branch', 'vijayawada')
3. Go to: http://localhost:5173/branch-login
4. Login with: admin@vijayawada.com / admin123
✓ Branch-specific login working!
```

---

## 📊 **Demo Data**

### Pre-loaded Branches

```javascript
// Vijayawada Main Branch
{
  code: "VJA001",
  city: "Vijayawada",
  email: "vijayawada@corebranch.com",
  login_url: "vijayawada-main.corebranch.com"
}

// Guntur Branch
{
  code: "GNT001",
  city: "Guntur",
  email: "guntur@corebranch.com",
  login_url: "guntur.corebranch.com"
}
```

### Demo Users

```javascript
// Super Admin
Email: RAMU-123 or ramu@corebranch.com
Password: ramu1234

// Vijayawada Branch Admin
Email: admin@vijayawada.com
Password: admin123

// Guntur Branch Admin
Email: admin@guntur.com
Password: admin123
```

---

## 💡 **Key Features**

### ✅ Implemented
- [x] Super Admin login with static credentials
- [x] Admin dashboard with stats
- [x] Branch management (list view)
- [x] Create branch form
- [x] Auto-generate branch code from city
- [x] Auto-generate subdomain from branch name
- [x] Data persistence in localStorage
- [x] Tenant-aware branch login
- [x] Mock authentication (no backend needed)

### 🔄 How It Works

```
SUPER ADMIN FLOW:
Login → Dashboard → Branches → Create → Success → List Updated

BRANCH ADMIN FLOW:
Tenant Detection → Branch Login → Dashboard → Branch-Filtered Data

DATA STORAGE:
All data stored in localStorage under key: 'demo_branches'
```

---

## 🎨 **Visual Guide**

### Super Admin Portal
- **Color**: Purple/pink gradient
- **Icon**: Shield
- **Title**: "CoreBranch Admin"
- **Subtitle**: "Super Administration Portal"

### Branch Portal  
- **Color**: Blue
- **Icon**: Building
- **Title**: "CoreBranch"
- **Subtitle**: "[Branch Name] Branch" (dynamic)

---

## 🛠️ **LocalStorage Commands**

```javascript
// View all branches
JSON.parse(localStorage.getItem('demo_branches'))

// View auth data
JSON.parse(localStorage.getItem('auth-storage'))

// Clear everything
localStorage.clear()

// Reset branches to default
localStorage.removeItem('demo_branches')
window.location.reload()

// Set active branch for testing
localStorage.setItem('dev_branch', 'vijayawada')
```

---

## 🐛 **Quick Fixes**

### Can't login?
```
✓ Use exact credentials: RAMU-123 / ramu1234
✓ Password is case-sensitive!
✓ Try clearing localStorage
```

### Branch not found?
```
✓ Set dev_branch: localStorage.setItem('dev_branch', 'vijayawada')
✓ Refresh the page
```

### Created branch missing?
```
✓ Check console for errors
✓ View localStorage: localStorage.getItem('demo_branches')
✓ Try creating again
```

---

## 📁 **File Structure**

```
src/
├── pages/
│   ├── admin/
│   │   ├── Login.tsx          ← Super Admin login
│   │   ├── Dashboard.tsx      ← Admin dashboard
│   │   ├── Branches.tsx       ← Branch list
│   │   └── CreateBranch.tsx   ← Create branch form
│   └── branch/
│       └── Login.tsx          ← Branch login
├── services/
│   ├── mock-auth.service.ts   ← Mock authentication
│   ├── auth.service.ts        ← Auth API
│   ├── branch.service.ts      ← Branch API
│   └── tenant.service.ts      ← Tenant resolution
├── store/
│   ├── authStore.ts           ← Auth state
│   └── tenantStore.ts         ← Tenant state
└── utils/
    └── tenant.utils.ts        ← Subdomain detection
```

---

## 🚀 **What to Test**

### Checklist

- [ ] Super Admin login
- [ ] View dashboard stats
- [ ] Navigate to branches page
- [ ] See 2 pre-loaded branches
- [ ] Click "Create New Branch"
- [ ] Fill out the form
- [ ] Verify auto-generation of code
- [ ] Verify auto-generation of subdomain
- [ ] Submit form
- [ ] See success message
- [ ] See new branch in list
- [ ] Refresh page - data persists
- [ ] Test branch login
- [ ] Verify branch name shows dynamically

---

## 📞 **Need Help?**

Check these files for details:
- `TESTING_GUIDE.md` - Full testing instructions
- `SUBDOMAIN_IMPLEMENTATION_GUIDE.md` - Architecture details
- `SUBDOMAIN_ARCHITECTURE.md` - Complete system design

---

**Start Here**: http://localhost:5173/admin/login

**Credentials**: RAMU-123 / ramu1234

**Happy Testing!** 🎉
