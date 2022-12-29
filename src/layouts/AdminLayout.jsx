import React from "react";
import { Outlet } from "react-router-dom";
import { BottomTabs, Topbar } from "../components";

const AdminLayout = () => {
  return (
    <div className="bg-gray-50">
      <main className="relative min-h-screen">
        <Topbar />
        <div className="p-6 pb-0">
          <Outlet />
        </div>
      </main>
      <BottomTabs />
    </div>
  );
};

export default AdminLayout;
