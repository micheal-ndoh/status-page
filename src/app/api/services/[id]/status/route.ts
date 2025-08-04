import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const statusUpdateSchema = z.object({
    status: z.enum(['OPERATIONAL', 'DEGRADED_PERFORMANCE', 'PARTIAL_OUTAGE', 'MAJOR_OUTAGE', 'MAINTENANCE']),
})

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
        const validatedData = statusUpdateSchema.parse(body)

        const service = await prisma.service.update({
            where: { id: params.id },
            data: { status: validatedData.status },
        })

        return NextResponse.json(service)
    } catch (error) {
        console.error('Error updating service status:', error)

        if (error instanceof Error && error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Validation error', details: error.message },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Failed to update service status' },
            { status: 500 }
        )
    }
} 