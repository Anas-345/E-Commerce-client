# MERN E-Commerce — Client (Frontend) Checklist

---

## 0. Project Setup

- [x] Initialize React app (Vite or CRA)
- [x] Install `react-router-dom`
- [x] Install `axios`
- [x] Install Tailwind CSS or Bootstrap and configure it
- [x] Set up folder structure (e.g., `components/`, `pages/`, `context/`, `hooks/`, `services/`, `utils/`)
- [x] Set up `.env` for API base URL (`VITE_API_URL` / `REACT_APP_API_URL`)
- [x] Set up Axios instance with base URL + interceptor to attach JWT token
- [x] Set up global Auth Context (or Redux/Zustand) — stores user, token, role, login/logout functions
- [x] Set up React Router with all routes
- [x] Create reusable layout (Navbar, Footer)

---

## 1. Authentication Pages

- [x] Register page (name, email, password form) → calls register API
- [x] Login page (email, password form) → calls login API, stores JWT
- [x] Logout functionality (clear token/context, redirect)
- [x] Store JWT securely (localStorage/cookie) and persist login on refresh
- [x] Form validation + error messages (invalid email, wrong credentials)

---

## 2. Route Protection (Authorization)

- [x] `ProtectedRoute` component — redirects unauthenticated users to login
- [ ] Customers cannot navigate to admin URLs directly (guarded, not just hidden links)
- [x] Redirect logged-in users away from Login/Register if already authenticated (optional)

---

## 3. Public Pages

- [ ] **Home Page** — displays all products added by admin
- [ ] **Products Page** — full product listing
- [ ] **Product Details Page**
- [x] **Login Page**
- [x] **Register Page**
- [ ] New admin-added products automatically appear on frontend (fetch on load / refetch)

---

## 4. Home Page

Each product card displays:
- [ ] Product image
- [ ] Product name
- [ ] Category
- [ ] Price
- [ ] Short description
- [ ] "Add to Cart" button
- [ ] Favorite (wishlist) button/icon
- [ ] "View Details" button/link

---

## 5. Product Details Page

- [ ] Large product image
- [ ] Product name
- [ ] Price
- [ ] Full description
- [ ] Category
- [ ] Stock quantity displayed
- [ ] "Add to Cart" button
- [ ] Favorite (wishlist) button

---

## 6. Shopping Cart (10 marks)

- [ ] Cart page/drawer showing all added products
- [ ] Add product to cart (from Home / Product Details)
- [ ] Remove product from cart
- [ ] Increase quantity control
- [ ] Decrease quantity control
- [ ] Subtotal per item displayed
- [ ] Total amount displayed
- [ ] Total items count displayed
- [ ] Cart persists across page refresh (localStorage or server-synced)
- [ ] Empty cart state handled gracefully

---

## 7. Wishlist / Favorites (5 marks)

- [ ] Add product to favorites (heart/star icon toggle)
- [ ] Remove product from favorites
- [ ] Wishlist page listing all favorite products
- [ ] Wishlist count reflected on customer dashboard
- [ ] Persist wishlist (localStorage or server-synced)

---

## 8. Checkout Flow (15 marks) — Core Logic

- [ ] Checkout button always opens the Checkout Page (never redirects to Login separately)
- [ ] **If logged in:** show full checkout form immediately, enabled
- [ ] **If NOT logged in:**
  - [ ] Stay on Checkout page (no redirect)
  - [ ] Show login section at the top (email, password, login button)
  - [ ] Show checkout form below it, but **disabled**
  - [ ] After successful login:
    - [ ] Hide/remove the login section
    - [ ] Enable the checkout form
    - [ ] Preserve the existing cart contents (no reset)
    - [ ] Auto-fill email field from logged-in user (if available)
    - [ ] Continue checkout without leaving/reloading the page

---

## 9. Checkout Page — Form & Summary

**Checkout form fields:**
- [ ] Full Name
- [ ] Email (auto-filled after login if available)
- [ ] Phone Number
- [ ] Shipping Address
- [ ] City
- [ ] Postal Code (optional)
- [ ] Order Notes (optional)
- [ ] Field validation (required fields, phone/email format)

**Order summary:**
- [ ] List of ordered products
- [ ] Quantity per product
- [ ] Individual price per product
- [ ] Subtotal per product
- [ ] Total amount

**Place Order button:**
- [ ] Validates form before submission
- [ ] Calls place-order API, associates order with logged-in customer
- [ ] Clears cart on success
- [ ] Redirects to My Orders or an Order Success page
- [ ] Shows loading/spinner state during submission
- [ ] Shows error message on failure (e.g., out of stock)

---

## 10. Customer Dashboard (10 marks)

- [ ] Total Orders count
- [ ] Wishlist Items count
- [ ] My Orders section/link
- [ ] Profile section (optional — view/edit name, email)
- [ ] Dashboard only accessible to logged-in customers

---

## 11. My Orders Page

- [ ] Lists only the logged-in customer's own orders
- [ ] Each order displays: Order ID, ordered products, quantity, total amount, order date
- [ ] Order status displayed (optional)
- [ ] Empty state ("No orders yet") handled

---

## 12. Admin Dashboard (10 marks)

- [ ] Total Users stat card
- [ ] Total Customers stat card
- [ ] Total Admins stat card
- [ ] Total Products stat card
- [ ] Total Orders stat card
- [ ] Total Revenue stat card (optional)
- [ ] Recent Orders widget (optional)
- [ ] Recently Registered Users widget (optional)
- [ ] Dashboard route protected — admin only

---

## 13. Admin — User Management (10 marks)

- [ ] Table/list of all registered users
- [ ] View user details: name, email, role, registration date
- [ ] Display total registered users count
- [ ] Change user role control (optional)
- [ ] Delete user button with confirmation (optional)

---

## 14. Admin — Product Management (15 marks)

- [x] Add Product form (image upload, name, description, category, price, stock quantity)
- [ ] Update Product form (pre-filled with existing data)
- [ ] Delete Product button with confirmation
- [ ] View All Products table/grid (with image, name, category, price, stock, created date)
- [ ] Image upload integrated with Cloudinary (preview before submit)
- [ ] Success/error toast or message after each action

---

## 15. Admin — Order Management

- [ ] View all orders in a table
- [ ] View customer details per order
- [ ] View ordered products per order
- [ ] View quantities per order
- [ ] View total amount per order
- [ ] View order date
- [ ] Update order status control (optional)

---

## 16. UI/UX & Responsiveness (5 marks)

- [ ] Fully responsive on mobile, tablet, desktop
- [ ] Consistent design system / color scheme / spacing
- [ ] Reusable components (Button, Card, Modal, Input, etc.)
- [ ] Clear navigation (Navbar with role-based links)
- [ ] Accessible forms (labels, focus states)
- [ ] Clean empty/error/loading states across pages

---

## 17. Bonus Features (Optional)

- [ ] Product search bar
- [ ] Category filter UI
- [ ] Price range filter UI
- [ ] Pagination controls (products/orders/users)
- [ ] Dark mode toggle
- [ ] Toast notifications (success/error) throughout app
- [ ] Loading spinners on all async actions
- [ ] User profile edit page
- [ ] Order status badges/update UI
- [ ] Sales analytics / dashboard charts (e.g., Recharts/Chart.js)

---

## 18. Submission Checklist

- [ ] Code pushed to GitHub client repository
- [ ] Client deployed and live URL working
- [ ] `.env.example` file included (without real secrets)
- [ ] README installation & setup instructions written:
  - [ ] Clone instructions
  - [ ] `npm install`
  - [ ] Environment variable setup
  - [ ] How to run locally (`npm run dev`)
  - [ ] Live client URL linked
- [ ] Final full end-to-end test against deployed server (register → browse → cart → wishlist → checkout → order → admin panel)