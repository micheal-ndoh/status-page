import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering to prevent static generation errors
export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Get recent incidents
        const recentIncidents = await prisma.incident.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' },
            include: {
                author: {
                    select: {
                        name: true,
                    },
                },
                services: {
                    select: {
                        name: true,
                    },
                },
            },
        })

        // Get recent service updates (simplified - you might want to track service status changes)
        const recentServices = await prisma.service.findMany({
            take: 5,
            orderBy: { updatedAt: 'desc' },
        })

        // Combine and format activity
        const activity = [
            ...recentIncidents.map(incident => ({
                id: incident.id,
                type: 'incident' as const,
                title: incident.title,
                description: `Incident reported by ${incident.author.name}`,
                timestamp: incident.createdAt.toISOString(),
                status: incident.status,
            })),
            ...recentServices.map(service => ({
                id: service.id,
                type: 'service_update' as const,
                title: `${service.name} Status Update`,
                description: `Service status changed to ${service.status}`,
                timestamp: service.updatedAt.toISOString(),
                status: service.status,
            })),
        ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .slice(0, 10)

        return NextResponse.json(activity)
    } catch (error) {
        console.error('Error fetching dashboard activity:', error)
        return NextResponse.json(
            { error: 'Failed to fetch dashboard activity' },
            { status: 500 }
        )
    }
} 