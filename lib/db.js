import { cachify } from './cache';

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
    const pages = await knex('pages').select(
        'id',
        'enTitle',
        'enURL',
        'esTitle',
        'esURL',
        'frTitle',
        'frURL'
    );
    return pages.map((page) => {
        return {
            id: page.id,
            title: page[`${lang}Title`],
            URL: page[`${lang}URL`]
        };
    });
};
export const getPagesURLs = cachify.bind(this, _getPagesURLs);

export const _getPage = async (id) => {
    const pages = await knex('pages')
        .select(
            `id`,
            `enTitle`,
            `enURL`,
            `enParagraph`,
            `enMetaTitle`,
            `enMetaDescription`,
            `esTitle`,
            `esURL`,
            `esParagraph`,
            `esMetaTitle`,
            `esMetaDescription`,
            `frTitle`,
            `frURL`,
            `frParagraph`,
            `frMetaTitle`,
            `frMetaDescription`,
            'enImageMIME',
            'esImageMIME',
            'frImageMIME'
        )
        .where('id', id);
    if (pages.length === 0) {
        return null;
    }
    return pages.map((page) => {
        return JSON.parse(JSON.stringify(page)); //serialize to JSON, have to do like that because knex object won't serialize directly
    })[0];
};

export const getPage = cachify.bind(this, _getPage);

export const _getPageByURL = async (lang, url) => {
    const pages = await knex('pages')
        .select(
            `id`,
            `enTitle`,
            `enURL`,
            `enParagraph`,
            `enMetaTitle`,
            `enMetaDescription`,
            `esTitle`,
            `esURL`,
            `esParagraph`,
            `esMetaTitle`,
            `esMetaDescription`,
            `frTitle`,
            `frURL`,
            `frParagraph`,
            `frMetaTitle`,
            `frMetaDescription`,
            'enImageMIME',
            'esImageMIME',
            'frImageMIME'
        )
        .where(`${lang}URL`, url);
    if (pages.length === 0) {
        return null;
    }
    return pages.map((page) => {
        return JSON.parse(JSON.stringify(page)); //serialize to JSON, have to do like that because knex object won't serialize directly
    })[0];
};

export const getPageByURL = cachify.bind(this, _getPageByURL);

// save page text data
export const savePage = async (data) => {
    return await knex('pages').where('id', data.id).update(data);
};

// save localized image for a page
export const saveImage = async (lang, id, imgBuffer, MIME) => {
    return await knex('pages')
        .where('id', id)
        .update({ [`${lang}Image`]: imgBuffer, [`${lang}ImageMIME`]: MIME });
};

// get localized image for a specific page by ID
export const _getImage = async (lang, id) => {
    const pages = await knex('pages').select(`${lang}Image`, `${lang}ImageMIME`).where('id', id);
    if (pages.length === 0) {
        return null;
    }
    return pages.map((page) => {
        return { binary: page[`${lang}Image`], MIME: page[`${lang}ImageMIME`] };
    })[0];
};

export const getImage = cachify.bind(this, _getImage);
