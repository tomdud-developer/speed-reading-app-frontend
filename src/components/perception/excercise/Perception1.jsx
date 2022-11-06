import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import GaugeChart from 'react-gauge-chart'
import { minHeight } from '@mui/system';
import { Button, Pagination, TextField, Typography, Alert, LinearProgress } from '@mui/material';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import TextDecreaseIcon from '@mui/icons-material/TextDecrease';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { makeStyles } from '@material-ui/core';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { axiosPrivate } from '../../../api/axios';
import useAuth from '../../../hooks/useAuth';


export default function Perception1(props) {


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: 'dark' === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
    
    const YellowPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: '#f0ca62',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    minHeight: '800px'
    }));


    const BookPaper = styled(Paper)(({ theme }) => ({
        backgroundColor: '#e3ddcc',
        ...theme.typography.book,
        padding: theme.spacing(1),
        textAlign: 'justify',
        minHeight: '800px',
        //fontSize: `${fontSize}px`,
    }));

    const [displayNumber, setDisplayNumber] =  React.useState('???');
    const [number, setNumber] =  React.useState();
    const [userNumber, setUserNumber] =  React.useState("");
    const [alertState, setAlertState] = React.useState(-1);
    const [difficulty, setDifficulty] = React.useState(1);
    const [progressGood, setProgressGood] = React.useState(0);
    const [progressBad, setProgressBad] = React.useState(0);
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
    }

    const onConfirmClick = () => {
        if(number == userNumber) {
            setAlertState(1);
            setProgressGood((old) => old + 1);
        } else {
            setAlertState(0);
            setProgressBad((old) => old + 1);
        }
    }


    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={8}>
                    <YellowPaper>
                        <BookPaper>
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
                                <Button onClick={onStartClick} color="secondary" variant='contained' sx={{width: '50%'}}>
                                    Kliknij spację, aby przejść do kolejnego
                                </Button>
                                <TextField disableAutoFocus='true' autoComplete='off' onChange={(e) => {setUserNumber(e.target.value)}} sx={{ input: { textAlign:'center', fontSize: '50px' } , padding: '20px'}} id="userNumber" label=" " variant='filled'  value={userNumber} />
                                <Button onClick={onConfirmClick} color="secondary" variant='contained' sx={{width: '50%'}}>
                                    Zatwierdź
                                </Button>
                                {alertState === 0 && <Alert severity="error">{`Błędna odpowiedź. Poprawna to ${number}`}</Alert>}
                                {alertState === 1 && <Alert severity="success">Poprawna odpowiedź</Alert>}
                                <Grid item>
                                </Grid>   
                                
                            </Grid> 
                        </BookPaper>
                    </YellowPaper>
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
                            <LinearProgress variant="buffer" value={(progressGood + progressBad) / 40 * 100} valueBuffer={ (progressGood + progressBad + 1) / 40 * 100} />
                            </Box>
                            <Typography variant='h6'>{`${progressGood+progressBad}/40`}</Typography>
                        </Stack>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <Typography variant='h4'>Poprawne: </Typography>
                            <Typography variant='h5'>{`${progressGood}/40`}</Typography>
                        </Stack>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <Typography variant='h4'>Błędne: </Typography>
                            <Typography variant='h5'>{`${progressBad}/40`}</Typography>
                        </Stack>
                    </Item>
                </Grid>
            </Grid>

        </>
        
    )
}