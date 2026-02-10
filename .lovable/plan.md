

# DIU Jersey Hub — Implementation Plan

## Overview
A Foodpanda-style university jersey marketplace where suppliers list designs and university departments/clubs browse, customize, and submit order requests. Built with React, Tailwind CSS, and Supabase (Lovable Cloud) for backend.

**Branding:** Deep green (#006b3f) primary, dark charcoal text, bright yellow/neon green accents. Rounded cards, soft shadows, smooth hover animations. Clean sans-serif font.

---

## Phase 1: Foundation & Public Home Page

### 1.1 Design System & Layout
- Set up the custom color theme (deep green, charcoal, yellow accent)
- Create a sticky top navigation bar with "DIU Jersey Hub" text logo (with a jersey/football icon in SVG), navigation links (Home, Browse Jerseys, Suppliers, How It Works, About, Contact), and Login/Register buttons with a highlighted "Become a Supplier" CTA
- Build responsive layout shell (mobile hamburger menu, desktop full nav)
- Create a footer with About, Contact, Supplier links, and "A final year project for DIU" tagline

### 1.2 Home Page Sections
- **Hero Banner**: Full-width section with jersey imagery, heading "All DIU Jerseys in One Place", subtext, and two CTA buttons ("Order for Your Club" and "Become a Supplier")
- **Category Quick Filters**: Horizontal chip buttons (All, Football, Cricket, Batch Jersey, Tournament, Departmental) that filter the product grid below
- **Jersey Product Grid**: 3-4 cards per row (desktop), 1-2 on mobile. Each card shows jersey image, name, supplier, category, price range in ৳, rating stars, "Top Seller"/"Featured" badges, heart icon for favorites, and a "View Details" button. **Key interaction**: on hover, the card background smoothly transitions color (white → light green/purple), slightly scales up, and elevates with a stronger shadow (matching your reference)
- **Top Sellers Carousel**: Horizontal slider section titled "Top Sellers" with large jersey cards (image, title, supplier, price range), arrow navigation and auto-scroll — styled like the "OUR BEST SELLERS" reference
- **Featured Suppliers Section**: Grid of supplier cards with logo, brand name, short description, rating, number of designs, and "View Supplier" button
- **How It Works**: 3-step visual flow (Browse → Customize → Send Request) with icons and short descriptions
- **Testimonials**: Static cards with sample quotes from fake departments/clubs

### 1.3 Sample Data
- Seed 3-5 sample suppliers with realistic Bangladeshi jersey brand names and logos
- Seed 10-15 jersey designs with DIU-themed names, categories, and pricing in Bangladeshi Taka (৳)
- All data stored initially as static JSON/mock data in the frontend

---

## Phase 2: Backend Setup with Supabase

### 2.1 Database & Auth
- Set up Supabase (Lovable Cloud) with authentication (email + password)
- Create database tables: **users** (via Supabase auth), **user_roles** (admin/supplier/buyer — stored separately for security), **suppliers**, **jersey_designs**, **order_requests**, **reviews**
- Set up Row-Level Security (RLS) policies so users can only access their own data, admins can access everything
- Seed the database with the sample suppliers, jersey designs, and a default admin user

### 2.2 Auth Pages
- **Login page**: Email + password form, redirects to appropriate dashboard based on role after login
- **Register page**: Email, name, password, phone, role selection (Supplier or Buyer). Suppliers go through an approval flow
- Role-based route protection (admin, supplier, buyer dashboards only accessible to respective roles)

---

## Phase 3: Browse & Jersey Detail Pages

### 3.1 Browse Jerseys Page (/jerseys)
- Full listing of all jersey designs from the database
- Search bar (by jersey name, supplier, category)
- Filter sidebar/toolbar: category dropdown, price range slider, rating filter (4+ stars), supplier filter
- Same jersey card component from the home page (reusable, with hover effects)
- Empty state for no results

### 3.2 Jersey Detail Page (/jerseys/:id)
- Large jersey images with gallery (multiple images)
- Full details: supplier info, fabric type, min quantity, price per piece, estimated delivery, tags
- "Request Order" button that opens an order form (modal or separate page):
  - Department/club name, quantity, size breakdown (S/M/L/XL/XXL counts)
  - Upload fields for university logo and club logo
  - Optional player list upload
  - Color preferences and notes text area
  - Submit creates an OrderRequest with status "pending"
- Reviews section: list of reviews with ratings, and a form for logged-in buyers to submit reviews

### 3.3 Supplier Public Profile Page (/suppliers/:id)
- Supplier logo, cover image, description, rating, and full list of their jersey designs

---

## Phase 4: Dashboards

### 4.1 Buyer Dashboard (/dashboard/buyer)
- "My Order Requests" list with status badges (pending, under review, approved, rejected, completed)
- Option to duplicate a previous order request
- Profile section to update name, phone, department/club name

### 4.2 Supplier Dashboard (/dashboard/supplier)
- **Overview**: Stats cards (number of designs, total requests, pending requests)
- **My Jerseys**: Table/card listing of their jersey designs with create, edit, delete functionality. Form to add new jersey with image upload, category, pricing, etc.
- **Order Requests**: List of incoming orders with ability to change status (pending → under_review → approved/rejected → completed)

### 4.3 Admin Dashboard (/dashboard/admin)
- **Overview**: Stats cards (total suppliers, total jerseys, total orders, pending approvals)
- **Supplier Management**: Table of all suppliers with approve/block functionality
- **Jersey Management**: List of all jerseys with ability to toggle "Top Seller" and "Featured" flags
- **Order Monitoring**: Read-only view of all orders across the platform

---

## Phase 5: Polish & UX

- Skeleton loaders during data fetching
- Toast notifications for actions (order submitted, jersey created, etc.)
- Form validation with clear inline error messages
- Responsive testing across mobile, tablet, and desktop
- Consistent animations and hover effects throughout
- Error states and empty states for all lists

