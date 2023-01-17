import React from 'react';
import { Box } from '@material-ui/core';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import GaugeChart from 'react-gauge-chart';
import useAuth from '../../hooks/useAuth';
import { Typography } from '@mui/material';

export default function GaugaeChartLastSpeedMeterLog(props) {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [data, setData] = React.useState({wordsperminute: 0, percentageOfUnderstanding: 0});

    React.useEffect(() => {
        axiosPrivate.get(`/api/v1/speed-meter-log/get-latest/${auth.appuserid}`)
            .then((result1) => {
                axiosPrivate.get(`/api/v1/understanding-meter/get/${auth.appuserid}`).then((result2) => {
                    setData(
                        {
                            ...result1.data,
                            ...result2.data
                        }
                    );
                })


            });
    }, []);



    return (
        <Box
            sx={{
                height: '250px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <GaugeChart id="gauge-chart4"
                nrOfLevels={10}
                arcPadding={0.1}
                cornerRadius={3}
                percent={1}
                formatTextValue={value => data.wordsperminute + " słów/minutę"}
                style={{width: '70%', margin: 'auto'}}
            />
            <Typography fontSize={18}>{`Gratulacje ${auth.firstname}!`}</Typography>
            <Typography fontSize={15}>{`Twój  wynik to ${data.wordsperminute} słów/minutę i ${data.percentageOfUnderstanding}% zrozumienia.`}</Typography>
        </Box>

    );

}
