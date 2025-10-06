"use client";

import { useEffect, useState } from "react";
import { getAllUsers } from "../api/admin";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        if (token) {
          // Normal API call if logged in
          const data = await getAllUsers(token);
          console.log("Fetched Users:", data);
          setUsers(data || []);
        } else {
          // Mock data for UI preview
          const dummyUsers = [
            {
              id: 1,
              full_name: "Alice Johnson",
              email: "alice@example.com",
              role: "Admin",
            },
            {
              id: 2,
              full_name: "Mark Davis",
              email: "mark.davis@example.com",
              role: "Moderator",
            },
            {
              id: 3,
              full_name: "Sarah Lee",
              email: "sarah.lee@example.com",
              role: "User",
            },
          ];
          setUsers(dummyUsers);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div className="py-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Users
          </h2>
          <p className="text-sm text-gray-500">Manage and track all users.</p>
        </div>
        <span className="text-sm text-gray-500">
          {users.length} total users
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading users…</div>
          ) : users.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No users found</div>
          ) : (
            <table className="min-w-full table-auto">
              <thead className="bg-red-600 text-white text-sm font-semibold">
                <tr>
                  <th className="text-left px-4 py-3">Name</th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">
                    Email
                  </th>
                  <th className="text-left px-4 py-3 hidden sm:table-cell">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      {user.full_name || user.name || "Unnamed"}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 hidden md:table-cell">
                      {user.email}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 hidden sm:table-cell">
                      {user.role || "User"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
