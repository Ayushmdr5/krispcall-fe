import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/Dashboard";
import { CreateProject } from "./pages/CreateProject"; // ✅ Import CreateProject
import { JSX } from "react";
import { EditProjectPage } from "./pages/EditProjectPage";
import { ProjectListPage } from "./pages/ProjectList";
import CheckoutForm from "./components/CheckoutForm";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/stripe" element={<CheckoutForm />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/new"
            element={
              <PrivateRoute>
                <CreateProject />
              </PrivateRoute>
            }
          />

          <Route
            path="/projects/list"
            element={
              <PrivateRoute>
                <ProjectListPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/projects/:id/edit"
            element={
              <PrivateRoute>
                <EditProjectPage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
