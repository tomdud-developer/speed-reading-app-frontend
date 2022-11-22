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
import TableRowsIcon from '@mui/icons-material/TableRows';

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




export default function SchultzArray(props) {

    const classes = useStyles();
    const { auth } = useAuth();

    const [columns, setColumns] = React.useState(5);
    const [rows, setRows] = React.useState(5);
    const [time, setTime] = React.useState(0);
    const [running, setRunning] = React.useState(false);
    const [delay, setDelay] = React.useState(1000);
    const [array, setArray] = React.useState();
    const [content, setContent] = React.useState();
    const schultzElementWidth = 90;
    const [nextNumber, setNextNumber] = React.useState(1);
    const [schultzArray, setSchultzArray] = React.useState([]);

    let BookPaper = styled(Paper)(({ theme }) => ({
        backgroundColor: '#e3ddcc',
        ...theme.typography.book,
        padding: theme.spacing(1),
        minHeight: '600px',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }));



    const SteeringButton = styled(Button)`
        padding: 5px;
        margin-left: 20px;
        margin-right: 20px;
        min-width: 100px;
        font-size: 25px;
        text-align: center;
    `

    const SchultzArrayElement = styled(Box)`
      max-width: ${schultzElementWidth}px;
      max-height: ${schultzElementWidth}px;
      min-width: ${schultzElementWidth}px;
      min-height: ${schultzElementWidth}px;
      font-size: 40px;
      color: white;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #3CA55C;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to right, #B5AC49, #3CA55C);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to right, #B5AC49, #3CA55C); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    `

    const SchultzArrayElementToggle = styled(SchultzArrayElement)`
      background: #BBD2C5;
      background: -webkit-linear-gradient(to right, #292E49, #536976, #BBD2C5);
      background: linear-gradient(to right, #292E49, #536976, #BBD2C5); 
    `


    React.useEffect(() => {
        if(running) {

        } else {

        }
    }, [running]);

    React.useEffect(() => {
        let randomSchultzArray = [];
        for(let i = 1; i <= columns * rows; i++)
            randomSchultzArray.push(i);
        randomSchultzArray = shuffleAlhorithm(randomSchultzArray);
        setSchultzArray(randomSchultzArray);
        setNextNumber(1);
    }, [rows, columns])

    React.useEffect(() => {
        createSchultzArray();
    }, [nextNumber, rows, columns])


    const SchultzArrayElementClick = (event) => {
        const number = Number(event.target.getAttribute("id").replace( /^\D+/g, ''));
        console.log(nextNumber, number)
        if(number === nextNumber) {
            console.log(event.target)
            //event.target.style.cssText = '';
            setNextNumber(prev => prev +1);
        }
    }


    function shuffleAlhorithm(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    const createSchultzArray = () => {
        const table = schultzArray.map(number => {
            return(
                <Grid
                    md={1}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {
                        number < nextNumber ?
                            <SchultzArrayElementToggle
                                    id={`SchultzArrayElement-${number}`}
                                onClick={SchultzArrayElementClick}
                            >
                                {number}
                            </SchultzArrayElementToggle>
                            :
                            <SchultzArrayElement
                                id={`SchultzArrayElement-${number}`}
                                onClick={SchultzArrayElementClick}
                            >
                                {number}
                            </SchultzArrayElement>
                    }
                </Grid>
            )
        })
        const cont = (
            <Grid
                container
                spacing={0}
                columns={{ md: columns }}
                sx={{
                    padding: '0px',
                    width: `${columns * schultzElementWidth + (columns - 1) * 10}px`,
                    height: `${rows * schultzElementWidth + (rows - 1) * 10}px`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {table}
            </Grid>
        )
        setContent(cont);
    }


    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={8}>
                    <YellowPaper>
                        <BookPaper>
                            {content}
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
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <Typography>Liczba wierszy</Typography>
                            <TableRowsIcon color="secondary"/>
                            <Slider
                                color="secondary"
                                valueLabelDisplay="on"
                                value={rows}
                                onChange={(event, newValue) => {setRows(newValue)}}
                                max={6}
                                min={2}
                            />
                            <TableRowsIcon color="secondary"/>
                        </Stack>
                        <Typography>Aktualny status: <b>{running?"Uruchomiony":"Zatrzymany"}</b></Typography>
                        <Typography>Kolejna liczba: <b>{nextNumber}</b></Typography>
                        <SteeringButton
                            color="success"
                            variant="contained"
                            onClick={() => {setRunning(false);} }
                        >
                            <StopCircleIcon/>
                            Pause
                        </SteeringButton>
                        <SteeringButton
                            color="warning"
                            variant="contained"
                            onClick={() => {setRunning(false);}}
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

