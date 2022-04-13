import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Container, FormControlLabel, IconButton, Switch } from '@mui/material';
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
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import subcategoryApi from '../../../../api/subcategoryApi';
// import Modal from '../../../../components/Modal';
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


function ManageSubCategoryPage(props) {
    const classes = useStyles();

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(null);
    const { update, getAll, remove } = subcategoryApi;
    const { sendRequest: updateSubCategory, status: statusUpdate, error: errorUpdate } = useHttp(update, true);
    const { sendRequest: getAllSubCategory, status: statusGetSub, data: listSubCategories, error: errorGet } = useHttp(getAll, false)
    const { sendRequest: removeSubCategory, status: statusRemove, error: errorRemove } = useHttp(remove, false)
    const [checked, setChecked] = React.useState({});
    const [subcategoryList, setSubCategoryList] = React.useState([]);

    useEffect(() => {
        if (statusGetSub === 'completed' && !errorGet) {
            setSubCategoryList(listSubCategories)
        }
    }, [statusGetSub, errorGet, listSubCategories])
    useEffect(() => {

        if (statusGetSub === 'completed' && !errorGet) {
            toast.success("Get Thành công")
        }
        if (statusGetSub === 'completed' && errorGet) {
            toast.error(errorGet)
        }
    }, [statusGetSub, errorGet])

    useEffect(() => {
        getAllSubCategory()
    }, [getAllSubCategory]);

    useEffect(() => {
        if (statusUpdate === 'completed' || statusRemove === 'completed') {

            getAllSubCategory()

        }
    }, [getAllSubCategory, statusUpdate, statusRemove])

    useEffect(() => {
        if (statusRemove === 'completed' && !errorRemove) {
            toast.success("Xóa thành công")
        }
        if (statusRemove === 'completed' && errorRemove) {
            toast.error(errorRemove)
        }

    }, [statusRemove, errorRemove])
    useEffect(() => {

        if (statusUpdate === 'completed' && !errorUpdate) {
            toast.success("Cập nhật Thành công")

        }
        if (statusUpdate === 'completed' && errorUpdate) {
            toast.error(errorUpdate)
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

        removeSubCategory(id)
    }

    const toggleChecked = (event) => {
        console.log(event)
        updateSubCategory({ id: event.target.name, isActive: event.target.checked })
        setChecked({ ...checked, [event.target.name]: event.target.checked });
        console.log(checked)
    };
    return (
        <Container style={{ maxWidth: '100%' }}>
            {/* <Modal handleClick={open} onClose={handleCloseModal} handleDeleteClick={handleDeleteClick} /> */}


            <TableContainer component={Paper}>
                <Button onClick={handelAddClick} variant="outlined" color="primary">Thêm sản phẩm</Button>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Mã danh mục</TableCell>
                            <TableCell align="left">Tên danh mục</TableCell>
                            <TableCell align="left">Danh mục cha</TableCell>
                            <TableCell align="left">Slug</TableCell>
                            <TableCell align="left">Mô tả</TableCell>
                            <TableCell align="left">Active</TableCell>
                            <TableCell align="left">Hành đông</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {subcategoryList.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="left">
                                    {row.id}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.category.name}</TableCell>


                                <TableCell align="left">{row.slug}</TableCell>
                                <TableCell align="left">{row.description}</TableCell>
                                <TableCell align="left"> <FormControlLabel label=""
                                    control={<Switch size="small" checked={row.isActive} onChange={toggleChecked} />}

                                    name={row.id}
                                /></TableCell>
                                <TableCell align="left">

                                    <IconButton onClick={() => handelEditClick(row.id)}>
                                        <EditIcon></EditIcon>
                                    </IconButton>
                                    <IconButton onClick={() => handleClickOpen(row.id)}>
                                        <DeleteIcon></DeleteIcon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default ManageSubCategoryPage;