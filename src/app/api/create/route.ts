/**
 * POST /api/create
 * Create a new countdown with optional image upload
 */

import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { connectDB } from '@/lib/mongodb';
import { CountdownModel } from '@/lib/models/Countdown';
import { generateImageFilename } from '@/lib/utils';
import type { CreateCountdownResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    try {
      await connectDB();
    } catch (dbError) {
      const errorMsg = dbError instanceof Error ? dbError.message : 'Database connection failed';
      return NextResponse.json(
        { error: `Database connection error: ${errorMsg}` },
        { status: 500 }
      );
    }

    // Parse FormData
    const formData = await request.formData();
    const label = formData.get('label') as string;
    const type = formData.get('type') as string;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string | null;
    const description = formData.get('description') as string | null;
    const imageFile = formData.get('image') as File | null;

    // Validate required fields
    if (!label || !type || !date) {
      return NextResponse.json(
        { error: 'Missing required fields: label, type, date' },
        { status: 400 }
      );
    }

    let imageUrl: string | undefined;

    // Handle image upload if provided
    if (imageFile) {
      try {
        const buffer = await imageFile.arrayBuffer();
        const filename = generateImageFilename(imageFile.name);
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');

        // Ensure upload directory exists
        await mkdir(uploadDir, { recursive: true });

        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, Buffer.from(buffer));

        // Store relative URL for database
        imageUrl = `/uploads/${filename}`;
      } catch (imageError) {
        console.error('Image upload error:', imageError);
        return NextResponse.json(
          { error: 'Failed to upload image' },
          { status: 500 }
        );
      }
    }

    // Create countdown document
    const countdown = await CountdownModel.create({
      label,
      type,
      date,
      time: time || undefined,
      description: description || undefined,
      imageUrl,
    });

    const response: CreateCountdownResponse = {
      _id: countdown._id.toString(),
      message: 'Countdown created successfully',
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to create countdown' },
      { status: 500 }
    );
  }
}
