import React from 'react';
import { Box } from '@material-ui/core';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import {Typography} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function DisapperarNumbersExercisePercentageGrid(props) {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [data, setData] = React.useState({
            "log0": null,
            "log1": null,
            "log2": null,
            "log3": null,
            "log4": null,
            "log5": null,
            "log6": null,
            "log7": null,
            "log8": null,
            "log9": null,
            "log10": null,
    });

    const [rows, setRows] = React.useState([]);


    function createRow(name, log0, log1, log2 ,log3, log4, log5, log6, log7, log8, log9, log10) {
        return {name, log0, log1, log2 ,log3, log4, log5, log6, log7, log8, log9, log10};
    }


    React.useEffect(() => {
        axiosPrivate.get(`/api/v1/numbers-disappear-logs/get/${auth.appuserid}`).then(
            (result) => {
                console.log(result.data);
                setData(result.data);
            }
        );
    }, [])

    //For each change of data generate grid
    React.useEffect(() => {
        const tabRows = [];
        tabRows.push(createRow('Poprawne', data.log0, data.log1,data.log2 ,data.log3, data.log4, data.log5, data.log6, data.log7, data.log8, data.log9, data.log10));
        if(tabRows.length === 1) {
            setRows(tabRows);
        }
    }, [data]);


    return (
        <Box
            sx={{
                minHeight: '250px',
                maxHeight: '250px',
            }}
        >
            <Typography fontSize={20}>{`Znikające liczby`}</Typography>
            <TableContainer component={Paper} sx={{ maxWidth: '100%', maxHeight: '200px' }}>
                <Table sx={{ maxWidth: '100%', maxHeight: '200px' }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{color: 'primary.text'}} align="center"><b>Poziom</b></TableCell>
                            <TableCell sx={{color: 'primary.text'}} align="center"><b>0</b></TableCell>
                            <TableCell sx={{color: 'primary.text'}} align="center"><b>1</b></TableCell>
                            <TableCell sx={{color: 'primary.text'}} align="center"><b>2</b></TableCell>
                            <TableCell sx={{color: 'primary.text'}} align="center"><b>3</b></TableCell>
                            <TableCell sx={{color: 'primary.text'}} align="center"><b>4</b></TableCell>
                            <TableCell sx={{color: 'primary.text'}} align="center"><b>5</b></TableCell>
                            <TableCell sx={{color: 'primary.text'}} align="center"><b>6</b></TableCell>
                            <TableCell sx={{color: 'primary.text'}} align="center"><b>7</b></TableCell>
                            <TableCell sx={{color: 'primary.text'}} align="center"><b>8</b></TableCell>
                            <TableCell sx={{color: 'primary.text'}} align="center"><b>9</b></TableCell>
                            <TableCell sx={{color: 'primary.text'}} align="center"><b>10</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{color: 'primary.text'}} align="center">
                                    <b>{row.name}</b>
                                </TableCell>
                                <TableCell sx={{color: 'primary.text'}} align="center">{row.log0}{row.log0?'%':""}</TableCell>
                                <TableCell sx={{color: 'primary.text'}} align="center">{row.log1}{row.log1?'%':""}</TableCell>
                                <TableCell sx={{color: 'primary.text'}} align="center">{row.log2}{row.log2?'%':""}</TableCell>
                                <TableCell sx={{color: 'primary.text'}} align="center">{row.log3}{row.log3?'%':""}</TableCell>
                                <TableCell sx={{color: 'primary.text'}} align="center">{row.log4}{row.log4?'%':""}</TableCell>
                                <TableCell sx={{color: 'primary.text'}} align="center">{row.log5}{row.log5?'%':""}</TableCell>
                                <TableCell sx={{color: 'primary.text'}} align="center">{row.log6}{row.log6?'%':""}</TableCell>
                                <TableCell sx={{color: 'primary.text'}} align="center">{row.log7}{row.log7?'%':""}</TableCell>
                                <TableCell sx={{color: 'primary.text'}} align="center">{row.log8}{row.log8?'%':""}</TableCell>
                                <TableCell sx={{color: 'primary.text'}} align="center">{row.log9}{row.log9?'%':""}</TableCell>
                                <TableCell sx={{color: 'primary.text'}} align="center">{row.log10}{row.log10?'%':""}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Box>

    );

}


