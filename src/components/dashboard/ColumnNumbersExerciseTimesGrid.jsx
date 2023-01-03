import React from 'react';
import { Box } from '@material-ui/core';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import {Button, Typography} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {styled} from "@mui/material/styles";



export default function ColumnNumbersExerciseTimesGrid(props) {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [data, setData] = React.useState({
            "log2": null,
            "log3": null,
            "log4": null,
            "log5": null,
            "log6": null,
    });

    const [rows, setRows] = React.useState([]);



    function createRow(name, log2 ,log3, log4, log5, log6) {
        return { name, log2, log3, log4, log5, log6 };
    }


    React.useEffect(() => {
        axiosPrivate.get(`/api/v1/column-numbers-logs/get/${auth.appuserid}`).then(
            (result) => {
                console.log(result.data);
                setData(result.data);
            }
        );
    }, [])

    //For each change of data generate grid
    React.useEffect(() => {
        const tabRows = [];
        tabRows.push(createRow('Czas', data.log2 ,data.log3, data.log4, data.log5, data.log6));
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
            <Typography fontSize={20}>{`Kolumny liczb`}</Typography>
            <TableContainer component={Paper} sx={{ maxWidth: '100%', maxHeight: '200px' }}>
                <Table sx={{ maxWidth: '100%', maxHeight: '200px' }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{color: 'primary.text'}} align="center"><b>Poziom</b></TableCell>
                            <TableCell sx={{color: 'primary.text'}} align="center"><b>2</b></TableCell>
                            <TableCell sx={{color: 'primary.text'}} align="center"><b>3</b></TableCell>
                            <TableCell sx={{color: 'primary.text'}} align="center"><b>4</b></TableCell>
                            <TableCell sx={{color: 'primary.text'}} align="center"><b>5</b></TableCell>
                            <TableCell sx={{color: 'primary.text'}} align="center"><b>6</b></TableCell>
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
                                <TableCell sx={{color: 'primary.text'}} align="center">{row.log2}{row.log2?'s':""}</TableCell>
                                <TableCell sx={{color: 'primary.text'}} align="center">{row.log3}{row.log3?'s':""}</TableCell>
                                <TableCell sx={{color: 'primary.text'}} align="center">{row.log4}{row.log4?'s':""}</TableCell>
                                <TableCell sx={{color: 'primary.text'}} align="center">{row.log5}{row.log5?'s':""}</TableCell>
                                <TableCell sx={{color: 'primary.text'}} align="center">{row.log6}{row.log6?'s':""}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Box>

    );

}


