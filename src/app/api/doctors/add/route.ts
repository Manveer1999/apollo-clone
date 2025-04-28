import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/connection';
import Doctor from '@/models/Doctor';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const doctorData = await request.json();

    // Validate required fields
    const requiredFields = [
      'name', 'title', 'experience', 'qualifications',
      'location', 'clinic', 'fees', 'specialties', 'gender'
    ];

    const missingFields = requiredFields.filter(field => {
      if (field === 'location') {
        return !doctorData.location || !doctorData.location.city || !doctorData.location.state;
      }
      return !doctorData[field];
    });

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Create new doctor
    const newDoctor = await Doctor.create(doctorData);

    return NextResponse.json(
      { message: 'Doctor added successfully', doctor: newDoctor },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error adding doctor:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to add doctor' },
      { status: 500 }
    );
  }
} 