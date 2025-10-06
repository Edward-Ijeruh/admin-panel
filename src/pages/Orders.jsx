"use client";

import { useEffect, useState } from "react";
import { getAllOrders } from "../api/admin";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        if (token) {
          const data = await getAllOrders(token);
          console.log("Fetched Orders: ", data);
          setOrders(data || []);
        } else {
          // Mock data for preview
          const mockOrders = [
            {
              id: "ORD-1001",
              customer: "Alice Johnson",
              status: "Completed",
              total: "₦250.00",
              date: "2025-10-01",
            },
            {
              id: "ORD-1002",
              customer: "Mark Davis",
              status: "Pending",
              total: "₦180.00",
              date: "2025-10-02",
            },
            {
              id: "ORD-1003",
              customer: "Sarah Lee",
              status: "Cancelled",
              total: "₦95.00",
              date: "2025-10-03",
            },
          ];
          setOrders(mockOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="py-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Orders
          </h2>
          <p className="text-sm text-gray-500">Manage and track all orders.</p>
        </div>
        <span className="text-sm text-gray-500">
          {orders.length} total orders
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading orders…</div>
          ) : orders.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No orders found</div>
          ) : (
            <table className="min-w-full table-auto">
              <thead className="bg-red-600 text-white text-sm font-semibold">
                <tr>
                  <th className="text-left px-4 py-3">Order ID</th>
                  <th className="text-left px-4 py-3">Customer</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Total</th>
                  <th className="text-left px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {order.customer}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold
                          ${
                            order.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {order.total}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {order.date}
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
