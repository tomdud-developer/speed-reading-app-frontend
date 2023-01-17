import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Pagination, TextField, Typography, Alert, LinearProgress } from '@mui/material';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useAuth from '../../../hooks/useAuth';
import useCourse from "../../../hooks/useCourse";
import Snackbar from "@mui/material/Snackbar";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";


export default function Perception1(props) {


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: 'dark' === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const { course } = useCourse();
    const [displayNumber, setDisplayNumber] =  React.useState('???');
    const [number, setNumber] =  React.useState();
    const [max, setMax] = React.useState(3);
    const [userNumber, setUserNumber] =  React.useState("");
    const [alertState, setAlertState] = React.useState(-1);
    const [difficulty, setDifficulty] = React.useState(course.exercises.perceptionexercise1.param1 ? course.exercises.perceptionexercise1.param1 : 3);
    const [progressGood, setProgressGood] = React.useState(0);
    const [progressBad, setProgressBad] = React.useState(0);
    const [isOnStartButtonDisabled, setIsOnStartButtonDisabled] = React.useState(false);
    const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = React.useState(true);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("Loading");
    const [severity, setSeverity] = React.useState("error");

    const handleClose = () => {
        setOpenDialog(false);
        setProgressGood(0);
        setProgressBad(0);
        setAlertMessage("Loading");
    };

    function constructJson(jsonKey, jsonValue){
        let jsonObj = {"key1": jsonValue};
        jsonObj[jsonKey] = jsonValue;
        return jsonObj;
    }

    const postResult = async () => {
        let jsonObj = constructJson(`log${difficulty}`, Math.ceil((progressGood / max ) * 100));
        await axiosPrivate.put(`/api/v1/numbers-disappear-logs/save/${auth.appuserid}`, jsonObj)
            .then( () => {
                setAlertMessage("Zapisano w bazie!");
                setSeverity("success");
                if (course.exercises.perceptionexercise1.confirmExerciseActive) {
                    axiosPrivate.post(`api/v1/user-progress/confirm-exercise/${auth.appuserid}&${course.exercises.perceptionexercise1.indexInSession}`).then(() => {
                        setAlertMessage("Zapisano w bazie! I potwierdzono wykonanie ćwiczenia w sesji!");
                    });
                }
                setSnackOpen(true);
            }
        ).catch((error) =>  {
            setSeverity("error");
            setAlertMessage(error.message);
            setSnackOpen(true);
            console.log(error);
        });
    }

    const getRandomNumber = (difficultyLevel) => {
        let min = Math.pow(10, difficultyLevel);
        let max = Math.pow(10, difficultyLevel + 1) - 1;
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const onStartClick = async () => {
        const randomNumber = getRandomNumber(difficulty);
        setUserNumber("");
        setNumber(randomNumber);
        setAlertState(-1);
        setDisplayNumber("...");
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDisplayNumber(randomNumber);
        await new Promise(resolve => setTimeout( resolve, 500 + difficulty * 100 ));
        setDisplayNumber("???");
        setIsOnStartButtonDisabled(true);
        setIsConfirmButtonDisabled(false);
    }

    const onConfirmClick = () => {
        console.log(userNumber,"user - number", number)
        if(number === Number(userNumber)) {
            setAlertState(1);
            setProgressGood((old) => old + 1);
        } else {
            setAlertState(0);
            setProgressBad((old) => old + 1);
        }
        setIsOnStartButtonDisabled(false);
        setIsConfirmButtonDisabled(true);
    }

    React.useEffect(() => {
        if(progressGood + progressBad >= max){
            setOpenDialog(true);
        }
    }, [progressGood, progressBad]);


    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={8}>
                    <Paper
                        sx={{
                            padding: 2,
                            backgroundColor: '#f0ca62',
                            textAlign: 'center',
                            minHeight: '600px'
                        }}
                    >
                        <Paper
                            sx={{
                                padding: 10,
                                backgroundColor: '#e3ddcc',
                                textAlign: 'justify',
                                minHeight: '600px',
                            }}

                        >
                            <Grid
                                container
                                spacing={0}
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Typography variant='h3' color="secondary.text" >
                                    Liczba:
                                </Typography>
                                <Box sx={{height: '150px', width:"500px", border: '1px dashed grey', margin: '20px', textAlign: 'center', flex: 1, justifyContent: 'center', alignItems:"center"}}>
                                    <Typography variant='book' sx={{fontSize: '50px'}}>
                                        {displayNumber}
                                    </Typography>
                                </Box>
                                <Button onClick={onStartClick} color="secondary" variant='contained' sx={{width: '50%'}} disabled={isOnStartButtonDisabled}>
                                    Kliknij spację, aby przejść do kolejnego
                                </Button>
                                <TextField
                                    autoComplete='off'
                                    onChange={(e) => {setUserNumber(e.target.value)}}
                                    sx={{
                                        input: { textAlign:'center', fontSize: '50px' },
                                        padding: '20px'
                                    }}
                                    id="userNumber"
                                    label=" "
                                    variant='filled'
                                    value={userNumber}
                                />
                                <Button onClick={onConfirmClick} color="secondary" variant='contained' sx={{width: '50%', marginBottom: "10px"}} disabled={isConfirmButtonDisabled}>
                                    Zatwierdź
                                </Button>
                                {alertState === 0 && <Alert severity="error">{`Błędna odpowiedź. Poprawna to ${number}`}</Alert>}
                                {alertState === 1 && <Alert severity="success">Poprawna odpowiedź</Alert>}
                                <Grid item>
                                </Grid>   
                                
                            </Grid> 
                        </Paper>
                    </Paper>
                </Grid>
                <Grid xs={4}>
                    <Item>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <Typography variant='h4'>Poziom</Typography>
                            <FormatListNumberedIcon color="secondary"/>
                                <Slider min={0} max={10} color="secondary" valueLabelDisplay="on" value={difficulty} onChange={(event, newValue) => {setDifficulty(newValue)}} />
                            <FormatListNumberedIcon color="secondary"/>
                        </Stack>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <Typography variant='h4'>Postęp</Typography>
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress
                                    variant="buffer"
                                    value={(progressGood + progressBad) / max * 100}
                                    valueBuffer={ (progressGood + progressBad + 1) / max * 100}
                                    color="secondary"
                                />
                            </Box>
                            <Typography variant='h6'>{`${progressGood+progressBad}/${max}`}</Typography>
                        </Stack>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <Typography variant='h4'>Poprawne: </Typography>
                            <Typography variant='h5'>{`${progressGood}/${max}`}</Typography>
                        </Stack>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <Typography variant='h4'>Błędne: </Typography>
                            <Typography variant='h5'>{`${progressBad}/${max}`}</Typography>
                        </Stack>
                    </Item>
                </Grid>
            </Grid>
            <Dialog open={openDialog} onClose={handleClose} >
                <Paper sx={{bgcolor: "primary.main"}}>
                    <DialogTitle>
                        {"Gratulacje"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText color="typography.book.color">
                            Twój wynik to {Math.ceil(progressGood / max * 100)}% poprawnych odpowiedzi.
                            Wynik uzyskano dla poziomu {difficulty}.
                            Czy chcesz zapisać tą wartość?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color="success" onClick={() => {postResult(); handleClose();}} >Zapisz</Button>
                        <Button variant='contained' color="error" onClick={handleClose} >Odrzuć</Button>
                    </DialogActions>
                </Paper>
            </Dialog>
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