🛒 Productify

Multi-Role Product Management Platform (Admin • Vendor • User)

Productify is a full-stack product management platform where vendors can add products, admins can approve/reject them, and users can browse approved products.
It supports email/password authentication, Google OAuth, and role-based dashboards.

Features -

🔐 Authentication

Email & Password login/signup

Google OAuth (One-tap sign-in)

JWT-based authentication

Secure role-based access

👥 Role-Based Access
Role	Capabilities
Admin	Approve / Reject products, manage vendors & products
Vendor	Add, edit, delete own products
User	View & search approved products

📦 Product Management

Card-based product layout

Product image preview

Status-based filtering (approved / pending / rejected)

Search by name or category

View / Edit via modal

Delete support (admin & vendor)

🧱 Tech Stack
Frontend

React + Vite

Tailwind CSS

React Router

Formik + Yup

Axios

react-hot-toast

Google OAuth (@react-oauth/google)

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

bcrypt

Google OAuth verification

🗂️ Project Structure
Productify/
├── backend/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── api/
│   ├── utils/
│   └── main.jsx

▶️ Running Locally
1️⃣ Clone Repository
git clone https://github.com/VANSHU2004/Productify-Project.git
cd productify

2️⃣ Backend Setup
cd backend
npm install
npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

🔐 Default Roles Logic

Admin is created manually (one-time)

Signup allows only User & Vendor

Role is assigned at signup

Login does not require role selection

🧠 Key Design Decisions

No role logic inside UI components (ProductCard / Grid are reusable)

Status is read-only for vendors & users

Admin actions are handled via modal

Secure backend filtering using token (no user ID leakage)

📸 Screens Included

Login & Signup (Email + Google)

Admin Dashboard

Vendor Dashboard

User Product Listing

Product Approval Panel

🧪 Future Enhancements

Orders & Payments

Analytics dashboards

Soft delete products

Bulk approvals

Product reviews & ratings

👨‍💻 Author

Atul
Full Stack Developer
🚀 Focused on scalable MERN applications

⭐ If you like this project

Give it a star ⭐ — it helps a lot!
