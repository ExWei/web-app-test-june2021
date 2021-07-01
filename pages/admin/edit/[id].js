import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getPage } from '../../../lib/db';

import { AdminPage } from '../../../src/AdminPage';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    breakArea: {
        marginTop: theme.spacing(2)
    },
    uploadButton: {
        marginTop: theme.spacing(1)
    },
    actionArea: {
        '& > *': {
            margin: theme.spacing(2)
        },
        marginLeft: theme.spacing(2) * -1
    }
}));

// admin edit page
export default function Page(props) {
    const classes = useStyles();
    const [activeLanguage, setActiveLanguage] = useState('en');
    const [page, setPage] = useState(props.page);
    const [saving, setSaving] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    const handleChange = (e) => {
        // set page fields such as enTitle, etc. Uses HTML element`s `name` property
        const { name, value } = e.target;
        setPage((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        await fetch('/api/manage/page', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(page)
        });
        setTimeout(() => {
            setSaving(false);
        }, 500); // let it spin a little longer for better visual feedback
    };

    const imgHandleChange = async (e) => {
        setUploadingImage(true);
        const formData = new FormData();

        formData.append('Img', e.target.files[0]);
        formData.append('lang', activeLanguage);
        formData.append('id', page.id);

        await fetch('/api/manage/img', {
            method: 'POST',
            body: formData
        });
        setTimeout(() => {
            setUploadingImage(false);
        }, 500); // let it spin a little longer for better visual feedback
    };

    return (
        <AdminPage>
            <form>
                <FormControl>
                    <InputLabel>Language</InputLabel>
                    <Select
                        value={activeLanguage}
                        onChange={(e) => setActiveLanguage(e.target.value)}>
                        <MenuItem value={'en'}>English</MenuItem>
                        <MenuItem value={'fr'}>French</MenuItem>
                        <MenuItem value={'es'}>Spanish</MenuItem>
                    </Select>
                </FormControl>
                <div className={classes.breakArea}>
                    <TextField
                        margin="dense"
                        id="title"
                        label="Title"
                        required
                        fullWidth
                        name={`${activeLanguage}Title`}
                        value={page[`${activeLanguage}Title`]}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="paragraph"
                        label="Paragraph"
                        required
                        fullWidth
                        multiline
                        rows={6}
                        name={`${activeLanguage}Paragraph`}
                        value={page[`${activeLanguage}Paragraph`]}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="headTitle"
                        label="Meta Title"
                        required
                        fullWidth
                        name={`${activeLanguage}MetaTitle`}
                        value={page[`${activeLanguage}MetaTitle`]}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="headDescription"
                        label="Meta Description"
                        required
                        fullWidth
                        name={`${activeLanguage}MetaDescription`}
                        value={page[`${activeLanguage}MetaDescription`]}
                        onChange={handleChange}
                    />
                    <TextField
                        label="URL"
                        disabled={page.id == 'index'}
                        value={
                            page.id === 'index'
                                ? 'Not editable for the index page'
                                : page[`${activeLanguage}URL`]
                        }
                        name={`${activeLanguage}URL`}
                        onChange={handleChange}
                        fullWidth
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">{activeLanguage}/</InputAdornment>
                            )
                        }}
                    />
                    <Button variant="contained" component="label" className={classes.uploadButton}>
                        Upload New Image
                        <input type="file" hidden onChange={imgHandleChange} />
                    </Button>
                </div>
                <div className={classes.actionArea}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={saving ? <CircularProgress size={24} /> : <SaveIcon />}
                        disabled={saving}
                        onClick={handleSave}>
                        Save
                    </Button>
                    <Link href="/admin">
                        <Button variant="contained" startIcon={<ArrowBackIcon />}>
                            Back
                        </Button>
                    </Link>
                </div>
            </form>
        </AdminPage>
    );
}

export async function getServerSideProps(context) {
    return {
        props: {
            page: await getPage(context.params.id)
        }
    };
}
