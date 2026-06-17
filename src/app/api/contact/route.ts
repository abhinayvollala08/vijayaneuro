import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ContactMessage } from "@/models/ContactMessage";
import { contactSchema } from "@/lib/validations/contact";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate request data
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = validationResult.data;

    // Connect to database
    await connectDB();

    // Create the contact message document
    const contactMsg = await ContactMessage.create({
      name,
      email,
      phone: phone || undefined,
      subject,
      message,
    });

    return NextResponse.json(
      { message: "Contact message received successfully", id: contactMsg._id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
