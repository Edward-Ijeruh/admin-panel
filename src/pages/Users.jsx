import { Trash } from "phosphor-react";

const mockUsers = [
  { id: "1", name: "Jane Doe", email: "jane@example.com", role: "Admin" },
  { id: "2", name: "John Smith", email: "john@example.com", role: "User" },
  { id: "3", name: "Alice Johnson", email: "alice@example.com", role: "User" },
];

export default function Users() {
  const handleDelete = (userId) => {
    if (confirm("Are you sure you want to delete this user?")) {
      alert(`Deleted user: ${userId}`);
    }
  };

  return (
    <div className="py-4 space-y-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
        Users Overview
      </h1>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-indigo-50 text-indigo-700 text-sm font-semibold">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3 hidden md:table-cell">
                Email
              </th>
              <th className="text-left px-4 py-3">Role</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {mockUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-4 text-sm font-medium text-gray-800">
                  {user.name}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600 hidden md:table-cell">
                  {user.email}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">{user.role}</td>
                <td className="px-4 py-4 text-right">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="inline-flex items-center text-red-600 hover:text-red-800 hover:bg-red-100 transition px-2 py-1 rounded text-sm cursor-pointer"
                  >
                    <Trash size={16} className="mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
