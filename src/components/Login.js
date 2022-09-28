import React from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Grid, Paper, TextField, Stack, Button, Typography, Avatar, Box} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import axios from '../api/axios';

const LOGIN_URL = 'api/login';

const Login = () => {
    const { setAuth } = useAuth();

    const userRef = React.useRef();
    const errRef = React.useRef();
    const navigate = useNavigate();

    const [user, setUser] = React.useState('');
    const [pwd, setPwd] = React.useState('');
    const [errMsg, setErrMsg] = React.useState('');
    

    React.useEffect(() => {
        userRef.current.focus();
    }, [])

    React.useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
            var querystring = require('querystring');
            const response = await axios.post(LOGIN_URL,
                querystring.stringify({
                        username: user, //gave the values directly for testing
                        password: pwd,
                }), {
                  headers: { 
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                  withCredentials: true
                });
            console.log(JSON.stringify(response.data));
            const accessToken = response.data.access_token;
            const roles = response.data.roles.replace('[','').replace(']','').replace(/\s/g,'').split(",");
            const firstname = response.data.firstname;
            const lastname = response.data.lastname;
            const appuserid = Number(response.data.appuserid);
            setAuth({ user, pwd, roles, accessToken, firstname, lastname, appuserid });
            setUser('');
            setPwd('');
            navigate("/dashboard", { replace: true });
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

    const paperStyle={padding :40,height:400,width:400, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}


    return (
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh', backgroundColor: '#081627'}}
        >
            <Grid item align='center'>
                <Paper elevation={10} style={paperStyle} >
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOpenIcon/></Avatar>
                        <h2 color="primary">Zaloguj się</h2>
                    </Grid>
                        <TextField id="username" required fullWidth label="Login"  value={user} onChange={(e) => setUser(e.target.value)} ref={userRef} sx={{marginBottom: 3}}/>
                        <TextField type='password' id="password" required fullWidth label="Hasło"  value={pwd} onChange={(e) => setPwd(e.target.value)} />
                    <FormControlLabel
                        control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                        }
                        label="Remember me"
                    />
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={handleSubmit} >Sign in</Button>
                    <Typography > Do you have an account ?
                        <Link to="/register">Sign Up</Link>
                    </Typography>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Login
