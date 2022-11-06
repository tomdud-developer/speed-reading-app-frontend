import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Typography } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import { Stack } from '@mui/material';
import FileUpload from 'react-material-file-upload';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import { Button } from '@mui/material'

export default function PDFuploader() {

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const [files, setFiles] = React.useState();
    const [formData, setFormData] = React.useState({frompage: 1, topage: 30});
    const [showButton, setShowButton] = React.useState(true);
    React.useEffect(() => {

    }, []);

    const handleFileUploadError = (error) => {
        setShowButton(false);
    }

    function handleTextFieldChange(event) {
        setFormData(previousFormData => (
            {
                ...previousFormData,
                [event.target.id]: event.target.value
            }
        ))
    }

    const sendFile = () => {
        var fileData = new FormData();
        fileData.append("multipartPdf", files[0]);
        console.log(files[0])
        axiosPrivate.put(`api/v1/pdfuser/save/${auth.appuserid}&${formData.frompage}&${formData.topage}`, fileData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        }).then((result) => {
            console.log(result)
        })
    }

    return (
        <>
            <FileUpload
                value={files}
                onChange={setFiles}
                buttonText="Załaduj"
                title="Upuść tutaj lub kliknij załaduj."
            />;
            {showButton && (
                <>
                    <Grid>
                    <TextField sx={{ input: { color: 'primary.text' } , padding: '20px'}} onChange={handleTextFieldChange} id="frompage" label="Od strony"  value={formData.frompage} />
                    <TextField sx={{ input: { color: 'primary.text' } , padding: '20px'}} onChange={handleTextFieldChange} id="topage" label="Do strony"  value={formData.topage} />
                    </Grid>
                    <Button sx={{margin: '20px'}}variant="contained" onClick={sendFile} >Wyślij plik na serwer</Button>
                </>
            )
            }
        </>
        
    )



}

