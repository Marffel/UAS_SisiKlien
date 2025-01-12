import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  // Ambil token dari Redux state atau localStorage
  const token =
    useSelector((state) => state.auth.token) ||
    localStorage.getItem("auth_token");

  // Debugging: Tampilkan token di konsol
  console.log("Token di ProtectedRoute:", token);

  if (!token) {
    // Jika tidak ada token, arahkan ke halaman login
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
