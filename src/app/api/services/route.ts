import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { serviceSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const { searchParams } = new URL(request.url);
        const teamId = searchParams.get('teamId');

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // If teamId is provided, check if user has access to that team
        if (teamId) {
            const teamMember = await prisma.teamMember.findFirst({
                where: {
                    teamId,
                    userId: session.user.id,
                }
            });

            if (!teamMember) {
                return NextResponse.json(
                    { error: 'Forbidden' },
                    { status: 403 }
                );
            }

            const services = await prisma.service.findMany({
                where: { teamId },
                orderBy: { createdAt: 'desc' },
            });

            return NextResponse.json(services);
        }

        // If no teamId, get all services from user's teams
        const userTeams = await prisma.team.findMany({
            where: {
                OR: [
                    { ownerId: session.user.id },
                    { members: { some: { userId: session.user.id } } }
                ]
            },
            select: { id: true }
        });

        const teamIds = userTeams.map(team => team.id);
        const services = await prisma.service.findMany({
            where: { teamId: { in: teamIds } },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json(
            { error: 'Failed to fetch services' },
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
        const { teamId, ...serviceData } = body;
        const validatedData = serviceSchema.parse(serviceData);

        if (!teamId) {
            return NextResponse.json(
                { error: 'Team ID is required' },
                { status: 400 }
            );
        }

        // Check if user has access to the team
        const teamMember = await prisma.teamMember.findFirst({
            where: {
                teamId,
                userId: session.user.id,
            }
        });

        if (!teamMember) {
            return NextResponse.json(
                { error: 'Forbidden' },
                { status: 403 }
            );
        }

        const service = await prisma.service.create({
            data: {
                ...validatedData,
                teamId,
            },
        });

        return NextResponse.json(service, { status: 201 });
    } catch (error) {
        console.error('Error creating service:', error);

        if (error instanceof Error && error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Validation error', details: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to create service' },
            { status: 500 }
        );
    }
} 