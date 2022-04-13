import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Container, FormControlLabel, Grid, IconButton, Switch, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LoadingLinear from 'components/LoadingLinear';
import useHttp from 'hooks/use-http';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import categoryApi from '../../../../api/categoryApi';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


let flag = true
function ManageCategoryPage(props) {
    const classes = useStyles();
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = React.useState(null);
    const navigate = useNavigate();
    const params = useParams();

    const categoryId = params.id;
    const { update, remove, getAll } = categoryApi;
    const { sendRequest: updateCategory, status: statusUpdate, error: errorUpdate } = useHttp(update, true);
    const { sendRequest: getAllCategory, status: statusGet, data: listCategories, error: errorGet } = useHttp(getAll, true)
    const { sendRequest: removeCategory, status: statusRemove, error: errorRemove } = useHttp(remove, false)
    const [categoryList, setCategoryList] = React.useState([]);

    const toggleChecked = (event) => {

        updateCategory({ id: event.target.name, isActive: event.target.checked })
        // setChecked({ ...checked, [event.target.name]: event.target.checked });

    };
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

        setOpen(!open)
    }
    const handleDeleteClick = async (id) => {
        setOpen(!open)

        removeCategory(id)
    }
    useEffect(() => {
        getAllCategory()
    }, [getAllCategory]);

    useEffect(() => {
        if (statusUpdate === 'completed' || statusRemove === 'completed') {
            getAllCategory()
        }
    }, [getAllCategory, statusUpdate, statusRemove])
    useEffect(() => {
        if (statusGet === 'completed' && !errorGet) {
            setCategoryList(listCategories)
        }
    }, [getAllCategory, statusGet, errorGet, listCategories])
    useEffect(() => {
        if (statusRemove === 'completed' && !errorRemove) {
            toast.success("Xóa danh mục thành công")
        }
        if (statusRemove === 'completed' && errorRemove) {
            toast.error(errorRemove)
        }

    }, [statusRemove, errorRemove])
    useEffect(() => {

        if (statusUpdate === 'completed' && !errorUpdate) {
            toast.success("Cập nhật thành công")

        }
        if (statusUpdate === 'completed' && errorUpdate) {
            toast.error(errorUpdate)
        }
    }, [statusUpdate, errorUpdate])
    return (
        <Container style={{ maxWidth: '100%' }}>


            <Grid container>

                <Grid item xs={12} align="left" justify="center" alignItems="center">
                    <Box padding={1}>
                        <TextField id="outlined-search" label="Tìm kiếm" type="search" variant="outlined" size="small" fullWidth />

                    </Box>
                </Grid>
                <Grid item container>
                    <TableContainer component={Paper}>
                        <Button onClick={handelAddClick} variant="outlined" color="primary">Thêm danh mục</Button>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Mã danh mục</TableCell>
                                    <TableCell align="left">Tên danh mục</TableCell>
                                    <TableCell align="left">Slug</TableCell>
                                    <TableCell align="left">Mô tả</TableCell>
                                    <TableCell align="left">Active</TableCell>
                                    <TableCell align="left">Hành đông</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {statusGet === 'pending' && <LoadingLinear />}
                                {categoryList.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell align="left">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="left">{row.name}</TableCell>


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

                </Grid>
                {/* <Box className={classes.pagination}>

                        <Pagination color="primary" count={Math.ceil(pagination.total / pagination.limit)} page={Number(pagination.current_page)}
                            onChange={handlePageChange}
                        ></Pagination>

                    </Box> */}
            </Grid>

        </Container >
        // <Container style={{ maxWidth: '100%' }}>


        //     {loading && (<LoadingLinear />)}
        //     {!loading && (
        //         <Grid container>
        //             <Grid item container>
        //                 <Modal handleClick={open} onClose={handleCloseModal} handleDeleteClick={handleDeleteClick} />
        //             </Grid>
        //             <Grid item container xs={12}>
        //              
        //             </Grid>
        //         </Grid>)}

        // </Container>
    );
}

export default ManageCategoryPage;