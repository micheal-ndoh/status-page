import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { cubbitClient, CUBBIT_BUCKET, generateAvatarFileName, extractKeyFromUrl } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('avatar') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload an image.' },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Get user ID for unique file naming
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Generate unique filename using utility function
    const fileName = generateAvatarFileName(user.id, file.name);

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cubbit
    const uploadCommand = new PutObjectCommand({
      Bucket: CUBBIT_BUCKET,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
      ACL: 'public-read', // Make the image publicly accessible
    });

    await cubbitClient.send(uploadCommand);

    // Generate the public URL
    const imageUrl = `${process.env.CUBBIT_ENDPOINT}/${CUBBIT_BUCKET}/${fileName}`;

    // Update user's avatar URL in database
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        image: imageUrl,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: 'Avatar updated successfully',
    });
  } catch (error) {
    console.error('Error uploading avatar:', error);
    return NextResponse.json(
      { error: 'Failed to upload avatar' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get current user and their avatar URL
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, image: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // If user has an avatar, delete it from Cubbit
    if (user.image) {
      const key = extractKeyFromUrl(user.image);
      if (key) {
        try {
          const deleteCommand = new DeleteObjectCommand({
            Bucket: CUBBIT_BUCKET,
            Key: key,
          });

          await cubbitClient.send(deleteCommand);
        } catch (deleteError) {
          console.error('Error deleting avatar from Cubbit:', deleteError);
          // Continue with database update even if file deletion fails
        }
      }
    }

    // Remove avatar URL from database
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        image: null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: 'Avatar removed successfully',
    });
  } catch (error) {
    console.error('Error removing avatar:', error);
    return NextResponse.json(
      { error: 'Failed to remove avatar' },
      { status: 500 }
    );
  }
} 