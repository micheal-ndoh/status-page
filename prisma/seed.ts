import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting database seed...')

    // Create sample services
    const services = await Promise.all([
        prisma.service.create({
            data: {
                name: 'Web Application',
                description: 'Main web application and API services',
                status: 'OPERATIONAL',
                url: 'https://app.example.com',
                logo: 'https://via.placeholder.com/64/3B82F6/FFFFFF?text=Web',
            },
        }),
        prisma.service.create({
            data: {
                name: 'Database',
                description: 'Primary database and data storage',
                status: 'OPERATIONAL',
                url: 'https://db.example.com',
                logo: 'https://via.placeholder.com/64/10B981/FFFFFF?text=DB',
            },
        }),
        prisma.service.create({
            data: {
                name: 'CDN',
                description: 'Content delivery network and static assets',
                status: 'OPERATIONAL',
                url: 'https://cdn.example.com',
                logo: 'https://via.placeholder.com/64/F59E0B/FFFFFF?text=CDN',
            },
        }),
        prisma.service.create({
            data: {
                name: 'Email Service',
                description: 'Email delivery and notification system',
                status: 'DEGRADED_PERFORMANCE',
                url: 'https://email.example.com',
                logo: 'https://via.placeholder.com/64/EF4444/FFFFFF?text=Email',
            },
        }),
        prisma.service.create({
            data: {
                name: 'Mobile API',
                description: 'Mobile application backend services',
                status: 'OPERATIONAL',
                url: 'https://api.example.com',
                logo: 'https://via.placeholder.com/64/8B5CF6/FFFFFF?text=API',
            },
        }),
    ])

    console.log(`✅ Created ${services.length} services`)

    // Create a sample user
    const user = await prisma.user.create({
        data: {
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'ADMIN',
        },
    })

    console.log('✅ Created admin user')

    // Create sample incidents
    const incidents = await Promise.all([
        prisma.incident.create({
            data: {
                title: 'Email Service Performance Issues',
                description: 'We are experiencing slower than usual email delivery times. Our team is investigating the root cause.',
                status: 'INVESTIGATING',
                severity: 'MINOR',
                authorId: user.id,
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
                authorId: user.id,
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