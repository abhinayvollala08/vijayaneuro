"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Users, Calendar, ShieldCheck, FileSpreadsheet, Trash2, ArrowRight, Clock } from "lucide-react";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingApts, setLoadingApts] = useState(true);
  const [activeTab, setActiveTab] = useState<"users" | "appointments">("users");

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data || []);
      }
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/appointments");
      if (res.ok) {
        const data = await res.json();
        setAppointments(data || []);
      }
    } catch (err) {
      console.error("Failed to load appointments:", err);
    } finally {
      setLoadingApts(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchAppointments();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update role");
      }

      toast.success("User role updated successfully");
      fetchUsers();
    } catch (err: any) {
      toast.error(err.message || "Could not update user role.");
    }
  };

  const handleUserDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete user");
      }

      toast.success("User account deleted");
      fetchUsers();
    } catch (err: any) {
      toast.error(err.message || "Could not delete user.");
    }
  };

  return (
    <DashboardLayout title="Admin Command Center">
      {/* Admin stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8 font-sans">
        <Card className="p-5 border-navy-100 bg-white shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center text-navy-800 shrink-0">
            <Users size={18} />
          </div>
          <div>
            <span className="text-xs text-text-muted font-bold block uppercase tracking-wider">Total Users</span>
            <span className="text-xl font-bold text-navy-900 mt-1 block">{users.length}</span>
          </div>
        </Card>

        <Card className="p-5 border-navy-100 bg-white shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
            <Calendar size={18} />
          </div>
          <div>
            <span className="text-xs text-text-muted font-bold block uppercase tracking-wider">Total Appointments</span>
            <span className="text-xl font-bold text-navy-900 mt-1 block">{appointments.length}</span>
          </div>
        </Card>

        <Card className="p-5 border-navy-100 bg-white shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
            <Clock size={18} />
          </div>
          <div>
            <span className="text-xs text-text-muted font-bold block uppercase tracking-wider">Pending Care</span>
            <span className="text-xl font-bold text-navy-900 mt-1 block">
              {appointments.filter((a) => a.status === "pending").length}
            </span>
          </div>
        </Card>

        <Card className="p-5 border-navy-100 bg-white shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
            <ShieldCheck size={18} />
          </div>
          <div>
            <span className="text-xs text-text-muted font-bold block uppercase tracking-wider">System Status</span>
            <span className="text-xl font-bold text-emerald-600 mt-1 block">Active</span>
          </div>
        </Card>
      </div>

      {/* Tab controls */}
      <div className="flex gap-2 border-b border-navy-50 pb-4 mb-6 font-sans">
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
            activeTab === "users"
              ? "bg-navy-900 text-white"
              : "text-text-muted hover:bg-navy-50"
          }`}
        >
          Portal Directory ({users.length})
        </button>
        <button
          onClick={() => setActiveTab("appointments")}
          className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
            activeTab === "appointments"
              ? "bg-navy-900 text-white"
              : "text-text-muted hover:bg-navy-50"
          }`}
        >
          All Appointments ({appointments.length})
        </button>
      </div>

      {/* Tab content - Users */}
      {activeTab === "users" && (
        <Card className="border-navy-100 bg-white shadow-sm overflow-hidden font-sans">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-navy-50/50 border-b border-navy-50 text-navy-900 font-semibold text-xs uppercase tracking-wider">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Joined Date</th>
                  <th className="px-6 py-4">Role Designation</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-navy-50/10 transition-colors">
                    <td className="px-6 py-4 font-bold text-navy-900">
                      {user.name}
                      {session?.user?.id === user._id && (
                        <span className="ml-2 text-[10px] bg-navy-50 text-navy-800 px-2 py-0.5 rounded-full font-bold">You</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-text-body">{user.email}</td>
                    <td className="px-6 py-4 text-text-body">{formatDate(user.createdAt)}</td>
                    <td className="px-6 py-4">
                      {session?.user?.id === user._id ? (
                        <Badge variant="info">{user.role}</Badge>
                      ) : (
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          className="text-xs bg-navy-50 border border-navy-100 rounded-lg px-2 py-1 font-semibold text-navy-900 focus:outline-none focus:ring-1 focus:ring-brand-orange"
                        >
                          <option value="PATIENT">PATIENT</option>
                          <option value="DOCTOR">DOCTOR</option>
                          <option value="EDITOR">EDITOR</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {session?.user?.id !== user._id && (
                        <button
                          onClick={() => handleUserDelete(user._id)}
                          className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete User"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Tab content - Appointments */}
      {activeTab === "appointments" && (
        <Card className="border-navy-100 bg-white shadow-sm overflow-hidden font-sans">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-navy-50/50 border-b border-navy-50 text-navy-900 font-semibold text-xs uppercase tracking-wider">
                  <th className="px-6 py-4">Patient Name</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Schedule Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {appointments.map((apt) => (
                  <tr key={apt._id} className="hover:bg-navy-50/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-navy-900">{apt.patientName}</div>
                      <div className="text-xs text-text-muted mt-0.5">{apt.phone} | Age: {apt.age || "N/A"}</div>
                    </td>
                    <td className="px-6 py-4 text-text-body font-medium">{apt.service}</td>
                    <td className="px-6 py-4 text-text-body">{formatDate(apt.preferredDate)}</td>
                    <td className="px-6 py-4">
                      {apt.status === "completed" ? (
                        <Badge variant="success">Completed</Badge>
                      ) : apt.status === "approved" ? (
                        <Badge variant="info">Approved</Badge>
                      ) : (
                        <Badge variant="warning">Pending</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right text-xs text-text-muted italic">
                      {apt.message || "No comments"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </DashboardLayout>
  );
}
