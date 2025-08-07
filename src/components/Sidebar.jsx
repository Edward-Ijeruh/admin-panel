import { NavLink, useNavigate } from "react-router-dom";
import { Gauge, Calendar, Users, Gear, SignOut, X } from "phosphor-react";
import { supabase } from './../supabaseClient';


const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: <Gauge size={20} /> },
  { name: "Events", path: "/dashboard/events", icon: <Calendar size={20} /> },
  { name: "Users", path: "/dashboard/users", icon: <Users size={20} /> },
  { name: "Settings", path: "/dashboard/settings", icon: <Gear size={20} /> },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();


const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
    } else {
      console.log('Logged out');
      navigate('/login');
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
        <div className="p-6 text-xl font-bold flex items-center justify-between">
          Event Cast
          <button
            className="md:hidden text-gray-500"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition font-medium ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

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
