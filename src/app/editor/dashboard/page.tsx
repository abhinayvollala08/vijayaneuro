"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { PenSquare, Calendar, Eye, Trash2, Plus, Globe, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { MOCK_BLOGS } from "@/constants/mockBlogs";

export default function EditorDashboard() {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      if (res.ok) {
        const data = await res.json();
        // If DB has blogs, show them; otherwise load mock blogs
        if (data && data.length > 0) {
          setBlogs(data);
          return;
        }
      }
    } catch (err) {
      console.error("Failed to load blogs:", err);
    } finally {
      setLoading(false);
    }

    // Fallback to mock blogs
    setBlogs(
      MOCK_BLOGS.map((b, index) => ({
        ...b,
        _id: `mock-blog-${index}`,
        published: true,
      }))
    );
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleTogglePublish = async (blogId: string, currentPublished: boolean, slug: string) => {
    // If it's a mock blog, update client state only
    if (blogId.startsWith("mock-blog")) {
      setBlogs(
        blogs.map((b) =>
          b._id === blogId ? { ...b, published: !currentPublished } : b
        )
      );
      toast.success("Mock blog publish status toggled (local simulation)");
      return;
    }

    try {
      const res = await fetch(`/api/blogs/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !currentPublished }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      toast.success("Blog publish status updated");
      fetchBlogs();
    } catch {
      toast.error("Could not update blog publish status.");
    }
  };

  const handleDeleteBlog = async (blogId: string, slug: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    if (blogId.startsWith("mock-blog")) {
      setBlogs(blogs.filter((b) => b._id !== blogId));
      toast.success("Mock blog removed (local simulation)");
      return;
    }

    try {
      const res = await fetch(`/api/blogs/${slug}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete blog");

      toast.success("Blog post deleted successfully");
      fetchBlogs();
    } catch {
      toast.error("Could not delete blog post.");
    }
  };

  // Stats helpers
  const totalPosts = blogs.length;
  const publishedPosts = blogs.filter((b) => b.published).length;
  const totalViews = blogs.reduce((acc, b) => acc + (b.views || 0), 0);

  return (
    <DashboardLayout title="Editor Hub">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 font-sans">
        <Card className="p-5 border-navy-100 bg-white shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
            <PenSquare size={18} />
          </div>
          <div>
            <span className="text-xs text-text-muted font-bold block uppercase tracking-wider">Total Articles</span>
            <span className="text-xl font-bold text-navy-900 mt-1 block">{totalPosts}</span>
          </div>
        </Card>

        <Card className="p-5 border-navy-100 bg-white shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
            <Globe size={18} />
          </div>
          <div>
            <span className="text-xs text-text-muted font-bold block uppercase tracking-wider">Published Online</span>
            <span className="text-xl font-bold text-navy-900 mt-1 block">{publishedPosts}</span>
          </div>
        </Card>

        <Card className="p-5 border-navy-100 bg-white shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center text-navy-800 shrink-0">
            <Eye size={18} />
          </div>
          <div>
            <span className="text-xs text-text-muted font-bold block uppercase tracking-wider">Cumulative Views</span>
            <span className="text-xl font-bold text-navy-900 mt-1 block">{totalViews}</span>
          </div>
        </Card>
      </div>

      {/* Blogs Manager */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-display font-semibold text-xl text-navy-900">Manage Health Resources</h3>
          <Link href="/editor/blogs/create">
            <Button size="sm" className="gap-1.5 text-xs">
              <Plus size={14} />
              Write New Post
            </Button>
          </Link>
        </div>

        <Card className="border-navy-100 bg-white shadow-sm overflow-hidden font-sans">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-navy-50/50 border-b border-navy-50 text-navy-900 font-semibold text-xs uppercase tracking-wider">
                  <th className="px-6 py-4">Article Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Views</th>
                  <th className="px-6 py-4">Read Time</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-navy-50/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-navy-900 line-clamp-1">{blog.title}</div>
                      <div className="text-[11px] text-text-muted mt-0.5 flex gap-3">
                        <span>Date: {formatDate(blog.createdAt)}</span>
                        <span>Author: {blog.authorId?.name || blog.authorName || "Medical Staff"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-text-body font-medium">{blog.category}</td>
                    <td className="px-6 py-4 text-text-body">{blog.views || 0}</td>
                    <td className="px-6 py-4 text-text-body">{blog.readTime || 1} mins</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleTogglePublish(blog._id, blog.published, blog.slug)}
                        className="cursor-pointer focus:outline-none"
                      >
                        {blog.published ? (
                          <Badge variant="success">Published</Badge>
                        ) : (
                          <Badge variant="outline">Draft</Badge>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleDeleteBlog(blog._id, blog.slug)}
                        className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Post"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
