# MERN E-Commerce — Client (Frontend) Checklist

## 3. Public Pages

- [ ] **Home Page** — displays all products added by admin
- [ ] **Products Page** — full product listing
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

## 7. Wishlist / Favorites (5 marks)

- [ ] Wishlist count reflected on customer dashboard

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