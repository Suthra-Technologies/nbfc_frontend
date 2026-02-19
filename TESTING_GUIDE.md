# 🧪 Multi-Branch Banking Platform - Testing Guide

## 📋 Quick Start

### **Super Admin Login Credentials**

```
Employee ID: RAMU-123
Password: ramu1234
```

### **How to Access the Application**

Since we're using mock authentication (no backend required), you can test the system immediately:

---

## 🎯 **Testing Workflows**

### **WORKFLOW 1: Super Admin Login & Branch Creation**

#### Step 1: Access Super Admin Portal
1. Open your browser and go to:
   ```
   http://localhost:5173/admin/login
   ```

2. You'll see a premium dark-themed login screen with:
   - Purple gradient background
   - Shield icon
   - "CoreBranch Admin" branding
   - "Super Administration Portal" subtitle

#### Step 2: Login as Super Admin
1. Enter credentials:
   - **Email/Employee ID**: `RAMU-123`
   - **Password**: `ramu1234`

2. Click **"Access Admin Portal"**

3. You'll be redirected to: `/admin/dashboard`

#### Step 3: View Super Admin Dashboard
You'll see:
- **Stats Cards**:
  - Total Branches (currently 2 demo branches)
  - Cities Covered
  - Total Customers
  - Total Disbursed
  
- **Quick Actions**:
  - Create New Branch
  - Manage Branches
  - Manage Users

- **Recent Branches**: List of existing branches

#### Step 4: Navigate to Branch Management
1. Click **"Manage Branches"** OR
2. Click the URL directly: `http://localhost:5173/admin/branches`

You'll see:
- **Stats Cards**:
  - Total Branches: 2
  - Active: 2
  - Inactive: 0
  - Cities: 2

- **Branches Table** with:
  - Vijayawada Main Branch (VJA001)
  - Guntur Branch (GNT001)

#### Step 5: Create a New Branch
1. Click **"Create New Branch"** button

2. Fill in the form:
   - **Branch Name**: `Hyderabad Regional Office`
   - **Branch Code**: Auto-fills as `HYD001`
   - **Branch Type**: Select "Regional Office"
   - **Subdomain**: Auto-generated as `hyderabad-regional`
   - **Street**: `Banjara Hills Road`
   - **City**: `Hyderabad` (this auto-generates the code)
   - **State**: `Telangana`
   - **Postal Code**: `500034`
   - **Email**: `hyderabad@corebranch.com`
   - **Phone**: `+91-40-12345678`

3. Click **"Create Branch"**

4. You'll see:
   - Success message: "✓ Branch created successfully!"
   - Auto-redirect to branches list after 2 seconds

5. The new branch will appear in the table!

#### Step 6: Verify Branch was Created
1. Check the branches list
2. Total count should now be **3**
3. Look for "Hyderabad Regional Office"

---

### **WORKFLOW 2: Branch Login (Tenant-Aware)**

#### Demo Branch Credentials
```
Vijayawada Branch Admin:
Email: admin@vijayawada.com
Password: admin123

Guntur Branch Admin:
Email: admin@guntur.com
Password: admin123
```

#### Testing Branch Login

##### Option A: Manual URL (since subdomain routing doesn't work on localhost)
1. Go to: `http://localhost:5173/branch-login`

2. Set which branch to simulate:
   - Open browser console (F12)
   - Type: `localStorage.setItem('dev_branch', 'vijayawada')`
   - Refresh the page

3. You'll see the tenant-aware login screen:
   - "CoreBranch — Vijayawada Main Branch" (branch name dynamically loaded!)
   - Blue theme (different from admin purple)

4. Login with branch credentials:
   - Email: `admin@vijayawada.com`
   - Password: `admin123`

5. You'll be redirected to the branch dashboard

##### Option B: Test Different Branch
1. Go back to console
2. Type: `localStorage.setItem('dev_branch', 'guntur')`
3. Refresh `/branch-login`
4. Now it shows: "CoreBranch — Guntur Branch"
5. Login with: `admin@guntur.com` / `admin123`

---

## 🗺️ **URL Map**

### Super Admin Portal
```
/admin/login          → Super Admin Login
/admin/dashboard      → Admin Dashboard
/admin/branches       → Branch Management (List)
/admin/branches/create → Create New Branch
```

### Branch Portal (Tenant-Aware)
```
/branch-login         → Branch Login (auto-detects tenant)
/dashboard            → Branch Dashboard (after login)
/customers            → Customer Management (filtered by branch)
/loans                → Loan Management (filtered by branch)
```

---

## 📦 **Mock Data**

### Pre-loaded Branches

#### 1. Vijayawada Main Branch
```json
{
  "code": "VJA001",
  "city": "Vijayawada",
  "state": "Andhra Pradesh",
  "email": "vijayawada@corebranch.com",
  "phone": "+91-866-1234567",
  "subdomain": "vijayawada-main" (generated)
}
```

#### 2. Guntur Branch
```json
{
  "code": "GNT001",
  "city": "Guntur",
  "state": "Andhra Pradesh",
  "email": "guntur@corebranch.com",
  "phone": "+91-863-1234567",
  "subdomain": "guntur" (generated)
}
```

---

## 🎨 **Visual Differences**

### Super Admin Portal
- **Color Scheme**: Purple/Pink gradient
- **Icon**: Shield
- **Theme**: Dark with purple accents
- **Branding**: "CoreBranch Admin" + "Super Administration Portal"

### Branch Portal
- **Color Scheme**: Blue
- **Icon**: Building
- **Theme**: Light/Dark (system default)
- **Branding**: "CoreBranch — [Branch Name]" (dynamic)

---

## 🔍 **Features to Test**

### ✅ Super Admin Features
- [x] Login with RAMU-123 / ramu1234
- [x] View dashboard stats
- [x] View all branches list
- [x] Create new branch
- [x] Auto-generate branch code from city
- [x] Auto-generate subdomain from branch name
- [x] View branch details in table
- [x] Data persists in localStorage

### ✅ Branch Features
- [x] Tenant resolution (branch detection)
- [x] Dynamic branch name in login screen
- [x] Branch admin login
- [x] Separate credentials per branch

### 🔲 To Be Implemented (Phase 2)
- [ ] Edit branch
- [ ] Deactivate branch
- [ ] Branch details view
- [ ] Staff management
- [ ] Customer management (branch-filtered)
- [ ] Loan management (branch-filtered)

---

## 💾 **Data Storage**

All data is stored in **localStorage** for testing:

```javascript
// View all branches
JSON.parse(localStorage.getItem('demo_branches'))

// Clear all data
localStorage.clear()

// Reset to default branches
localStorage.removeItem('demo_branches')
// Refresh page
```

---

## 🐛 **Troubleshooting**

### Issue: "Branch not found" on branch login
**Solution**: 
```javascript
localStorage.setItem('dev_branch', 'vijayawada')
// Then refresh the page
```

### Issue: Created branch doesn't appear
**Solution**: 
- Check browser console for errors
- Verify localStorage: `localStorage.getItem('demo_branches')`

### Issue: Can't login with Super Admin credentials
**Solution**: 
- Make sure you're using exact credentials:
  - Email: `RAMU-123` (case-insensitive)
  - Password: `ramu1234` (case-sensitive!)

### Issue: Login redirect doesn't work
**Solution**: 
- Check if routes are properly configured
- Try manually navigating: `/admin/dashboard`

---

## 📸 **Screenshot Guide**

### Expected Screens

1. **Super Admin Login** (`/admin/login`)
   - Purple/dark background
   - Shield icon
   - "CoreBranch Admin" header

2. **Super Admin Dashboard** (`/admin/dashboard`)
   - 4 stats cards
   - Quick action buttons
   - Recent branches list

3. **Branch Management** (`/admin/branches`)
   - Stats: Total, Active, Inactive, Cities
   - Branches table with all details

4. **Create Branch Form** (`/admin/branches/create`)
   - 3 sections: Branch Details, Address, Contact
   - Auto-generation of code and subdomain
   - Login URL preview

5. **Branch Login** (`/branch-login`)
   - Blue theme
   - Building icon
   - "CoreBranch — [Branch Name]"

---

## 🚀 **Next Steps for Production**

When you're ready to connect to a real backend:

1. **Disable Mock Mode**:
   ```typescript
   // In src/services/auth.service.ts
   const USE_MOCK = false;  // Change to false
   
   // In src/services/tenant.service.ts
   const USE_MOCK = false;  // Change to false
   
   // In src/services/branch.service.ts
   const USE_MOCK = false;  // Change to false
   ```

2. **Configure API URL**:
   ```bash
   # In .env
   VITE_API_BASE_URL=https://your-api.com/api
   ```

3. **Backend Requirements**:
   - `POST /api/auth/login` - Login endpoint
   - `POST /api/tenant/resolve` - Tenant resolution
   - `GET /api/branches` - Get all branches
   - `POST /api/branches` - Create branch

---

## 📊 **Test Results Checklist**

Use this to verify everything works:

- [ ] Super Admin can login with RAMU-123/ramu1234
- [ ] Dashboard shows correct stats
- [ ] Can navigate to branches page
- [ ] Can see 2 pre-loaded branches
- [ ] Can click "Create New Branch"
- [ ] Form auto-generates code from city
- [ ] Form auto-generates subdomain from name
- [ ] Can successfully create a new branch
- [ ] New branch appears in the list
- [ ] Total count increases
- [ ] Branch data persists after page refresh
- [ ] Branch login screen shows correct branch name
- [ ] Can login to branch with demo credentials

---

**Ready to test! Start with `/admin/login` and RAMU-123 / ramu1234** 🎉
