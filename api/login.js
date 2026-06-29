export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;
  const correct = process.env.DASHBOARD_PASSWORD || 'bintangflorist';

  console.log('Login attempt, password match:', password === correct);

  if (password !== correct) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Set cookie
  res.setHeader('Set-Cookie', [
    `bf_auth=authenticated; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`
  ]);

  return res.status(200).json({ ok: true });
}
