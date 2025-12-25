import {app} from './app';
import { config } from './config/env';
import { logger } from './lib/logger';
import { prisma } from './config/prisma';

const server = app.listen(config.PORT, () => {
  logger.info(`🚀 Server running on port ${config.PORT}`);
});

process.on('SIGTERM', async () => {
  logger.info('SIGTERM received. Closing...');
  await prisma.$disconnect();
  server.close(() => process.exit(0));
});