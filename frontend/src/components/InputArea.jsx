import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TextField, IconButton, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#77ABB7'
        }
    }
});

function InputArea(props) {
    const [text, setText] = useState("");

    function updateText(event) {
        setText(event.target.value);
    }  

    function submit() {
        setText("");
        props.addTask(text);
    }

    return (
        <div className="inputArea">
            <ThemeProvider theme={theme}>
                <Stack spacing={2} direction="row">
                    <TextField value={text} onChange={updateText} size="normal" color="primary" fullWidth label="Task" variant="standard" />
                    <IconButton onClick={submit}><AddIcon color="primary" fontSize="large" /></IconButton>
                </Stack>
            </ThemeProvider>
        </div>
    );
}

export default InputArea;