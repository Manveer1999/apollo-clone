import mongoose from 'mongoose';
import Doctor from '../models/Doctor';
import { connectToDatabase } from '../lib/db/connection';

// Define sample data
const doctors = [
  {
    name: 'Dr. Lakshmi Sindhura Kakani',
    title: 'General Physician/ Internal Medicine Specialist',
    experience: 10,
    qualifications: ['MBBS', 'MD (General medicine)'],
    location: {
      city: 'Visakhapatnam',
      state: 'Andhra Pradesh',
    },
    clinic: 'Apollo 24|7 Virtual Clinic',
    fees: 499,
    isAvailable: true,
    availableIn: 0,
    specialties: ['General Physician', 'Internal Medicine'],
    gender: 'female',
    imageUrl: '/placeholder-doctor.jpg',
  },
  {
    name: 'Dr. Md Yusuf Shareef',
    title: 'General Practitioner',
    experience: 8,
    qualifications: ['MBBS'],
    location: {
      city: 'Hyderabad',
      state: 'Telangana',
    },
    clinic: 'Apollo 24|7 Virtual Clinic',
    rating: 83,
    totalReviews: 50,
    fees: 399,
    cashback: 60,
    isAvailable: true,
    availableIn: 0,
    specialties: ['General Practitioner', 'Family Medicine'],
    gender: 'male',
    imageUrl: '/placeholder-doctor.jpg',
  },
  {
    name: 'Dr. Rohinipriyanka Reddy',
    title: 'General Practitioner',
    experience: 9,
    qualifications: ['MBBS'],
    location: {
      city: 'Hyderabad',
      state: 'Telangana',
    },
    clinic: 'Apollo 24|7 Virtual Clinic',
    rating: 85,
    totalReviews: 100,
    fees: 479,
    cashback: 72,
    isAvailable: true,
    availableIn: 2,
    specialties: ['General Practitioner'],
    gender: 'female',
    imageUrl: '/placeholder-doctor.jpg',
  },
  {
    name: 'Dr. Summaiya Banu',
    title: 'General Practitioner',
    experience: 8,
    qualifications: ['MBBS'],
    location: {
      city: 'Hyderabad',
      state: 'Telangana',
    },
    clinic: 'Apollo 24|7 Virtual Clinic',
    rating: 84,
    totalReviews: 100,
    fees: 499,
    cashback: 75,
    isAvailable: true,
    availableIn: 3,
    specialties: ['General Practitioner'],
    gender: 'female',
    imageUrl: '/placeholder-doctor.jpg',
  },
  {
    name: 'Dr. Jawwad Mohammed Kaleem',
    title: 'General Practitioner',
    experience: 4,
    qualifications: ['MBBS'],
    location: {
      city: 'Hyderabad',
      state: 'Telangana',
    },
    clinic: 'Apollo 24|7 Virtual Clinic',
    fees: 379,
    cashback: 57,
    isAvailable: true,
    availableIn: 6,
    specialties: ['General Practitioner'],
    gender: 'male',
    imageUrl: '/placeholder-doctor.jpg',
  },
  {
    name: 'Dr. Shaik Abdul Kalam',
    title: 'General Practitioner',
    experience: 3,
    qualifications: ['MD (Physician)'],
    location: {
      city: 'Visakhapatnam',
      state: 'Andhra Pradesh',
    },
    clinic: 'Apollo 24|7 Virtual Clinic',
    rating: 94,
    totalReviews: 50,
    fees: 399,
    cashback: 60,
    isAvailable: true,
    availableIn: 10,
    specialties: ['General Practitioner'],
    gender: 'male',
    imageUrl: '/placeholder-doctor.jpg',
  },
  {
    name: 'Dr. Chandra Sekhar P',
    title: 'General Practitioner',
    experience: 5,
    qualifications: ['MBBS'],
    location: {
      city: 'Bangalore',
      state: 'Karnataka',
    },
    clinic: 'Apollo 24|7 Virtual Clinic',
    fees: 399,
    cashback: 60,
    isAvailable: true,
    availableIn: 11,
    specialties: ['General Practitioner'],
    gender: 'male',
    imageUrl: '/placeholder-doctor.jpg',
  },
  {
    name: 'Dr. Yaazhisai G K',
    title: 'General Practitioner',
    experience: 5,
    qualifications: ['MBBS'],
    location: {
      city: 'Chennai',
      state: 'Tamilnadu',
    },
    clinic: 'Apollo 24|7 Virtual Clinic',
    fees: 399,
    cashback: 60,
    isAvailable: true,
    availableIn: 12,
    specialties: ['General Practitioner'],
    gender: 'female',
    imageUrl: '/placeholder-doctor.jpg',
  },
  {
    name: 'Dr. M L Ezhilarasan',
    title: 'General Practitioner',
    experience: 6,
    qualifications: ['MBBS'],
    location: {
      city: 'Visakhapatnam',
      state: 'Andhra Pradesh',
    },
    clinic: 'Apollo 24|7 Virtual Clinic',
    fees: 399,
    cashback: 60,
    isAvailable: true,
    availableIn: 12,
    specialties: ['General Practitioner'],
    gender: 'male',
    imageUrl: '/placeholder-doctor.jpg',
  },
  {
    name: 'Dr. Shesham Srinidhi',
    title: 'General Practitioner',
    experience: 5,
    qualifications: ['MD(physician)'],
    location: {
      city: 'Hyderabad',
      state: 'Telangana',
    },
    clinic: 'Apollo 24|7 Virtual Clinic',
    rating: 91,
    totalReviews: 75,
    fees: 399,
    cashback: 60,
    isAvailable: true,
    availableIn: 13,
    specialties: ['General Practitioner'],
    gender: 'female',
    imageUrl: '/placeholder-doctor.jpg',
  },
  {
    name: 'Dr. Syed Ismail Ali',
    title: 'General Practitioner',
    experience: 7,
    qualifications: ['MBBS'],
    location: {
      city: 'Hyderabad',
      state: 'Telangana',
    },
    clinic: 'Apollo 24|7 Virtual Clinic',
    fees: 399,
    cashback: 60,
    isAvailable: true,
    availableIn: 13,
    specialties: ['General Practitioner'],
    gender: 'male',
    imageUrl: '/placeholder-doctor.jpg',
  },
  {
    name: 'Dr. Immanuel Raj',
    title: 'General Practitioner',
    experience: 8,
    qualifications: ['MBBS', 'MBA (HHSM)'],
    location: {
      city: 'Hyderabad',
      state: 'Telangana',
    },
    clinic: 'Apollo 24|7 Virtual Clinic',
    fees: 450,
    cashback: 68,
    isAvailable: false,
    nextAvailableTime: new Date('2025-04-28T14:30:00Z'),
    specialties: ['General Practitioner'],
    gender: 'male',
    imageUrl: '/placeholder-doctor.jpg',
  },
  {
    name: 'Dr. D Bhanu Prakash',
    title: 'General Practitioner',
    experience: 10,
    qualifications: ['MBBS', 'AFIH', 'Advanced certificate in critical care medicine', 'Fellowship in critical care medicine'],
    location: {
      city: 'Hyderabad',
      state: 'Telangana',
    },
    clinic: 'Apollo 24|7 Virtual Clinic',
    fees: 489,
    cashback: 73,
    isAvailable: false,
    nextAvailableTime: new Date('2025-04-28T14:44:00Z'),
    specialties: ['General Practitioner', 'Critical Care'],
    gender: 'male',
    imageUrl: '/placeholder-doctor.jpg',
  },
  {
    name: 'Dr. Kanika Bansal',
    title: 'General Physician/ Internal Medicine Specialist',
    experience: 6,
    qualifications: ['MBBS', 'DNB (General Medicine)'],
    location: {
      city: 'New Delhi',
      state: 'Delhi',
    },
    clinic: 'Apollo 24|7 Virtual Clinic',
    rating: 82,
    totalReviews: 250,
    fees: 489,
    cashback: 73,
    isAvailable: false,
    nextAvailableTime: new Date('2025-04-28T16:00:00Z'),
    specialties: ['General Physician', 'Internal Medicine'],
    gender: 'female',
    imageUrl: '/placeholder-doctor.jpg',
  },
  {
    name: 'Dr. Suraja Nutulapati',
    title: 'General Physician/ Internal Medicine Specialist',
    experience: 10,
    qualifications: ['MBBS', 'MD (Internal Medicine)'],
    location: {
      city: 'Hyderabad',
      state: 'Telangana',
    },
    clinic: 'Apollo 24|7 Virtual Clinic',
    rating: 90,
    totalReviews: 800,
    fees: 499,
    cashback: 75,
    isAvailable: false,
    nextAvailableTime: new Date('2025-04-29T01:30:00Z'),
    specialties: ['General Physician', 'Internal Medicine'],
    gender: 'female',
    imageUrl: '/placeholder-doctor.jpg',
  },
];

// Seed database function
async function seedDatabase() {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Clear existing data
    await Doctor.deleteMany({});
    console.log('Cleared existing data');
    
    // Insert new data
    await Doctor.insertMany(doctors);
    console.log(`Successfully seeded ${doctors.length} doctors to the database`);
    
    // Close the connection
    await mongoose.disconnect();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase(); 