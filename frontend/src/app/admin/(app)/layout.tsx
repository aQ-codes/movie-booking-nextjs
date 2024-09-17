import React from "react";
import AdminLayout from "../layouts/AdminLayout"; // Import the AdminLayout component

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>; // Use the AdminLayout for admin pages
}
