import React from 'react'
import TextField from '@mui/material/TextField';
import { createStyles, makeStyles, Theme } from "@mui/material/styles";
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { useState } from 'react';


const useStyles = makeStyles((theme) =>
({
    wrapForm: {
        display: "flex",
        justifyContent: "center",
        width: "95%",
        margin: `${theme.spacing(0)} auto`
    },
    wrapText: {
        width: "100%"
    },
    button: {
        //margin: theme.spacing(1),
    },
})
);


export const TextInput = ({ onSubmit }) => {
    const classes = useStyles();
    const [messageBody, setMessageBody] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!onSubmit) return;
        onSubmit(messageBody)
        setMessageBody('');
    }
    return (
        <>
            <form className={classes.wrapForm} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    id="standard-text"
                    label="Nhập tin nhắn"
                    className={classes.wrapText}
                    value={messageBody}
                    onChange={(e) => setMessageBody(e.target.value)}
                //margin="normal"
                />
                <Button variant="contained" color="primary" className={classes.button}>
                    <SendIcon />
                </Button>
            </form>
        </>
    )
}



