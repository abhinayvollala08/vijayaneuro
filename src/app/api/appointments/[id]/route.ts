import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Appointment } from "@/models/Appointment";
import { auth } from "@/lib/auth";

type Props = {
  params: Promise<{ id: string }>;
};

// PUT /api/appointments/[id] - Update status or details (auth required: DOCTOR or ADMIN)
export async function PUT(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session || !session.user || (session.user.role !== "DOCTOR" && session.user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { status, preferredDate, message } = await req.json();

    await connectDB();

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    // Update fields if provided
    if (status) appointment.status = status;
    if (preferredDate) appointment.preferredDate = new Date(preferredDate);
    if (message !== undefined) appointment.message = message;

    await appointment.save();

    return NextResponse.json(appointment, { status: 200 });
  } catch (error: any) {
    console.error("PUT Appointment API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/appointments/[id] - Cancel/Delete appointment (auth required: DOCTOR or ADMIN)
export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session || !session.user || (session.user.role !== "DOCTOR" && session.user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    await connectDB();

    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    if (!deletedAppointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Appointment cancelled and deleted" }, { status: 200 });
  } catch (error: any) {
    console.error("DELETE Appointment API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
