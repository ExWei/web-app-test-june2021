import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import NextLink from 'next/link';
import { Link as MUILink } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    languageSelector: {
        padding: theme.spacing(2)
    },
    languageItem: {
        padding: theme.spacing(1)
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0
    },
    toolbarSecondary: {
        borderBottom: `1px solid ${theme.palette.divider}`
    }
}));

export function ContentHeader({ lang, pages }) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="baseline"
                className={classes.languageSelector}>
                <Grid item className={classes.languageItem}>
                    <NextLink href={`/en`} passHref>
                        <MUILink>English</MUILink>
                    </NextLink>
                </Grid>
                <Grid item className={classes.languageItem}>
                    <NextLink href={`/fr`} passHref>
                        <MUILink>French</MUILink>
                    </NextLink>
                </Grid>
                <Grid item className={classes.languageItem}>
                    <NextLink href={`/es`} passHref>
                        <MUILink>Spanish</MUILink>
                    </NextLink>
                </Grid>
            </Grid>
            <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
                {pages.map((section) => (
                    <NextLink key={section.id} href={`/${lang}/${section.URL}`} passHref>
                        <MUILink
                            color="inherit"
                            noWrap
                            variant="body2"
                            className={classes.toolbarLink}>
                            {section.title}
                        </MUILink>
                    </NextLink>
                ))}
            </Toolbar>
        </React.Fragment>
    );
}
