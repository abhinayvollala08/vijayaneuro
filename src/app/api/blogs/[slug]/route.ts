import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";
import { blogSchema } from "@/lib/validations/blog";
import { auth } from "@/lib/auth";

type Props = {
  params: Promise<{ slug: string }>;
};

// GET /api/blogs/[slug] - Get a single blog by slug (public, increments views)
export async function GET(req: NextRequest, { params }: Props) {
  try {
    const { slug } = await params;
    await connectDB();

    const blog = await Blog.findOneAndUpdate(
      { slug, published: true },
      { $inc: { views: 1 } },
      { new: true }
    ).populate("authorId", "name email");

    if (!blog) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error: any) {
    console.error("GET Single Blog API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/blogs/[slug] - Update a blog post (auth required: admin or editor)
export async function PUT(req: NextRequest, { params }: Props) {
  try {
    const { slug } = await params;
    const session = await auth();
    if (!session || !session.user || (session.user.role !== "ADMIN" && session.user.role !== "EDITOR")) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const validationResult = blogSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    await connectDB();

    const existingBlog = await Blog.findOne({ slug });
    if (!existingBlog) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    // Check if new slug is taken by a different blog
    if (validationResult.data.slug !== slug) {
      const slugTaken = await Blog.findOne({ slug: validationResult.data.slug });
      if (slugTaken) {
        return NextResponse.json(
          { error: "The new slug is already taken" },
          { status: 400 }
        );
      }
    }

    const updatedData = {
      ...validationResult.data,
      readTime: Math.max(1, Math.ceil(validationResult.data.content.split(/\s+/).length / 200)),
    };

    const updatedBlog = await Blog.findOneAndUpdate(
      { slug },
      { $set: updatedData },
      { new: true }
    );

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error: any) {
    console.error("PUT Blog API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/blogs/[slug] - Delete a blog post (auth required: admin or editor)
export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const { slug } = await params;
    const session = await auth();
    if (!session || !session.user || (session.user.role !== "ADMIN" && session.user.role !== "EDITOR")) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    await connectDB();

    const deletedBlog = await Blog.findOneAndDelete({ slug });
    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog post deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("DELETE Blog API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
