import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import GaugeChart from 'react-gauge-chart'
import { minHeight } from '@mui/system';
import sampletext from "./sampleText.js"
import { Button, Pagination, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import TextDecreaseIcon from '@mui/icons-material/TextDecrease';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { makeStyles } from '@material-ui/core';
import Stopwatch from './Stopwatch.jsx';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { axiosPrivate } from '../../api/axios';
import useAuth from '../../hooks/useAuth';


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



export default function Speedmeter() {
    
    const getText = (page) => {
        let splited = sampletext.text.split(" ");
        return splited.slice((page - 1) * wordsPerPage, (page) * wordsPerPage).join(" ");
    }

    const classes = useStyles();
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(3);
    const [fontSize, setFontSize] = React.useState(18);
    const [wordsPerPage, setWordsPerPage] = React.useState(555);
    const [text, setText] = React.useState(getText(1));
    const [time, setTime] = React.useState(0);
    const [openDialog, setOpenDialog] = React.useState(false);
    const { auth } = useAuth();
    
    const handleClose = () => {setOpenDialog(false)};

    React.useEffect(() => setText(getText(page), [page]));

    const changeWordsPerPage = (event, newValue) => {
        setWordsPerPage(newValue);
        setTotalPages(Math.ceil(sampletext.text.split(" ").length / newValue));
        setText(getText(page));
    }

    const postResult = async () => {
        await axiosPrivate.post("api/v1/speed-meter-log/save",
            {
                appUser: {
                    id: auth.appuserid
                },
                wordsperminute: Math.ceil(sampletext.text.length / (time / 1000 / 60)),
                date: new Date().toISOString()
            }
        )
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
                        {text}
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
                            <FormatListNumberedIcon color="secondary" /> <Typography>Tekst zawiera <b>{sampletext.text.length}</b> słów</Typography>
                        </Stack>
                        <Stopwatch setTimeFromParent={setTime} />
                        <Stack spacing={2} direction="column" sx={{ mb: 1 }} alignItems="center">
                            <Button variant="contained" onClick={() =>{setOpenDialog(true)}}>Zatrzymaj i oblicz wynik</Button>
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
                        Twój wynik to {Math.ceil(sampletext.text.length / (time / 1000 / 60))} słów na minutę.
                        Czy chcesz zapisać tą wartość?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color="success" onClick={() => {postResult(); handleClose();}} >Zapisz</Button>
                    <Button variant='contained' color="error" onClick={handleClose} >Odrzuć</Button>
                </DialogActions>
                </Paper>
            </Dialog>
        </>
    )


}

