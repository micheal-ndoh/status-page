import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import crypto from 'crypto';
import { generateTeamInviteEmail } from '@/lib/team-email-templates';

// Force dynamic rendering to prevent static generation errors
export const dynamic = 'force-dynamic'

const inviteSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    role: z.enum(['OWNER', 'ADMIN', 'MEMBER']).default('MEMBER'),
});

export async function GET(
    request: NextRequest,
    { params }: { params: { teamId: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Check if user is team owner or admin
        const teamMember = await prisma.teamMember.findFirst({
            where: {
                teamId: params.teamId,
                userId: session.user.id,
                role: { in: ['OWNER', 'ADMIN'] }
            }
        });

        if (!teamMember) {
            return NextResponse.json(
                { error: 'Forbidden' },
                { status: 403 }
            );
        }

        // Get team invites
        const invites = await prisma.teamInvite.findMany({
            where: {
                teamId: params.teamId,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(invites);
    } catch (error) {
        console.error('Error fetching team invites:', error);
        return NextResponse.json(
            { error: 'Failed to fetch team invites' },
            { status: 500 }
        );
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: { teamId: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Check if user is team owner or admin
        const teamMember = await prisma.teamMember.findFirst({
            where: {
                teamId: params.teamId,
                userId: session.user.id,
                role: { in: ['OWNER', 'ADMIN'] }
            }
        });

        if (!teamMember) {
            return NextResponse.json(
                { error: 'Forbidden' },
                { status: 403 }
            );
        }

        const body = await request.json();
        const validatedData = inviteSchema.parse(body);

        // Check if user is already a member
        const existingMember = await prisma.teamMember.findFirst({
            where: {
                teamId: params.teamId,
                user: { email: validatedData.email }
            }
        });

        if (existingMember) {
            return NextResponse.json(
                { error: 'User is already a team member' },
                { status: 400 }
            );
        }

        // Check if invite already exists
        const existingInvite = await prisma.teamInvite.findFirst({
            where: {
                teamId: params.teamId,
                email: validatedData.email
            }
        });

        if (existingInvite) {
            return NextResponse.json(
                { error: 'Invite already sent to this email' },
                { status: 400 }
            );
        }

        // Generate invite token
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

        // Create invite
        const invite = await prisma.teamInvite.create({
            data: {
                teamId: params.teamId,
                email: validatedData.email,
                role: validatedData.role,
                token,
                expiresAt,
            }
        });

        // Send invite email
        const inviteUrl = `${process.env.NEXTAUTH_URL}/invite/${token}`;

        // Get inviter name and team name
        const team = await prisma.team.findUnique({
            where: { id: params.teamId },
            select: { name: true }
        });

        const inviter = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { name: true }
        });

        // Generate email content
        const emailContent = generateTeamInviteEmail(
            'en', // Default to English for now
            inviter?.name || 'A team member',
            team?.name || 'Team',
            inviteUrl,
            validatedData.role,
            (key: string) => {
                // Simple translation mapping for email templates
                const translations: Record<string, string> = {
                    'teams.youAreInvited': 'You\'re Invited! 🎉',
                    'teams.invitationDescription': 'has invited you to join their team on Prism, the modern status page platform.',
                    'teams.acceptInvitation': 'Accept Invitation',
                    'teams.securityNote': 'Security Note',
                    'teams.securityNoteText': 'This invitation link is unique to you and will expire in 7 days. If you didn\'t expect this invitation, please ignore this email.',
                    'teams.invitationSentFrom': 'This invitation was sent from Prism Status Page Platform',
                    'teams.contactAdmin': 'If you have any questions, please contact your team administrator'
                };
                return translations[key] || key;
            }
        );

        // Send email using Resend
        const resendApiKey = process.env.EMAIL_SERVER_PASSWORD;
        if (resendApiKey && resendApiKey.startsWith('re_')) {
            try {
                const emailResponse = await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${resendApiKey}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        from: 'Prism <onboarding@resend.dev>',
                        to: validatedData.email,
                        subject: emailContent.subject,
                        html: emailContent.html,
                        text: emailContent.text,
                    }),
                });

                if (!emailResponse.ok) {
                    console.error('Failed to send invite email:', await emailResponse.text());
                }
            } catch (emailError) {
                console.error('Error sending invite email:', emailError);
            }
        }

        return NextResponse.json({
            success: true,
            invite: {
                ...invite,
                inviteUrl
            },
            message: 'Invite sent successfully',
        });
    } catch (error) {
        console.error('Error creating team invite:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to create team invite' },
            { status: 500 }
        );
    }
} 