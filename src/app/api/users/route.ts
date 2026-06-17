import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { auth } from "@/lib/auth";

// GET /api/users - List all users (auth required: ADMIN)
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    await connectDB();

    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 });

    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    console.error("GET Users API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
