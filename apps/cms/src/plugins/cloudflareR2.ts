import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3';
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';

/**
 * Cloudflare R2 Storage Adapter Configuration
 * 
 * This file is server-only and should not be bundled for the admin client.
 * Uses S3-compatible API to store media files in Cloudflare R2.
 */
export const r2Adapter = s3Adapter({
  config: {
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY || '',
      secretAccessKey: process.env.R2_SECRET_KEY || '',
    },
    endpoint: process.env.R2_ENDPOINT,
    region: 'auto', // R2 uses 'auto' for region
  },
  bucket: process.env.R2_BUCKET || 'vietway-media',
  acl: 'public-read',
});

export const cloudStoragePlugin = cloudStorage({
  collections: {
    media: {
      adapter: r2Adapter,
      disableLocalStorage: true,
      prefix: 'media',
      generateFileURL: ({ filename, prefix }) => {
        const publicUrl = process.env.R2_PUBLIC_URL || '';
        return `${publicUrl}/${prefix}/${filename}`;
      },
    },
  },
});
