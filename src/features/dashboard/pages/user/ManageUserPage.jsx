import EditIcon from '@mui/icons-material/Edit';
import { Button, Container, FormControlLabel, IconButton, Switch } from '@mui/material';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useHttp from 'hooks/use-http';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import userApi from '../../../../api/userApi';
import Modal from '../../../../components/Modal';
import LoadingLinear from 'components/LoadingLinear';
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


let flag = true
function ManageUserPage(props) {
    const classes = useStyles();
    const [subcategories, setSubCategories] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = React.useState(null);
    const { updateUser, getAll, add, remove } = userApi;
    const { sendRequest: update, status: statusUpdate, error: errorUpdate } = useHttp(updateUser, true);
    const { sendRequest: getAllUser, status: statusGet, data: listUsers, error: errorGet } = useHttp(getAll, false)
    const { sendRequest: removeUser, status: statusRemove, error: errorRemove } = useHttp(remove, false)
    const [checked, setChecked] = React.useState({});
    const [users, setUsers] = React.useState([]);
    useEffect(() => {

        if (statusGet === 'completed' && !errorGet) {
            setUsers(listUsers)
            // enqueueSnackbar("Get Thành công", { variant: "success" })
        }
        if (statusGet === 'completed' && errorGet) {
            toast.error(errorGet)
        }
    }, [statusGet, errorGet, listUsers])


    useEffect(() => {
        if (statusUpdate === 'completed' || statusRemove === 'completed') {

            getAllUser()

        }
    }, [getAllUser, statusUpdate, statusRemove])
    useEffect(() => {
        getAllUser()
    }, [getAllUser])

    useEffect(() => {
        if (statusRemove === 'completed' && !errorRemove) {
            // enqueueSnackbar("Xoa dia chỉ thành công", { variant: "success" })
        }
        if (statusRemove === 'completed' && errorRemove) {
            // enqueueSnackbar(errorRemove, { variant: "error" })
        }

    }, [statusRemove, errorRemove])
    useEffect(() => {

        if (statusUpdate === 'completed' && !errorUpdate) {
            // enqueueSnackbar("Cập nhật thành công", { variant: "success" })

        }
        if (statusUpdate === 'completed' && errorUpdate) {
            // enqueueSnackbar(errorUpdate, { variant: "error" })
        }
    }, [statusUpdate, errorUpdate])
    const handelAddClick = (id) => {
        navigate(`create`)
    }
    const handelEditClick = (id) => {
        navigate(`${id}/edit`)
    }
    const handleClickOpen = (id) => {
        console.log('click', id)
        setOpen(id)
    }
    const handleCloseModal = () => {
        console.log('Hủy bỏ')
        setOpen(!open)
    }
    const handleDeleteClick = async (id) => {
        setOpen(!open)

        removeUser(id)
    }

    const toggleChecked = (event) => {
        console.log(event)
        update({ id: event.target.name, active: event.target.checked })
        setChecked({ ...checked, [event.target.name]: event.target.checked });
        console.log(checked)
    };
    return (
        <Container style={{ maxWidth: '100%' }}>
            <Modal handleClick={open} onClose={handleCloseModal} handleDeleteClick={handleDeleteClick} />
            {statusGet === 'pending' && (<LoadingLinear />)}
            {statusGet === 'completed' && (
                <TableContainer component={Paper}>
                    <Button onClick={handelAddClick} variant="outlined" color="primary">Thêm nhân viên</Button>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Mã người dùng</TableCell>
                                <TableCell align="left">Tên</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Vai trò</TableCell>
                                <TableCell align="left">Trạng thái</TableCell>
                                <TableCell align="left">Hành đông</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell align="left">
                                        {row._id}
                                    </TableCell>
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="left">{row.email}</TableCell>



                                    <TableCell align="left">{row.role === 'user' ? (
                                        <Chip label={row.role} color="success" />

                                    ) : row.role === 'admin' ? (<Chip label={row.role} color="error" />) : (<Chip label={row.role} color="info" />)}</TableCell>
                                    <TableCell align="left"> <FormControlLabel label=""
                                        control={<Switch size="small" checked={row.active} onChange={toggleChecked} />}

                                        name={row._id}
                                    /></TableCell>
                                    <TableCell align="left">

                                        <IconButton onClick={() => handelEditClick(row._id)}>
                                            <EditIcon></EditIcon>
                                        </IconButton>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>)}
        </Container>
    );
}

export default ManageUserPage;