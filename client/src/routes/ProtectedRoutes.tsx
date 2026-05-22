import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader.tsx";
import Navigation from "../components/Navigation.tsx";

interface ProtectedRoutesProp {
    isAuthenticated: boolean,
    loading: boolean,
}

function ProtectedRoutes({ isAuthenticated, loading }: ProtectedRoutesProp) {
    if (loading) {
        return <Loader loading={true} />
    }
    console.log(isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return(<>
        <Navigation/>
        <Outlet />
    </>)
}

export default ProtectedRoutes;