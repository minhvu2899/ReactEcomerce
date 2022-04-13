import React from 'react';
import { Paper, Typography } from '@mui/material';

NotFound.propTypes = {

};

function NotFound(props) {
    return (
        <Paper>
            <Typography variant="h1" sx={{ fontSize: 100, p: 5 }}>404</Typography>
            <h1>Không tìm thấy trang</h1>
        </Paper>
    );
}

export default NotFound;