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
import {Stack} from '@mui/material';
import PDFuploader from './PDFuploader';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'dark' === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Settings() {

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    React.useEffect(() => {
       
    }, []);

    const [formData, setFormData] = React.useState({
        id: auth.appuserid,
        firstname: auth.firstname,
        lastname: auth.lastname,
        username: auth.user,
        email: auth.email,
        password: "",
        roles: auth.roles,
    });

    return (
        <>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid xs={2} sm={4} md={4} key={1}>
                    <Paper elevation={2} sx={{ margin: '10px', backgroundColor: 'primary.darkest'}} >
                        <FormLabel component="legend"  sx={{ fontSize:"30px", textAlign: 'center',  color: 'primary.text', fontWeight: 'bold', margin: '20px'  }}>Podstawowe dane</FormLabel>
                        <Stack>
                            <TextField sx={{ input: { color: 'primary.text' } , padding: '20px'}} InputProps={{readOnly: true,}} id="name" label="Imię"  value={formData.firstname} />
                            <TextField sx={{ input: { color: 'primary.text' } , padding: '20px'}} InputProps={{readOnly: true,}} id="surname" label="Nazwisko"  value={formData.lastname} />
                            <TextField sx={{ input: { color: 'primary.text' } , padding: '20px'}} InputProps={{readOnly: true,}} id="email" label="E-mail"  value={formData.email} />
                            <TextField sx={{ input: { color: 'primary.text' } , padding: '20px'}} InputProps={{readOnly: true,}} id="username" label="Nick"  value={formData.username} />
                        </Stack>
                    </Paper>
                </Grid>
                <Grid xs={2} sm={4} md={4} key={2}>
                    <Paper elevation={2} sx={{ margin: '10px', backgroundColor: 'primary.darkest'}} >
                        <FormLabel component="legend"  sx={{ fontSize:"30px", textAlign: 'center',  color: 'primary.text', fontWeight: 'bold', margin: '20px'  }}>Twój PDF</FormLabel>
                        <Stack>
                            <PDFuploader />
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
            <a href="https://www.flaticon.com/free-icons/pdf" title="pdf icons">Pdf icons created by Freepik - Flaticon</a>
        </>
    )

}

