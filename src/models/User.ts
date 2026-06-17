import mongoose, { Schema, Document } from "mongoose";

export type UserRole = "PATIENT" | "DOCTOR" | "ADMIN" | "EDITOR";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role: UserRole;
  image?: string;
  dateOfBirth?: Date;
  gender?: "male" | "female" | "other";
  bloodGroup?: string;
  address?: string;
  emergencyContact?: string;
  medicalHistory?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, select: false },
    phone: { type: String },
    role: {
      type: String,
      enum: ["PATIENT", "DOCTOR", "ADMIN", "EDITOR"],
      default: "PATIENT",
    },
    image: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["male", "female", "other"] },
    bloodGroup: { type: String },
    address: { type: String },
    emergencyContact: { type: String },
    medicalHistory: { type: String },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
