import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import {
  BellIcon,
  HomeIcon,
  ShipWheelIcon,
  UsersIcon,
  PencilLineIcon,
} from "lucide-react";

const Sidebar = ({ mobileOpen = false, onClose }) => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  // Sidebar content
  const sidebarContent = (
    <>
      <div className="p-5 border-b border-base-300">
        <Link to="/" className="flex items-center gap-2.5">
          <ShipWheelIcon className="size-9 text-primary" />
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
            liveconnect
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/" ? "btn-active" : ""
          }`}
        >
          <HomeIcon className="size-5 text-base-content opacity-70" />
          <span>Home</span>
        </Link>

        <Link
          to="/notifications"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/notifications" ? "btn-active" : ""
          }`}
        >
          <BellIcon className="size-5 text-base-content opacity-70" />
          <span>Notifications</span>
        </Link>

        <Link
          to="/quiz"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/quiz" ? "btn-active" : ""
          }`}
        >
          <PencilLineIcon className="size-5 text-base-content opacity-70" />
          <span>Quiz</span>
        </Link>
      </nav>

      {/* USER PROFILE SECTION */}
      <div className="p-4 border-t border-base-300 mt-auto">
        <div className="flex items-center gap-3">
          <Link to="/edit-profile" className="avatar">
            <div className="w-10 rounded-full cursor-pointer hover:ring-2 hover:ring-primary transition">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </Link>
          <div className="flex-1">
            <p className="font-semibold text-sm">{authUser?.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block" />
              Online
            </p>
          </div>
        </div>
      </div>
    </>
  );

  // Desktop sidebar
  if (!mobileOpen) {
    return (
      <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
        {sidebarContent}
      </aside>
    );
  }

  // Mobile sidebar
  return (
    <aside
      className="fixed inset-y-0 left-0 w-64 bg-base-200 border-r border-base-300 flex flex-col h-full z-50 transition-transform duration-300 transform translate-x-0 lg:hidden shadow-xl"
      role="dialog"
      aria-modal="true"
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 btn btn-ghost btn-circle"
        aria-label="Close sidebar"
        onClick={onClose}
      >
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      {sidebarContent}
    </aside>
  );
};
export default Sidebar;
