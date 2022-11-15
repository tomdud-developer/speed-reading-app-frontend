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
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { axiosPrivate } from '../../api/axios';
import useAuth from '../../hooks/useAuth';

import Tween from 'rc-tween-one';
import TweenOne from 'rc-tween-one';
import PathPlugin from 'rc-tween-one/lib/plugin/PathPlugin';
TweenOne.plugins.push(PathPlugin);

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



export default function PointerBasic() {
    
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
    const [path, setPath] = React.useState(`M 0 0`);
    const handleClose = () => {setOpenDialog(false)};
    const [paused, setPaused] = React.useState(true);

    React.useEffect(() => {
        axiosPrivate.get(`api/v1/pdfuser/get-text/${auth.appuserid}&2000`)
        .then(
            (result) => {
                setSampleText(result.data);
                setTotalWords(result.data.split(" ").length)
            }
            );
        }, []);
    

    React.useEffect(() => setText(getText(page), [page]));

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
        )
    }

    let BookPaper = styled(Paper)(({ theme }) => ({
        backgroundColor: '#e3ddcc',
        ...theme.typography.book,
        padding: theme.spacing(1),
        textAlign: 'justify',
        //minHeight: '800px',
        //maxHeight: '800px',
        fontSize: `${fontSize}px`,
    }));

    const ref = React.useRef(null);

    const [width, setWidth] = React.useState(0);
    const [height, setHeight] = React.useState(0);

    React.useLayoutEffect(() => {
        setWidth(ref.current.offsetWidth);
        setHeight(ref.current.offsetHeight);
        let p = 'M 0 35, ';
        for(let i = 0; i <= ref.current.offsetHeight/fontSize; i++) {
            p = p + `L ${ref.current.offsetWidth} ${2*i*fontSize}, `;
            p = p + `L 0 ${2*(i+1)*fontSize}, `;
        }
        setPath(p);
    }, [ref.current]);

    /*
    document.addEventListener('keydown', function(event){
		console.log(`Key: ${event.key} with keycode ${event.keyCode} has been pressed`);
        console.log(event)
        if(event.key == 'w')
            setPaused(false);
        if(event.key == 's')
            setPaused(true);
    }
    )*/

    return (
        <>
            <div style={{ position: 'relative' }}>
                <Tween
                    animation={{ duration: 5000 * 800/fontSize, path: path, repeat: -1, ease: 'linear' }}
                    style={{
                        opacity: 0.5,
                        position: 'absolute',
                        width: '20px',
                        height: '20px',
                        left: '-10px',
                        top: '-10px',
                        background: '#AAA',
                    }}
                    paused={paused}
                />
            </div>
            <Grid container spacing={2}>
                <Grid xs={8}>
                    <YellowPaper>
                        <BookPaper ref={ref}>
                            <div id="#text-content">
                                {text}
                            </div>
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
                  
                        <Stack spacing={2} direction="column" sx={{ mb: 1 }} alignItems="center">
                            <Button variant="contained" onClick={() =>{setOpenDialog(true)}}>Zatrzymaj i oblicz wynik</Button>
                            <h2>Width: {width}</h2>
                            <h2>Height: {height}</h2>
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

