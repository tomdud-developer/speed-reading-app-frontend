import React, { PureComponent } from 'react';
import { Label, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box } from '@material-ui/core';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import {Typography, useTheme} from '@mui/material';
import useAuth from '../../hooks/useAuth';

export default function SpeedMeterLogsChart(props) {
  
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = React.useState({});
  const theme = useTheme();

  React.useEffect(() => {
    axiosPrivate.get(`/api/v1/speed-meter-log/get/${auth.appuserid}`).then(
        (result) => {
          result.data = result.data.map( da => ({...da, date: da.date.split("T")[0]}))
          setData(result.data);
        }
      );
  }, []);


  return (
      <>
        <Typography fontSize={30}>{`Historia prędkości czytania`}</Typography>
        <ResponsiveContainer
            width="100%"
            height="300px"
            display='flex'
            justifyContent='center'
            padding='10px'
        >
            <Box sx={{bgcolor: '#fff'}}>
                <AreaChart
                    width={1000}
                    height={300}
                    data={data}
                    margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 0,
                }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fill: theme.palette.primary.text }} />
                    <YAxis tick={{ fill: theme.palette.primary.text }} />
                    <Tooltip itemStyle={{ color: theme.palette.secondary.main }} />
                    <Area type="monotone" dataKey="wordsperminute" strokeWidth={3} stroke={theme.palette.primary.text} fill={theme.palette.secondary.main} />
                </AreaChart>
            </Box>
        </ResponsiveContainer>
      </>
  
  );
  
}
