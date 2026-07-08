# 🛍️ Rajendra Store - E-Commerce Frontend

A modern, high-performance e-commerce platform built with the MERN stack. This project seamlessly integrates with Node.js, Express, and MongoDB backends.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Build & Deployment](#build--deployment)
- [API Integration](#api-integration)
- [Authentication](#authentication)
- [Component Documentation](#component-documentation)
- [Git Workflow](#git-workflow)
- [Contributing](#contributing)

---

## 📱 Project Overview

**Rajendra Store** is a full-stack e-commerce application featuring:

- **Modern UI/UX**: Beautiful, responsive design with dark mode support
- **Real-time Cart Management**: Cart persistence with Context API
- **Advanced Authentication**: JWT-based secure login system
- **Admin Dashboard**: Complete product & order management
- **User Profiles**: Customer account management
- **Wishlist System**: Save products for later
- **Order Tracking**: Real-time order monitoring

### Production URL

🚀 **Live**: [https://ecommerce-rajendra.vercel.app](https://ecommerce-rajendra.vercel.app)

---

## ✨ Features

### For Customers

✅ User registration & secure authentication  
✅ Browse products by categories  
✅ Advanced search & filtering  
✅ Shopping cart with persistent storage  
✅ Wishlist management  
✅ Checkout & order placement  
✅ Order history & tracking  
✅ User profile management  
✅ Dark/Light theme toggle

### For Administrators

✅ Product CRUD operations (Create, Read, Update, Delete)  
✅ Category management  
✅ Order management & status tracking  
✅ User management & role assignment  
✅ Analytics & sales dashboard  
✅ Cloudinary image uploads  
✅ Inventory tracking

---

## 🛠 Tech Stack

### Frontend

- **React 18**: UI library with hooks
- **Vite**: Ultra-fast build tool
- **React Router v6**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations
- **Lucide React**: Beautiful icon library
- **Axios**: HTTP client with interceptors
- **React Hook Form**: Efficient form management
- **Zod**: TypeScript-first schema validation
- **Context API**: State management

### Backend Integration

- **REST API**: RESTful endpoints
- **JWT Authentication**: Token-based security
- **Axios Interceptors**: Automatic token injection

### Tools & Infrastructure

- **Node.js & npm**: Package management
- **ESLint**: Code quality
- **Vercel**: Deployment & hosting
- **GitHub**: Version control

---

## 📁 Project Structure

```
ecommerce-frontend/
├── public/                          # Static assets
├── src/
│   ├── api/
│   │   └── axios.js                 # Axios instance with interceptors
│   │
│   ├── assets/                      # Images, fonts, etc.
│   │
│   ├── components/                  # Reusable components
│   │   ├── common/
│   │   │   ├── Button.jsx          # Reusable button component
│   │   │   ├── ProductCard.jsx     # Product display card
│   │   │   ├── ErrorBoundary.jsx   # Error handling
│   │   │   ├── SectionHeader.jsx   # Section titles
│   │   │   └── StatusState.jsx     # Loading/error states
│   │   │
│   │   ├── forms/
│   │   │   ├── LoginForm.jsx       # Login form
│   │   │   ├── RegisterForm.jsx    # Registration form
│   │   │   ├── ProductForm.jsx     # Product CRUD form
│   │   │   ├── CheckoutForm.jsx    # Checkout form
│   │   │   └── ProfileForm.jsx     # Profile update form
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.jsx            # Hero section
│   │   │   ├── Categories.jsx      # Category showcase
│   │   │   ├── FeaturedProducts.jsx # Featured items
│   │   │   └── Home.jsx            # Home page
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   └── Footer.jsx          # Footer section
│   │   │
│   │   └── ui/                     # Custom UI components
│   │
│   ├── context/
│   │   ├── AuthContext.jsx         # Authentication state
│   │   ├── CartContext.jsx         # Shopping cart state
│   │   └── ThemeContext.jsx        # Dark/light theme
│   │
│   ├── hooks/                      # Custom React hooks
│   │
│   ├── layouts/
│   │   └── MinLayout.jsx           # Main layout wrapper
│   │
│   ├── pages/
│   │   ├── Home.jsx                # Home page
│   │   ├── Login.jsx               # Login page
│   │   ├── Register.jsx            # Registration page
│   │   ├── Products.jsx            # Products listing
│   │   ├── ProductDetails.jsx      # Individual product
│   │   ├── Cart.jsx                # Shopping cart
│   │   ├── Checkout.jsx            # Checkout page
│   │   ├── Dashboard.jsx           # User dashboard
│   │   ├── Profile.jsx             # User profile
│   │   ├── Orders.jsx              # Order history
│   │   ├── Wishlist.jsx            # Saved products
│   │   ├── Admin.jsx               # Admin dashboard
│   │   ├── ForgotPassword.jsx      # Password recovery
│   │   ├── ResetPassword.jsx       # Reset password
│   │   ├── NotFound.jsx            # 404 page
│   │   │
│   │   ├── admin/                  # Admin sub-pages
│   │   │   ├── ProductManagement.jsx
│   │   │   ├── CategoryManagement.jsx
│   │   │   ├── OrderManagement.jsx
│   │   │   ├── UserManagement.jsx
│   │   │   └── AdminAnalytics.jsx
│   │   │
│   │   ├── auth/                   # Auth sub-pages
│   │   │   └── AuthLayout.jsx      # Auth page wrapper
│   │   │
│   │   ├── user/                   # User sub-pages
│   │   │   ├── UserSettings.jsx
│   │   │   └── UserOrders.jsx
│   │   │
│   │   └── products/               # Product sub-pages
│   │       └── ProductCreate.jsx   # Product creation
│   │
│   ├── services/
│   │   ├── api.js                  # API helper (deprecated)
│   │   ├── authService.js          # Auth API calls
│   │   ├── productService.js       # Product API calls
│   │   ├── cartService.js          # Cart API calls
│   │   ├── orderService.js         # Order API calls
│   │   └── wishlistService.js      # Wishlist API calls
│   │
│   ├── utils/
│   │   └── formatters.js           # Utility functions
│   │
│   ├── App.jsx                     # Root component & routing
│   ├── App.css                     # Global styles
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global CSS
│
├── .eslintrc.cjs                   # ESLint config
├── index.html                      # HTML template
├── package.json                    # Dependencies & scripts
├── vite.config.js                  # Vite configuration
└── README.md                       # This file
```

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js 16+ (Recommended: 18 LTS)
- npm or yarn
- Git

### Step 1: Clone Repository

```bash
git clone https://github.com/rajendrabist07/ecommerce-frontend.git
cd ecommerce-frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Create Environment File

```bash
cp .env.example .env.local
```

### Step 4: Configure Environment Variables

```env
VITE_API_URL=https://your-backend-url/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
```

### Step 5: Start Development Server

```bash
npm run dev
```

Browser automatically opens at: `http://localhost:5173`

---

## 🔐 Environment Variables

| Variable                        | Description           | Example                         |
| ------------------------------- | --------------------- | ------------------------------- |
| `VITE_API_URL`                  | Backend API base URL  | `https://api.rajendrastore.com` |
| `VITE_CLOUDINARY_CLOUD_NAME`    | Cloudinary cloud name | `your-cloud-name`               |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Upload preset         | `unsigned-preset`               |

---

## 💻 Development

### Available Scripts

```bash
# Start development server (with HMR)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

### Code Quality

- **ESLint**: Enforces code standards
- **Prettier**: Auto-format code (optional)
- **React Hook Form**: Type-safe forms

---

## 📦 Build & Deployment

### Build for Production

```bash
npm run build
```

Output directory: `dist/`

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Manual Deployment

1. Build: `npm run build`
2. Upload `dist/` folder to hosting
3. Configure 404 fallback to `index.html`

---

## 🔌 API Integration

### Backend Connection Status

✅ **Backend API**: `https://e-commerce-backend-api-0kvd.onrender.com/api` - **Active**

The backend is deployed on Render.com and is actively responding to requests. All API endpoints are configured and ready for integration.

### Base URL

```javascript
// src/api/axios.js
const api = axios.create({
  baseURL: "https://e-commerce-backend-api-0kvd.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
```

### Automatic Token Injection

```javascript
// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("rajendra_store_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Required Backend Endpoints

#### Authentication

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password/:token` - Reset password
- `GET /auth/profile` - Get user profile
- `PUT /auth/profile` - Update profile

#### Products

- `GET /products` - List all products
- `GET /products/:id` - Get product details
- `POST /products` - Create product (Admin)
- `PUT /products/:id` - Update product (Admin)
- `DELETE /products/:id` - Delete product (Admin)

#### Categories

- `GET /categories` - List categories
- `POST /categories` - Create category (Admin)
- `PUT /categories/:id` - Update category (Admin)
- `DELETE /categories/:id` - Delete category (Admin)

#### Orders

- `GET /orders` - Get user orders
- `POST /orders` - Create order
- `PUT /orders/:id` - Update order status (Admin)

#### Cart & Wishlist

- `GET /cart` - Get cart
- `POST /cart/add` - Add to cart
- `DELETE /cart/:id` - Remove from cart
- `GET /wishlist` - Get wishlist
- `POST /wishlist/add` - Add to wishlist

---

## 🔐 Authentication

### Login Flow

```javascript
// 1. User submits credentials
// 2. Backend validates & returns token
// 3. Token stored in localStorage
// 4. Token automatically attached to all API requests
// 5. User redirected to dashboard

const { signIn } = useAuth();
await signIn({ email, password }); // Context handles everything
```

### Protected Routes

```javascript
// Routes requiring authentication
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/orders" element={<Orders />} />
<Route path="/profile" element={<Profile />} />
```

### Admin Routes

```javascript
// Only accessible to users with admin role
<Route path="/admin" element={<Admin />} />
```

---

## 🎨 Component Documentation

### Common Components

#### Button

```jsx
import Button from "@/components/common/Button";

<Button variant="primary" icon={ArrowRight} isLoading={false}>
  Click me
</Button>;
```

#### ProductCard

```jsx
<ProductCard product={product} onAddToCart={handleAdd} />
```

#### SectionHeader

```jsx
<SectionHeader
  eyebrow="Featured"
  title="Our Best Products"
  description="Handpicked items"
/>
```

### Form Components

#### LoginForm

```jsx
import LoginForm from "@/components/forms/LoginForm";
<LoginForm onSuccess={() => navigate("/dashboard")} />;
```

---

## 📚 Git Workflow

### Everyday Commands

#### 1️⃣ Check Status

```bash
git status
```

#### 2️⃣ Stage Changes

```bash
# Stage specific file
git add src/components/Button.jsx

# Stage all changes (correct way)
git add .
```

#### 3️⃣ Commit Changes

```bash
# Standard commit
git commit -m "feat: add new feature description"

# Commit types
git commit -m "feat: new feature"           # New feature
git commit -m "fix: bug fix"                # Bug fix
git commit -m "refactor: code improvement" # Code improvement
git commit -m "docs: update documentation" # Documentation
```

#### 4️⃣ Push to GitHub

```bash
git push origin main
```

#### 5️⃣ Pull Latest Changes

```bash
git pull origin main
```

### Complete Example

```bash
# Make changes to files
git status                    # Check what changed
git add .                     # Stage all changes
git commit -m "fix: dashboard layout issue"
git push origin main         # Push to GitHub
```

### Useful Git Commands

```bash
# View commit history
git log --oneline

# View current branch
git branch

# Create new branch
git checkout -b feature/new-feature

# Switch branch
git checkout main

# View differences
git diff
```

---

## 🎯 Development Best Practices

### 1. Component Structure

```jsx
// ✅ GOOD
import { useState } from "react";
import Button from "@/components/common/Button";

export default function MyComponent() {
  const [state, setState] = useState(null);

  return <Button>{state}</Button>;
}
```

### 2. Form Handling

```jsx
// ✅ Use React Hook Form + Zod
const {
  register,
  formState: { errors },
} = useForm();
```

### 3. API Calls

```jsx
// ✅ Use services
import { authService } from "@/services";
const user = await authService.login(credentials);
```

### 4. State Management

```jsx
// ✅ Use Context for global state
const { user, signOut } = useAuth();
```

---

## 🐛 Troubleshooting

### Port 5173 Already in Use

```bash
# Find & kill process
lsof -i :5173
kill -9 <PID>

# Or use different port
npm run dev -- --port 3000
```

### Module Not Found Errors

```bash
# Clear node_modules & reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Fails

```bash
# Clear Vite cache
rm -rf dist .vite
npm run build
```

### Token Not Working

```bash
# Check localStorage
localStorage.getItem("rajendra_store_token")

# Check API interceptor in axios.js
```

---

## 📋 Checklist for New Developers

- [ ] Clone repository
- [ ] Install dependencies: `npm install`
- [ ] Create `.env.local` file
- [ ] Configure API URL
- [ ] Run dev server: `npm run dev`
- [ ] Test login page
- [ ] Test product browsing
- [ ] Test cart functionality
- [ ] Read component docs
- [ ] Make first commit

---

## 🤝 Contributing

### Development Workflow

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes
3. Commit: `git commit -m "feat: description"`
4. Push: `git push origin feature/your-feature`
5. Create Pull Request on GitHub

### Commit Message Convention

```
feat: add new feature
fix: fix a bug
refactor: improve code
docs: update documentation
style: format code
test: add tests
chore: update dependencies
```

---

## 📞 Support

- 📧 Email: rajendra@example.com
- 💬 GitHub Issues: [Create Issue](https://github.com/rajendrabist07/ecommerce-frontend/issues)
- 📱 WhatsApp: Contact for urgent help

---

## 📄 License

MIT License - Feel free to use this project for learning and development.

---

## 👨‍💼 Built By

**Rajendra Bistaray** - Full Stack Developer

---

## 🙏 Acknowledgments

- React & Vite teams
- Tailwind CSS community
- Lucide icons
- All contributors

---

**Last Updated**: July 2026  
**Version**: 1.0.0
