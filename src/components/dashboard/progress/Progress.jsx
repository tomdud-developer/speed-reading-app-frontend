import {Typography} from "@mui/material";
import {Box} from "@material-ui/core";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {SessionList} from "./SessionList";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useCourse from "../../../hooks/useCourse";
import Button from '@mui/material/Button';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {getDefaultExercisesParameters} from "../../../context/getDefaultExercisesParameters";
import {mapNameToShortName} from "./mapNameToLink";

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


    const { auth } = useAuth();
    const { course, setCourse } = useCourse();
    const axiosPrivate = useAxiosPrivate();
    const [data, setData] = React.useState({});
    const [canRun, setCanRun] = React.useState(false);
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState("error");
    const [alertMessage, setAlertMessage] = React.useState("Loading");

    const fetchData = () => {
        axiosPrivate.get(`/api/v1/user-progress/get/${auth.appuserid}`).then(
            (result1) => {
                axiosPrivate.get(`/api/v1/session/get-session/${result1.data.currentSessionNumber}`).then(
                    (result2) => {
                        let jsonExercises = {};
                        result2.data.session.forEach(function(column)
                        {
                            let columnName = mapNameToShortName(column.name);
                            jsonExercises[columnName] = {
                                confirmExerciseActive: false,
                                indexInSession: column.indexInSession,
                            };
                        });
                        setData({
                            ...result1.data,
                            session: result2.data
                        });
                        setCourse({
                            ...course,
                            ...result1.data,
                            session: result2.data,
                            exercises: {
                                ...getDefaultExercisesParameters(),
                                ...jsonExercises
                            }
                        });
                        setCanRun(true);
                    }
                );
            }
        );
    }

    const goToNextSession = () => {
        axiosPrivate.post(`/api/v1/user-progress/confirm-session/${auth.appuserid}&${course.currentSessionNumber}`).then(
            (response) => {
                setSeverity("success");
                setAlertMessage("Pomyślnie przeszedłeś do kolejnej sesji! Gratulacje!")
                setSnackOpen(true);
                fetchData();
            }
        ).catch((error) =>  {
            setSeverity("error");
            setAlertMessage(error.message)
            setSnackOpen(true);
        });
    }

    React.useEffect(() => {
       fetchData();
    }, []);

    React.useEffect(() => {
    }, [course])


    return canRun && (
        <>
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
                            <Typography fontSize={20}>{`Sesja numer ${data.currentSessionNumber} z 21`}</Typography>
                                <SessionList session={data.session.session}/>
                            <Typography fontSize={20}>{`Wykonałeś ${data.finishedExercise} ćwiczeń w tej sesji`}</Typography>
                            <Button variant="contained" color="secondary" disabled={false} onClick={goToNextSession}>
                                <NextPlanIcon />Przejdź do kolejnej sesji
                            </Button>
                        </Item>
                    </Grid>
                    <Grid md={1} key={2}>
                        <Typography fontSize={20}>{`Twój postęp`}</Typography>
                        <Typography sx={{position:"relative", top: "60px", height: "0px"}} color="primary" fontSize={27}>{`${Math.round((data.currentSessionNumber - 1)/21 * 100)}%`}</Typography>
                        <EmojiEventsIcon sx={{fontSize: "200px"}} color="four" />
                        <Box sx={{ flexGrow: 1 }}>
                            <BorderLinearProgress variant="determinate" value={Math.round((data.currentSessionNumber - 1)/21 * 100)} />
                            {
                                data.currentSessionNumber>1
                                    ?<Typography fontSize={20}>{`Przeprowadziłeś ${data.currentSessionNumber - 1} sesji. Gratulacje!`}</Typography>
                                    :<Typography fontSize={20}>{`Przeprowadziłeś ${data.currentSessionNumber - 1} sesji.`}</Typography>
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Box>
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