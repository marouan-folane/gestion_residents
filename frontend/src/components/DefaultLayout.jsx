import React, { useEffect } from "react";
import { data, Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";


function DefaultLayout() {
    const { notification, user, token, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to="/auth/login" />;
    }

    return (
        <div className="min-h-screen bg-gray-100">
          
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    );
}

export default DefaultLayout;
