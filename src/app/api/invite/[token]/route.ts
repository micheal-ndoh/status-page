import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Force dynamic rendering to prevent static generation errors
export const dynamic = 'force-dynamic'

export async function GET(
    request: NextRequest,
    { params }: { params: { token: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Find the invite
        const invite = await prisma.teamInvite.findUnique({
            where: { token: params.token },
            include: {
                team: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    }
                }
            }
        });

        if (!invite) {
            return NextResponse.json(
                { error: 'Invalid invite token' },
                { status: 404 }
            );
        }

        if (invite.expiresAt < new Date()) {
            return NextResponse.json(
                { error: 'Invite has expired' },
                { status: 400 }
            );
        }

        if (invite.email !== session.user.email) {
            return NextResponse.json(
                { error: 'Invite is for a different email address' },
                { status: 403 }
            );
        }

        return NextResponse.json({
            invite,
            team: invite.team,
        });
    } catch (error) {
        console.error('Error fetching invite:', error);
        return NextResponse.json(
            { error: 'Failed to fetch invite' },
            { status: 500 }
        );
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: { token: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Find the invite
        const invite = await prisma.teamInvite.findUnique({
            where: { token: params.token },
            include: {
                team: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        });

        if (!invite) {
            return NextResponse.json(
                { error: 'Invalid invite token' },
                { status: 404 }
            );
        }

        if (invite.expiresAt < new Date()) {
            return NextResponse.json(
                { error: 'Invite has expired' },
                { status: 400 }
            );
        }

        if (invite.email !== session.user.email) {
            return NextResponse.json(
                { error: 'Invite is for a different email address' },
                { status: 403 }
            );
        }

        // Check if user is already a member
        const existingMember = await prisma.teamMember.findFirst({
            where: {
                teamId: invite.teamId,
                userId: session.user.id,
            }
        });

        if (existingMember) {
            return NextResponse.json(
                { error: 'You are already a member of this team' },
                { status: 400 }
            );
        }

        // Add user to team
        await prisma.teamMember.create({
            data: {
                teamId: invite.teamId,
                userId: session.user.id,
                role: invite.role,
            }
        });

        // Delete the invite
        await prisma.teamInvite.delete({
            where: { token: params.token }
        });

        return NextResponse.json({
            success: true,
            message: 'Successfully joined team',
            team: invite.team,
        });
    } catch (error) {
        console.error('Error accepting invite:', error);
        return NextResponse.json(
            { error: 'Failed to accept invite' },
            { status: 500 }
        );
    }
} 