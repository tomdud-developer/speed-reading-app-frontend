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



export default function SchultzBestTimesGrid(props) {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [data, setData] = React.useState({
            "log2x2": null, "log2x3": null, "log2x4": null, "log2x5": null, "log2x6": null,
            "log3x2": null, "log3x3": null, "log3x4": null, "log3x5": null, "log3x6": null,
            "log4x2": null, "log4x3": null, "log4x4": null, "log4x5": null, "log4x6": null,
            "log5x2": null, "log5x3": null, "log5x4": null, "log5x5": null, "log5x6": null,
            "log6x2": null, "log6x3": null, "log6x4": null, "log6x5": null, "log6x6": null
    });
    const [rows, setRows] = React.useState([]);



    function createRow(name, logRx2 ,logRx3, logRx4, logRx5, logRx6) {
        return { name, logRx2, logRx3, logRx4, logRx5, logRx6 };
    }


    React.useEffect(() => {
        axiosPrivate.get(`/api/v1/schultz-array-logs/get/${auth.appuserid}`).then(
            (result) => {
                console.log(result.data);
                setData(result.data);
            }
        );
    }, [])

    //For each change of data generate grid
    React.useEffect(() => {
        const tabRows = [];
        tabRows.push(createRow(2, data.log2x2 ,data.log2x3, data.log2x4, data.log2x5, data.log2x6));
        tabRows.push(createRow(3, data.log3x2 ,data.log3x3, data.log3x4, data.log3x5, data.log3x6));
        tabRows.push(createRow(4, data.log4x2 ,data.log4x3, data.log4x4, data.log4x5, data.log4x6));
        tabRows.push(createRow(5, data.log5x2 ,data.log5x3, data.log5x4, data.log5x5, data.log5x6));
        tabRows.push(createRow(6, data.log6x2 ,data.log6x3, data.log6x4, data.log6x5, data.log6x6));
        if(tabRows.length === 5) {
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
            <Typography fontSize={20}>{`Tablice Schultza`}</Typography>
            <TableContainer component={Paper} sx={{ maxWidth: '100%', maxHeight: '200px' }}>
                <Table sx={{ maxWidth: '100%', maxHeight: '200px' }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{color: 'primary.text'}} align="center"><b>Wiersze/Kolumny</b></TableCell>
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
                                <TableCell sx={{color: 'primary.text'}} align="center">{row.logRx2}{row.logRx2?'s':""}</TableCell>
                                <TableCell sx={{color: 'primary.text'}} align="center">{row.logRx3}{row.logRx3?'s':""}</TableCell>
                                <TableCell sx={{color: 'primary.text'}} align="center">{row.logRx4}{row.logRx4?'s':""}</TableCell>
                                <TableCell sx={{color: 'primary.text'}} align="center">{row.logRx5}{row.logRx5?'s':""}</TableCell>
                                <TableCell sx={{color: 'primary.text'}} align="center">{row.logRx6}{row.logRx6?'s':""}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Box>

    );

}


