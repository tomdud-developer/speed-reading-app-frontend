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
import SpeedIcon from '@mui/icons-material/Speed';
import Tween from 'rc-tween-one';
import TweenOne from 'rc-tween-one';
import PathPlugin from 'rc-tween-one/lib/plugin/PathPlugin';
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import useCourse from "../../hooks/useCourse";
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

const SteeringButton = styled(Button)`
        padding: 5px;
        margin-left: 20px;
        margin-right: 20px;
        min-width: 100px;
    `



export default function PointerBasic() {

    const { course } = useCourse();
    const [fontSize, setFontSize] = React.useState(20);
    const [text, setText] = React.useState("Ładuję tekst ... ");
    const [speed, setSpeed] = React.useState(course.exercises.pointerbasic.param1);
    const [time, setTime] = React.useState(0);
    const { auth } = useAuth();
    const [path, setPath] = React.useState(`M 0 35 L 1000 35`);
    const [running, setRunning] = React.useState(false);
    const paused = React.useRef(true);
    const [tweenToogle, setTweenToogle] = React.useState(true);

    React.useEffect(() => {
        axiosPrivate.get(`api/v1/pdfuser/get-text/${auth.appuserid}&500`)
            .then(
                (result) => {
                    setText(result.data.replace("/ {2,}/",""));
                }
            );
    }, []);




    let BookPaper = styled(Paper)(({ theme }) => ({
        backgroundColor: '#e3ddcc',
        ...theme.typography.book,
        padding: theme.spacing(1),
        textAlign: 'justify',
        minHeight: '800px',
        maxHeight: '800px',
        fontSize: `${fontSize}px`,
        lineHeight: 1.5,
    }));

    const ref = React.useRef(null);
    const pointerRef = React.useRef(null);

    const [width, setWidth] = React.useState(0);
    const [height, setHeight] = React.useState(0);

    React.useEffect(() => {
        let p = 'M 0 35 ';
        for(let i = 0; i <= 800/fontSize/1.5; i++) {
            p = p + `L ${1045} ${1.5*i*fontSize + 35} `;
            p = p + `L 0 ${1.5*(i+1)*fontSize + 35} `;
        }
        setPath(p);
        console.log(p);
    }, []);

    React.useEffect(() => {
        setRunning(false);
        resetToInitial();
    }, [speed]);


    const resetToInitial = () => {

        pointerRef.current.currentRef.style.transform = "translate(0px, 0px)"
        //pointerRef.current.currentRef.style.left = '-10px';
        //pointerRef.current.currentRef.style.top = '-10px';
        let p = 'M 0 35 ';
        for(let i = 0; i <= 800/fontSize/1.5; i++) {
            p = p + `L ${1045} ${1.5*i*fontSize + 35} `;
            p = p + `L 0 ${1.5*(i+1)*fontSize + 35} `;
        }
        let s = "";
        for(let i = 0; i < Math.floor(Math.random() * 100); i++) {
            s = s + " ";
        }
        p = p + s;
        setPath(p);

    }


    return (
        <>
            <div style={{ position: 'absolute' }}>
                {tweenToogle && <Tween ref={pointerRef}
                    animation={{ duration: 500000 * 8/speed , path: path, repeat: 0, ease: 'linear' }}
                    style={{
                        opacity: 0.5,
                        position: 'absolute',
                        width: '20px',
                        height: '20px',
                        left: '-10px',
                        top: '-10px',
                        borderRadius: '50%',
                        backgroundColor: 'rgb(234,119,131)',
                        boxShadow: 'inset -5px -5px 20px rgba(0,0,0,.3)',
                    }}
                    id="pointer"
                    paused={!running}
                />}
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
                </Grid>
                <Grid xs={4}>
                    <Item>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <SpeedIcon color="secondary"/>
                            <Slider color="secondary" valueLabelDisplay="on" value={speed} onChange={(event, newValue) => {setSpeed(newValue)}} />
                            <SpeedIcon color="secondary"/>
                        </Stack>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <FormatListNumberedIcon color="secondary" /> <Typography>Tekst zawiera <b>{text.split(" ").length}</b> słów</Typography>
                        </Stack>
                        <Typography>Aktualny status: <b>{running?"Uruchomiony":"Zatrzymany"}</b></Typography>
                        <SteeringButton color="secondary" variant="contained" onClick={() => setRunning(true)} margin={10}>
                            <PlayArrowIcon/>
                            Start
                        </SteeringButton>
                        <SteeringButton color="error"  variant="contained" onClick={() => setRunning(false)}>
                            <StopCircleIcon/>
                            Stop
                        </SteeringButton>
                        <SteeringButton
                            color="warning"
                            variant="contained"
                            onClick={() => {setRunning(false); resetToInitial();}}
                        >
                            <RestartAltIcon/>
                            Reset
                        </SteeringButton>
                    </Item>
                </Grid>
            </Grid>

        </>
    )


}

