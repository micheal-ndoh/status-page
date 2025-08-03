import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { incidentSchema } from '@/lib/validations'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const incident = await prisma.incident.findUnique({
            where: { id: params.id },
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
        })

        if (!incident) {
            return NextResponse.json(
                { error: 'Incident not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(incident)
    } catch (error) {
        console.error('Error fetching incident:', error)
        return NextResponse.json(
            { error: 'Failed to fetch incident' },
            { status: 500 }
        )
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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

        const incident = await prisma.incident.update({
            where: { id: params.id },
            data: {
                title: validatedData.title,
                description: validatedData.description,
                severity: validatedData.severity,
                services: {
                    set: validatedData.serviceIds.map(id => ({ id })),
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

        return NextResponse.json(incident)
    } catch (error) {
        console.error('Error updating incident:', error)

        if (error instanceof Error && error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Validation error', details: error.message },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Failed to update incident' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        await prisma.incident.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting incident:', error)
        return NextResponse.json(
            { error: 'Failed to delete incident' },
            { status: 500 }
        )
    }
} 