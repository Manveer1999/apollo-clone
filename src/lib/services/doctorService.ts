import axios from 'axios';
import { IDoctor } from '@/models/Doctor';

// Base URL for the API
const API_BASE_URL = '/api/doctors';

// Types for API responses
export interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DoctorsResponse {
  doctors: IDoctor[];
  pagination: PaginationData;
}

// Function to add a new doctor
export const addDoctor = async (doctorData: Omit<IDoctor, '_id'>) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add`, doctorData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to add doctor');
  }
};

// Function to get doctors with filters and pagination
export const getDoctors = async (queryParams: Record<string, string | number | boolean>) => {
  try {
    // Convert the query params to URL search params
    const params = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    });
    
    const response = await axios.get<DoctorsResponse>(`${API_BASE_URL}/list?${params.toString()}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to fetch doctors');
  }
}; 