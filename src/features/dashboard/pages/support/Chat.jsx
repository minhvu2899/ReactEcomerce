import React from 'react';
import { makeStyles } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { Button } from '@mui/material';
import { MessageLeft, MessageRight } from "features/User/components/Message";
import { formatDate } from 'utils';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageHeader: {
        height: '80px'
    },
    messagesBody: {
        width: "calc( 100% - 20px )",
        overflowY: "scroll",
        height: `calc( 80vh - 200px )`,

    },
    messagesContent: {
        // width: "calc( 100% - 20px )",


        // height: `calc( 80vh - 160px)`,

    },
    wrapForm: {
        display: "flex",
        justifyContent: "center",
        width: "95%",
        margin: `${theme.spacing(0)} auto`,
        height: '80px'
    },
    paper: {
        width: "100%",
        height: "100%",
        // maxWidth: "500px",
        maxHeight: "700px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        // position: "relative"
    },
    selected: {
        backgroundColor: '#ccc'
    },
    unread: {
        backgroundColor: 'red',
        boderRadius: '5px'
    },
    online: {
        backgroundColor: 'green'
    }
}));
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));
let allUsers = [];
let allMessages = [];
let allSelectedUser = {};
const ENDPOINT =
    window.location.host.indexOf('localhost') >= 0
        ? 'http://127.0.0.1:3001'
        : window.location.host;

const Chat = () => {
    const classes = useStyles();
    const [selectedUser, setSelectedUser] = useState({});
    const [socket, setSocket] = useState(null);
    const uiMessagesRef = useRef(null);
    const [messageBody, setMessageBody] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const { current } = useSelector((state) => state.user);
    useEffect(() => {
        if (uiMessagesRef.current) {
            console.log(uiMessagesRef.current)
            uiMessagesRef.current.scrollBy({
                top: uiMessagesRef.current.clientHeight,
                left: 0,
                behavior: 'smooth',
            });
        }

        if (!socket) {
            const sk = socketIOClient(ENDPOINT, { transports: ['websocket'] });
            setSocket(sk);
            sk.emit('onLogin', {
                id: current.id,
                name: current.email,
                isAdmin: current.email === 'vhm2899@gmail.com' ? true : false,
            });
            sk.on('message', (data) => {
                if (allSelectedUser.id === data.id) {
                    allMessages = [...allMessages, data];
                } else {
                    const existUser = allUsers.find((user) => user.id === data.id);
                    if (existUser) {
                        allUsers = allUsers.map((user) =>
                            user.id === existUser.id ? { ...user, unread: true } : user
                        );
                        setUsers(allUsers);
                    }
                }
                setMessages(allMessages);
            });
            sk.on('updateUser', (updatedUser) => {
                const existUser = allUsers.find((user) => user.id === updatedUser.id);
                if (existUser) {
                    allUsers = allUsers.map((user) =>
                        user.id === existUser.id ? updatedUser : user
                    );
                    setUsers(allUsers);
                } else {
                    allUsers = [...allUsers, updatedUser];
                    setUsers(allUsers);
                }
            });
            sk.on('listUsers', (updatedUsers) => {
                allUsers = updatedUsers;
                setUsers(allUsers);
            });
            sk.on('selectUser', (user) => {
                allMessages = user.messages;
                setMessages(allMessages);
            });
        }
    }, [messages, socket, users, current.id, current.email]);

    const selectUser = (user) => {
        allSelectedUser = user;
        setSelectedUser(allSelectedUser);
        if (uiMessagesRef.current) {
            console.log(uiMessagesRef.current)
            uiMessagesRef.current.scrollBy({
                top: uiMessagesRef.current.clientHeight,
                left: 0,
                behavior: 'smooth',
            });
        }
        const existUser = allUsers.find((x) => x.id === user.id);
        if (existUser) {
            allUsers = allUsers.map((x) =>
                x.id === existUser.id ? { ...x, unread: false } : x
            );
            setUsers(allUsers);
        }
        socket.emit('onUserSelected', user);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (!messageBody.trim()) {
            alert('Error. Please type message.');
        } else {
            alert(messageBody);
            allMessages = [
                ...allMessages,
                { body: messageBody, name: current.email, date: new Date() },
            ];
            setMessages(allMessages);
            setMessageBody('');
            setTimeout(() => {
                socket.emit('onMessage', {
                    body: messageBody,
                    name: current.email,
                    isAdmin: current.email === 'vhm2899@gmail.com' ? true : false,
                    id: selectedUser.id,




                });
            }, 1000);
        }
    };
    return (
        <Container>
            <CssBaseline />
            <Grid container>
                <Grid item xs={12} >
                    <Typography variant="h5" className="header-message">Chat</Typography>
                </Grid>
            </Grid>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemIcon>
                                {/* <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" /> */}
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                >
                                    <Avatar alt="Admin" src="/static/images/avatar/1.jpg" />
                                </StyledBadge>
                            </ListItemIcon>
                            <ListItemText primary="Admin"></ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid item xs={12} style={{ padding: '10px' }}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                    </Grid>
                    <Divider />
                    <List>
                        {users.filter((x) => x.id !== current.id).length === 0 && (
                            <p>No Online User Found</p>
                        )}

                        {users
                            .filter((x) => x.id !== current.id)
                            .map((user) => (
                                <ListItem button key={user.id}
                                    className={user.id !== selectedUser.id ? classes.selected : '  '} onClick={() => selectUser(user)}>
                                    <ListItemIcon>
                                        <Avatar alt={user.name} src="https://material-ui.com/static/images/avatar/1.jpg" />
                                    </ListItemIcon>
                                    <ListItemText primary={user.name}>{user.name}</ListItemText>
                                    <ListItemText secondary={user.unread ? "Mới" : user.online ? "online" : "offline"} align="right" className={
                                        user.unread ? classes.unread : user.online ? classes.online : classes.offline
                                    }></ListItemText>
                                </ListItem>

                            ))}


                    </List>
                </Grid>
                <Grid item xs={9}
                    direction="column"
                    justifyContent="space-between"
                    alignItems="center">
                    {!selectedUser.id ? (<p>Chọn một khách hàng để chat</p>) : (<>
                        <List className={classes.messageHeader}>
                            <ListItem key="1">
                                <Grid container >
                                    <ListItem button key="RemySharp">
                                        <ListItemIcon>
                                            {/* <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" /> */}
                                            <StyledBadge
                                                overlap="circular"
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                variant="dot"
                                            >
                                                <Avatar alt={selectedUser.name} src="/static/images/avatar/1.jpg" />
                                            </StyledBadge>
                                        </ListItemIcon>
                                        <ListItemText primary={selectedUser.name} noWrap ></ListItemText>

                                    </ListItem>
                                </Grid>
                            </ListItem>
                        </List>
                        <Divider />
                        <List className={classes.messagesContent} >
                            <ListItem>
                                <Grid container >
                                    {messages.length === 0 && <li>No message.</li>}
                                    {/* {messages.map((msg, index) => (

                                    <Grid item xs={12} key={index}>
                                        <ListItemText align="right" primary={`${msg.name}: ${msg.body}`}></ListItemText>
                                    </Grid>
                                ))} */}

                                    {/* {messages.map((msg, index) => {
                                    if (msg.name === current.email) {
                                        return <MessageRight
                                            message={msg.body}
                                            timestamp={formatDate(msg.date)}
                                            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                                            displayName={msg.name}
                                            avatarDisp={true}
                                        />
                                    }
                                    else {
                                        return <MessageLeft
                                            message={msg.body}
                                            timestamp={formatDate(msg.date)}
                                            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                                            displayName={msg.name}
                                            avatarDisp={true}
                                        />
                                    }
                                    // <li key={index}>
                                    //   <strong>{`${msg.name}: `}</strong> {msg.body}
                                    // </li>
                                })} */}
                                    {messages.length > 0 && (
                                        <Paper className={classes.paper} zDepth={2} >

                                            <Paper id="style-1" className={classes.messagesBody} ref={uiMessagesRef} >
                                                {messages.map((msg, index) => {
                                                    if (msg.name === current.email) {
                                                        return <MessageRight
                                                            message={msg.body}
                                                            timestamp={msg.date}

                                                            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                                                            displayName={msg.name}
                                                            avatarDisp={true}
                                                        />
                                                    }
                                                    else {
                                                        return <MessageLeft
                                                            message={msg.body}
                                                            timestamp={msg.date}
                                                            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                                                            displayName={msg.name}
                                                            avatarDisp={true}
                                                        />
                                                    }
                                                    // <li key={index}>
                                                    //   <strong>{`${msg.name}: `}</strong> {msg.body}
                                                    // </li>
                                                })}


                                            </Paper>
                                            {/* <TextInput onSubmit={submitHandler} /> */}
                                        </Paper>)}
                                </Grid>
                            </ListItem>

                        </List>
                        <Divider />
                        <Box >

                            <form onSubmit={submitHandler} className={classes.wrapForm}>

                                <TextField id="outlined-basic-email" label="Type Something" fullWidth value={messageBody}
                                    onChange={(e) => setMessageBody(e.target.value)} />


                                <Button type="submit">

                                    <SendIcon />
                                </Button>

                            </form>



                        </Box>


                    </>)}

                </Grid >
            </Grid >
        </Container >
    );
}

export default Chat;