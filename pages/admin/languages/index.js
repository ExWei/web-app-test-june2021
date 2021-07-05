import { AdminPage } from '../../../src/AdminPage';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useRouter } from 'next/router';
import { getLanguages } from '../../../lib/db';

const useStyles = makeStyles({
    table: {
        minWidth: 650
    }
});

// admin index page
export default function Page(props) {
    const classes = useStyles();
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [open, setOpen] = useState(false);
    const [langDetails, setLangDetails] = useState({ id: '', title: '' });
    const openAddNewLanguage = () => {
        setLangDetails({ id: '', title: '' });
        setOpen(true);
    };

    const handleChange = (e) => {
        // set page fields such as enTitle, etc. Uses HTML element`s `name` property
        const { name, value } = e.target;
        setLangDetails((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        await fetch('/api/manage/language', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(langDetails)
        });
        setTimeout(() => {
            setSaving(false);
        }, 500); // let it spin a little longer for better visual feedback
        router.replace(router.asPath); // refresh page to rerun getServerSideProps
        setOpen(false);
    };

    return (
        <AdminPage name="Languages" fabAction={openAddNewLanguage}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.pages.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.title}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new language</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add new language, please enter its two letters long ID and its displaying
                        name.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="ID"
                        type="text"
                        name="id"
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        name="title"
                        onChange={handleChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        color="primary"
                        disabled={saving}
                        startIcon={saving && <CircularProgress size={18} />}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </AdminPage>
    );
}

export async function getServerSideProps(context) {
    return {
        props: {
            pages: await getLanguages()
        }
    };
}
