import * as React from 'react';
import { styled, keyframes } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import GaugeChart from 'react-gauge-chart'
import { minHeight } from '@mui/system';
import { Button, Pagination, Typography, Slider } from '@mui/material';
import Stack from '@mui/material/Stack';

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
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import TuneIcon from '@mui/icons-material/Tune';

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
minHeight: '800px',
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

const StyledOuterBox = styled(Box)`
  border-radius: 20px;
  position: absolute;
`;

const StyledInnerBox = styled(Box)`
  border-radius: 10px;
  position: relative;
  bottom: 50px;
`;

const StyledData = styled(Typography)`
  color: black;
  align-self: flex-start;
  position: absolute;
  bottom: 30px;
  margin-inline-start: 20px;
`;



export default function FonetizationRemover(props) {
    

    const classes = useStyles();
    const [page, setPage] = React.useState(1);
    const [fontSize, setFontSize] = React.useState(20);
    const [text, setText] = React.useState("Ładuję...");
    const { auth } = useAuth();
    const [content, setContent] = React.useState(<></>);
    const [columns, setColumns] = React.useState(5);
    const [rows, setRows] = React.useState(25);
    const currColumn = React.useRef(0);
    const currRow = React.useRef(0);
    const [time, setTime] = React.useState(0);
    const [running, setRunning] = React.useState(false);
    const [delay, setDelay] = React.useState(1000);

    React.useEffect(() => {
      let interval;
      if (running) {
        interval = setInterval(() => {
            if(currColumn.current < columns - 1)
                currColumn.current = currColumn.current + 1;
            else {
                currRow.current = currRow.current + 1;
                currColumn.current = 0;
            }
            if(currRow.current > rows) {
                currRow.current = 0;
                currColumn.current = 0;
                setRunning(false);
            }
            createContent();
        }, delay);
      } else if (!running) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [running, delay]);

    React.useEffect(() => {
        axiosPrivate.get(`api/v1/pdfuser/get-text/${auth.appuserid}&500`)
        .then(
            (result) => {
                setText(result.data.replace("/ {2,}/",""));
                createContent();
            }
        );
        }, []);


    let BookPaper = styled(Paper)(({ theme }) => ({
        backgroundColor: '#e3ddcc',
        ...theme.typography.book,
        padding: theme.spacing(1),
        textAlign: 'left',
        minHeight: '800px',
        fontSize: `${fontSize}px`,
    }));

    const TransparentText = styled(Box)`
        opacity: 0;
    `

    const gradient = keyframes`
        0% {opacity: 0.3;}
        50% {opacity: 0.2;}
        100% {opacity: 0.05;}
    `;

    const GradientBox = styled(Box)`
        background-image: radial-gradient(red 2%, yellow 15%, green 60%);
        background-size: 100% 100%;
        animation-name: ${gradient};
        animation-duration: 0.8s;
        animation-iteration-count: infinite;
        opacity: 0.4;
        border-radius: 5;
    `;

    const SteeringButton = styled(Button)`
        padding: 5px;
        margin-left: 20px;
        margin-right: 20px;
        min-width: 100px;
    `
    
    


    //background-image: linear-gradient(to right, #439bfd, #73b3fb);
    //opacity: 0.2;
    const createColumns = (currColumn, currRow, r) => {
        let t = [];
        for(let c = 0; c < columns; c++) {
            if(currColumn == c && currRow == r) 
                t.push(
                    <Grid md={1}>  
                        <GradientBox>
                            <TransparentText>{'.'}</TransparentText>
                        </GradientBox>
                    </Grid>
                )
            else
                t.push(
                    <Grid md={1}>  
                        <Box>
                            <TransparentText>{'.'}</TransparentText>
                        </Box>
                    </Grid>
                )
        }
        return t;
    }

    const createContent = () => {
        console.log(`Create Content currRow ${currRow.current}  currColumn ${currColumn.current}`)
        const table = [];
            for(let r = 0; r < rows; r++) {
                table.push(
                    <Grid container spacing={0} columns={{ md: columns }} sx={{padding: '0px'}}>
                        {
                            createColumns(currColumn.current, currRow.current, r)
                        }
                    </Grid>
                )
            }  
        setContent(table);
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={8}>
                    <YellowPaper>
                        <BookPaper>
                            <DataBoxContainer>
                                <Box 
                                    sx={{ 
                                        position: 'absolute',
                                        top: 0,
                                    }}
                                    
                                >   
                                {text}
                                </Box>
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        position: 'absolute',
                                        margin: 0,
                                        top: 0,
                                        left: 0,
                                        zIndex: 15,

                                    }}
                                >
                                    {content}
                                </Box>    
                            </DataBoxContainer>   
                        </BookPaper>
                    </YellowPaper>
                </Grid>
                <Grid xs={4}>
                    <Item>
                        <Box sx={{marginBottom: '40px',display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
                                <TuneIcon color="secondary" sx={{fontSize: "40px", marginRight: '20px'}}/>
                                <Typography variant='h3'>Panel sterujący</Typography>
                        </Box>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <Typography>Opóźnienie przełączania</Typography>
                            <FastForwardIcon color="secondary"/>
                            <Slider
                                color="secondary"
                                valueLabelDisplay="on" 
                                value={delay} 
                                onChange={(event, newValue) => {setDelay(newValue)}} 
                                max={2000}
                                min={200}
                            />
                            <FastRewindIcon color="secondary"/>
                        </Stack>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <Typography>Liczba kolumn</Typography>
                            <ViewWeekIcon color="secondary"/>
                            <Slider
                                color="secondary"
                                valueLabelDisplay="on" 
                                value={columns}
                                onChange={(event, newValue) => {setColumns(newValue)}} 
                                max={6}
                                min={2}
                            />
                            <ViewWeekIcon color="secondary"/>
                        </Stack>
                        <Typography>Aktualny status: <b>{running?"Uruchomiony":"Zatrzymany"}</b></Typography>
                        <Typography>Aktualna kolumna: <b>{currColumn.current + 1}</b></Typography>
                        <Typography>Aktualny wiersz: <b>{currRow.current + 1}</b></Typography>
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
                        onClick={() => {currRow.current = 0; currColumn.current = 0; setRunning(false); createContent();}}
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

