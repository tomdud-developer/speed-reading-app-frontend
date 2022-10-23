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
import FileUpload from "react-mui-fileuploader"
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import { Button } from '@mui/material'

export default function PDFuploader() {

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const [file, setFile] = React.useState();
    const [showButton, setShowButton] = React.useState(false);
    React.useEffect(() => {

    }, []);



    const handleFileUploadError = (error) => {
        
    }

    const handleFilesChange = (files) => {
        setFile(files);
        setShowButton(true);
    }

    return (
        <>
            <FileUpload
                multiFile={false}
                disabled={false}
                header="[Przeciągnij i upuść]"
                title=""
                leftLabel="lub"
                rightLabel="aby wybrać plik"
                buttonLabel="kliknij tutaj"
                buttonRemoveLabel="Usuń"
                maxFileSize={10}
                maxUploadFiles={1}
                maxFilesContainerHeight={357}
                errorSizeMessage={'fill it or move it to use the default error message'}
                allowedExtensions={['pdf']}
                onFilesChange={handleFilesChange}
                onError={handleFileUploadError}
                imageSrc={'icons/pdf-icon.png'}
                bannerProps={{ elevation: 0, variant: "outlined" }}
                containerProps={{ elevation: 0, variant: "outlined" }}
            />
            {showButton &&
                <Button>Wyślij plik na serwer</Button>
            }
        </>
        
    )



}

