import mongoose, { Schema, Document } from "mongoose";

export type NotificationType =
  | "APPOINTMENT"
  | "MESSAGE"
  | "ALERT"
  | "SYSTEM"
  | "REPORT";

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  link?: string;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ["APPOINTMENT", "MESSAGE", "ALERT", "SYSTEM", "REPORT"],
      default: "SYSTEM",
    },
    isRead: { type: Boolean, default: false },
    link: { type: String },
  },
  { timestamps: true }
);

export const Notification =
  mongoose.models.Notification ||
  mongoose.model<INotification>("Notification", NotificationSchema);
