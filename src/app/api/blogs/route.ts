import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";
import { blogSchema } from "@/lib/validations/blog";
import { auth } from "@/lib/auth";

// GET /api/blogs - List all published blogs
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    await connectDB();

    const query: any = { published: true };
    if (category) {
      query.category = category;
    }
    if (featured === "true") {
      query.featured = true;
    }

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .populate("authorId", "name email");

    return NextResponse.json(blogs, { status: 200 });
  } catch (error: any) {
    console.error("GET Blogs API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/blogs - Create a new blog post (auth required: admin or editor)
export async function POST(req: NextRequest) {
  try {
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

    // Check if slug is unique
    const existingBlog = await Blog.findOne({ slug: validationResult.data.slug });
    if (existingBlog) {
      return NextResponse.json(
        { error: "A blog post with this slug already exists" },
        { status: 400 }
      );
    }

    const blogData = {
      ...validationResult.data,
      authorId: session.user.id,
      readTime: Math.max(1, Math.ceil(validationResult.data.content.split(/\s+/).length / 200)), // ~200 words per minute
    };

    const newBlog = await Blog.create(blogData);

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error: any) {
    console.error("POST Blogs API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
