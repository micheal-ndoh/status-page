import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting database seed...')

    // Create sample users
    const adminUser = await prisma.user.create({
        data: {
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'ADMIN',
        },
    })

    const teamMember = await prisma.user.create({
        data: {
            name: 'Team Member',
            email: 'member@example.com',
            role: 'USER',
        },
    })

    console.log('✅ Created users')

    // Create a sample team
    const team = await prisma.team.create({
        data: {
            name: 'Example Team',
            slug: 'example-team',
            description: 'A sample team for demonstration',
            ownerId: adminUser.id,
        },
    })

    console.log('✅ Created team')

    // Add team members
    await prisma.teamMember.createMany({
        data: [
            {
                teamId: team.id,
                userId: adminUser.id,
                role: 'OWNER',
            },
            {
                teamId: team.id,
                userId: teamMember.id,
                role: 'MEMBER',
            },
        ],
    })

    console.log('✅ Added team members')

    // Create sample services for the team
    const services = await Promise.all([
        prisma.service.create({
            data: {
                name: 'Web Application',
                description: 'Main web application and API services',
                status: 'OPERATIONAL',
                url: 'https://app.example.com',
                logo: 'https://via.placeholder.com/64/3B82F6/FFFFFF?text=Web',
                teamId: team.id,
            },
        }),
        prisma.service.create({
            data: {
                name: 'Database',
                description: 'Primary database and data storage',
                status: 'OPERATIONAL',
                url: 'https://db.example.com',
                logo: 'https://via.placeholder.com/64/10B981/FFFFFF?text=DB',
                teamId: team.id,
            },
        }),
        prisma.service.create({
            data: {
                name: 'CDN',
                description: 'Content delivery network and static assets',
                status: 'OPERATIONAL',
                url: 'https://cdn.example.com',
                logo: 'https://via.placeholder.com/64/F59E0B/FFFFFF?text=CDN',
                teamId: team.id,
            },
        }),
        prisma.service.create({
            data: {
                name: 'Email Service',
                description: 'Email delivery and notification system',
                status: 'DEGRADED_PERFORMANCE',
                url: 'https://email.example.com',
                logo: 'https://via.placeholder.com/64/EF4444/FFFFFF?text=Email',
                teamId: team.id,
            },
        }),
        prisma.service.create({
            data: {
                name: 'Mobile API',
                description: 'Mobile application backend services',
                status: 'OPERATIONAL',
                url: 'https://api.example.com',
                logo: 'https://via.placeholder.com/64/8B5CF6/FFFFFF?text=API',
                teamId: team.id,
            },
        }),
    ])

    console.log(`✅ Created ${services.length} services`)

    // Create sample incidents
    const incidents = await Promise.all([
        prisma.incident.create({
            data: {
                title: 'Email Service Performance Issues',
                description: 'We are experiencing slower than usual email delivery times. Our team is investigating the root cause.',
                status: 'INVESTIGATING',
                severity: 'MINOR',
                authorId: adminUser.id,
                teamId: team.id,
                services: {
                    connect: [{ id: services[3].id }], // Email Service
                },
            },
        }),
        prisma.incident.create({
            data: {
                title: 'Scheduled Maintenance - Database',
                description: 'We will be performing routine maintenance on our database infrastructure. Expected downtime: 30 minutes.',
                status: 'MONITORING',
                severity: 'MAJOR',
                authorId: adminUser.id,
                teamId: team.id,
                services: {
                    connect: [{ id: services[1].id }], // Database
                },
            },
        }),
    ])

    console.log(`✅ Created ${incidents.length} incidents`)

    // Create incident updates
    await Promise.all([
        prisma.incidentUpdate.create({
            data: {
                message: 'Our engineering team has identified the issue and is working on a fix.',
                status: 'IDENTIFIED',
                incidentId: incidents[0].id,
            },
        }),
        prisma.incidentUpdate.create({
            data: {
                message: 'Maintenance has been completed successfully. All systems are operational.',
                status: 'RESOLVED',
                incidentId: incidents[1].id,
            },
        }),
    ])

    console.log('✅ Created incident updates')

    console.log('🎉 Database seeding completed successfully!')
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    }) 