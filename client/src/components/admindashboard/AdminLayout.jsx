import React from "react";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
    return (
        <div className="flex">

            <AdminSidebar />

            <div className="flex-1 bg-gray-50 min-h-screen p-8">
                {children}
            </div>

        </div>
    );
};

export default AdminLayout;