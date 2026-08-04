# 🛒 MERN E-Commerce Store — Client (Frontend)

A modern, responsive, and secure Single Page Application (SPA) built with **React**, **Vite**, **Tailwind CSS**, **Shadcn**, and **React Router**. This project serves as the frontend client for the MERN E-Commerce platform, featuring role-based authorization, dynamic product catalog management, shopping cart persistence, and a dedicated admin control center.

---

## 🌟 Key Features

- **Authentication & Authorization**: Role-based access control (RBAC) protecting customer and admin routes (`<ProtectedRoute />` and `<AdminRoutes />`).
- **Interactive Home Landing**: Dynamic hero section tailored to user roles (Customer vs. Store Owner), featured product carousels with smooth controls, and live category counters.
- **Product Catalog & Management**:
  Public catalog with search and filtering capabilities.
  - Admin-only product creation, update, and deletion interfaces.
- **Shopping Cart & Wishlist**: Real-time cart state management with instant calculations and wishlist toggles.
- **Custom 404 Error Handling**: Polished, user-friendly fallback screen with quick navigation recovery.
- **Vercel SPA Routing Configuration**: Clean rewrites preventing 404s on hard-refreshes for client-side routes.
- **Dark Theme UI**: Clean, accessible component styling powered by Tailwind CSS and Shadcn UI patterns.

## 🔗 Live Demo

- **Live Frontend URL**: [https://e-commerce-ten-wheat-40.vercel.app](https://e-commerce-ten-wheat-40.vercel.app)

---

## 💻 Tech Stack

- **Framework**: React 18+ (Vite)
- **Routing**: React Router v6+
- **Styling**: Tailwind CSS, Shadcn UI, Lucide React Icons
- **State Management**: React Context API (`AuthContext`, `CartContext`, etc.)
- **Deployment**: Vercel

---

## ⚙️ Local Setup & Installation Instructions

Follow these steps to set up and run the frontend project locally on your machine.

### 1. Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git**

### 2. Clone the Repository

Clone the repository using Git and navigate into the client project directory:

```bash
# Clone the repository
git clone [https://github.com/Anas-345/e-commerce-client](https://github.com/Anas-345/e-commerce-client)

# Move into the project directory
cd e-commerce-client/client
```
