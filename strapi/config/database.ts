import { factories } from '@strapi/strapi';

export default factories.createCoreConfig('database', ({ env }) => ({
    connection: {
        client: env('DATABASE_CLIENT', 'sqlite'),
        connection: {
            filename: env('DATABASE_FILENAME', '.tmp/data.db'),
        },
        useNullAsDefault: true,
    },
})); 