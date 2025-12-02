/**
 * GET /api/countdown/[id]
 * Fetch a countdown by ID
 */

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { CountdownModel } from '@/lib/models/Countdown';
import type { CountdownResponse } from '@/types';

export async function GET(
  request: NextRequest,
  context: { params?: { id?: string } }
) {
  try {
    try {
      await connectDB();
    } catch (dbError) {
      const errorMsg = dbError instanceof Error ? dbError.message : 'Database connection failed';
      return NextResponse.json(
        { data: null, error: `Database connection error: ${errorMsg}` },
        { status: 500 }
      );
    }

    const { params } = context || {};
    const id = params?.id;

    if (!id) {
      return NextResponse.json(
        { data: null, error: 'Missing id parameter' },
        { status: 400 }
      );
    }

    // Fetch countdown from database
    const countdown = await CountdownModel.findById(id).lean();

    if (!countdown) {
      return NextResponse.json(
        { data: null, error: 'Countdown not found' },
        { status: 404 }
      );
    }

    // Convert _id to string for serialization
    const response: CountdownResponse = {
      data: {
        ...countdown,
        _id: countdown._id.toString(),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { data: null, error: 'Failed to fetch countdown' },
      { status: 500 }
    );
  }
}
