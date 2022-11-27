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
    const [data, setData] = React.useState({});



    function createData(name, calories, fat, carbs, protein, last) {
        return { name, calories, fat, carbs, protein, last };
    }

    const rows = [
        createData('1', 1, 2, 3, 4, 3),
        createData('2', 237, 9.0, 37, 4.3, 5),
        createData('3', 262, 16.0, 24, 6.0, 6),
        createData('4', 305, 3.7, 67, 4.3, 9),
        createData('5', 356, 16.0, 49, 3.9, 9),
        createData('6', 356, 16.0, 49, 3.9, 10),
    ];

    React.useEffect(() => {

    }, []);



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
                            <TableCell sx={{color: 'primary.text'}} align="center">Wiersze/Kolumny</TableCell>
                            <TableCell sx={{color: 'primary.text'}} align="center">2</TableCell>
                            <TableCell sx={{color: 'primary.text'}} align="center">3</TableCell>
                            <TableCell sx={{color: 'primary.text'}} align="center">4</TableCell>
                            <TableCell sx={{color: 'primary.text'}} align="center">5</TableCell>
                            <TableCell sx={{color: 'primary.text'}} align="center">6</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{color: 'primary.text'}} align="center">
                                    {row.name}
                                </TableCell>
                                <TableCell sx={{color: 'primary.text'}} align="center">{row.calories}</TableCell>
                                <TableCell sx={{color: 'primary.text'}} align="center">{row.fat}</TableCell>
                                <TableCell sx={{color: 'primary.text'}} align="center">{row.carbs}</TableCell>
                                <TableCell sx={{color: 'primary.text'}} align="center">{row.protein}</TableCell>
                                <TableCell sx={{color: 'primary.text'}} align="center">{row.last}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Box>

    );

}


