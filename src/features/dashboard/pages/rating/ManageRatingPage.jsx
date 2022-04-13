import { Close } from '@mui/icons-material';
import { Button, Container, Dialog, DialogContent, DialogTitle, Grid, IconButton, Paper, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { makeStyles } from '@mui/styles';
import commentApi from 'api/commentApi';
import ListRating from 'features/dashboard/components/ListRating';
import useHttp from 'hooks/use-http';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import replyApi from './../../../../api/replyApi';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'relative',
        backgroundColor: theme.palette.secondary.main,
    },
    menuButton: {

        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'inherit'
    },

    close: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],

        zIndex: '10',
    },
    button: {
        position: 'relative',
    },

}));
const ManageRatingPage = () => {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    const location = useLocation()
    const { add, getAll, reply } = commentApi;
    const { add: addReply } = replyApi;
    const { id } = useSelector(state => state.user.current)
    const user = useSelector(state => state.user.current)
    console.log(id)

    const { sendRequest: getAllComment, status: statusGet, data: comments, error: errorGetComment } = useHttp(getAll, false);

    const { sendRequest: replyComment, status: statusReply, error: errorReply } = useHttp(reply, false);
    const [filters, setFilters] = useState({
        replied: 0,
        star: 0,
    })
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState({});
    const [rate, setRate] = useState(0);
    const replyRef = useRef('')
    const handelReply = (item) => {
        console.log(item)
        setComment(item)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };
    const handleChange = (event, newValue) => {
        setFilters(prev => ({
            ...prev,
            replied: newValue
        }))

    };
    const handleCategoryChange = (event, newValue) => {
        setFilters(prev => ({
            ...prev,
            star: newValue
        }))

    };
    const handelActiveStar = (value) => {
        console.log(value)
        setRate(value)
    }
    useEffect(() => {
        if (statusReply === 'completed' && !errorReply) {
            setOpen(false);
            getAllComment(filters)
            toast.success("Trả lời thành công!");
        }
        if (statusReply === 'completed' && errorReply) {
            setOpen(false);

            toast.error(errorReply);
        }
    }, [statusReply, getAllComment, filters, errorReply])
    useEffect(() => {
        getAllComment(filters)
    }, [getAllComment, filters])
    useEffect(() => {

        navigate({
            pathname: location.pathname,
            search: queryString.stringify(filters),
        })

    }, [filters, location.pathname, navigate])
    // useEffect(() => {
    //     if (value) {
    //         history.push(`/admin/rating?replied=${value}`)
    //     }
    // }, [value, history])
    const handleSubmit = async (e) => {
        e.preventDefault()
        const dataReply = {
            _id: comment,
            reply: {
                userReply: user._id,
                replyReview: replyRef.current.value
            }
        }
        console.log("asdasd", comment, dataReply)
        // addComment(data)
        replyComment(dataReply)

    }
    const rating = [
        { value: 0, label: 'Tất cả' },
        { value: 5, label: '5 sao' },
        { value: 4, label: '4 sao' },
        { value: 3, label: '3 sao' },
        { value: 2, label: '2 sao' },
        { value: 1, label: '1 sao' },
    ]
    return (
        <Container style={{ maxWidth: '100%' }}>
            <Grid container>
                <Grid item xs={12}>
                    <Box sx={{ width: '100%' }} marginBottom={1} padding={1}>
                        <Paper>
                            {/* <Tabs
                                value={filters.replied}
                                onChange={handleChange}
                                textColor="secondary"
                                indicatorColor="secondary"
                                aria-label="secondary tabs example"
                            >
                                <Tab value={0} label="Tất cả" />
                                <Tab value={1} label="Chưa trả lời" />
                                <Tab value={2} label="Đã trả lời" />

                            </Tabs> */}

                            <Grid container>
                                <Grid item md={12} align="left">
                                    <Box padding={1}>

                                        <Tabs
                                            value={filters.star}
                                            onChange={handleCategoryChange}
                                            textColor="secondary"
                                            indicatorColor="secondary"
                                            aria-label="secondary tabs example"
                                        >
                                            {rating.map(r => (

                                                <Tab key={r.value} value={r.value} label={r.label} />
                                            ))}

                                        </Tabs>

                                    </Box>

                                </Grid>
                            </Grid>

                        </Paper>
                    </Box>
                    <Box padding={1}>

                        {/* <OrderListUserPage status={status} orders={orders} handelOnClick={handleClickOpen} /> */}
                        <ListRating comments={comments ? comments : []} setOpen={setOpen} onReply={handelReply} />
                        <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth="true">
                            <IconButton className={classes.close} onClick={handleClose}>
                                <Close />
                            </IconButton>
                            <DialogTitle>Trả lời đánh giá của khách hàng</DialogTitle>
                            <DialogContent>
                                <form onSubmit={handleSubmit}>
                                    <Box padding={1}>
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Nội dụng trả lời"
                                            multiline
                                            rows={4}
                                            defaultValue="Cảm ơn bạn đã mua hàng!"
                                            fullWidth
                                            inputRef={replyRef}
                                        />
                                    </Box>
                                    <Button type="submit" autoFocus>
                                        Xác nhận
                                    </Button>
                                    {/* {isSubmitRating === 'pending' && <LoadingLinear />} */}

                                </form>

                                {/* <FormRating itemRating={itemRating} /> */}


                            </DialogContent>

                        </Dialog>


                    </Box>
                </Grid>

            </Grid>

        </Container >

    );
}
export default ManageRatingPage