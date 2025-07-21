import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import HeaderAboveMenu from "./HeaderAboveMenu";

import { Settings, FileText, HelpCircle, ChevronDown } from "lucide-react";

function MenuItems({ sidebarOpen, setSidebarOpen }) {
    const [openDropdowns, setOpenDropdowns] = useState({});

    const sidebarItems = [
        {
            icon: Settings,
            label: "Dashboard",
            to: "/dashboard",
            hasDropdown: false,
        },
        {
            icon: FileText,
            label: "Owners",
            to: "/dashboard/owners",
            hasDropdown: false,
        },
        { icon: HelpCircle, label: "Guide", to: "/guide", hasDropdown: false },
        // …
    ];

    const toggleDropdown = (key) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <>
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            {/* Sidebar */}
            <div
                className={`${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 fixed lg:relative inset-y-0 left-0 z-50 w-60 bg-white shadow-lg lg:shadow-sm border-r border-gray-200 transition-transform duration-300 ease-in-out lg:transition-none`}
            >
                {/* Header Above Menu */}
                <HeaderAboveMenu />

                {/* Navigation */}
                <nav className="p-4">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.label}
                                to={item.to}
                                end={item.to === "/dashboard"}
                                className={({ isActive }) =>
                                    `flex items-center justify-between w-full px-3 py-3 mb-1 rounded-lg transition-colors
                                    ${
                                        isActive
                                            ? "bg-teal-100 text-teal-700"
                                            : "text-gray-600 hover:bg-gray-50"
                                    }`
                                }
                                onClick={() => {
                                    if (window.innerWidth < 1024)
                                        setSidebarOpen(false);
                                }}
                            >
                                <div className="flex items-center space-x-3">
                                    <Icon className="w-5 h-5" />
                                    <span className="text-base font-medium">
                                        {item.label}
                                    </span>
                                </div>
                                {item.hasDropdown && (
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform ${
                                            openDropdowns[item.label]
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            toggleDropdown(item.label);
                                        }}
                                    />
                                )}
                            </NavLink>
                        );
                    })}
                </nav>
            </div>
        </>
    );
}

export default MenuItems;
