"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Create page links array
  const getPageLinks = () => {
    const pages = [];
    
    // Always show first page
    pages.push(1);
    
    // Calculate range around current page
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Add ellipsis if there's a gap after page 1
    if (startPage > 2) {
      pages.push('ellipsis-start');
    }
    
    // Add pages around current page
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis if there's a gap before last page
    if (endPage < totalPages - 1) {
      pages.push('ellipsis-end');
    }
    
    // Always show last page (if more than 1 page)
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/specialties/general-physician-internal-medicine?${params.toString()}`);
  };
  
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex justify-center items-center mt-6 mb-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 border rounded-l-md ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
            : 'bg-white text-gray-800 hover:bg-gray-50'
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      
      {getPageLinks().map((page, index) => (
        typeof page === 'number' ? (
          <button
            key={`page-${page}`}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 border-t border-b ${
              page === currentPage
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-800 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ) : (
          <span
            key={`${page}-${index}`}
            className="px-3 py-2 border-t border-b bg-white text-gray-700"
          >
            ...
          </span>
        )
      ))}
      
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 border rounded-r-md ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
            : 'bg-white text-gray-800 hover:bg-gray-50'
        }`}
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination; 