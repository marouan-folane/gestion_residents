import React, { useState } from "react";
import Header from "./Header";
import MenuItems from "./MenuItems";
import { Outlet } from "react-router-dom";

const Dashboard = () => {

    
    const [sidebarOpen, setSidebarOpen] = useState(false);
    

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <MenuItems
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <div className="flex-1 flex flex-col w-full lg:w-auto">
                <Header setSidebarOpen={setSidebarOpen} />
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
