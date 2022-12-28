import {Typography} from "@mui/material";
import {Box} from "@material-ui/core";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {SessionList} from "./SessionList";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

export const Progress = () => {
    return (
        <Box
            sx={{
                minHeight: '500px',
                maxHeight: '1000px',
            }}
        >
            <Typography fontSize={30}>{`Plan treningowy`}</Typography>
            <Grid container spacing={{ md: 3 }} columns={{ md: 2 }}>
                <Grid md={1} key={1}>
                    <Item>
                        <Typography fontSize={20}>{`Sesja numer 1`}</Typography>
                        <SessionList />
                    </Item>
                </Grid>
                <Grid md={1} key={2}>
                    <Typography fontSize={20}>{`Twój postęp`}</Typography>
                    <EmojiEventsIcon sx={{fontSize: "200px"}} color="four" />
                    <Box sx={{ flexGrow: 1 }}>
                        <BorderLinearProgress variant="determinate" value={50} />
                    </Box>
                </Grid>
            </Grid>


        </Box>
    )
}