import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, Typography, Chip, Button } from '@mui/material';
import { makeStyles } from '@mui/styles'
Address.propTypes = {

};
const useStyles = makeStyles(theme => ({
    row: {
        padding: '8px',
        borderBottom: '1px solid #ccc'
    },
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
        textTransform: 'capitalize',
    },
    name: {
        color: 'gray'
    }
}))
function Address({ address, onHandelEditClick, onHandelRemoveClick }) {

    const classes = useStyles();
    const handelEditClick = (id) => {
        onHandelEditClick(id)
    }
    const handelRemoveClick = (id) => {
        onHandelRemoveClick(id)
    }
    return (
        <Grid item container className={classes.row} key={address.id}>
            <Grid item xs={3} align="right">
                <Box padding={1} className={classes.name}>
                    <Box marginBottom={1}>
                        <Typography>Họ và tên</Typography>
                    </Box>
                    <Typography>Số điện thoại</Typography>
                    <Typography>Địa chỉ</Typography>

                </Box>
            </Grid>
            <Grid item xs={6} align="left">
                <Box padding={1}>
                    <Box marginBottom={1}>
                        <Typography>{address.name}
                            {address.isDefault && <Chip color="primary" label="Mặc định" size="small" />}
                        </Typography>
                    </Box>

                    <Typography>{address.phone}</Typography>
                    <Typography >{address.address}
                    </Typography>
                    <Typography >
                        {address.ward}
                    </Typography>
                    <Typography >
                        {address.district}
                    </Typography>
                    <Typography >
                        {address.city}</Typography>
                </Box>

            </Grid>
            <Grid item xs={3} align="right">
                <Box padding={1}>
                    <Button classes={{
                        root: classes.root, // class name, e.g. `classes-nesting-root-x`
                        label: classes.label, // class name, e.g. `classes-nesting-label-x`
                    }} onClick={() => handelEditClick(address)}>Sửa</Button>
                    <Button classes={{
                        root: classes.root, // class name, e.g. `classes-nesting-root-x`
                        label: classes.label, // class name, e.g. `classes-nesting-label-x`
                    }} onClick={() => handelRemoveClick(address.id)}>Xóa</Button>
                </Box>

            </Grid>

        </Grid>
    );
}

export default Address;