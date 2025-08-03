import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateSchema = z.object({
    message: z.string().min(1, 'Update message is required'),
    status: z.enum(['investigating', 'identified', 'monitoring', 'resolved']),
})

export async function POST(
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
        const validatedData = updateSchema.parse(body)

        // First update the incident status
        await prisma.incident.update({
            where: { id: params.id },
            data: { status: validatedData.status },
        })

        // Then create the update
        const update = await prisma.incidentUpdate.create({
            data: {
                message: validatedData.message,
                status: validatedData.status,
                incidentId: params.id,
                authorId: session.user.id,
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        })

        return NextResponse.json(update, { status: 201 })
    } catch (error) {
        console.error('Error creating incident update:', error)

        if (error instanceof Error && error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Validation error', details: error.message },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Failed to create incident update' },
            { status: 500 }
        )
    }
} 