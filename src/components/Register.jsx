import React from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { Grid, Paper, TextField, Stack, Button, Typography, Avatar, Box} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import axios from '../api/axios';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LOGIN_URL = 'api/v1/registration';

const Register = () => {

    const errRef = React.useRef();
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = React.useState('');
    const [openDialog, setOpenDialog] = React.useState(false);
    const [formData, setFormData] = React.useState(  
        {
            firstname: "",
            lastname: "",
            username: "",
            email: "",
            password: ""
        }
    );

    function handleTextFieldChange(event) {
        const {id, value, type, checked} = event.target
        let val = value;
        setFormData(prevFormData => (
            {
                ...prevFormData,
                [id]: val
            }
        ))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, formData, {
                headers: { 
                  "Access-Control-Allow-Origin": "*",
                },
                withCredentials: true
              });
            setOpenDialog(true);
            
        } catch (err) {
            if (!err.response) {
                setErrMsg('No Server Response');
            } else if (err.response.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const paperStyle={padding :40,height:700,width:600, margin:"20px auto"}
    const avatarStyle={backgroundColor:'secondary.main', height:"60px", width:"60px" }
    const btnstyle={margin:'8px 0'}


    return (
        <>
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
            >
                <Grid item align='center'>
                    <Paper elevation={10} style={paperStyle} sx={{backgroundColor: 'primary.light'}}>
                        <Grid align='center'>
                            <Avatar sx={avatarStyle}><AppRegistrationIcon sx={{fontSize: '50px'}}/></Avatar>
                            <Typography sx={{color: "primary.text", padding: '10px'}} variant="h5" >Zarejestruj się</Typography>
                        </Grid>
                        <Stack>
                            <TextField id="firstname" required fullWidth label="Imię" value={formData.firstname} onChange={handleTextFieldChange} sx={{marginBottom: 3}} />
                            <TextField id="lastname" required fullWidth label="Nazwisko" value={formData.lastname} onChange={handleTextFieldChange} sx={{marginBottom: 3}} />
                            <TextField id="username" required fullWidth label="Login" value={formData.username} onChange={handleTextFieldChange} sx={{marginBottom: 3}} />
                            <TextField id="email" required fullWidth label="E-mail" value={formData.email} onChange={handleTextFieldChange} sx={{marginBottom: 3}} />
                            <TextField id="password" required type="password" label="Hasło" value={formData.password} onChange={handleTextFieldChange} sx={{marginBottom: 3}} />
                        </Stack>
                        <Button sx={{backgroundColor: 'custom.dark'}} type='submit'  variant="contained" style={btnstyle} fullWidth onClick={handleSubmit} >Sign in</Button>
                        <Typography > Przejdź do logowania  
                            <Link to="/login">Logowanie</Link>
                        </Typography>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    </Paper>
                </Grid>
            </Grid>
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpenDialog(false)}
            >
                <Paper elevation={20} sx={{backgroundColor: 'primary.light'}}>
                    <DialogTitle>{"Dokonałeś rejestracji"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Wysłano link aktywacyjny na mail <b>{formData.email}</b>. Potwierdź rejestrację konta klikając w link.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {setOpenDialog(false); navigate("/login", { replace: true });}}>Przejdź do logowania</Button>
                    </DialogActions>
                </Paper>
            </Dialog>
        </>
    )
}

export default Register
