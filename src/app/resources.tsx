import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import mime from 'mime';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;
  const resourcePath = path.join(process.cwd(), 'public/fileResources', slug as string);
  
  // Check if the requested file exists
  if (fs.existsSync(resourcePath)) {
    // Read the file and send it as a response
    const fileStream = fs.createReadStream(resourcePath);
    const contentType = mime.getType(resourcePath) || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    fileStream.pipe(res);
  } else {
    res.status(404).send('Resource not found');
  }
}
