import dotenv from 'dotenv';
import path from 'path';

// Load env before anything else
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import express from 'express';
import payload from 'payload';

const app = express();

const PORT = process.env.PORT || 3005;

const start = async (): Promise<void> => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'fallback-secret-change-me-in-production',
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Add custom routes here if needed
  app.get('/health', (_, res) => {
    res.status(200).json({ status: 'ok' });
  });

  app.listen(PORT, () => {
    payload.logger.info(`Server running on port ${PORT}`);
  });
};

start();
