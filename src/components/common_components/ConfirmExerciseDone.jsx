import {axiosPrivate} from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useCourse from "../../hooks/useCourse";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {Button} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export const ConfirmExerciseDone = (props) => {

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const { course } = useCourse();
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState("error");
    const [alertMessage, setAlertMessage] = React.useState("Loading");
    const [openDialog, setOpenDialog] = React.useState(false);
    const handleClose = () => {setOpenDialog(false)};

    const confirmExercieDone = () => {
        axiosPrivate.post(`api/v1/user-progress/confirm-exercise/${auth.appuserid}&${course.exercises[props.exerciseName].indexInSession}`).then(() => {
            setAlertMessage("Zapisano w bazie! I potwierdzono wykonanie ćwiczenia w sesji!");
        }).then( () => {
                setAlertMessage("Potwierdzono wykonanie! Przejdź do panelu głównego.");
                setSeverity("success");
                setSnackOpen(true);
            }
        ).catch((error) =>  {
            setSeverity("error");
            setAlertMessage(error.message);
            setSnackOpen(true);
            console.log(error);
        });
    }

    return (
        <>
            <Button
                variant='contained'
                color='four'
                sx={{margin: '20px'}}
                onClick={() => setOpenDialog(true)}
            >
                <ThumbUpAltIcon />
                Potwierdź wykonanie ćwiczenia
            </Button>
            <Dialog open={openDialog} onClose={handleClose} >
                <Paper sx={{bgcolor: "primary.main"}}>
                    <DialogTitle>
                        {"Gratulacje! Wygląda na to, że ukończyłeś ćwiczenie."}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText color="typography.book.color">
                            Czy chcesz potwierdzić ćwiczenie?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color="success" onClick={() => {confirmExercieDone(); handleClose();}} >Potwierdź wykonanie!</Button>
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