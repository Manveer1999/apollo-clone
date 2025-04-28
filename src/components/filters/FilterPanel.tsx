"use client";

import React, { useState } from 'react';
import { Search, MapPin, Filter, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

const FilterPanel = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Get current filter values from URL
  const specialty = searchParams.get('specialty') || '';
  const location = searchParams.get('location') || '';
  const gender = searchParams.get('gender') || '';
  const minExperience = searchParams.get('minExperience') || '';
  const maxFees = searchParams.get('maxFees') || '';
  const availability = searchParams.get('availability') || '';
  
  // Local state for form inputs
  const [filters, setFilters] = useState({
    specialty,
    location,
    gender,
    minExperience,
    maxFees,
    availability: availability === 'true',
  });
  
  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };
  
  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (filters.specialty) params.set('specialty', filters.specialty);
    if (filters.location) params.set('location', filters.location);
    if (filters.gender) params.set('gender', filters.gender);
    if (filters.minExperience) params.set('minExperience', filters.minExperience);
    if (filters.maxFees) params.set('maxFees', filters.maxFees);
    if (filters.availability) params.set('availability', 'true');
    
    // Reset to page 1 when applying new filters
    params.set('page', '1');
    
    // Keep existing search term if present
    const search = searchParams.get('search');
    if (search) params.set('search', search);
    
    // Navigate with new params
    router.push(`/specialties/general-physician-internal-medicine?${params.toString()}`);
    
    // Close mobile filter panel
    setIsFilterOpen(false);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({
      specialty: '',
      location: '',
      gender: '',
      minExperience: '',
      maxFees: '',
      availability: false,
    });
    
    // Navigate with search term only if present
    const search = searchParams.get('search');
    if (search) {
      router.push(`/specialties/general-physician-internal-medicine?search=${search}`);
    } else {
      router.push('/specialties/general-physician-internal-medicine');
    }
    
    // Close mobile filter panel
    setIsFilterOpen(false);
  };
  
  return (
    <div className="mb-6">
      {/* Search bar and mobile filter toggle */}
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search doctors by name, specialty..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-500"
            value={searchParams.get('search') || ''}
            onChange={(e) => {
              const params = new URLSearchParams(searchParams.toString());
              if (e.target.value) {
                params.set('search', e.target.value);
              } else {
                params.delete('search');
              }
              router.push(`/specialties/general-physician-internal-medicine?${params.toString()}`);
            }}
          />
          <Search className="absolute left-3 top-2.5 text-gray-500 h-5 w-5" />
        </div>
        
        <button
          className="flex items-center gap-1 md:hidden bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 font-medium"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter className="h-5 w-5 text-gray-600" />
          <span>Filters</span>
        </button>
      </div>
      
      {/* Filters - Desktop view */}
      <div className="hidden md:block mb-6">
        <h2 className="text-base font-bold text-gray-900 mb-3">Filter Options</h2>
        <div className="flex flex-wrap gap-4">
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-800 mb-1">Specialty</label>
            <select
              name="specialty"
              value={filters.specialty}
              onChange={handleFilterChange}
              className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Specialties</option>
              <option value="General Physician">General Physician</option>
              <option value="Internal Medicine">Internal Medicine</option>
              <option value="Family Medicine">Family Medicine</option>
            </select>
          </div>
          
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-800 mb-1">Location</label>
            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Locations</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
            </select>
          </div>
          
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-800 mb-1">Gender</label>
            <select
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
              className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Any Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-800 mb-1">Min. Experience (years)</label>
            <select
              name="minExperience"
              value={filters.minExperience}
              onChange={handleFilterChange}
              className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Any Experience</option>
              <option value="1">1+ years</option>
              <option value="3">3+ years</option>
              <option value="5">5+ years</option>
              <option value="10">10+ years</option>
            </select>
          </div>
          
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-800 mb-1">Max Fee (₹)</label>
            <select
              name="maxFees"
              value={filters.maxFees}
              onChange={handleFilterChange}
              className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Any Fee</option>
              <option value="300">Under ₹300</option>
              <option value="500">Under ₹500</option>
              <option value="1000">Under ₹1000</option>
            </select>
          </div>
          
          <div className="w-full md:w-auto flex items-end">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="availability"
                name="availability"
                checked={filters.availability}
                onChange={handleFilterChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="availability" className="text-sm font-medium text-gray-800">
                Available Now
              </label>
            </div>
          </div>
          
          <div className="w-full md:w-auto flex items-end mt-4 md:mt-0">
            <div className="flex gap-2">
              <button
                onClick={applyFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Apply Filters
              </button>
              <button
                onClick={clearFilters}
                className="px-4 py-2 border border-gray-300 text-gray-800 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile filter panel */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="bg-white h-full w-11/12 max-w-md p-4 ml-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Filters</h2>
              <button onClick={() => setIsFilterOpen(false)}>
                <X className="h-6 w-6 text-gray-700" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Specialty</label>
                <select
                  name="specialty"
                  value={filters.specialty}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">All Specialties</option>
                  <option value="General Physician">General Physician</option>
                  <option value="Internal Medicine">Internal Medicine</option>
                  <option value="Family Medicine">Family Medicine</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Location</label>
                <select
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">All Locations</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Gender</label>
                <select
                  name="gender"
                  value={filters.gender}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Any Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Min. Experience (years)</label>
                <select
                  name="minExperience"
                  value={filters.minExperience}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Any Experience</option>
                  <option value="1">1+ years</option>
                  <option value="3">3+ years</option>
                  <option value="5">5+ years</option>
                  <option value="10">10+ years</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Max Fee (₹)</label>
                <select
                  name="maxFees"
                  value={filters.maxFees}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Any Fee</option>
                  <option value="300">Under ₹300</option>
                  <option value="500">Under ₹500</option>
                  <option value="1000">Under ₹1000</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="availability-mobile"
                  name="availability"
                  checked={filters.availability}
                  onChange={handleFilterChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="availability-mobile" className="text-sm font-medium text-gray-800">
                  Available Now
                </label>
              </div>
              
              <div className="flex gap-2 mt-6">
                <button
                  onClick={applyFilters}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Apply Filters
                </button>
                <button
                  onClick={clearFilters}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-800 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel; 