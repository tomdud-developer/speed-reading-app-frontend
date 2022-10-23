import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box } from '@material-ui/core';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useTheme } from '@mui/material';

export default function SpeedMeterLogsChart(props) {

  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = React.useState({});
  const theme = useTheme();

  React.useEffect(() => {
    axiosPrivate.get(`/api/v1/speed-meter-log/get/1`).then( (result) => setData(result.data));
  }, []);


  return (
    
    <ResponsiveContainer width="100%" height="100%">
      <Box sx={{bgcolor: '#fff'}}>
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
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
  
  );
  
}
