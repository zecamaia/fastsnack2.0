import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

const ProtectedRoute = ({ element }) => {
    const { isLoggedIn, loading } = useAuth();

    if (loading) {
        return <div><Spinner /></div>
    }

    return isLoggedIn ? element : <Navigate to="/login" />;
}

export default ProtectedRoute;

