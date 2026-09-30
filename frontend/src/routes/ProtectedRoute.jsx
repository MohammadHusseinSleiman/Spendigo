import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import ProtectedRouteSkeleton from "../components/common/skeletons/ProtectedRouteSkeleton";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <ProtectedRouteSkeleton />;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children;
}