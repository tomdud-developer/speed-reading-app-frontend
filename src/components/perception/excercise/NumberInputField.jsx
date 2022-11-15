import {TextField} from "@mui/material";
import * as React from "react";

export const NumberInputField = (props) => {
    return (
        <>
            <TextField
                autoComplete='off'
                onChange={(e) => {props.setUserNumber(e.target.value)}}
                sx={{
                    input: { textAlign:'center', fontSize: '50px' },
                    padding: '20px'
                }}
                id="userNumber"
                label=" "
                variant='filled'
                value={props.userNumber}
            />

        </>
    )
}