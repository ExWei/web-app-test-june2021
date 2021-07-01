import { Container } from '@material-ui/core';
import React from 'react';
import Head from 'next/head';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { ContentHeader } from './ContentHeader';

export function ContentPage({ lang, pages, content }) {
    return (
        <div>
            <Head>
                <title>{content[`${lang}MetaTitle`]}</title>
                <meta name="description" content={content[`${lang}MetaDescription`]}></meta>
            </Head>
            <Container maxWidth="lg">
                <Grid item md={12}>
                    <ContentHeader lang={lang} pages={pages}></ContentHeader>
                </Grid>
                <Grid item md={12}>
                    <Typography variant="h2" gutterBottom>
                        {content[`${lang}Title`]}
                    </Typography>
                    {content[`${lang}ImageMIME`] && (
                        <img
                            src={`/api/retrieve/img?id=${content.id}&lang=${lang}`}
                            width={300}
                            height={300}
                        />
                    )}
                    <Typography variant="body1" gutterBottom>
                        {content[`${lang}Paragraph`]}
                    </Typography>
                </Grid>
            </Container>
        </div>
    );
}
