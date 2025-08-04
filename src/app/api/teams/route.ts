import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering to prevent static generation errors
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Get all teams where user is owner or member
        const teams = await prisma.team.findMany({
            where: {
                OR: [
                    { ownerId: session.user.id },
                    { members: { some: { userId: session.user.id } } }
                ]
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                    }
                },
                members: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                image: true,
                            }
                        }
                    }
                },
                _count: {
                    select: {
                        services: true,
                        incidents: true,
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(teams);
    } catch (error) {
        console.error('Error fetching teams:', error);
        return NextResponse.json(
            { error: 'Failed to fetch teams' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { name, description } = body;

        if (!name) {
            return NextResponse.json(
                { error: 'Team name is required' },
                { status: 400 }
            );
        }

        // Generate a unique slug from the team name
        const baseSlug = name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        
        // Check if slug already exists and make it unique
        let slug = baseSlug;
        let counter = 1;
        while (await prisma.team.findUnique({ where: { slug } })) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }

        const team = await prisma.team.create({
            data: {
                name,
                slug,
                description,
                ownerId: session.user.id,
                members: {
                    create: {
                        userId: session.user.id,
                        role: 'OWNER'
                    }
                }
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                    }
                },
                members: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                image: true,
                            }
                        }
                    }
                }
            }
        });

        return NextResponse.json(team, { status: 201 });
    } catch (error) {
        console.error('Error creating team:', error);
        return NextResponse.json(
            { error: 'Failed to create team' },
            { status: 500 }
        );
    }
} 