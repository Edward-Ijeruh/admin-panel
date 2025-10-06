import { NavLink, useNavigate } from "react-router-dom";
import {
  House,
  Users,
  ShoppingCart,
  ClipboardText,
  Gear,
  SignOut,
  X,
} from "phosphor-react";
import { supabase } from "./../supabaseClient";
import logo from "/logo.png";

const navItems = [
  { name: "Home", path: "/dashboard", icon: <House size={20} /> },
  { name: "Users", path: "/dashboard/users", icon: <Users size={20} /> },
  {
    name: "Orders",
    path: "/dashboard/orders",
    icon: <ShoppingCart size={20} />,
  },
  {
    name: "Vendor Application",
    path: "/dashboard/vendors",
    icon: <ClipboardText size={20} />,
  },
  { name: "Settings", path: "/dashboard/settings", icon: <Gear size={20} /> },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
    } else {
      console.log("Logged out");
      navigate("/login");
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-40 z-40 md:hidden cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-white shadow-md flex flex-col transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Branding */}
        <div className="p-6 flex items-center justify-between">
          <div className="bg-red-600 rounded-full p-2 flex items-center justify-center">
            <img
              src={logo}
              alt="Company Logo"
              className="w-40 h-10 object-contain"
            />
          </div>
          <button
            className="md:hidden text-gray-500"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-1 px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition font-medium ${
                  isActive
                    ? "bg-red-100 text-red-700"
                    : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          className="flex items-center gap-2 px-8 py-3 mt-auto w-full text-red-600 hover:bg-red-50 transition cursor-pointer"
          onClick={handleLogout}
        >
          <SignOut size={20} />
          Logout
        </button>
      </aside>
    </>
  );
}
