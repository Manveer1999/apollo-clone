import React from 'react';
import { Metadata } from 'next';
// Removing the unused import
import Header from '@/components/layout/Header';
import FilterPanel from '@/components/filters/FilterPanel';
import DoctorCard from '@/components/doctor/DoctorCard';
import Pagination from '@/components/filters/Pagination';
import SortSelect from '@/components/filters/SortSelect';

// Define a simplified interface that matches our mock data structure
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

// Define metadata for SEO
export const metadata: Metadata = {
  title: 'Consult General Physicians Online - Internal Medicine Specialists | Apollo247 Clone',
  description: 'Book appointments with the best general physicians online. Consult with experienced internal medicine specialists for comprehensive healthcare.',
  keywords: 'general physician, internal medicine, online doctor consultation, apollo247, healthcare',
  openGraph: {
    title: 'Consult General Physicians Online - Internal Medicine Specialists',
    description: 'Book appointments with the best general physicians online. Consult with experienced internal medicine specialists for comprehensive healthcare.',
    url: 'https://www.apolloclone.com/specialties/general-physician-internal-medicine',
    siteName: 'Apollo247 Clone',
    images: [
      {
        url: 'https://www.apolloclone.com/placeholder-doctor.jpg',
        width: 1200,
        height: 630,
        alt: 'General Physicians Online',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consult General Physicians Online - Internal Medicine Specialists',
    description: 'Book appointments with the best general physicians online. Consult with experienced internal medicine specialists for comprehensive healthcare.',
    images: ['https://www.apolloclone.com/placeholder-doctor.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.apolloclone.com/specialties/general-physician-internal-medicine',
  },
};

// Our mock database of doctors
const mockDoctorsDatabase: Doctor[] = [
  {
    _id: '1',
    name: 'Dr. Jane Smith',
    title: 'General Physician',
    experience: 10,
    qualifications: ['MBBS', 'MD'],
    location: { city: 'Hyderabad', state: 'Telangana' },
    clinic: 'Apollo Clinic',
    rating: 4.8,
    totalReviews: 245,
    fees: 500,
    cashback: 100,
    isAvailable: true,
    specialties: ['General Medicine', 'Internal Medicine'],
    gender: 'female',
    imageUrl: '/placeholder-doctor.jpg'
  },
  {
    _id: '2',
    name: 'Dr. John Doe',
    title: 'Internal Medicine Specialist',
    experience: 15,
    qualifications: ['MBBS', 'MD', 'DM'],
    location: { city: 'Bangalore', state: 'Karnataka' },
    clinic: 'Apollo Health Center',
    rating: 4.9,
    totalReviews: 189,
    fees: 700,
    isAvailable: false,
    availableIn: 30,
    specialties: ['Internal Medicine', 'Critical Care'],
    gender: 'male',
    imageUrl: '/placeholder-doctor.jpg'
  },
  {
    _id: '3',
    name: 'Dr. Ravi Kumar',
    title: 'Family Medicine Specialist',
    experience: 8,
    qualifications: ['MBBS', 'MD'],
    location: { city: 'Hyderabad', state: 'Telangana' },
    clinic: 'Apollo Family Clinic',
    rating: 4.6,
    totalReviews: 120,
    fees: 400,
    isAvailable: true,
    specialties: ['Family Medicine', 'General Medicine'],
    gender: 'male',
    imageUrl: '/placeholder-doctor.jpg'
  },
  {
    _id: '4',
    name: 'Dr. Priya Sharma',
    title: 'General Physician',
    experience: 12,
    qualifications: ['MBBS', 'MD'],
    location: { city: 'Delhi', state: 'Delhi' },
    clinic: 'Apollo Prime Hospital',
    rating: 4.7,
    totalReviews: 210,
    fees: 600,
    isAvailable: true,
    specialties: ['General Medicine', 'Diabetes Care'],
    gender: 'female',
    imageUrl: '/placeholder-doctor.jpg'
  },
  {
    _id: '5',
    name: 'Dr. Amit Patel',
    title: 'Internal Medicine Specialist',
    experience: 18,
    qualifications: ['MBBS', 'MD', 'DNB'],
    location: { city: 'Mumbai', state: 'Maharashtra' },
    clinic: 'Apollo Super Specialty',
    rating: 4.9,
    totalReviews: 320,
    fees: 900,
    isAvailable: false,
    availableIn: 120,
    specialties: ['Internal Medicine', 'Cardiology'],
    gender: 'male',
    imageUrl: '/placeholder-doctor.jpg'
  },
  {
    _id: '6',
    name: 'Dr. Sneha Reddy',
    title: 'Family Medicine Specialist',
    experience: 7,
    qualifications: ['MBBS', 'DNB'],
    location: { city: 'Chennai', state: 'Tamil Nadu' },
    clinic: 'Apollo Health',
    rating: 4.5,
    totalReviews: 95,
    fees: 450,
    cashback: 50,
    isAvailable: true,
    specialties: ['Family Medicine', 'Women\'s Health'],
    gender: 'female',
    imageUrl: '/placeholder-doctor.jpg'
  }
];

// This is server-side fetching of initial data
async function fetchInitialDoctors(searchParams: URLSearchParams) {
  // Extract parameters with proper type checking
  const page = searchParams.has('page') ? parseInt(searchParams.get('page') || '1') : 1;
  const limit = searchParams.has('limit') ? parseInt(searchParams.get('limit') || '15') : 15;
  const specialty = searchParams.get('specialty') || '';
  const location = searchParams.get('location') || '';
  const gender = searchParams.get('gender') || '';
  const minExperienceStr = searchParams.get('minExperience') || '';
  const maxFeesStr = searchParams.get('maxFees') || '';
  const searchQuery = searchParams.get('search') || '';
  const availability = searchParams.get('availability') === 'true';
  
  const minExperience = minExperienceStr ? parseInt(minExperienceStr) : 0;
  const maxFees = maxFeesStr ? parseInt(maxFeesStr) : Infinity;
  
  console.log("Filtering with params:", { 
    specialty, location, gender, 
    minExperience, maxFees, 
    availability, searchQuery 
  });
  
  try {
    // Filter the mock data based on search parameters
    let filteredDoctors = [...mockDoctorsDatabase];
    
    // Filter by specialty
    if (specialty) {
      filteredDoctors = filteredDoctors.filter(doc => 
        doc.specialties.some(s => s.toLowerCase().includes(specialty.toLowerCase())) ||
        doc.title.toLowerCase().includes(specialty.toLowerCase())
      );
    }
    
    // Filter by location
    if (location) {
      filteredDoctors = filteredDoctors.filter(doc => 
        doc.location.city.toLowerCase() === location.toLowerCase()
      );
    }
    
    // Filter by gender
    if (gender) {
      filteredDoctors = filteredDoctors.filter(doc => doc.gender === gender);
    }
    
    // Filter by minimum experience
    if (minExperience > 0) {
      filteredDoctors = filteredDoctors.filter(doc => doc.experience >= minExperience);
    }
    
    // Filter by maximum fees
    if (maxFees < Infinity) {
      filteredDoctors = filteredDoctors.filter(doc => doc.fees <= maxFees);
    }
    
    // Filter by availability
    if (availability) {
      filteredDoctors = filteredDoctors.filter(doc => doc.isAvailable);
    }
    
    // Filter by search query (name, title, specialties)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredDoctors = filteredDoctors.filter(doc => 
        doc.name.toLowerCase().includes(query) ||
        doc.title.toLowerCase().includes(query) ||
        doc.specialties.some(s => s.toLowerCase().includes(query))
      );
    }
    
    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedDoctors = filteredDoctors.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredDoctors.length / limit);
    
    console.log(`Found ${filteredDoctors.length} doctors after filtering, showing ${paginatedDoctors.length}`);
    
    return {
      doctors: paginatedDoctors,
      pagination: {
        total: filteredDoctors.length,
        page: page,
        limit: limit,
        totalPages: totalPages
      }
    };
  } catch (error) {
    console.error('Failed to fetch doctors:', error);
    // Return empty data on error
    return {
      doctors: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 15,
        totalPages: 0,
      }
    };
  }
}

// Server component
export default async function DoctorsListingPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Create URLSearchParams directly with most common parameters
  // This avoids using Object.entries(searchParams) which causes Next.js dynamic property access errors
  const urlSearchParams = new URLSearchParams();
  
  // Explicitly handle each search parameter that might be in the URL
  // This is a more direct approach that avoids dynamic property access
  if (typeof searchParams.page === 'string') urlSearchParams.set('page', searchParams.page);
  if (typeof searchParams.limit === 'string') urlSearchParams.set('limit', searchParams.limit);
  if (typeof searchParams.specialty === 'string') urlSearchParams.set('specialty', searchParams.specialty);
  if (typeof searchParams.location === 'string') urlSearchParams.set('location', searchParams.location);
  if (typeof searchParams.gender === 'string') urlSearchParams.set('gender', searchParams.gender);
  if (typeof searchParams.minExperience === 'string') urlSearchParams.set('minExperience', searchParams.minExperience);
  if (typeof searchParams.maxFees === 'string') urlSearchParams.set('maxFees', searchParams.maxFees);
  if (typeof searchParams.search === 'string') urlSearchParams.set('search', searchParams.search);
  if (typeof searchParams.availability === 'string') urlSearchParams.set('availability', searchParams.availability);
  
  const result = await fetchInitialDoctors(urlSearchParams);
  const { doctors, pagination } = result;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Consult General Physicians Online - Internal Medicine Specialists ({pagination.total} doctors)
          </h1>
        </div>
        
        <FilterPanel />
        
        {/* Doctor count and sorting */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div className="text-gray-800 mb-2 md:mb-0 font-medium">
            Showing {doctors.length} out of {pagination.total} doctors
          </div>
          
          <SortSelect />
        </div>
        
        {/* Doctors listing */}
        <div className="mb-8">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-semibold mb-2">No doctors found</h2>
              <p className="text-gray-800">
                Try adjusting your search criteria or filters to see more results.
              </p>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
        />
        
        {/* Additional content - Information section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Book Consult for General Medicine Online</h2>
          <p className="mb-4 text-gray-800 leading-relaxed">
            Booking an appointment with a top general physician (GP) is now easier than ever with Apollo 247 Clone. 
            Our experienced doctors provide comprehensive care for a wide range of medical conditions, including 
            fever, allergies, and diabetes. You can conveniently schedule an online general physician consultation 
            or visit a trusted hospital/clinic near you.
          </p>
          
          <h3 className="text-lg font-bold mb-2 text-gray-900">What is General Medicine?</h3>
          <p className="mb-4 text-gray-800 leading-relaxed">
            General medicine is a medical speciality that focuses on the prevention, diagnosis, and treatment of 
            internal diseases in adults. This speciality encompasses a wide range of acute and chronic conditions 
            affecting various parts of the body, including fever, asthma, heart disease, liver problems, hypertension, 
            and neurological disorders.
          </p>
          
          <h3 className="text-lg font-bold mb-2 text-gray-900">Who is a General Physician?</h3>
          <p className="text-gray-800 leading-relaxed">
            A general physician is a medical doctor who specialises in the diagnosis, treatment, and prevention 
            of adult diseases. To become a general physician in the Indian subcontinent, one must complete an 
            MBBS degree followed by postgraduate training in General Medicine or Internal Medicine.
          </p>
        </div>
      </main>
      
      {/* Footer - Just a placeholder as per requirements */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Apollo247 Clone</h3>
              <p className="text-gray-200">Your trusted healthcare partner</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-200 hover:text-white">Doctors</a></li>
                <li><a href="#" className="text-gray-200 hover:text-white">Pharmacy</a></li>
                <li><a href="#" className="text-gray-200 hover:text-white">Lab Tests</a></li>
                <li><a href="#" className="text-gray-200 hover:text-white">Health Records</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-200 hover:text-white">Online Consultation</a></li>
                <li><a href="#" className="text-gray-200 hover:text-white">Medicine Delivery</a></li>
                <li><a href="#" className="text-gray-200 hover:text-white">Diagnostics</a></li>
                <li><a href="#" className="text-gray-200 hover:text-white">Health Record Storage</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Contact Us</h4>
              <p className="text-gray-200">Email: support@apolloclone.com</p>
              <p className="text-gray-200">Phone: +91 123 456 7890</p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-200">
            <p>&copy; {new Date().getFullYear()} Apollo247 Clone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 