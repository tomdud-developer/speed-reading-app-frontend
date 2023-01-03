import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export const QuizQuestion = (props) => {

    const [value, setValue] = React.useState(props.answers[props.question.index]);

    const handleChange = (event) => {
        let newVal = props.answers;
        newVal[props.question.index] = event.target.value;
        props.setAnswers(newVal);
        setValue(event.target.value);
    };

    return (
        <Paper
            sx={{
                backgroundColor: 'dark' === 'dark' ? '#1A2027' : '#fff',
                textAlign: 'center',
                minWidth: "800px",
                padding: "20px"
            }}
        >
            <Typography variant="h5">
                Pytanie nr {props.question.index + 1}
            </Typography>
            <Typography variant="h6">
                {props.question.question}
            </Typography>
            <FormControl>
                <FormLabel id="radio-buttons-group-label"><Typography variant="h6">Odpowiedzi:</Typography></FormLabel>
                <RadioGroup
                    aria-labelledby="radio-buttons-group-label"
                    name="radio-buttons-group"
                    onChange={handleChange}
                    value={value}
                >
                    <FormControlLabel value="A" control={<Radio color="secondary" />} label={props.question.answerA} />
                    <FormControlLabel value="B" control={<Radio color="secondary" />} label={props.question.answerB} />
                    <FormControlLabel value="C" control={<Radio color="secondary" />} label={props.question.answerC} />
                    <FormControlLabel value="D" control={<Radio color="secondary" />} label={props.question.answerD} />
                </RadioGroup>
            </FormControl>
        </Paper>
    )
}