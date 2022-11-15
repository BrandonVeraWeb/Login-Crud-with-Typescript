import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ProtectedRoute } from "./config/ProtectedRoute";
import { AuthProvider } from "./context/authContext";
import { ResetPassword } from "./pages/SendEmailForPassword";
function App() {
  return (
    <div>
      <div className="bg-slate-500 h-screen text-black flex-none">
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={<ProtectedRoute>{<Home />}</ProtectedRoute>}
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
