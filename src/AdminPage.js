import React from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import NextLink from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import PostAddIcon from '@material-ui/icons/PostAdd';
import TranslateIcon from '@material-ui/icons/Translate';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
    wrapper: {
        padding: theme.spacing(2)
    },
    root: {
        display: 'flex'
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    // necessary for content to be below app bar
    leftToolbar: {
        ...theme.mixins.toolbar,
        fontSize: 32,
        paddingTop: 10,
        textAlign: 'center'
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3)
    },
    fabAction: {
        margin: 0,
        top: 'auto',
        right: 50,
        bottom: 50,
        left: 'auto',
        position: 'fixed'
    }
}));

export function AdminPage(props) {
    const classes = useStyles();
    // all screens the admin area has, needed for the left navbar
    const adminPages = [
        {
            name: 'Pages',
            icon: <PostAddIcon />,
            URL: ''
        },
        {
            name: 'Languages',
            icon: <TranslateIcon />,
            URL: 'languages'
        }
    ];

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        {props.name}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper
                }}
                anchor="left">
                <div className={classes.leftToolbar}>admin</div>
                <Divider />
                <List>
                    {adminPages.map((page) => (
                        <NextLink href={`/admin/${page.URL}`} key={page.URL}>
                            <ListItem button>
                                <ListItemIcon>{page.icon}</ListItemIcon>
                                <ListItemText primary={page.name} />
                            </ListItem>
                        </NextLink>
                    ))}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
            {/* If fabAction function is not provided then we do not render the floating button
            Can also be extended to provide custom icon if theoretically needed */}
            {props.fabAction && (
                <Fab
                    color="primary"
                    aria-label="add"
                    className={classes.fabAction}
                    onClick={props.fabAction}>
                    <AddIcon />
                </Fab>
            )}
        </div>
    );
}
