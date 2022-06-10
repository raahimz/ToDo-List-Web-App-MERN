import React from "react";
import {Typography, Stack, Button} from "@mui/material/";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';

const theme = createTheme({
    palette: {
        mode: 'dark',
    }
});

function Task(props) {
    const completed = props.completed;
    const colour = !completed ? '#476D7C' : '#254B62';

    return (
        <div>
            <ThemeProvider theme={theme}>
                <div className="task" style={{backgroundColor: colour}}>
                    <Stack spacing={1} direction="row">
                        <Button variant="text" onClick={() => props.completeTask(props.id)}>{ !completed ? <CheckCircleOutlineRoundedIcon/> : <CheckCircleIcon/>}</Button>
                        <Typography variant="body1" style={{color: 'white', fontSize: '18px', marginTop: '5px'}}>
                            {props.text}
                        </Typography>

                        <div style={{marginLeft: 'auto'}}>
                        <Button disabled><EditIcon /></Button>
                        <Button onClick={() => props.deleteTask(props.id)}><ClearIcon /></Button>
                        </div>
                    </Stack>
                </div>
            </ThemeProvider>
        </div>
    );
}

export default Task;