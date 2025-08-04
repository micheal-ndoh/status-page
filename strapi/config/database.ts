import { factories } from '@strapi/strapi';

export default ({ env }: { env: any }) => {
    // Check if we have a PostgreSQL database URL
    const databaseUrl = env('DATABASE_URL');
    
    if (databaseUrl && databaseUrl.includes('postgres')) {
        return {
            connection: {
                client: 'postgres',
                connection: {
                    connectionString: databaseUrl,
                    ssl: {
                        rejectUnauthorized: false,
                    },
                },
                pool: {
                    min: env.int('DATABASE_POOL_MIN', 0),
                    max: env.int('DATABASE_POOL_MAX', 10),
                },
            },
        };
    }

    // Default to SQLite for development
    return {
        connection: {
            client: 'sqlite',
            connection: {
                filename: env('DATABASE_FILENAME', '.tmp/data.db'),
            },
            useNullAsDefault: true,
        },
    };
}; 