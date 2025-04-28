"use client";

import React from 'react';
import Link from 'next/link';
import { Search, User, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-blue-700 font-bold text-2xl mr-8">
            apollo
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link href="#" className="text-gray-700 hover:text-blue-700">
              Doctors
            </Link>
            <Link href="#" className="text-gray-700 hover:text-blue-700">
              Pharmacy
            </Link>
            <Link href="#" className="text-gray-700 hover:text-blue-700">
              Lab Tests
            </Link>
            <Link href="#" className="text-gray-700 hover:text-blue-700">
              Health Records
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search doctors, medicines, etc."
              className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500 h-5 w-5" />
          </div>
          
          <button className="text-blue-700 border border-blue-700 rounded-md px-4 py-1.5 hover:bg-blue-50">
            Login
          </button>
          
          <button className="md:hidden">
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 