import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { auth } from "@/lib/auth";

type Props = {
  params: Promise<{ id: string }>;
};

// PUT /api/users/[id] - Update user details/role (auth required: ADMIN)
export async function PUT(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { role, isActive } = await req.json();

    await connectDB();

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Don't let an admin change their own role or deactivate themselves to prevent lock-out
    if (session.user.id === id) {
      return NextResponse.json(
        { error: "Cannot modify your own administrator account settings" },
        { status: 400 }
      );
    }

    if (role) user.role = role;
    if (isActive !== undefined) user.isActive = isActive;

    await user.save();

    return NextResponse.json(
      { message: "User updated successfully", user: { id: user._id, role: user.role, isActive: user.isActive } },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("PUT User API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/users/[id] - Delete a user (auth required: ADMIN)
export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    await connectDB();

    if (session.user.id === id) {
      return NextResponse.json(
        { error: "Cannot delete your own administrator account" },
        { status: 400 }
      );
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("DELETE User API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
