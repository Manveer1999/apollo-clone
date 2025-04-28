"use client";

import { useRouter, useSearchParams } from 'next/navigation';

const SortSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="flex items-center">
      <span className="text-gray-800 mr-2 font-medium">Sort by:</span>
      <select 
        className="p-2 border rounded-md bg-white"
        value={searchParams.get('sortBy') || 'relevance'}
        onChange={(e) => {
          const params = new URLSearchParams(searchParams.toString());
          const value = e.target.value;
          if (value === 'relevance') {
            params.delete('sortBy');
            params.delete('sortOrder');
          } else if (value === 'experience') {
            params.set('sortBy', 'experience');
            params.set('sortOrder', 'desc');
          } else if (value === 'fee') {
            params.set('sortBy', 'fees');
            params.set('sortOrder', 'asc');
          } else if (value === 'fee-desc') {
            params.set('sortBy', 'fees');
            params.set('sortOrder', 'desc');
          } else if (value === 'rating') {
            params.set('sortBy', 'rating');
            params.set('sortOrder', 'desc');
          }
          router.push(`/specialties/general-physician-internal-medicine?${params.toString()}`);
        }}
      >
        <option value="relevance">Relevance</option>
        <option value="experience">Experience</option>
        <option value="fee">Fee: Low to High</option>
        <option value="fee-desc">Fee: High to Low</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  );
};

export default SortSelect; 