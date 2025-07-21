import React from "react";
import {
    Settings,
} from "lucide-react";

function HeaderAboveMenu() {
    return (
        <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-blue-600" />
                </div>
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-red-500 rounded transform rotate-45"></div>
                </div>
            </div>
        </div>
    );
}

export default HeaderAboveMenu;
