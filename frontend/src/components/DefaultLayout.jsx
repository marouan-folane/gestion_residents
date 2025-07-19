import React, { useEffect, useState } from "react";
import { data, Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import LoadingSpinner from "./LoadingSpinner";


function DefaultLayout() {
    const { notification, user, token, setUser, setToken } = useStateContext();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    if (!token) {
        return <Navigate to="/auth/login" />;
    }

    const check_immeuble = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get("/immeubles");

            if (response.data && response.data.length > 0) {
                navigate("/dashboard");
            } else {
                navigate("/immeubleform");
            }
        } catch (err) {
            console.error("Error checking immeuble:", err.message);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        check_immeuble();
    }, []);

    if (loading) {
        return <LoadingSpinner message="Chargement..." />;
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
