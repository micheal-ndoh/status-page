import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Get service statistics
        const services = await prisma.service.findMany()
        const totalServices = services.length
        const operationalServices = services.filter(s => s.status === 'OPERATIONAL').length
        const degradedServices = services.filter(s => s.status === 'DEGRADED_PERFORMANCE').length
        const outageServices = services.filter(s =>
            s.status === 'PARTIAL_OUTAGE' || s.status === 'MAJOR_OUTAGE'
        ).length

        // Get incident statistics
        const incidents = await prisma.incident.findMany()
        const totalIncidents = incidents.length
        const activeIncidents = incidents.filter(i => i.status !== 'RESOLVED').length
        const resolvedIncidents = incidents.filter(i => i.status === 'RESOLVED').length

        // Calculate uptime percentage (simplified calculation)
        const uptimePercentage = totalServices > 0
            ? Math.round((operationalServices / totalServices) * 100)
            : 100

        const stats = {
            totalServices,
            operationalServices,
            degradedServices,
            outageServices,
            totalIncidents,
            activeIncidents,
            resolvedIncidents,
            uptimePercentage,
        }

        return NextResponse.json(stats)
    } catch (error) {
        console.error('Error fetching dashboard stats:', error)
        return NextResponse.json(
            { error: 'Failed to fetch dashboard stats' },
            { status: 500 }
        )
    }
} 