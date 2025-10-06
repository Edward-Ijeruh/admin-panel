import axios from "axios";

// Base API instance
const api = axios.create({
  baseURL: `${import.meta.env.VITE_TEMP_API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Login
export const adminLogin = async ({ phoneNumber, password }) => {
  const { data } = await api.post("/auth/admin/login", {
    phoneNumber,
    password,
  });
  return data;
};

// Users
export const getAllUsers = async (token) => {
  const { data } = await api.get("/admin/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Orders
export const getAllOrders = async (token) => {
  const { data } = await api.get("/admin/orders", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Vendor applications
export const getVendorApplications = async (token) => {
  const { data } = await api.get("/admin/vendor-applications", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Approve vendor application
export const approveVendorApplication = async (id, token, adminId) => {
  const { data } = await api.put(
    `/admin/vendor-applications/${id}/status`,
    {
      status: "APPROVED",
      comments: "Application approved after review",
      reviewed_by: adminId,
      review_notes: "All requirements met successfully",
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};

// Reject vendor application
export const rejectVendorApplication = async (id, token, adminId) => {
  const { data } = await api.put(
    `/admin/vendor-applications/${id}/status`,
    {
      status: "REJECTED",
      comments: "Incomplete documentation provided",
      reviewed_by: adminId,
      review_notes: "Missing required business license documents",
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};
