import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="flex bg-[#f5f7f9] min-h-screen">

            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">



                <div className="flex-1 overflow-y-auto p-7">
                    <Outlet />
                </div>

            </div>

        </div>
    );
};

export default AdminLayout;