// server.ts
import { PrismaClient } from '@prisma/client';
import app from './app';
import { config } from './config';
import logger from './config/logger';

const prisma = new PrismaClient();

prisma.$connect().then(() => {
  logger.info('Prisma connected successfully');
  app.listen(config.port, () => {
    logger.info(`Server running on http://localhost:${config.port}`);
  });
});