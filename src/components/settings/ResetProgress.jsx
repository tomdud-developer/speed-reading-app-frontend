import {Typography} from "@material-ui/core";
import useCourse from "../../hooks/useCourse";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {Alert, Button} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Snackbar from "@mui/material/Snackbar";
import {redirect} from "react-router-dom";

export const ResetProgress = (props) => {
    const { auth } = useAuth();
    const { course } = useCourse();
    const axiosPrivate = useAxiosPrivate();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("Loading");
    const [severity, setSeverity] = React.useState("error");

    const handleClose = () => {
        setOpenDialog(false);
        setAlertMessage("Loading");
    };

    const postRequest = () => {
        axiosPrivate.post(`/api/v1/user-progress/reset-progress/${auth.appuserid}`).then(
            (response) => {
                setSeverity("success");
                setAlertMessage("Pomyślnie zresetowałes postęp! Przejdź do panelu głównego, aby zaktualizować dane.")
                setSnackOpen(true);
            }
        ).catch((error) =>  {
            setSeverity("error");
            setAlertMessage(error.message)
            setSnackOpen(true);
            console.log(error);
        });
    }

    return (
        <>
            <TextField
                sx={{input: { color: 'primary.text' }, padding: '20px'}}
                InputProps={{readOnly: true,}}
                id="name" label="Sesje"s
                value={`Twoja aktualna sesja to ${course.currentSessionNumber}.`}
            />
            <TextField
                sx={{input: { color: 'primary.text' }, padding: '20px'}}
                InputProps={{readOnly: true,}}
                id="name" label="Ćwiczenia"
                value={`Wykonałeś ${course.finishedExercise} ćwiczeń w akutalnej sesji.`}
            />
            <TextField
                sx={{input: { color: 'primary.text' }, padding: '20px'}}
                InputProps={{readOnly: true,}}
                id="name" label="Postęp"
                value={`Twój postęp to ${Math.ceil((course.currentSessionNumber-1)/21 * 100)}%.`}
            />
            <Button sx={{margin: '20px'}} color='error' variant="contained" onClick={() => setOpenDialog(true)} >Zresetuj postęp</Button>
            <Dialog open={openDialog} onClose={handleClose} >
                <Paper sx={{bgcolor: "primary.main"}}>
                    <DialogTitle>
                        {"Gratulacje"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText color="typography.book.color">
                            Czy na pewno chcesz zresetować postęp?
                            Operacja jest nieodwracalana.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color="success" onClick={() => {postRequest(); handleClose();}} >Tak jesten pewien.</Button>
                        <Button variant='contained' color="error" onClick={handleClose} >Odrzuć</Button>
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