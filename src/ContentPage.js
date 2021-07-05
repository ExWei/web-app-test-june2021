import { Container } from '@material-ui/core';
import React from 'react';
import Head from 'next/head';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { ContentHeader } from './ContentHeader';

export function ContentPage({ lang, pages, content, languages }) {
    return (
        <div>
            <Head>
                <title>{content.metaTitle}</title>
                <meta name="description" content={content.metaDescription}></meta>
            </Head>
            <Container maxWidth="lg">
                <Grid item md={12}>
                    <ContentHeader lang={lang} pages={pages} languages={languages}></ContentHeader>
                </Grid>
                <Grid item md={12}>
                    <Typography variant="h2" gutterBottom>
                        {content.title}
                    </Typography>
                    {content.imageMIME && (
                        <img src={`/api/retrieve/img?id=${content.id}`} width={300} height={300} />
                    )}
                    <Typography variant="body1" gutterBottom>
                        {content.paragraph}
                    </Typography>
                </Grid>
            </Container>
        </div>
    );
}
