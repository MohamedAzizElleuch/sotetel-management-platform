<div align="center">

<img src="./Sotetel/Sotetel/frontend/public/assets/logo.png" alt="SOTETEL Logo" width="180"/>

# SOTETEL — Technical Operations Management Platform

**A full-stack, role-based web platform for managing field service operations, client interactions, invoicing, and material inventory.**

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://mongodb.com/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

---

## Table of Contents

1. [Overview](#overview)
2. [The Problem It Solves](#the-problem-it-solves)
3. [Key Features](#key-features)
4. [System Architecture](#system-architecture)
5. [Tech Stack](#tech-stack)
6. [Project Structure](#project-structure)
7. [Role-Based Access](#role-based-access)
8. [Screenshots](#screenshots)
9. [Getting Started](#getting-started)
10. [Environment Variables](#environment-variables)
11. [API Reference Overview](#api-reference-overview)
12. [Authors](#authors)

---

## Overview

**SOTETEL** is a comprehensive, production-grade web application developed for SOTETEL — a Tunisian company specializing in ICT infrastructure, networking, and technical services. The platform digitizes and centralizes the company's entire operational workflow: from client quote requests and technician task dispatching to real-time inventory tracking, PDF invoice generation, and multi-role dashboards.

The system was designed as a **final-year engineering project** with the goal of replacing fragmented manual processes with a unified, scalable digital solution tailored to SOTETEL's operational model.

---

## The Problem It Solves

Organizations that rely on field technicians and physical material deployment face a recurring set of operational challenges:

| Challenge | Impact |
|---|---|
| Manual task coordination | Delays, miscommunication, missed assignments |
| Paper-based invoicing | Errors, slow billing cycles, lost records |
| No inventory traceability | Stockouts, unauthorized usage, zero audit trail |
| Fragmented client communication | Poor client experience, untracked requests |
| No centralized data visibility | Inability to make data-driven decisions |

SOTETEL's platform addresses every one of these pain points through a single integrated system with role-specific interfaces, automated document generation, and a real-time data layer.

---

## Key Features

### 👤 Authentication & Role Management
- Secure JWT-based authentication for Admins, Technicians, and Clients
- Protected routes with role-level middleware enforcement
- Separate login/registration flows per user type

### 📋 Task Lifecycle Management
- Clients submit quote requests with full service details
- Admins review, price, and respond to quote requests
- Clients accept or reject received quotes
- Admins confirm and assign tasks to technicians
- Clients confirm task assignment before execution begins
- Technicians receive, update, and close tasks in real time

### 🧾 Invoicing & PDF Generation
- Automatic PDF invoice generation upon task completion
- Admin can edit, manage, and mark invoices as paid
- Invoices delivered directly to clients by email
- Clients can view their complete invoice history in-app

### 📦 Inventory Management
- Full CRUD for stock items (add, edit, delete, view)
- Real-time low-stock alerts and monitoring dashboard
- Technicians log material usage per task
- Complete, timestamped inventory usage logs for audit purposes

### 📊 Admin Dashboard & Analytics
- Consolidated statistics: tasks, revenue, inventory, users
- Exportable dashboard summary as PDF
- User management panel (promote, deactivate, view profiles)

### 📰 News & Announcements (Actualités)
- Admins publish company news with image uploads
- Clients and public visitors browse the news feed
- Full detail view per article

### ✉️ Contact & Messaging
- Public contact form with message delivery to admin inbox
- Admin message detail view and management interface

---

## System Architecture

The application follows a **decoupled client-server architecture** with a RESTful API backend and a single-page application (SPA) frontend.

```
┌──────────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER                            │
│                                                                  │
│   ┌──────────────────────────────────────────────────────────┐   │
│   │              React SPA  (Vite + Tailwind)                │   │
│   │                                                          │   │
│   │   ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │   │
│   │   │  Admin Pages │  │Client Pages  │  │Technician Pages│ │   │
│   │   └─────────────┘  └──────────────┘  └───────────────┘  │   │
│   │                                                          │   │
│   │   ┌──────────────────────────────────────────────────┐   │   │
│   │   │  AuthContext │ PrivateRoute │ Axios API Service  │   │   │
│   │   └──────────────────────────────────────────────────┘   │   │
│   └──────────────────────────────────────────────────────────┘   │
│                          │ HTTPS / REST                          │
└──────────────────────────│───────────────────────────────────────┘
                           │
┌──────────────────────────▼───────────────────────────────────────┐
│                    NODE.JS / EXPRESS API                         │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐    │
│   │                     Middleware Layer                    │    │
│   │   authMiddleware │ requireRole │ isOwnerOrAdmin │ multer │    │
│   └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │
│   │  Routes  │ │Controllers│ │  Models  │ │     Utils        │   │
│   │          │ │          │ │(Mongoose)│ │generateInvoicePDF│   │
│   │ /auth    │ │authCtrl  │ │ User     │ │generateDashboard │   │
│   │ /tasks   │ │taskCtrl  │ │ Task     │ │sendInvoiceEmail  │   │
│   │ /invoices│ │invoiceCtrl│ │Invoice  │ │logInventoryUsage │   │
│   │ /inventory│ │inventoryCtrl│ │InventoryItem│            │   │
│   │ /messages│ │msgCtrl   │ │ Message  │                    │   │
│   │ /actualites│ │actualiteCtrl│ │Actualite│               │   │
│   │ /users   │ │userCtrl  │ │ InventLog│                    │   │
│   │ /admin   │ │adminCtrl │ └──────────┘                    │   │
│   └──────────┘ └──────────┘                                  │   │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
                           │
           ┌───────────────▼──────────────┐
           │        MongoDB Atlas          │
           │                              │
           │  Collections:                │
           │  users · tasks · invoices    │
           │  inventoryitems · messages   │
           │  actualites · inventorylogs  │
           └──────────────────────────────┘
                           │
           ┌───────────────▼──────────────┐
           │      External Services        │
           │  Nodemailer (invoice email)   │
           │  PDFKit (PDF generation)      │
           │  Multer (image uploads)       │
           └──────────────────────────────┘
```

### Data Flow Summary

1. A **Client** logs in and submits a quote request via the React SPA.
2. The request hits the Express API, is validated via JWT middleware, and is persisted in MongoDB.
3. An **Admin** reviews and prices the request through the admin dashboard.
4. Upon client acceptance, the admin assigns the task to a **Technician**.
5. The technician logs material usage against inventory and updates task status.
6. Upon completion, the system auto-generates a PDF invoice and dispatches it via email (Nodemailer).
7. The admin marks the invoice as paid; the client can view it in their invoice portal.

---

## Tech Stack

### Backend

| Technology | Purpose |
|---|---|
| **Node.js 18+** | JavaScript runtime environment |
| **Express.js 4** | RESTful API framework |
| **MongoDB** | NoSQL document database |
| **Mongoose** | ODM for MongoDB schema modeling |
| **JSON Web Tokens (JWT)** | Stateless authentication |
| **Bcrypt.js** | Password hashing |
| **PDFKit** | Server-side PDF invoice & dashboard generation |
| **Nodemailer** | Automated invoice email delivery |
| **Multer** | Multipart file upload handling (images) |
| **dotenv** | Environment variable management |
| **CORS** | Cross-Origin Resource Sharing configuration |

### Frontend

| Technology | Purpose |
|---|---|
| **React 18** | Component-based UI library |
| **Vite 5** | Lightning-fast build tool and dev server |
| **React Router DOM** | Client-side SPA routing |
| **Tailwind CSS 3** | Utility-first CSS framework |
| **shadcn/ui** | Accessible, composable UI component library |
| **Axios** | HTTP client for API communication |
| **Context API** | Global authentication state management |

---

## Project Structure

```
Sotetel/
├── backend/
│   └── server/
│       ├── server.js               # Express app entry point
│       ├── .env                    # Backend environment variables
│       ├── config/
│       │   └── db.js               # MongoDB connection setup
│       ├── controllers/            # Business logic per domain
│       │   ├── authController.js
│       │   ├── taskController.js
│       │   ├── invoiceController.js
│       │   ├── inventoryController.js
│       │   ├── messageController.js
│       │   ├── userController.js
│       │   ├── actualiteController.js
│       │   └── adminDashboardController.js
│       ├── middleware/
│       │   ├── authMiddleware.js       # JWT verification
│       │   ├── requireRole.js          # Role-based access guard
│       │   ├── isOwnerOrAdmin.js       # Resource ownership check
│       │   └── uploadActualiteImage.js # Multer configuration
│       ├── models/                 # Mongoose schemas
│       │   ├── User.js
│       │   ├── Task.js
│       │   ├── Invoice.js
│       │   ├── InventoryItem.js
│       │   ├── InventoryLog.js
│       │   ├── Message.js
│       │   └── Actualite.js
│       ├── routes/                 # Express route definitions
│       ├── utils/
│       │   ├── generateInvoicePDF.js   # PDFKit invoice builder
│       │   ├── generateDashboardPDF.js # PDFKit dashboard export
│       │   ├── sendInvoiceEmail.js     # Nodemailer email dispatch
│       │   ├── logInventoryUsage.js    # Inventory audit helper
│       │   └── isTechnicianAuthorized.js
│       └── uploads/
│           └── actualites/         # Uploaded news images
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
        ├── App.jsx                 # Root router and layout
        ├── main.jsx
        ├── context/
        │   └── AuthContext.jsx     # Auth state & token management
        ├── services/
        │   ├── api.js              # Axios instance + interceptors
        │   └── authService.js
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Footer.jsx
        │   ├── PrivateRoute.jsx    # Route protection wrapper
        │   └── ui/                 # shadcn/ui components
        └── pages/
            ├── auth/               # Login & registration pages
            ├── admin/              # Admin-only pages
            ├── client/             # Client portal pages
            └── technician/         # Technician workspace pages
```

---

## Role-Based Access

The platform implements a three-tier role system, with each role accessing a dedicated interface and a set of protected API endpoints.

```
┌─────────────────────────────────────────────────────────────────┐
│                          ROLE MATRIX                            │
├──────────────────┬────────────────────────────────────────────  ┤
│     ADMIN        │  Full access to all modules                  │
│                  │  • Dashboard analytics & PDF export          │
│                  │  • Task assignment to technicians            │
│                  │  • Quote request management                  │
│                  │  • Invoice creation, editing & marking paid  │
│                  │  • Inventory CRUD & low-stock monitoring     │
│                  │  • User management                           │
│                  │  • News (Actualités) management              │
│                  │  • Message inbox                             │
├──────────────────┼────────────────────────────────────────────  ┤
│   TECHNICIAN     │  Operational access                          │
│                  │  • Personal task dashboard                   │
│                  │  • Task status updates                       │
│                  │  • Material usage logging                    │
│                  │  • Completed task history                    │
├──────────────────┼────────────────────────────────────────────  ┤
│     CLIENT       │  Self-service portal                         │
│                  │  • Submit & track quote requests             │
│                  │  • Accept/reject quotes received from admin  │
│                  │  • View and confirm assigned tasks           │
│                  │  • View invoice history                      │
│                  │  • Browse news feed                          │
└──────────────────┴────────────────────────────────────────────  ┘
```

---

## Screenshots

### 🌐 Public Interface

**Figure 19 — Homepage Interface**
> The landing page presenting SOTETEL's brand identity, services overview, and navigation to all public sections.

![Homepage Interface](./Sotetel/Sotetel/frontend/screenshots/fig19-homepage.png)

---

**Figure 20 — Company Services Interface**
> Displays the full catalogue of ICT services offered by SOTETEL, including networking, security, and infrastructure solutions.

![Company Services Interface](./Sotetel/Sotetel/frontend/screenshots/fig20-services.png)

---

**Figure 21 — Authentication Page Interface**
> Unified login/registration entry point for clients and administrators, with role-based form routing.

![Authentication Page Interface](./Sotetel/Sotetel/frontend/screenshots/fig21-auth.png)

---

### 👤 Client Portal

**Figure 22 — Client Dashboard Interface**
> The client's central hub showing active tasks, pending quotes, recent invoices, and quick-action buttons.

![Client Dashboard Interface](./Sotetel/Sotetel/frontend/screenshots/fig22-client-dashboard.png)

---

**Figure 23 — Client Quote Request Page**
> Form allowing clients to submit a detailed service request, including description, urgency, and preferred timeline.

![Client Quote Request Page](./Sotetel/Sotetel/frontend/screenshots/fig23-client-quote-request.png)

---

**Figure 26 — Quote Response Page**
> Displays the admin's priced quote to the client, who can formally accept or reject the offer before work begins.

![Quote Response Page](./Sotetel/Sotetel/frontend/screenshots/fig26-client-quote-response.png)

---

**Figure 28 — Client Task Confirmation Page**
> Once the admin has assigned a technician, the client is prompted to formally confirm the task before execution.

![Client Task Confirmation Page](./Sotetel/Sotetel/frontend/screenshots/fig28-client-task-confirm.png)

---

**Figure 34 — Client Invoices Page**
> Lists all invoices issued to the client, with status (paid/unpaid), amounts, and downloadable PDF links.

![Client Invoices Page](./Sotetel/Sotetel/frontend/screenshots/fig34-client-invoices.png)

---

### 🛡️ Admin Panel

**Figure 24 — Admin Dashboard Interface**
> Central analytics panel showing live KPIs: total tasks, open requests, inventory status, and revenue metrics.

![Admin Dashboard Interface](./Sotetel/Sotetel/frontend/screenshots/fig24-admin-dashboard.png)

---

**Figure 25 — Quote Management Interface**
> Lists all client quote requests; admin can open, price, and respond to each request individually.

![Quote Management Interface](./Sotetel/Sotetel/frontend/screenshots/fig25-admin-quote-management.png)

---

**Figure 27 — Task Confirmation Page (Admin)**
> The admin finalizes and sends the task confirmation to the client after pricing approval.

![Task Confirmation Page Admin](./Sotetel/Sotetel/frontend/screenshots/fig27-admin-task-confirm.png)

---

**Figure 29 — Task Assignment Page**
> Admin selects a qualified technician for the confirmed task and dispatches the assignment.

![Task Assignment Page](./Sotetel/Sotetel/frontend/screenshots/fig29-admin-task-assignment.png)

---

**Figure 33 — Admin Manage Invoice**
> Allows the admin to review, edit line items, and update the payment status of any invoice.

![Admin Manage Invoice](./Sotetel/Sotetel/frontend/screenshots/fig33-admin-invoice.png)

---

**Figure 35 — Inventory Management Page**
> Full stock control panel: add items, edit quantities, view usage history, and monitor low-stock alerts.

![Inventory Management Page](./Sotetel/Sotetel/frontend/screenshots/fig35-admin-inventory.png)

---

**Figure 36 — Statistics Page**
> Visual analytics page with charts for task completion rates, revenue trends, and inventory consumption.

![Statistics Page](./Sotetel/Sotetel/frontend/screenshots/fig36-admin-statistics.png)

---

**Figure 37 — User Management Page**
> Displays all registered users (admins, technicians, clients), with options to view profiles and manage roles.

![User Management Page](./Sotetel/Sotetel/frontend/screenshots/fig37-admin-users.png)

---

### 🔧 Technician Workspace

**Figure 30 — Technician Dashboard Page**
> Shows the technician's assigned tasks with status indicators, priority levels, and quick-action links.

![Technician Dashboard Page](./Sotetel/Sotetel/frontend/screenshots/fig30-technician-dashboard.png)

---

**Figure 31 — Task Update Page**
> Allows the technician to update task progress (in-progress, completed), add notes, and log materials used.

![Task Update Page](./Sotetel/Sotetel/frontend/screenshots/fig31-technician-task-update.png)

---

**Figure 32 — Admin Stock Usage Log Page**
> Chronological log of all inventory movements triggered by technicians, with item name, quantity, and task reference.

![Admin Stock Usage Log Page](./Sotetel/Sotetel/frontend/screenshots/fig32-admin-stock-log.png)

---

## Getting Started

### Prerequisites

Ensure the following are installed on your machine:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- A running [MongoDB](https://www.mongodb.com/) instance (local or MongoDB Atlas)
- [Git](https://git-scm.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/sotetel.git
cd sotetel
```

---

### 2. Set Up the Backend

```bash
# Navigate to the backend server directory
cd backend/server

# Install dependencies
npm install

# Create your environment file
cp .env.example .env
# → Edit .env with your credentials (see Environment Variables section below)

# Start the development server
npm run dev
```

> The API will be available at `http://localhost:5000` by default.

---

### 3. Set Up the Frontend

Open a second terminal:

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Create your environment file
cp .env.example .env
# → Set VITE_API_URL to your backend URL

# Start the Vite development server
npm run dev
```

> The application will be available at `http://localhost:5173` by default.

---

### 4. Build for Production

```bash
# Frontend production build
cd frontend
npm run build
# → Output is in the /dist directory

# Backend — start in production mode
cd backend/server
npm start
```

---

## Environment Variables

### Backend — `backend/server/.env`

```env
# Server
PORT=5000

# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/sotetel

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Client URL (for CORS)
CLIENT_URL=http://localhost:5173
```

### Frontend — `frontend/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

---

## API Reference Overview

All API routes are prefixed with `/api`. Authentication routes are public; all others require a valid JWT Bearer token.

| Domain | Base Route | Access |
|---|---|---|
| Authentication | `/api/auth` | Public |
| Users | `/api/users` | Admin / Own User |
| Tasks | `/api/tasks` | Admin, Technician, Client |
| Invoices | `/api/invoices` | Admin, Client |
| Inventory | `/api/inventory` | Admin, Technician |
| Messages | `/api/messages` | Public (POST), Admin (GET) |
| News (Actualités) | `/api/actualites` | Admin (write), All (read) |
| Admin Dashboard | `/api/admin` | Admin only |

> Detailed Swagger/OpenAPI documentation can be added in a future iteration.

---

## Authors

Developed as a **Final Year Engineering Project** at SOTETEL.

| Role | Contributor |
|---|---|
| Full-Stack Developer | *[Your Name]* |
| Academic Supervisor | *[Supervisor Name]* |
| Industrial Supervisor | *[Company Supervisor Name]* |
| Host Organization | **SOTETEL** — Tunisia |

---

<div align="center">

**© 2025 SOTETEL. All rights reserved.**

*Built with precision, designed for scale.*

</div>
