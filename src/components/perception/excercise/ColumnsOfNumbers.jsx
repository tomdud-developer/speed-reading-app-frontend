import * as React from 'react';
import { styled, keyframes } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import {Button, Pagination, Typography, Slider, Alert} from '@mui/material';
import Stack from '@mui/material/Stack';

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
import StopCircleIcon from '@mui/icons-material/StopCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import TuneIcon from '@mui/icons-material/Tune';
import TableRowsIcon from '@mui/icons-material/TableRows';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import useCourse from "../../../hooks/useCourse";
import Snackbar from "@mui/material/Snackbar";

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
    minHeight: '600px',
    width: '1000px',
    maxWidth: '1000px',
}));

const useStyles = makeStyles(() => ({
    ul: {
        "& .MuiPaginationItem-root": {
            color: "#fff"
        }
    }
}));

const DataBoxContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: '0'
}));

const SteeringButton = styled(Button)`
        padding: 5px;
        margin-left: 20px;
        margin-right: 20px;
        min-width: 100px;
        font-size: 25px;
        text-align: center;
`


export default function ColumnsOfNumbers(props) {

    const { auth } = useAuth();
    const { course } = useCourse();
    const [hardLevel, setHardLevel] = React.useState(course.exercises.perceptionexercise2.param1);
    const [time, setTime] = React.useState(0);
    const [running, setRunning] = React.useState(false);
    const [content, setContent] = React.useState();
    const elementWidth = 50;
    const elementHeight = 25;
    const max = 8;
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [numbersArray, setNumbersArray] = React.useState(new Array(25).fill(0).map(() => new Array(max).fill(0)));
    const [correctNumbersArray, setCorrectNumbersArray] = React.useState(new Array(max).fill(0).map(() => new Array(4).fill(0)));
    const [refresh, setRefresh] = React.useState(false);
    const [reset, setReset] = React.useState(false);
    const [points, setPoints] = React.useState(0);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("Loading");
    const [severity, setSeverity] = React.useState("error");

    const handleClose = () => {
        setOpenDialog(false);
        setAlertMessage("Loading");
    };

    function constructJson(jsonKey, jsonValue){
        let jsonObj = {"key1": jsonValue};
        jsonObj[jsonKey] = jsonValue;
        return jsonObj;
    }

    const postResult = async () => {
        let jsonObj = constructJson(`log${hardLevel}`, Math.ceil(time));
        await axiosPrivate.put(`/api/v1/column-numbers-logs/save/${auth.appuserid}`, jsonObj)
            .then( () => {
                    setAlertMessage("Zapisano w bazie!");
                    setSeverity("success");
                    if (course.exercises.perceptionexercise2.confirmExerciseActive) {
                        axiosPrivate.post(`api/v1/user-progress/confirm-exercise/${auth.appuserid}&${course.exercises.perceptionexercise2.indexInSession}`).then(() => {
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

    const CommonArrayElement = styled(Box)`
      max-width: ${elementWidth + (hardLevel<4?0:(hardLevel - 3) * 10)}px;
      max-height: ${elementHeight}px;
      min-width: ${elementWidth + (hardLevel<4?0:(hardLevel - 3) * 10)}px;
      min-height: ${elementHeight}px;
      border: #888888;
      border-style: ridge;
      border-width: 1px;
      font-size: 15px;
      color: white;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #3CA55C;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to right, #B5AC49, #3CA55C);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to right, #B5AC49, #3CA55C); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    `

    const CommonArrayElementToggle = styled(CommonArrayElement)`
      background: #BBD2C5;
      background: -webkit-linear-gradient(to right, #292E49, #536976, #BBD2C5);
      background: linear-gradient(to right, #292E49, #536976, #BBD2C5); 
    `


    React.useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1000);
            }, 1000);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);

    React.useEffect(() => {
            setReset(old => !old);
        }, []
    )

    React.useEffect(() => {
            createRandomArray(25, max);
            setRunning(false);
            setTime(0);
            setPoints(0);
            setTime(0);
        }, [reset, hardLevel]
    )

    React.useEffect(() => {
        const tab = [];
        for(let c = 0; c < max; c++)
            tab.push(
                <Grid item sx={{marginRight: "15px", marginLeft: "15px"}}>
                    {createColumn(c)}
                </Grid>
            )
        setContent(tab);
    }, [numbersArray, correctNumbersArray, refresh])

    React.useEffect(() => {
        if(points === max)
            setOpenDialog(true);
    }, [points])

    const createRandomArray = (rows, cols) => {
        const array = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
        const correctNumbersArray = new Array(cols).fill(0).map(() => new Array(4).fill(0));
        for(let c = 0; c < cols; c++) {
            const correctNumber = Math.floor(Math.pow(10, hardLevel - 1) + Math.random() * Math.pow(10, hardLevel -1 ) * 9);
            const randomPositionOfCorrectNumber = Math.floor(1 + Math.random() * (rows - 1));
            array[0][c] = correctNumber;
            correctNumbersArray[c][0] = c
            correctNumbersArray[c][1] = correctNumber;
            correctNumbersArray[c][2] = randomPositionOfCorrectNumber;
            correctNumbersArray[c][3] = 0;
            for (let r = 1; r < rows; r++) {
                if(r == randomPositionOfCorrectNumber)
                    array[r][c] = correctNumber;
                else
                    array[r][c] = Math.floor(Math.pow(10, hardLevel - 1) + Math.random() * Math.pow(10, hardLevel -1 ) * 9);
            }
        }
        setNumbersArray(array);
        setCorrectNumbersArray(correctNumbersArray);
    }


    const createColumn = (n) => {
        console.log(numbersArray)
        console.log(correctNumbersArray)
        let rows = [];
        rows.push(
            <CommonArrayElementToggle
                id={`ToggleArrayElement-${n}-${0}`}
            >
                {numbersArray[0][n]}
            </CommonArrayElementToggle>
        )
        for(let r = 1; r <= 24; r++) {
            if(correctNumbersArray[n][2] == r && correctNumbersArray[n][3] == 1)
                rows.push(
                    <CommonArrayElementToggle
                        id={`ToggleArrayElement-${n}-${r}`}
                    >
                        {numbersArray[r][n]}
                    </CommonArrayElementToggle>
                )
            else
                rows.push(
                    <CommonArrayElement
                        id={`CommonArrayElement-${n}-${r}`}
                        onClick={(event) => clickCommonArrayElement(event, n, r, numbersArray[r][n], numbersArray[0][n])}
                    >
                        {numbersArray[r][n]}
                    </CommonArrayElement>
                )
        }
        return rows;
    }

    const clickCommonArrayElement = (event, col, row, number, correctNumber) => {
        console.log("Column", number, "Row", correctNumber);
        if(number === correctNumber) {
            correctNumbersArray[col][3] = 1;
            setRefresh(old => !old);
            setPoints(old => old + 1);
        }
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={8}>
                    <Paper
                        sx={{
                            backgroundColor: '#f0ca62',
                            padding: '10px',
                            textAlign: 'center',
                            minHeight: '600px',
                            width: '1000px',
                            maxWidth: '1000px',
                        }}
                    >
                        <Paper
                            sx ={{
                                backgroundColor: '#e3ddcc',
                                padding: "10px",
                                minHeight: '600px',
                                margin: 'auto',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Grid
                                //md={20}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {content}
                            </Grid>
                        </Paper>
                    </Paper>
                </Grid>
                <Grid xs={4}>
                    <Paper
                        sx={{
                            backgroundColor: 'dark' === 'dark' ? '#1A2027' : '#fff',
                            padding: "10px",
                            textAlign: 'center',
                        }}
                    >
                        <Box sx={{marginBottom: '40px',display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
                            <TuneIcon color="secondary" sx={{fontSize: "40px", marginRight: '20px'}}/>
                            <Typography variant='h3'>Panel sterujący</Typography>
                        </Box>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <Typography>Poziom trudności</Typography>
                            <ViewWeekIcon color="secondary"/>
                            <Slider
                                color="secondary"
                                valueLabelDisplay="on"
                                value={hardLevel}
                                onChange={(event, newValue) => {setHardLevel(newValue)}}
                                max={6}
                                min={2}
                            />
                            <ViewWeekIcon color="secondary"/>
                        </Stack>
                        <Typography>Aktualny status: <b>{running?"Uruchomiony":"Zatrzymany"}</b></Typography>
                        <Typography>Czas: <b>{Math.floor(time/1000)}</b>s</Typography>
                        <Typography>Liczba punktów: <b>{points}</b>/8</Typography>
                        <SteeringButton
                            color="success"
                            variant="contained"
                            onClick={() => {setRunning(prevState => !prevState);} }
                        >
                            {running ? <StopCircleIcon/> : <PlayCircleFilledWhiteIcon />}
                            {running ? `Pause` : `Run`}
                        </SteeringButton>
                        <SteeringButton
                            color="warning"
                            variant="contained"
                            onClick={() => {
                                setReset(old => !old);
                            }}
                        >
                            <RestartAltIcon/>
                            Reset
                        </SteeringButton>
                    </Paper>
                </Grid>
            </Grid>


            <Dialog open={openDialog} onClose={handleClose} >
                <Paper sx={{bgcolor: "primary.main"}}>
                    <DialogTitle>
                        {"Gratulacje"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText color="typography.book.color">
                            Twój wynik to {Math.ceil(time)} sekund.
                            Wynik uzyskano dla poziomu {hardLevel}.
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

