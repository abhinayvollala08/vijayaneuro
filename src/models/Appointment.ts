import mongoose, { Schema, Document } from "mongoose";

export type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW";

export interface IAppointment extends Document {
  patientName: string;
  phone: string;
  email?: string;
  age?: number;
  gender?: string;
  service: string;
  preferredDate: Date;
  timeSlot?: string;
  message?: string;
  status: AppointmentStatus;
  patientId?: mongoose.Types.ObjectId;
  doctorId?: mongoose.Types.ObjectId;
  notes?: string;
  source: "web" | "whatsapp" | "phone" | "walkin";
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    patientName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    age: { type: Number },
    gender: { type: String },
    service: { type: String, required: true },
    preferredDate: { type: Date, required: true },
    timeSlot: { type: String },
    message: { type: String },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "NO_SHOW"],
      default: "PENDING",
    },
    patientId: { type: Schema.Types.ObjectId, ref: "User" },
    doctorId: { type: Schema.Types.ObjectId, ref: "User" },
    notes: { type: String },
    source: {
      type: String,
      enum: ["web", "whatsapp", "phone", "walkin"],
      default: "web",
    },
  },
  { timestamps: true }
);

export const Appointment =
  mongoose.models.Appointment ||
  mongoose.model<IAppointment>("Appointment", AppointmentSchema);
