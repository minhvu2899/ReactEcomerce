import React from 'react';
import { makeStyles } from '@mui/styles';
import LinearProgress from '@mui/material/LinearProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: '16px',
        },
    },
}));
function LoadingLinear(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <LinearProgress />
            <LinearProgress color="secondary" />
        </div>
    );
}

export default LoadingLinear;