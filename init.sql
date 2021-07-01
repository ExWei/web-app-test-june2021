CREATE DATABASE IF NOT EXISTS web;
USE web;
CREATE TABLE IF NOT EXISTS pages (
    id VARCHAR(255) PRIMARY KEY,
    enTitle text,
    enParagraph text,
    enMetaTitle text,
    enMetaDescription text,
    enURL VARCHAR(255),
    enImage longblob,
    enImageMIME VARCHAR(255),
    esTitle text,
    esParagraph text,
    esMetaTitle text,
    esMetaDescription text,
    esURL VARCHAR(255),
    esImage longblob,
    esImageMIME VARCHAR(255),
    frTitle text,
    frParagraph text,
    frMetaTitle text,
    frMetaDescription text,
    frURL VARCHAR(255),
    frImage longblob,
    frImageMIME VARCHAR(255)
);

INSERT INTO pages (id, enTitle, enParagraph, enMetaTitle, enMetaDescription, enURL, esTitle, esParagraph, esMetaTitle, esMetaDescription, esURL, frTitle, frParagraph, frMetaTitle, frMetaDescription, frURL)
VALUES ('index', 'english title', 'english paragraph', 'en meta title', 'en meta descr', '',  'es title', 'es paragraph', 'es meta title', 'es meta descr', '',  'fr title', 'fr paragraph', 'fr meta title', 'fr meta descr', '');

INSERT INTO pages (id, enTitle, enParagraph, enMetaTitle, enMetaDescription, enURL, esTitle, esParagraph, esMetaTitle, esMetaDescription, esURL, frTitle, frParagraph, frMetaTitle, frMetaDescription, frURL)
VALUES ('second', 'second english title', 'english paragraph', 'en meta title', 'en meta descr', 'sec',  'es title', 'es paragraph', 'es meta title', 'es meta descr', 'custom1',  'fr title', 'fr paragraph', 'fr meta title', 'fr meta descr', 'custom2');

INSERT INTO pages (id, enTitle, enParagraph, enMetaTitle, enMetaDescription, enURL, esTitle, esParagraph, esMetaTitle, esMetaDescription, esURL, frTitle, frParagraph, frMetaTitle, frMetaDescription, frURL)
VALUES ('third', 'third english title', 'english paragraph', 'en meta title', 'en meta descr', 'third',  'es title', 'es paragraph', 'es meta title', 'es meta descr', 'another22',  'fr title', 'fr paragraph', 'fr meta title', 'fr meta descr', 'another33');