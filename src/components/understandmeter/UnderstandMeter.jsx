import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import GaugeChart from 'react-gauge-chart'
import { minHeight } from '@mui/system';
import { Button, Pagination, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import TextDecreaseIcon from '@mui/icons-material/TextDecrease';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { makeStyles } from '@material-ui/core';
import Stopwatch from '../speedmeter/Stopwatch.jsx';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { axiosPrivate } from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import useCourse from "../../hooks/useCourse";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import {Quiz} from "./Quiz";

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

const useStyles = makeStyles(() => ({
    ul: {
      "& .MuiPaginationItem-root": {
        color: "#fff"
      }
    }
  }));



export default function UnderstandMeter() {
    
    const getText = (page) => {
        let splited = sampletext.split(" ");
        return splited.slice((page - 1) * wordsPerPage, (page) * wordsPerPage).join(" ");
    }

    const classes = useStyles();
    const [sampletext, setSampleText] = React.useState("Ładuję... ... ...");
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(3);
    const [totalWords, setTotalWords] = React.useState(0);
    const [fontSize, setFontSize] = React.useState(18);
    const [wordsPerPage, setWordsPerPage] = React.useState(555);
    const [text, setText] = React.useState(getText(1));
    const [time, setTime] = React.useState(0);
    const [openDialog, setOpenDialog] = React.useState(false);
    const { auth } = useAuth();
    const { course } = useCourse();
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState("error");
    const [alertMessage, setAlertMessage] = React.useState("Loading");
    const [running, setRunning] = React.useState(false);
    const [mode, setMode] = React.useState("Czytanie");
    const handleClose = () => {setOpenDialog(false)};


    React.useEffect(() => {
        axiosPrivate.get(`api/v1/understanding-meter/text/1`)
        .then(
            (result) => {
                setSampleText(result.data);
                setTotalWords(result.data.split(" ").length)
            }
            );
        }, []);
    

    React.useEffect(() => setText(getText(page), [getText, page]));

    const changeWordsPerPage = (event, newValue) => {
        setWordsPerPage(newValue);
        setTotalPages(Math.ceil(totalWords / newValue));
        setText(getText(page));
    }

    const postResult = async () => {
        await axiosPrivate.post("api/v1/speed-meter-log/save",
            {
                appUser: {
                    id: auth.appuserid
                },
                wordsperminute: Math.ceil(totalWords / (time / 1000 / 60)),
                date: new Date().toISOString()
            }
        ).then( () => {
                setAlertMessage("Zapisano w bazie!");
                setSeverity("success");
                if (course.exercises.speedmeter.confirmExerciseActive) {
                    axiosPrivate.post(`api/v1/user-progress/confirm-exercise/${auth.appuserid}&${course.exercises.speedmeter.indexInSession}`).then(() => {
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

    let BookPaper = styled(Paper)(({ theme }) => ({
        backgroundColor: '#e3ddcc',
        ...theme.typography.book,
        padding: theme.spacing(1),
        textAlign: 'justify',
        minHeight: '800px',
        fontSize: `${fontSize}px`,
    }));


    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={8}>
                    <YellowPaper>
                        <BookPaper>
                            {mode==="Czytanie"?<>{text}</>:<Quiz wordsperminute={Math.ceil(totalWords / (time / 1000 / 60))} />}
                        </BookPaper>
                    </YellowPaper>
                    <Stack spacing={2} direction="column" sx={{ mb: 1 }} alignItems="center">
                        <Pagination count={totalPages} color="secondary" classes={{ ul: classes.ul }} page={page}  size='large' onChange={(event, newValue) => {setPage(newValue);}} />
                    </Stack>
                </Grid>
                <Grid xs={4}>
                    <Item>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <TextDecreaseIcon color="secondary"/>
                            <Slider color="secondary" valueLabelDisplay="on" value={fontSize} onChange={(event, newValue) => {setFontSize(newValue)}} />
                            <TextIncreaseIcon color="secondary"/>
                        </Stack>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <FirstPageIcon color="secondary"/>
                            <Slider color="secondary" valueLabelDisplay="on" value={wordsPerPage} max={1000} onChange={changeWordsPerPage} />
                            <LastPageIcon color="secondary"/>
                        </Stack>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <FormatListNumberedIcon color="secondary" /> <Typography>Tekst zawiera <b>{totalWords}</b> słów</Typography>
                        </Stack>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <WysiwygIcon color="secondary" /><Typography>Tryb: <b>{mode}</b></Typography>
                        </Stack>
                        <Stopwatch setTimeFromParent={setTime} setRunning={setRunning} running={running} />
                        <Stack spacing={2} direction="column" sx={{ mb: 1 }} alignItems="center">
                            <Button variant="contained" onClick={() =>{setOpenDialog(true); setRunning(false);}}>Zatrzymaj i przejdź do trybu odpowiedzi</Button>
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
                        Twój wynik to {Math.ceil(totalWords / (time / 1000 / 60))} słów na minutę.
                        Czy chcesz przejść do trybu odpowiedzi?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color="success" onClick={() => {setMode("Odpowiadanie"); handleClose();}} >Przejdź</Button>
                    <Button variant='contained' color="error" onClick={handleClose} >Zamknij</Button>
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

