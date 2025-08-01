import React, { useState } from "react";
import { Sun, Bell, BookOpen, Menu } from "lucide-react";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
// If you use react-icons for spinner:
import { FaSpinner } from "react-icons/fa";

function Header({ setSidebarOpen }) {
    const { setUser, setToken } = useStateContext();
    const [logoutLoading, setLogoutLoading] = useState(false);

    const onLogout = (ev) => {
        ev.preventDefault();
        setLogoutLoading(true);
        axiosClient
            .post("/logout")
            .then(() => {
                setUser({});
                setToken(null);
            })
            .finally(() => {
                setLogoutLoading(false);
            });
    };

    return (
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        className="p-1 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-1 hidden lg:block">
                        <div className="w-5 h-5 flex flex-col justify-between">
                            <div className="h-0.5 bg-gray-600"></div>
                            <div className="h-0.5 bg-gray-600"></div>
                            <div className="h-0.5 bg-gray-600"></div>
                        </div>
                    </button>
                    <h1 className="text-xl font-semibold text-gray-900">
                        Dashboard
                    </h1>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-4">
                    <button className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg hidden sm:block">
                        <Sun className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg">
                        <Bell className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg hidden sm:block">
                        <BookOpen className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                        type="button"
                        onClick={onLogout}
                        disabled={logoutLoading}
                        className={`cursor-pointer px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm flex items-center justify-center ${
                            logoutLoading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                    >
                        {logoutLoading ? (
                            <>
                                <FaSpinner className="animate-spin mr-2" />
                                Logging out...
                            </>
                        ) : (
                            "Logout"
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
