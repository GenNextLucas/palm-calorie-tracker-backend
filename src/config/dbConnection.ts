import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

declare global {
    var prisma: ReturnType<typeof createPrismaClient> | undefined;
    var prismaInitCount: number | undefined;
}

const createPrismaClient = () => {
    globalThis.prismaInitCount = (globalThis.prismaInitCount || 0) + 1;
    
    console.log(`🚀 [Prisma] Initializing new connection pool  (Attempt #${globalThis.prismaInitCount})`);

    const adapter = new PrismaMariaDb({
        host: process.env.DATABASE_HOST || 'localhost',
        port: Number(process.env.DATABASE_PORT) || 3306,
        user: process.env.DATABASE_USER || 'root',
        password: process.env.DATABASE_PASSWORD || 'masterkey',
        database: process.env.DATABASE_NAME || 'calorie-tracker',
        connectionLimit: 5,
        allowPublicKeyRetrieval: true,
        connectTimeout: 10000
    });

    return new PrismaClient({ adapter })
};

const prisma = globalThis.prisma ?? createPrismaClient();

export default prisma;

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prisma;
}