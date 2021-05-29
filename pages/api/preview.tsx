import { request } from 'node:https';

export default async function handler(req, res): Promise<any> {
  res.setPreviewData({});
  if (req.query.name) {
    let location = '/' + req.query.name;
    res.writeHead(307, { Location: location });
  } else {
    res.writeHead(307, { Location: '/' });
  }
  res.end();
}
