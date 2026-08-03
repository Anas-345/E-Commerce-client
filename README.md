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

## 14. Admin — Product Management (15 marks)

- [ ] Image upload integrated with Cloudinary (preview before submit)



## 17. Bonus Features (Optional)

- [ ] Product search bar
- [ ] Category filter UI
- [ ] Price range filter UI
- [ ] Pagination controls (products/orders/users)

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