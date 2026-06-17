import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Eye, User, Share2, MessageSquare, AlertCircle } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";
import { MOCK_BLOGS } from "@/constants/mockBlogs";
import { formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type Props = {
  params: Promise<{ slug: string }>;
};

// Helper function to fetch the blog
async function getBlog(slug: string) {
  try {
    await connectDB();
    const blog = await Blog.findOne({ slug, published: true }).populate("authorId", "name");
    if (blog) return blog;
  } catch (err) {
    console.error("Failed to fetch blog from database, using mock data:", err);
  }

  // Fallback check in mock blogs
  const mockBlog = MOCK_BLOGS.find((b) => b.slug === slug);
  if (mockBlog) {
    return {
      title: mockBlog.title,
      slug: mockBlog.slug,
      excerpt: mockBlog.excerpt,
      content: mockBlog.content,
      category: mockBlog.category,
      tags: mockBlog.tags,
      readTime: mockBlog.readTime,
      views: mockBlog.views,
      createdAt: new Date(mockBlog.createdAt),
      authorName: mockBlog.authorName,
      isMock: true,
    };
  }
  return null;
}

// Generate dynamic metadata
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${blog.title} | Health Resources`,
    description: blog.excerpt,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  // Custom renderer for simple markdown text
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, index) => {
      const trimmedBlock = block.trim();
      if (!trimmedBlock) return null;

      if (trimmedBlock.startsWith("### ")) {
        return (
          <h3 key={index} className="font-display font-bold text-navy-900 text-lg sm:text-xl mt-6 mb-3">
            {trimmedBlock.replace("### ", "")}
          </h3>
        );
      }
      if (trimmedBlock.startsWith("## ")) {
        return (
          <h2 key={index} className="font-display font-bold text-navy-900 text-xl sm:text-2xl mt-8 mb-4 border-b border-navy-50 pb-2">
            {trimmedBlock.replace("## ", "")}
          </h2>
        );
      }
      if (trimmedBlock.startsWith("* ") || trimmedBlock.startsWith("- ")) {
        const items = trimmedBlock.split(/\n[*|-]\s+/);
        return (
          <ul key={index} className="list-disc pl-5 my-4 space-y-2 text-text-body font-sans text-sm sm:text-base leading-relaxed">
            {items.map((item, itemIdx) => (
              <li key={itemIdx}>{item.replace(/^[*|-]\s+/, "")}</li>
            ))}
          </ul>
        );
      }
      if (/^\d+\.\s+/.test(trimmedBlock)) {
        const items = trimmedBlock.split(/\n\d+\.\s+/);
        return (
          <ol key={index} className="list-decimal pl-5 my-4 space-y-2 text-text-body font-sans text-sm sm:text-base leading-relaxed">
            {items.map((item, itemIdx) => (
              <li key={itemIdx}>{item.replace(/^\d+\.\s+/, "")}</li>
            ))}
          </ol>
        );
      }
      return (
        <p key={index} className="text-text-body font-sans text-sm sm:text-base leading-relaxed mb-4 whitespace-pre-line">
          {trimmedBlock}
        </p>
      );
    });
  };

  return (
    <div className="bg-navy-900/5 min-h-screen pt-24 pb-16">
      <div className="container-custom max-w-6xl pt-4">
        {/* Back Link */}
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 text-navy-800 hover:text-brand-orange mb-8 transition-colors group text-sm font-semibold"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Resources
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Article (8 cols) */}
          <article className="lg:col-span-8 bg-white rounded-3xl border border-navy-100 p-8 lg:p-12 shadow-sm">
            {/* Category badge */}
            <span className="px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-[10px] uppercase font-bold tracking-wider mb-6 inline-block font-sans">
              {blog.category}
            </span>

            {/* Title */}
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-navy-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-text-muted font-sans border-b border-navy-50 pb-6 mb-8">
              <span className="flex items-center gap-1.5">
                <User size={14} className="text-brand-orange" />
                By {blog.authorId?.name || blog.authorName || "Medical Staff"}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-brand-orange" />
                {formatDate(blog.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-brand-orange" />
                {blog.readTime} min read
              </span>
              <span className="flex items-center gap-1.5">
                <Eye size={14} className="text-brand-orange" />
                {blog.views} views
              </span>
            </div>

            {/* Excerpt */}
            <div className="bg-navy-50/40 border-l-4 border-brand-orange rounded-r-xl p-5 mb-8 italic text-navy-800 font-sans text-sm sm:text-base leading-relaxed">
              {blog.excerpt}
            </div>

            {/* Render Body Content */}
            <div className="article-body">
              {renderContent(blog.content)}
            </div>

            {/* Tags footer */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="border-t border-navy-50 pt-6 mt-8 flex flex-wrap gap-2">
                {blog.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-navy-50 text-navy-800 text-[10px] uppercase font-bold tracking-wider font-sans"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </article>

          {/* Sidebar Widgets (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Consultation Widget */}
            <Card className="p-6 border-navy-100 bg-white shadow-sm text-center">
              <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-brand-orange w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-lg text-navy-900 mb-2">Have a Health Concern?</h3>
              <p className="text-xs text-text-muted mb-6 font-sans">
                Schedule a consultation with Consultant Neurologist Dr. Dasari Venkatesh for personalized clinical diagnosis and advice.
              </p>
              <div className="flex flex-col gap-2">
                <Link href="/appointment" className="w-full">
                  <Button variant="primary" className="w-full justify-center text-xs">
                    Book Appointment
                  </Button>
                </Link>
                <a href="https://wa.me/919121568899" target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button variant="outline" className="w-full justify-center text-xs text-emerald-600 border-emerald-600/30 hover:bg-emerald-50">
                    WhatsApp Message
                  </Button>
                </a>
              </div>
            </Card>

            {/* Disclaimer Widget */}
            <Card className="p-5 border-amber-200/50 bg-amber-50/50 shadow-sm">
              <div className="flex gap-3 items-start">
                <AlertCircle className="text-amber-600 w-5 h-5 shrink-0 mt-0.5" />
                <div className="font-sans text-xs text-amber-800 leading-relaxed">
                  <h4 className="font-bold mb-1">Medical Disclaimer</h4>
                  <p>
                    The information provided in this article is for health educational purposes only. It is not intended to replace professional medical advice, clinical diagnosis, or specialized treatment. Always consult a qualified physician regarding any neurological health concerns.
                  </p>
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
