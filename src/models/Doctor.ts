import mongoose, { Schema, Document } from 'mongoose';

export interface IDoctor extends Document {
  name: string;
  title: string;
  experience: number;
  qualifications: string[];
  location: {
    city: string;
    state: string;
  };
  clinic: string;
  rating?: number;
  totalReviews?: number;
  fees: number;
  cashback?: number;
  isAvailable: boolean;
  availableIn?: number; // minutes
  nextAvailableTime?: Date;
  specialties: string[];
  imageUrl?: string;
  gender: 'male' | 'female';
}

const DoctorSchema = new Schema<IDoctor>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    experience: { type: Number, required: true },
    qualifications: { type: [String], required: true },
    location: {
      city: { type: String, required: true },
      state: { type: String, required: true },
    },
    clinic: { type: String, required: true },
    rating: { type: Number },
    totalReviews: { type: Number },
    fees: { type: Number, required: true },
    cashback: { type: Number },
    isAvailable: { type: Boolean, default: false },
    availableIn: { type: Number },
    nextAvailableTime: { type: Date },
    specialties: { type: [String], required: true },
    imageUrl: { type: String },
    gender: { type: String, enum: ['male', 'female'], required: true },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better search performance
DoctorSchema.index({ name: 'text', title: 'text', 'location.city': 'text' });
DoctorSchema.index({ specialties: 1 });
DoctorSchema.index({ fees: 1 });
DoctorSchema.index({ experience: 1 });
DoctorSchema.index({ gender: 1 });
DoctorSchema.index({ isAvailable: 1 });

export default mongoose.models.Doctor || mongoose.model<IDoctor>('Doctor', DoctorSchema); 