import Tokens from 'csrf';
import { serialize } from 'cookie';

const tokens = new Tokens();

export default function handler(req, res) {
  const secret = tokens.secretSync();
  const token = tokens.create(secret);
  res.setHeader('Set-Cookie', serialize('csrfSecret', secret, { path: '/', httpOnly: true }));
  res.json({ csrfToken: token });
}