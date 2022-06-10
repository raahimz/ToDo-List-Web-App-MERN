import React from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Typography } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#77ABB7'
        }
    },
});

const today = new Date();
const options = {weekday:"long", day:"numeric", month:"long"};
var day = today.toLocaleDateString("en-us", options);

function InputArea() {
    return (
        <ThemeProvider theme={theme}>
            <Typography style={{ fontWeight: '100' }} variant="h4" component="div" gutterBottom color="primary">
                {day}
            </Typography>
        </ThemeProvider>
    );
}

export default InputArea;