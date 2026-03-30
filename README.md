# 🎽 DIU Jersey Hub

**The all-in-one jersey marketplace for Daffodil International University** — browse designs, place custom orders, and manage suppliers, all in one place.

🔗 **Live:** [diu-jersey-marketplace.vercel.app](https://diu-jersey-marketplace.vercel.app)

---

## ✨ Features

### 🛍️ For Buyers (Students & Clubs)
- **Browse & Discover** — Explore a full catalog of jersey designs with category filters (Football, Cricket, Batch, Club, Tournament, Departmental) and a search bar
- **Jersey Detail Pages** — View fabric type, price per piece, min order quantity, estimated delivery, ratings, and full supplier info before ordering
- **Add to Cart & Checkout** — Cart management with size selection, quantity control, and a smooth checkout flow supporting Cash on Delivery and bKash
- **Custom Jersey Requests** — Submit a fully custom jersey order — specify type, team name, player names & numbers, size breakdown, quantity, and upload your own design or logo
- **Order Tracking** — Track every order through its lifecycle (Pending → Processing → Shipped → Delivered) with courier name, tracking ID, and status history timeline
- **Messaging** — Chat directly with the supplier assigned to your order through a built-in conversation system
- **Notifications** — Real-time in-app notifications for order status changes and updates

### 🏪 For Suppliers
- **Supplier Dashboard** — Overview stats: total products listed, incoming orders, and pending requests at a glance
- **Product Management** — Create, edit, and delete jersey listings with images, pricing, categories, fabric info, and tags
- **Order Management** — View and manage all incoming orders; update status as orders progress
- **Messaging** — Respond to buyer queries directly from the supplier messages panel

### 🔐 For Admins
- **Admin Dashboard** — Platform-wide stats: total users, suppliers, orders, and revenue
- **Order Oversight** — Full visibility into all orders across the platform with the ability to update statuses, assign couriers, and add tracking info
- **Supplier Management** — Review and manage all registered suppliers
- **User Management** — View all registered users and manage roles

### 🧱 Platform
- **Role-Based Access Control** — Three distinct roles (Customer, Supplier, Admin) with protected routes and Supabase RLS enforcing data isolation at the database level
- **Authentication** — Secure email/password auth via Supabase; profiles and roles auto-created on signup via database triggers
- **Responsive Design** — Fully mobile-friendly across all pages
- **Storage** — Jersey design and logo uploads stored in Supabase Storage

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Backend | Supabase (Auth, Database, Storage) |
| State / Data | TanStack Query (React Query) |
| Forms | React Hook Form + Zod |
| Routing | React Router v6 |
| Deployment | Vercel |

---

## 🗃️ Database Schema (Overview)

```
profiles         — user info (name, phone, department)
user_roles       — role assignment (customer / supplier / admin)
products         — jersey listings
cart_items       — per-user cart
orders           — order records with payment & shipping info
order_items      — line items per order
order_status_history — full status change log per order
custom_jersey_requests — custom design submissions
notifications    — per-user notification feed
conversations    — buyer ↔ supplier chat threads (per order)
messages         — individual messages in a conversation
```

All tables have Row Level Security enabled.

---

## 🚀 Local Setup

```bash
git clone https://github.com/Fahim1168/diu-jersey-marketplace.git
cd diu-jersey-marketplace
npm install
```

Create a `.env` file:
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Run migrations in Supabase SQL Editor (in order from `supabase/migrations/`), then:

```bash
npm run dev
```

To make yourself admin after registering:
```sql
UPDATE public.user_roles
SET role = 'admin'
WHERE user_id = (SELECT id FROM auth.users WHERE email = 'your@email.com');
```

---

## 👨‍💻 Credits

**Original concept, design, and primary development by [Fahim Muntasir Tuhin](https://github.com/Fahim1168)** — built as a final year project at Daffodil International University, Department of Software Engineering.

Deployment setup and Supabase integration by [S.M. Mehedy Kawser](https://github.com/mehedyk).

---

> *A final year project — Daffodil International University, Dept. of Software Engineering*