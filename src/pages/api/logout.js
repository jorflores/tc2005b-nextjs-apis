import { destroyCookie } from 'nookies';

export default (req, res) => {
  destroyCookie({ res }, 'authToken', { path: '/' });
  res.end();
};