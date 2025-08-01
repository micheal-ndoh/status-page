import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { serviceSchema } from '@/lib/validations'

export async function GET() {
    try {
        const services = await prisma.service.findMany({
            orderBy: { createdAt: 'desc' },
        })

        return NextResponse.json(services)
    } catch (error) {
        console.error('Error fetching services:', error)
        return NextResponse.json(
            { error: 'Failed to fetch services' },
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
        const validatedData = serviceSchema.parse(body)

        const service = await prisma.service.create({
            data: validatedData,
        })

        return NextResponse.json(service, { status: 201 })
    } catch (error) {
        console.error('Error creating service:', error)

        if (error instanceof Error && error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Validation error', details: error.message },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Failed to create service' },
            { status: 500 }
        )
    }
} 