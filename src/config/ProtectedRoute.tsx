import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
//element react element
export function ProtectedRoute({ children }: { children: ReactElement }) {
  const { user, loading } = useAuth();

  if (loading) return <h1>Loading</h1>;

  if (!user) return <Navigate to="/Login" />;

  return <>{children}</>;
}
export default ProtectedRoute;
