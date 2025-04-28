import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/connection';
import Doctor from '@/models/Doctor';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '15');
    const skip = (page - 1) * limit;
    
    // Filters
    const specialty = searchParams.get('specialty');
    const location = searchParams.get('location');
    const gender = searchParams.get('gender');
    const minExperience = searchParams.get('minExperience');
    const maxFees = searchParams.get('maxFees');
    const availability = searchParams.get('availability');
    const sortBy = searchParams.get('sortBy') || 'rating';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    
    // Build query
    const query: any = {};
    
    if (specialty) {
      query.specialties = specialty;
    }
    
    if (location) {
      query['location.city'] = { $regex: location, $options: 'i' };
    }
    
    if (gender) {
      query.gender = gender;
    }
    
    if (minExperience) {
      query.experience = { $gte: parseInt(minExperience) };
    }
    
    if (maxFees) {
      query.fees = { $lte: parseInt(maxFees) };
    }
    
    if (availability === 'true') {
      query.isAvailable = true;
    }
    
    // Search
    const searchTerm = searchParams.get('search');
    if (searchTerm) {
      query.$text = { $search: searchTerm };
    }
    
    // Execute query with pagination
    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    
    const doctors = await Doctor.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination
    const totalDoctors = await Doctor.countDocuments(query);
    
    return NextResponse.json({
      doctors,
      pagination: {
        total: totalDoctors,
        page,
        limit,
        totalPages: Math.ceil(totalDoctors / limit),
      },
    });
  } catch (error: any) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch doctors' },
      { status: 500 }
    );
  }
} 