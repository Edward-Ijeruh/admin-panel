"use client";

import { useEffect, useState } from "react";
import {
  getVendorApplications,
  approveVendorApplication,
  rejectVendorApplication,
} from "../api/admin";

export default function VendorApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        if (token) {
          const data = await getVendorApplications(token);
          console.log("Fetched Vendor Applications: ", data);
          setApplications(data || []);
        } else {
          // Mock data for preview
          const mockApplications = [
            {
              id: "VA-001",
              vendorName: "FreshMart Foods",
              email: "freshmart@email.com",
              status: "PENDING",
              date: "2025-10-01",
            },
            {
              id: "VA-002",
              vendorName: "TechWorld Gadgets",
              email: "support@techworld.com",
              status: "APPROVED",
              date: "2025-10-02",
            },
            {
              id: "VA-003",
              vendorName: "Daily Needs Ltd",
              email: "info@dailyneeds.com",
              status: "REJECTED",
              date: "2025-10-03",
            },
          ];
          setApplications(mockApplications);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [token]);

  const handleApprove = async (id) => {
    try {
      if (token) {
        await approveVendorApplication(id, token, adminId);
        setApplications((prev) =>
          prev.map((app) =>
            app.id === id ? { ...app, status: "APPROVED" } : app
          )
        );
      }
    } catch (error) {
      console.error("Error approving vendor:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      if (token) {
        await rejectVendorApplication(id, token, adminId);
        setApplications((prev) =>
          prev.map((app) =>
            app.id === id ? { ...app, status: "REJECTED" } : app
          )
        );
      }
    } catch (error) {
      console.error("Error rejecting vendor:", error);
    }
  };

  return (
    <div className="py-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Vendor Applications
          </h2>
          <p className="text-sm text-gray-500">
            Review and manage vendor applications.
          </p>
        </div>
        <span className="text-sm text-gray-500">
          {applications.length} total applications
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">
              Loading applications…
            </div>
          ) : applications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No applications found
            </div>
          ) : (
            <table className="min-w-full table-auto">
              <thead className="bg-red-600 text-white text-sm font-semibold">
                <tr>
                  <th className="text-left px-4 py-3">Application ID</th>
                  <th className="text-left px-4 py-3">Vendor</th>
                  <th className="text-left px-4 py-3">Email</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Date</th>
                  <th className="text-left px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {applications.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      {app.id}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {app.vendorName}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {app.email}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold
                          ${
                            app.status === "APPROVED"
                              ? "bg-green-100 text-green-700"
                              : app.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {app.date}
                    </td>
                    <td className="px-4 py-4 text-sm flex gap-2">
                      <button
                        onClick={() => handleApprove(app.id)}
                        disabled={app.status === "APPROVED"}
                        className="px-3 py-1 rounded-md bg-green-600 text-white text-xs font-semibold hover:bg-green-700 disabled:opacity-50 cursor-pointer"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(app.id)}
                        disabled={app.status === "REJECTED"}
                        className="px-3 py-1 rounded-md bg-red-600 text-white text-xs font-semibold hover:bg-red-700 disabled:opacity-50 cursor-pointer"
                      >
                        Reject
                      </button>
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
