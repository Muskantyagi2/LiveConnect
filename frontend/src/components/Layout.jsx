import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children, showSidebar = false }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Expose sidebar toggle globally for Navbar button
  // Sidebar toggle handler
  const handleSidebarToggle = () => setSidebarOpen(true);

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Desktop sidebar */}
        {showSidebar && <Sidebar />}

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <Sidebar
            mobileOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}

        <div className="flex-1 flex flex-col">
          <Navbar onSidebarToggle={handleSidebarToggle} />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};
export default Layout;
