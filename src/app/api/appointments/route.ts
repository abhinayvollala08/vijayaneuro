import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Appointment } from "@/models/Appointment";
import { appointmentSchema } from "@/lib/validations/appointment";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = appointmentSchema.parse(body);

    await connectDB();

    const appointment = await Appointment.create({
      patientName: validated.patientName,
      phone: validated.phone,
      email: validated.email || undefined,
      age: validated.age || undefined,
      gender: validated.gender || undefined,
      service: validated.service,
      preferredDate: new Date(validated.preferredDate),
      message: validated.message || undefined,
      status: "PENDING",
      source: "web",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Appointment request submitted successfully",
        id: appointment._id,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: error },
        { status: 400 }
      );
    }

    console.error("Appointment creation error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const appointments = await Appointment.find()
      .sort({ createdAt: -1 })
      .limit(50);

    return NextResponse.json({ success: true, data: appointments });
  } catch (error) {
    console.error("Appointments fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
