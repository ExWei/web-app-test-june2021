import { clearAllCache } from '../../../lib/cache';
import { createPage } from '../../../lib/db';

export default async function handler(req, res) {
    try {
        const newPage = await createPage(req.body);
        await clearAllCache();
        res.json(newPage);
    } catch (e) {
        console.error(e);
        res.status(400).json(e);
    }
}
