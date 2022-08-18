import { Navigate, Outlet } from "react-router-dom";


export default function PrivateOutlet() {
    const auth = localStorage.getItem("isAuthenticated");

    return auth ? <Outlet /> : <Navigate to="/" />;
}