import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import TextField from '@mui/material/TextField';
import FileUpload from 'react-material-file-upload';
import { Button } from '@mui/material'
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function PDFuploader() {

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const [files, setFiles] = React.useState();
    const [formData, setFormData] = React.useState({frompage: 1, topage: 30});
    const [showButton, setShowButton] = React.useState(true);
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState("error");
    const [alertMessage, setAlertMessage] = React.useState("Loading");

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
        axiosPrivate.post(`api/v1/pdfuser/save/${auth.appuserid}&${formData.frompage}&${formData.topage}`, fileData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        }).then((result) => {
            setAlertMessage("Załadowano tekst do bazy danych.");
            setSeverity("success");
            setSnackOpen(true);
        }).catch((error) => {
            setAlertMessage("Załadowano tekst do ");
            setSeverity("error");
            setSnackOpen(true);
        })
    }

    return (
        <>
            <FileUpload
                value={files}
                onChange={setFiles}
                buttonText="Załaduj"
                buttonProps={{color: 'secondary'}}

                title="Upuść tutaj lub kliknij załaduj."
            />
            {showButton && (
                <>
                    <Grid>
                    <TextField sx={{ input: { color: 'primary.text' } , padding: '20px'}} onChange={handleTextFieldChange} id="frompage" label="Od strony"  value={formData.frompage} />
                    <TextField sx={{ input: { color: 'primary.text' } , padding: '20px'}} onChange={handleTextFieldChange} id="topage" label="Do strony"  value={formData.topage} />
                    </Grid>
                    <Button sx={{margin: '20px'}} color='secondary' variant="contained" onClick={sendFile} >Wyślij plik na serwer</Button>
                </>
            )
            }

            <Snackbar
                open={snackOpen}
                autoHideDuration={6000}
                onClose={() => {setSnackOpen(false);}}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Alert
                    onClose={() => {setSnackOpen(false);}}
                    severity={severity}
                    sx={{ width: '100%' }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>

        </>
        
    )



}

