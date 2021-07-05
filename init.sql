CREATE DATABASE IF NOT EXISTS web;
USE web;

CREATE TABLE IF NOT EXISTS pages (
    id VARCHAR(255) PRIMARY KEY,
    title text,
    paragraph text,
    metaTitle text,
    metaDescription text,
    URL VARCHAR(255),
    lang VARCHAR(255),
    image longblob,
    imageMIME VARCHAR(255),
    langDefault BOOLEAN
);
CREATE TABLE IF NOT EXISTS languages (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255)
);

INSERT INTO languages (id, title)
VALUES
('en', 'English'),
('fr', 'French'),
('es', 'Spanish'),
('et', 'Estonian');

INSERT INTO pages (id, title, paragraph, metaTitle, metaDescription, URL, lang, langDefault)
VALUES
(UUID(), 'english title', 'english paragraph', 'en meta title', 'en meta descr', '',  'en', TRUE),
(UUID(), 'english title 2', 'english paragraph', 'en meta title', 'en meta descr', 'b',  'en', FALSE),
(UUID(), 'fr title', 'fr paragraph', 'fr meta title', 'fr meta descr', '',  'fr', TRUE),
(UUID(), 'fr title 2', 'fr paragraph', 'fr meta title', 'fr meta descr', 'b',  'fr', FALSE),
(UUID(), 'es title', 'es paragraph', 'es meta title', 'es meta descr', '',  'es', TRUE),
(UUID(), 'es title 2', 'es paragraph', 'es meta title', 'es meta descr', 'b',  'es', FALSE),
(UUID(), 'et title', 'et paragraph', 'et meta title', 'et meta descr', '',  'et', TRUE),
(UUID(), 'et title 2', 'et paragraph', 'et meta title', 'et meta descr', 'alt1',  'et', FALSE);