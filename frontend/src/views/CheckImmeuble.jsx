import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import React, { useEffect, useState } from "react";

function CheckImmeuble() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const check_immeuble = async () => {
        try {
            const response = await axiosClient.get("/immeubles");
            console.log("Immeuble response:", response.data);

            if (response.data && response.data.length > 0) {
                navigate("/dashboard");
            } else {
                navigate("/immeubleform");
            }
        } catch (err) {
            console.error("Error checking immeuble:", err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        check_immeuble();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
            {loading ? (
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                    <span className="text-lg font-semibold text-slate-700 animate-pulse">
                        Vérification de votre immeuble...
                    </span>
                </div>
            ) : (
                <span className="text-slate-500">Redirection...</span>
            )}
        </div>
    );
}

export default CheckImmeuble;
