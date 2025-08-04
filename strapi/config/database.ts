import { factories } from '@strapi/strapi';

export default ({ env }: { env: any }) => {
    const client = env('DATABASE_CLIENT', 'sqlite');

    if (client === 'postgres') {
        return {
            connection: {
                client: 'postgres',
                connection: {
                    connectionString: env('DATABASE_URL'),
                    host: env('DATABASE_HOST', 'localhost'),
                    port: env.int('DATABASE_PORT', 5432),
                    database: env('DATABASE_NAME', 'strapi'),
                    user: env('DATABASE_USERNAME', 'strapi'),
                    password: env('DATABASE_PASSWORD', 'strapi'),
                    schema: env('DATABASE_SCHEMA', 'strapi'),
                    ssl: env.bool('DATABASE_SSL', false) ? {
                        rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
                    } : false,
                },
                pool: {
                    min: env.int('DATABASE_POOL_MIN', 0),
                    max: env.int('DATABASE_POOL_MAX', 10),
                },
                searchPath: [env('DATABASE_SCHEMA', 'strapi'), 'public'],
            },
        };
    }

    // Default SQLite configuration for development
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