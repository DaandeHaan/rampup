import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function AuthLayout() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === "/auth") {
            navigate("/auth/login");
        }
    });

    return <Outlet />;
}

export default AuthLayout;
