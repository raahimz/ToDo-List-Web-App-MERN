import React from "react";
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
      marginTop: theme.spacing(2),
    },
  }));

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#C6DE41'
        }
    }
});

function TasksDivider(props) {

    return (
        <div>
        <ThemeProvider theme={theme}>
            <Root>
                <Divider>
                    <Chip label={props.text} />
                </Divider>
            </Root>
        </ThemeProvider>
        </div>
    );
}

export default TasksDivider;