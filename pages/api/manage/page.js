import { clearAllCache } from '../../../lib/cache';
import { savePage } from '../../../lib/db';

export default async function handler(req, res) {
    try {
        await savePage(req.body);
        await clearAllCache();
        res.json({});
    } catch (e) {
        console.error(e);
        res.status(400).json(e);
    }
}
