"use client";

import React from 'react';
import Image from 'next/image';
import { Star, MapPin, Clock } from 'lucide-react';

// Define the Doctor interface here to match the one in page.tsx
interface Doctor {
  _id: string;
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
  availableIn?: number;
  nextAvailableTime?: Date;
  specialties: string[];
  imageUrl?: string;
  gender: 'male' | 'female';
}

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  // Format availability text
  const getAvailabilityText = () => {
    if (doctor.isAvailable && doctor.availableIn !== undefined) {
      if (doctor.availableIn === 0) {
        return 'Available now';
      } else {
        return `Available in ${doctor.availableIn} minute${doctor.availableIn > 1 ? 's' : ''}`;
      }
    } else if (doctor.nextAvailableTime) {
      const nextAvailable = new Date(doctor.nextAvailableTime);
      const timeOptions: Intl.DateTimeFormatOptions = { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
      };
      return `Available at ${nextAvailable.toLocaleTimeString('en-US', timeOptions)}`;
    }
    return 'Currently unavailable';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 hover:shadow-lg transition-shadow border border-gray-100">
      <div className="flex flex-col md:flex-row">
        {/* Doctor Image and Rating */}
        <div className="w-full md:w-1/4 p-4 flex flex-col items-center">
          <div className="relative w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden mb-2 border-2 border-blue-100">
            <Image
              src={doctor.imageUrl || '/placeholder-doctor.jpg'}
              alt={doctor.name}
              fill
              sizes="(max-width: 768px) 96px, 144px"
              style={{
                objectFit: 'cover',
              }}
              className="rounded-full"
            />
          </div>
          
          {doctor.rating && doctor.totalReviews && (
            <div className="flex items-center mt-1 bg-blue-50 px-2 py-1 rounded-full">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm font-medium text-blue-800">{doctor.rating}%</span>
              <span className="text-xs text-gray-700 ml-1">({doctor.totalReviews}+ Patients)</span>
            </div>
          )}
        </div>
        
        {/* Doctor Info */}
        <div className="w-full md:w-2/4 p-4">
          <h3 className="text-lg md:text-xl font-bold text-indigo-800">{doctor.name}</h3>
          <p className="text-gray-700 font-medium">{doctor.title}</p>
          
          <div className="mt-3">
            <p className="text-sm">
              <span className="font-semibold text-indigo-600">{doctor.experience} Years</span> 
              <span className="text-gray-500"> • </span>
              <span className="text-gray-800">{doctor.qualifications.join(', ')}</span>
            </p>
          </div>
          
          <div className="flex items-start mt-3">
            <MapPin className="h-4 w-4 text-indigo-500 mr-1 mt-0.5" />
            <p className="text-sm text-gray-700">
              {doctor.clinic} - {doctor.location.city}, {doctor.location.state}
            </p>
          </div>
          
          <div className="flex items-center mt-3">
            <Clock className="h-4 w-4 text-indigo-500 mr-1" />
            <p className={`text-sm ${doctor.isAvailable 
              ? 'text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full' 
              : 'text-orange-600 font-medium bg-orange-50 px-2 py-0.5 rounded-full'}`}>
              {getAvailabilityText()}
            </p>
          </div>
        </div>
        
        {/* Price and Action */}
        <div className="w-full md:w-1/4 p-4 flex flex-col items-center md:items-end justify-between bg-gray-50 md:bg-white">
          <div className="text-right">
            <p className="text-lg font-bold text-indigo-900">₹{doctor.fees}</p>
            {doctor.cashback && (
              <p className="text-sm text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded inline-block">
                ₹{doctor.cashback} Cashback
              </p>
            )}
          </div>
          
          <button
            className="w-full md:w-auto mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium shadow-sm"
            onClick={() => {}}
          >
            Consult Online
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard; 