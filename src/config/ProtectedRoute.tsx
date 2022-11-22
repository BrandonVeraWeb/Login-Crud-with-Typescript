import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
//element react element
export function ProtectedRoute({ children }: any) {
  const { user, loading } = useAuth();

  if (loading) return <h1>Loading</h1>;

  if (!user) return <Navigate to="/Login" />;

  return <>{children}</>;
}
export default ProtectedRoute;
