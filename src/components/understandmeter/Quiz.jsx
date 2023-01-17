import * as React from "react";
import {axiosPrivate} from "../../api/axios";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {QuizQuestion} from "./QuizQuestion";
import Stack from '@mui/material/Stack';
import useAuth from "../../hooks/useAuth";
import useCourse from "../../hooks/useCourse";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {Button} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export const Quiz = (props) => {

    const [questions, setQuestions] = React.useState();
    const [canRun, setCanRun] = React.useState(false);
    const [answers, setAnswers] = React.useState(['A','A','A','A','A','A','A','A','A','A']);
    const { auth } = useAuth();
    const { course } = useCourse();
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState("error");
    const [alertMessage, setAlertMessage] = React.useState("Loading");
    const [openDialog, setOpenDialog] = React.useState(false);
    const handleClose = () => {setOpenDialog(false)};


    React.useEffect(() => {
        axiosPrivate.get(`api/v1/understanding-meter/questions/1`)
            .then(
                (result) => {
                    setQuestions(result.data);
                    console.log(result.data);
                    setCanRun(true);
                }
            );
    }, []);


    const calculateResult = () => {
        let correct = 0;
        for(let i = 0; i < 10; i++) {
            if(questions[i].correctAnswer == answers[i])
                correct ++;
        }
        return Math.ceil(correct/10 * 100);
    }



    const postResult = async () => {
        await axiosPrivate.post(`api/v1/understanding-meter/save/${auth.appuserid}`,
            {
                percentageOfUnderstanding: calculateResult(),
                date: new Date().toISOString()
            }
        ).then(() => {
            axiosPrivate.post("api/v1/speed-meter-log/save",
                {
                    appUser: {
                        id: auth.appuserid
                    },
                    wordsperminute: props.wordsperminute,
                    date: new Date().toISOString()
                })
        }).then( () => {
                setAlertMessage("Zapisano w bazie!");
                setSeverity("success");
                if (course.exercises.understandmeter.confirmExerciseActive) {
                    axiosPrivate.post(`api/v1/user-progress/confirm-exercise/${auth.appuserid}&${course.exercises.understandmeter.indexInSession}`).then(() => {
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

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        {children}
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return canRun && (
        <>
            <Stack spacing={1} direction="column" sx={{ mb: 1 }} alignItems="center">
                <Box
                    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 500 }}
                >
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider', padding:'20px' }}
                    >
                        {questions.map((q) =>
                                <Tab label={`Pytanie nr ${q.index + 1}`} {...a11yProps(q.index)} />
                            )
                        }
                    </Tabs>
                    {questions.map((q) =>
                        <TabPanel value={value} index={q.index}>
                            <QuizQuestion question={q} answers={answers} setAnswers={setAnswers} />
                        </TabPanel>
                    )}
                </Box>
                <Button variant="contained" onClick={() =>{setOpenDialog(true);}}>Zatwierdź wyniki i zapisz w bazie</Button>
                <Typography color="primary">Twoje odpowiedzi: {JSON.stringify(answers)}</Typography>
            </Stack>

            <Dialog open={openDialog} onClose={handleClose} >
                <Paper sx={{bgcolor: "primary.main"}}>
                    <DialogTitle>
                        {"Gratulacje"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText color="typography.book.color">
                            Twój wynik to {props.wordsperminute} słów na minutę.
                            Twój wynik to {calculateResult()}% Zrozumienia.
                            Czy chcesz zapisać to w bazie?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color="success" onClick={() => {postResult(); handleClose();}} >Zapisz!</Button>
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
        );
}