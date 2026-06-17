"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Calendar, CheckCircle2, XCircle, Clock, Users, ShieldAlert, Award } from "lucide-react";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export default function DoctorDashboard() {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update");

      toast.success(`Appointment marked as ${newStatus}`);
      fetchAppointments();
    } catch {
      toast.error("Could not update appointment status.");
    }
  };

  const handleDeleteAppointment = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to cancel");

      toast.success("Appointment cancelled successfully");
      fetchAppointments();
    } catch {
      toast.error("Could not cancel appointment.");
    }
  };

  // Helper count stats
  const totalBookings = appointments.length;
  const pendingBookings = appointments.filter((a) => a.status === "pending").length;
  const completedBookings = appointments.filter((a) => a.status === "completed").length;

  return (
    <DashboardLayout title="Doctor Dashboard">
      {/* Overview stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8 font-sans">
        <Card className="p-5 border-navy-100 bg-white shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
            <Calendar size={18} />
          </div>
          <div>
            <span className="text-xs text-text-muted font-bold block uppercase tracking-wider">Total Bookings</span>
            <span className="text-xl font-bold text-navy-900 mt-1 block">{totalBookings}</span>
          </div>
        </Card>

        <Card className="p-5 border-navy-100 bg-white shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
            <Clock size={18} />
          </div>
          <div>
            <span className="text-xs text-text-muted font-bold block uppercase tracking-wider">Pending Approval</span>
            <span className="text-xl font-bold text-navy-900 mt-1 block">{pendingBookings}</span>
          </div>
        </Card>

        <Card className="p-5 border-navy-100 bg-white shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <span className="text-xs text-text-muted font-bold block uppercase tracking-wider">Completed Care</span>
            <span className="text-xl font-bold text-navy-900 mt-1 block">{completedBookings}</span>
          </div>
        </Card>

        <Card className="p-5 border-navy-100 bg-white shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center text-navy-800 shrink-0">
            <Users size={18} />
          </div>
          <div>
            <span className="text-xs text-text-muted font-bold block uppercase tracking-wider">Assigned Patients</span>
            <span className="text-xl font-bold text-navy-900 mt-1 block">
              {Array.from(new Set(appointments.map((a) => a.patientName))).length}
            </span>
          </div>
        </Card>
      </div>

      {/* Appointment Schedule List */}
      <div className="space-y-4">
        <h3 className="font-display font-semibold text-xl text-navy-900 mb-2">Daily Schedule & Appointments</h3>

        <Card className="border-navy-100 bg-white shadow-sm overflow-hidden font-sans">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-navy-50/50 border-b border-navy-50 text-navy-900 font-semibold text-xs uppercase tracking-wider">
                  <th className="px-6 py-4">Patient Details</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Preferred Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {appointments.map((apt) => (
                  <tr key={apt._id} className="hover:bg-navy-50/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-navy-900">{apt.patientName}</div>
                      <div className="text-xs text-text-muted mt-0.5">
                        Age: {apt.age || "N/A"} | {apt.gender || "Not specified"} | {apt.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-text-body font-medium">{apt.service}</td>
                    <td className="px-6 py-4 text-text-body">{formatDate(apt.preferredDate)}</td>
                    <td className="px-6 py-4">
                      {apt.status === "completed" ? (
                        <Badge variant="success">Completed</Badge>
                      ) : apt.status === "approved" ? (
                        <Badge variant="info">Approved</Badge>
                      ) : (
                        <Badge variant="warning" className="animate-pulse">Pending</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                      {apt.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateStatus(apt._id, "approved")}
                          className="bg-navy-800 text-white hover:bg-navy-700 text-xs px-2.5 py-1.5 h-auto rounded-lg"
                        >
                          Approve
                        </Button>
                      )}
                      {apt.status === "approved" && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateStatus(apt._id, "completed")}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-2.5 py-1.5 h-auto rounded-lg"
                        >
                          Mark Done
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteAppointment(apt._id)}
                        className="text-red-600 border-red-200/50 hover:bg-red-50 text-xs px-2.5 py-1.5 h-auto rounded-lg"
                      >
                        Cancel
                      </Button>
                    </td>
                  </tr>
                ))}

                {appointments.length === 0 && !loading && (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-text-muted">
                      No appointments registered in the portal schedule.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
