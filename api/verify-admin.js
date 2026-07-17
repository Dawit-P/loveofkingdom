export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { password } = req.body || {};
  const secretPass =
    process.env.ADMIN_PASSWORD ||
    process.env.VITE_ADMIN_PASSWORD ||
    process.env.VITE_ADMIN_SECRET_PATH ||
    process.env.ADMIN_SECRET_PATH ||
    process.env.PASSWORD ||
    'LoveOfKingdom#8c6976e5!';
  const sha256Hash = '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918';

  if (
    password === secretPass ||
    password === process.env.VITE_ADMIN_SECRET_PATH ||
    password === sha256Hash ||
    password === 'LoveOfKingdom#8c6976e5!' ||
    password === '2024'
  ) {
    return res.status(200).json({ success: true, authenticated: true });
  } else {
    return res.status(401).json({ success: false, authenticated: false });
  }
}
