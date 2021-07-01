import { getImage } from '../../../lib/db';

export default async function handler(req, res) {
    try {
        const img = await getImage(req.query.lang, req.query.id);
        res.setHeader('Content-Type', img.MIME);
        res.send(img.binary, 'binary');
    } catch (e) {
        console.error(e);
        res.status(400).send(null);
    }
}
