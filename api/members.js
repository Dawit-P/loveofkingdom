import { neon } from '@neondatabase/serverless';

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

  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.DATABASE_URL_UNPOOLED;

  if (!connectionString) {
    return res.status(200).json({
      success: true,
      mode: 'local-fallback',
      message: 'No Neon Postgres connection string found in environment variables.',
      data: null
    });
  }

  try {
    const sql = neon(connectionString);

    // Ensure members table exists with structured columns + JSONB payload
    await sql(`
      CREATE TABLE IF NOT EXISTS members (
        id VARCHAR(255) PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(100),
        email VARCHAR(255),
        city VARCHAR(255),
        ministry_area VARCHAR(255),
        statement TEXT,
        date_registered VARCHAR(100),
        status VARCHAR(100),
        raw_json JSONB
      );
    `);

    if (req.method === 'GET') {
      const rows = await sql(`SELECT raw_json FROM members ORDER BY date_registered DESC, id DESC`);
      const membersList = rows.map((r) => typeof r.raw_json === 'string' ? JSON.parse(r.raw_json) : r.raw_json);
      return res.status(200).json({
        success: true,
        mode: 'neon-postgres',
        data: membersList
      });
    } else if (req.method === 'POST' || req.method === 'PUT') {
      const payload = req.body;
      const items = Array.isArray(payload) ? payload : [payload];

      for (const item of items) {
        if (!item || !item.id) continue;
        let id = item.id;
        const fullName = item.fullName || 'Unknown';
        const phone = item.phone || '';
        const email = item.email || '';
        const city = item.city || '';
        const ministryArea = item.ministryArea || 'Evangelism & Preaching';
        const statement = item.statement || '';
        const dateRegistered = item.dateRegistered || new Date().toISOString().split('T')[0];
        const status = item.status || 'Active';

        if (!phone.trim() || phone.trim().length < 6) continue;

        // Server-Side Duplicate Check: if phone exists, update existing record rather than creating a duplicate
        if (!Array.isArray(payload) && phone.trim()) {
          const existingRows = await sql(`SELECT id FROM members WHERE phone = $1 LIMIT 1`, [phone.trim()]);
          if (existingRows.length > 0) {
            id = existingRows[0].id;
          }
        }

        const rawJson = JSON.stringify({ ...item, id });

        await sql(`
          INSERT INTO members (
            id, full_name, phone, email, city, ministry_area, statement, date_registered, status, raw_json
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10::jsonb
          )
          ON CONFLICT (id) DO UPDATE SET
            full_name = EXCLUDED.full_name,
            phone = EXCLUDED.phone,
            email = EXCLUDED.email,
            city = EXCLUDED.city,
            ministry_area = EXCLUDED.ministry_area,
            statement = EXCLUDED.statement,
            status = EXCLUDED.status,
            raw_json = EXCLUDED.raw_json;
        `, [id, fullName, phone.trim(), email, city, ministryArea, statement, dateRegistered, status, rawJson]);
      }

      const rows = await sql(`SELECT raw_json FROM members ORDER BY date_registered DESC, id DESC`);
      const membersList = rows.map((r) => typeof r.raw_json === 'string' ? JSON.parse(r.raw_json) : r.raw_json);
      return res.status(200).json({
        success: true,
        mode: 'neon-postgres',
        data: membersList
      });
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      if (id) {
        await sql(`DELETE FROM members WHERE id = $1`, [id]);
      }
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error) {
    console.error('Neon API Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
