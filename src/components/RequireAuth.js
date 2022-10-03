import { useLocation, Navigate, Outlet } from "react-router-dom";
import React from "react";
import { Alert } from "@mui/material";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log(auth.user)
    if(auth.roles) {
        return (
            auth.roles.find(role => allowedRoles.includes(role))
                ? <Outlet />
                : auth.user
                    ? <Alert variant="filled" severity="warning">Brak uprawnień!</Alert>
                    : <Navigate to="/login" state={{ from: location }} replace />
        );
    } else {
        return (
            <Navigate to="/login" state={{ from: location }} replace />
        )
    }
}

export default RequireAuth;