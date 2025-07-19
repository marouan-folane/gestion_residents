import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import React, { useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

function CheckImmeuble() {
    
    const navigate = useNavigate();

    const check_immeuble = async () => {
        try {
            const response = await axiosClient.get("/immeubles");

            if (response.data && response.data.length > 0) {
                navigate("/dashboard");
            } else {
                navigate("/immeubleform");
            }
        } catch (err) {
            console.error("Error checking immeuble:", err.message);
        }
    };

    useEffect(() => {
        check_immeuble();
    }, []);

    return (
        <LoadingSpinner message="Vérification de votre immeuble..." />
    );
}

export default CheckImmeuble;
