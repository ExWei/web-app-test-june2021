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
import { useRouter } from 'next/router';
import { getPagesURLs } from '../../lib/db';

const useStyles = makeStyles({
    table: {
        minWidth: 650
    }
});

// admin index page
export default function Page(props) {
    const classes = useStyles();
    const router = useRouter();

    const handleEditClick = (id) => {
        router.push(`/admin/edit/${id}`);
    };

    return (
        <AdminPage>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.pages.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.title}</TableCell>
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
    return {
        props: {
            pages: await getPagesURLs('en')
        }
    };
}
