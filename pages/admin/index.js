import { AdminPage } from '../../src/AdminPage';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useRouter } from 'next/router';
import { getLanguages, getPagesURLs } from '../../lib/db';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650
    },
    langFormControl: {
        margin: theme.spacing(1),
        minWidth: 120
    }
}));

// admin index page
export default function Page(props) {
    const classes = useStyles();
    const router = useRouter();

    const handleEditClick = (id) => {
        router.push(`/admin/edit/${id}`);
    };

    const handleLanguageSelect = (lang) => {
        router.replace(`/admin?lang=${lang}`); // refresh page with new lang params to rerun getServerSideProps
    };

    const addNewPage = async () => {
        // create a new empty page and then redirect to the Page Edit admin screen
        const res = await fetch('/api/manage/createPage', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lang: props.lang })
        });
        const data = await res.json();
        router.push(`/admin/edit/${data.id}`);
    };

    return (
        <AdminPage name="Pages" fabAction={addNewPage}>
            <FormControl className={classes.langFormControl}>
                <InputLabel id="demo-simple-select-label">Language</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.lang}
                    onChange={(e) => handleLanguageSelect(e.target.value)}>
                    {props.languages.map((lang) => (
                        <MenuItem key={lang.id} value={lang.id}>
                            {lang.title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Language</TableCell>
                            <TableCell>URL</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.pages.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{row.lang}</TableCell>
                                <TableCell>/{row.URL}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleEditClick(row.id)}>
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </AdminPage>
    );
}

export async function getServerSideProps(context) {
    const lang = context.query.lang ?? 'en';
    return {
        props: {
            pages: await getPagesURLs(lang),
            languages: await getLanguages(),
            lang
        }
    };
}
