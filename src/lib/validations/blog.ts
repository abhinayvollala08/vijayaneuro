import { z } from "zod";

export const blogSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must be under 200 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(200, "Slug must be under 200 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  excerpt: z
    .string()
    .min(20, "Excerpt must be at least 20 characters")
    .max(300, "Excerpt must be under 300 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  category: z.string().min(1, "Please select a category"),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
  coverImage: z.string().optional(),
  metaTitle: z.string().max(70, "Meta title must be under 70 characters").optional(),
  metaDesc: z.string().max(160, "Meta description must be under 160 characters").optional(),
  metaKeywords: z.string().optional(),
});

export type BlogFormData = z.infer<typeof blogSchema>;
