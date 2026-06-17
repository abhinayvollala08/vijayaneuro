import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  readTime?: number;
  authorId: mongoose.Types.ObjectId;
  metaTitle?: string;
  metaDesc?: string;
  metaKeywords?: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    category: { type: String, required: true },
    tags: [{ type: String }],
    published: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    readTime: { type: Number },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    metaTitle: { type: String },
    metaDesc: { type: String },
    metaKeywords: { type: String },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Blog =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
