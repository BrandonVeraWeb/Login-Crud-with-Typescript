import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ProtectedRoute } from "./config/ProtectedRoute";
import { AuthProvider } from "./context/authContext";
import { ResetPassword } from "./pages/SendEmailForPassword";
import ChangeDisplayName from "./components/ChangeDisplayName";
import PasswordChange from "./components/ChangePassword";
import { ChangeEmail } from "./components/ChangeEmail";
function App() {
  return (
    <div>
      <div className="bg-sky-700 min-h-screen flex m-auto">
        <AuthProvider>
          <Routes>
            <Route
              path="/changeemail"
              element={
                <ProtectedRoute>
                  <ChangeEmail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/changepassword"
              element={
                <ProtectedRoute>
                  <PasswordChange />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/changeName"
              element={
                <ProtectedRoute>
                  <ChangeDisplayName />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
          </Routes>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
