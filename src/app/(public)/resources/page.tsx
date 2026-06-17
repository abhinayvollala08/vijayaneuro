"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Calendar, Clock, Eye, ArrowRight, BookOpen } from "lucide-react";
import { MOCK_BLOGS, type MockBlog } from "@/constants/mockBlogs";
import { NeuralBackground } from "@/components/shared/NeuralBackground";
import { Card } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils";

export default function ResourcesPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blogs");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setBlogs(data);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to fetch blogs from API:", err);
      }
      
      // Fallback to mock blogs
      setBlogs(MOCK_BLOGS);
    }
    fetchBlogs();
  }, []);

  const categories = ["All", ...Array.from(new Set(blogs.map((b) => b.category)))];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = activeCategory === "All" || blog.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredBlog = filteredBlogs.find((b) => b.featured) || filteredBlogs[0];
  const regularBlogs = filteredBlogs.filter((b) => b.slug !== featuredBlog?.slug);

  return (
    <div className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 -z-20" />
      <NeuralBackground />

      <div className="container-custom relative z-10">
        {/* Hub Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow block mb-3">Patient Education Portal</span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight mb-4">
              Health Resources & Blogs
            </h1>
            <p className="text-white/70 text-base sm:text-lg font-sans">
              Access clinically-reviewed articles, guidelines, and guides to understanding neurological symptoms, diagnostic tests, and rehabilitation.
            </p>
          </motion.div>
        </div>

        {/* Search & Categories Bar */}
        <div className="max-w-4xl mx-auto mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search health articles, symptoms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all text-sm font-sans"
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-brand-orange text-white shadow-orange"
                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {featuredBlog && searchQuery === "" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Card className="overflow-hidden border border-navy-100 bg-white/95 shadow-md flex flex-col md:flex-row min-h-[360px] group">
              <div className="md:w-1/2 bg-gradient-to-br from-navy-800 to-navy-950 p-8 lg:p-12 flex flex-col justify-between text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand-orange/[0.05] blur-3xl" />
                <div>
                  <span className="px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange border border-brand-orange/30 text-[10px] uppercase font-bold tracking-wider mb-6 inline-block font-sans">
                    Featured Article
                  </span>
                  <h2 className="font-display font-bold text-2xl lg:text-3xl text-white mb-4 leading-tight group-hover:text-brand-orange transition-colors">
                    {featuredBlog.title}
                  </h2>
                  <p className="text-white/70 text-sm font-sans leading-relaxed mb-6">
                    {featuredBlog.excerpt}
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-white/55 font-sans">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(featuredBlog.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {featuredBlog.readTime} min read
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={12} />
                      {featuredBlog.views} views
                    </span>
                  </div>
                  <Link
                    href={`/resources/${featuredBlog.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-white group-hover:text-brand-orange transition-colors"
                  >
                    Read Full Article
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 p-8 lg:p-12 bg-white flex flex-col justify-center">
                <h3 className="font-display font-bold text-lg text-navy-900 mb-3">Key Highlights</h3>
                <ul className="space-y-3 font-sans text-sm text-text-body">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 mt-2" />
                    <span>Clinically reviewed by neuro-specialist Dr. Dasari Venkatesh.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 mt-2" />
                    <span>Actionable steps for symptom management and patient care.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 mt-2" />
                    <span>Detailed instructions for diagnostic test prep.</span>
                  </li>
                </ul>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(searchQuery !== "" ? filteredBlogs : regularBlogs).map((blog, idx) => (
            <motion.div
              key={blog.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
            >
              <Card className="p-6 bg-white/95 border border-navy-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full group hover:border-brand-orange/40">
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider font-sans bg-brand-orange/5 px-2.5 py-1 rounded-lg">
                      {blog.category}
                    </span>
                    <span className="text-xs text-text-subtle font-sans">
                      {blog.readTime} min read
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-navy-900 mb-3 group-hover:text-brand-orange transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-text-body text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                    {blog.excerpt}
                  </p>
                </div>
                <div className="mt-auto border-t border-navy-50 pt-4 flex items-center justify-between">
                  <span className="text-xs text-text-muted font-sans">
                    By {blog.authorId?.name || blog.authorName || "Staff"}
                  </span>
                  <Link
                    href={`/resources/${blog.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 group-hover:text-brand-orange transition-colors"
                  >
                    Read More
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-20 text-white/50">
            <p className="text-lg mb-2">No resources found.</p>
            <p className="text-sm">Try search queries or checking a different category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
