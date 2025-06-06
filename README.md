# 📁 Project Management App — Frontend

This is the **frontend** for a full-stack Project Management application built with:

- ⚛️ React (Vite + TypeScript)
- 💨 TailwindCSS
- 🔐 Firebase Authentication
- 🔗 Axios for API calls
- 📊 Recharts for analytics visualization
- 🔥 Backend: Express + Knex + PostgreSQL (hosted separately)

---

## 🚀 Features

- 🔐 Firebase Auth (Login/Register with protected routes)
- 📋 Full Project CRUD (Create, Read, Update, Delete)
- 📊 Project Analytics
  - Status distribution (Pie Chart)
  - Project creation trends (Line Chart)
- 📦 Axios setup with Firebase token interceptor
- 🧾 Form validation via React Hook Form
- ⚡ Toast notifications using `react-hot-toast`

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone git@github.com:Ayushmdr5/krispcall-fe.git
cd krispcall-fe

```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Setup Firebase

- To enable Firebase Authentication, you need to create a Firebase project and configure it:
  - Go to Firebase Console.
  - Click Add project and follow the steps to create a new project.
  - In your Firebase project, go to Project settings → General tab.
  - Scroll down to Your apps, click Add app → Web.
  - Register your app and Firebase will give you the config object containing keys.
  - Copy the following keys to your .env file:

### 4. Setup Environment Variables

- Create a .env file in the root of the project:
  - VITE_FIREBASE_API_KEY=your_api_key
  - VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
  - VITE_FIREBASE_PROJECT_ID=your_project_id
  - VITE_FIREBASE_APP_ID=your_app_id

VITE_API_URL=http://localhost:5001/api

### 5. Run the app

```bash
pnpm run dev
```
