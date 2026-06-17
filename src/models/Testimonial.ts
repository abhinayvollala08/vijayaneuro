import mongoose, { Schema, Document } from "mongoose";

export interface ITestimonial extends Document {
  patientName: string;
  treatment: string;
  content: string;
  rating: number;
  videoUrl?: string;
  thumbnail?: string;
  isVideo: boolean;
  isFeatured: boolean;
  isApproved: boolean;
  createdAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    patientName: { type: String, required: true },
    treatment: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    videoUrl: { type: String },
    thumbnail: { type: String },
    isVideo: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
