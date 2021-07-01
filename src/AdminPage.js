import { Container } from '@material-ui/core';
import React from 'react';
import Head from 'next/head';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        padding: theme.spacing(2)
    }
}));

export function AdminPage(props) {
    const classes = useStyles();

    return (
        <div>
            <Head>
                <title>Admin</title>
            </Head>
            <Container maxWidth="lg">
                <Grid item md={12} className={classes.wrapper}>
                    <Typography variant="h4" gutterBottom>
                        Content Management
                    </Typography>
                    {props.children}
                </Grid>
            </Container>
        </div>
    );
}
