import { MetadataRoute } from "next";
import { DISORDERS } from "@/constants/disorders";
import { MOCK_BLOGS } from "@/constants/mockBlogs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // Static routes
  const staticRoutes = [
    "",
    "/contact",
    "/appointment",
    "/diagnostics",
    "/rehabilitation",
    "/doctor",
    "/disorders",
    "/resources",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Disorder routes
  const disorderRoutes = DISORDERS.filter((d) => d.slug).map((disorder) => ({
    url: `${baseUrl}/disorders/${disorder.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog/Resource routes
  const blogRoutes = MOCK_BLOGS.map((blog) => ({
    url: `${baseUrl}/resources/${blog.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...disorderRoutes, ...blogRoutes];
}
