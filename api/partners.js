import { kv } from '@vercel/kv';
import { Redis } from '@upstash/redis';
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const STORAGE_KEY = 'kohl_partners_state_v1';

  try {
    // 1. Try Upstash Redis first (Recommended in Vercel Marketplace)
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });
      if (req.method === 'GET') {
        const data = await redis.get(STORAGE_KEY);
        return res.status(200).json({ success: true, mode: 'upstash-redis', data: data || null });
      } else if (req.method === 'POST' || req.method === 'PUT') {
        await redis.set(STORAGE_KEY, req.body);
        return res.status(200).json({ success: true, mode: 'upstash-redis', data: req.body });
      }
    }

    // 2. Try Vercel KV (@vercel/kv)
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      if (req.method === 'GET') {
        const data = await kv.get(STORAGE_KEY);
        return res.status(200).json({ success: true, mode: 'vercel-kv', data: data || null });
      } else if (req.method === 'POST' || req.method === 'PUT') {
        await kv.set(STORAGE_KEY, req.body);
        return res.status(200).json({ success: true, mode: 'vercel-kv', data: req.body });
      }
    }

    // 3. Try Neon Postgres / Vercel Postgres (@vercel/postgres)
    if (process.env.POSTGRES_URL || process.env.DATABASE_URL) {
      await sql`CREATE TABLE IF NOT EXISTS kohl_storage (key_name VARCHAR(255) PRIMARY KEY, json_data JSONB)`;
      if (req.method === 'GET') {
        const { rows } = await sql`SELECT json_data FROM kohl_storage WHERE key_name = ${STORAGE_KEY}`;
        const data = rows[0]?.json_data || null;
        return res.status(200).json({ success: true, mode: 'postgres', data: data });
      } else if (req.method === 'POST' || req.method === 'PUT') {
        const jsonData = JSON.stringify(req.body);
        await sql`
          INSERT INTO kohl_storage (key_name, json_data)
          VALUES (${STORAGE_KEY}, ${jsonData}::jsonb)
          ON CONFLICT (key_name) DO UPDATE SET json_data = ${jsonData}::jsonb
        `;
        return res.status(200).json({ success: true, mode: 'postgres', data: req.body });
      }
    }

    // 4. Fallback when no database is configured in Vercel Storage yet
    return res.status(200).json({
      success: true,
      mode: 'local-fallback',
      message: 'No Vercel database configured yet.',
      data: null
    });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
