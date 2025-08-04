import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { incidentSchema } from '@/lib/validations'

// Force dynamic rendering to prevent static generation errors
export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const incidents = await prisma.incident.findMany({
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                services: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                updates: {
                    orderBy: { createdAt: 'desc' },
                },
            },
            orderBy: { createdAt: 'desc' },
        })

        return NextResponse.json(incidents)
    } catch (error) {
        console.error('Error fetching incidents:', error)
        return NextResponse.json(
            { error: 'Failed to fetch incidents' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const body = await request.json()
        const validatedData = incidentSchema.parse(body)

        const incident = await prisma.incident.create({
            data: {
                title: validatedData.title,
                description: validatedData.description,
                severity: validatedData.severity,
                authorId: session.user.id,
                services: {
                    connect: validatedData.serviceIds.map(id => ({ id })),
                },
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                services: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        })

        return NextResponse.json(incident, { status: 201 })
    } catch (error) {
        console.error('Error creating incident:', error)

        if (error instanceof Error && error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Validation error', details: error.message },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Failed to create incident' },
            { status: 500 }
        )
    }
} 