import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import {Stack} from '@mui/material';
import PDFuploader from './PDFuploader';
import {ResetProgress} from "./ResetProgress";
import Slide from '@mui/material/Slide';

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
            <Grid container spacing={{ xs: 2}} columns={{xs: 3}}>
                <Grid xs={1} key={1}>
                    <Slide direction="left" in={true} style={{ transitionDelay: '200ms', transitionDuration: '1500ms'}} mountOnEnter unmountOnExit>
                        <Paper elevation={2} sx={{ margin: '10px', backgroundColor: 'primary.darkest'}} >
                            <FormLabel component="legend"  sx={{ fontSize:"30px", textAlign: 'center',  color: 'primary.text', fontWeight: 'bold', margin: '20px'  }}>Podstawowe dane</FormLabel>
                            <Stack>
                                <TextField sx={{ input: { color: 'primary.text' } , padding: '20px'}} InputProps={{readOnly: true,}} id="name" label="Imię"  value={formData.firstname} />
                                <TextField sx={{ input: { color: 'primary.text' } , padding: '20px'}} InputProps={{readOnly: true,}} id="surname" label="Nazwisko"  value={formData.lastname} />
                                <TextField sx={{ input: { color: 'primary.text' } , padding: '20px'}} InputProps={{readOnly: true,}} id="email" label="E-mail"  value={formData.email} />
                                <TextField sx={{ input: { color: 'primary.text' } , padding: '20px'}} InputProps={{readOnly: true,}} id="username" label="Nick"  value={formData.username} />
                            </Stack>
                        </Paper>
                    </Slide>
                </Grid>
                <Grid xs={1} key={2}>
                    <Slide direction="left" in={true} style={{ transitionDelay: '400ms', transitionDuration: '1500ms'}} mountOnEnter unmountOnExit>
                        <Paper elevation={2} sx={{ margin: '10px', backgroundColor: 'primary.darkest'}} >
                            <FormLabel component="legend"  sx={{ fontSize:"30px", textAlign: 'center',  color: 'primary.text', fontWeight: 'bold', margin: '20px'  }}>Twój PDF</FormLabel>
                            <Stack>
                                <PDFuploader />
                            </Stack>
                        </Paper>
                    </Slide>
                </Grid>
                <Grid xs={1} key={3}>
                    <Slide direction="left" in={true} style={{ transitionDelay: '800ms', transitionDuration: '1200ms'}} mountOnEnter unmountOnExit>
                        <Paper elevation={2} sx={{ margin: '10px', backgroundColor: 'primary.darkest'}} >
                            <FormLabel component="legend"  sx={{ fontSize:"30px", textAlign: 'center',  color: 'primary.text', fontWeight: 'bold', margin: '20px'  }}>Zresetuj postęp w planie treningowym</FormLabel>
                            <Stack>
                                <ResetProgress />
                            </Stack>
                        </Paper>
                    </Slide>
                </Grid>
            </Grid>
        </>
    )

}

