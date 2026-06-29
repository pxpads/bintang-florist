import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const cookies = parseCookies(req.headers.cookie || '');
  
  if (cookies.bf_auth !== 'authenticated') {
    return res.redirect(302, '/login.html');
  }

  // Serve dashboard HTML
  const filePath = path.join(process.cwd(), 'public', 'dashboard.html');
  const html = fs.readFileSync(filePath, 'utf-8');
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}

function parseCookies(cookieStr) {
  return cookieStr.split(';').reduce((acc, part) => {
    const [key, ...val] = part.trim().split('=');
    if (key) acc[key.trim()] = val.join('=').trim();
    return acc;
  }, {});
}
