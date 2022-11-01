import * as React from 'react';




export default function Perception1() {



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
                            <FormatListNumberedIcon color="secondary" /> <Typography>Tekst zawiera <b>{totalWords}</b> słów</Typography>
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