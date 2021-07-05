import { cachify } from './cache';
import { v4 as uuidv4 } from 'uuid';

export const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'db',
        database: 'web',
        user: 'usr',
        password: 'usr123demo'
    }
});

const _getPagesURLs = async (lang) => {
    const pages = await knex('pages').select('id', 'title', 'URL', 'lang').where({ lang });
    return pages.map((page) => {
        return {
            id: page.id,
            title: page.title,
            URL: page.URL,
            lang: page.lang
        };
    });
};
export const getPagesURLs = cachify.bind(this, _getPagesURLs);

export const _getPage = async (id) => {
    const pages = await knex('pages')
        .select(
            `id`,
            `title`,
            `URL`,
            `paragraph`,
            `metaTitle`,
            `metaDescription`,
            'imageMIME',
            'langDefault'
        )
        .where({ id });
    if (pages.length === 0) {
        return null;
    }
    return pages.map((page) => {
        return JSON.parse(JSON.stringify(page)); //serialize to JSON, have to do like that because knex object won't serialize directly
    })[0];
};

export const getPage = cachify.bind(this, _getPage);

export const _getPageByURL = async (lang, URL) => {
    const pages = await knex('pages')
        .select(
            `id`,
            `title`,
            `URL`,
            `paragraph`,
            `metaTitle`,
            `metaDescription`,
            'imageMIME',
            'langDefault'
        )
        .where({ lang, URL });
    if (pages.length === 0) {
        return null;
    }
    return pages.map((page) => {
        return JSON.parse(JSON.stringify(page)); //serialize to JSON, have to do like that because knex object won't serialize directly
    })[0];
};

export const getPageByURL = cachify.bind(this, _getPageByURL);

export const _getLangMainPage = async (lang) => {
    const pages = await knex('pages')
        .select(
            `id`,
            `title`,
            `URL`,
            `paragraph`,
            `metaTitle`,
            `metaDescription`,
            'imageMIME',
            'langDefault'
        )
        .where({ lang, langDefault: true });
    if (pages.length === 0) {
        return null;
    }
    return pages.map((page) => {
        return JSON.parse(JSON.stringify(page)); //serialize to JSON, have to do like that because knex object won't serialize directly
    })[0];
};

export const getLangMainPage = cachify.bind(this, _getLangMainPage);

// save page text data
export const savePage = async (data) => {
    delete data.image; // fix the possible bug if a user first uploads an image, and then clicks "Save", we do not override the image
    delete data.imageMIME;
    return await knex('pages').where({ id: data.id }).update(data);
};

// init a new empty page
export const createPage = async ({ lang, URL, title, langDefault }) => {
    const id = uuidv4();
    await knex('pages').insert({
        lang,
        langDefault,
        URL: langDefault? '' : id, // if its a langDefault (language default/index page) then we do the following custom logic
        title: langDefault ? 'index' : 'new page ' + new Date().toString(),
        paragraph: '',
        metaTitle: '',
        metaDescription: '',
        id
    });
    return getPage(id); // return created page
};

// save localized image for a page
export const saveImage = async (id, imgBuffer, MIME) => {
    return await knex('pages').where({ id }).update({ image: imgBuffer, imageMIME: MIME });
};

// get localized image for a specific page by ID
export const _getImage = async (id) => {
    const pages = await knex('pages').select(`image`, `imageMIME`).where({ id });
    if (pages.length === 0) {
        return null;
    }
    return pages.map((page) => {
        return { binary: page.image, MIME: page.imageMIME };
    })[0];
};

export const getImage = cachify.bind(this, _getImage);

const _getLanguages = async () => {
    const languages = await knex('languages').select('id', 'title');
    return languages.map((language) => {
        return JSON.parse(JSON.stringify(language)); //serialize to JSON, have to do like that because knex object won't serialize directly
    });
};
export const getLanguages = cachify.bind(this, _getLanguages);

export const createLanguage = async (data) => {
    await knex('languages').insert(data);
    return createPage({ lang: data.id, langDefault: true });
};
