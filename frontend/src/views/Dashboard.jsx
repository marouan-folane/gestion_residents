import React from "react";
import { useStateContext } from "../contexts/ContextProvider";

const Dashboard = () => {
    const { notification } = useStateContext();

    return (
        <div>
            {notification && (
                <div className="fixed top-4 right-4 max-w-md bg-green-500 text-white p-4 rounded-md shadow-md z-50 text-center">
                    {notification}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
