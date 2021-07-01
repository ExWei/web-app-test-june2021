import { saveImage } from '../../../lib/db';
import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import { clearAllCache } from '../../../lib/cache';

export const config = {
    api: {
        bodyParser: false
    }
};

export default async function handler(req, res) {
    try {
        // parse incoming FormData and wrap it into a Promise
        const data = await new Promise((resolve, reject) => {
            const form = new IncomingForm();

            form.parse(req, (err, fields, files) => {
                if (err) return reject(err);
                resolve({ fields, files });
            });
        });

        const contents = await fs.readFile(data.files.Img.path);

        await saveImage(data.fields.lang, data.fields.id, contents, data.files.Img.type);
        await clearAllCache();
        res.json({});
    } catch (e) {
        console.error(e);
        res.status(400).json(e);
    }
}
