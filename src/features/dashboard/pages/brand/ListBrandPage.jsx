import React from 'react';
import { makeStyles } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Chip, Container, Grid, Box, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material'
import categoryApi from '../../../../api/categoryApi';
import brandApi from 'api/brandApi';
import { useNavigate, useMatch } from 'react-router';
import { STATIC_HOST } from 'constants/index';
import Modal from 'components/Modal';
import useHttp from 'hooks/use-http';
import { useSnackbar } from 'notistack';
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chip: {
        marginRight: '8px'
    }
});

let flag = true;

function ListBrandPage(props) {
    const classes = useStyles();
    const [brands, setBrands] = useState([]);
    const history = useNavigate()
    const match = useMatch();
    const url = match.url;
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = React.useState(null);
    const { remove, getAll } = brandApi;
    const { enqueueSnackbar } = useSnackbar()
    const { sendRequest: removeBrand, status: statusRemove, error: errorRemove } = useHttp(remove, false)
    const { sendRequest: getAllBrand, status: statusGet, data: listBrand, error: errorGet } = useHttp(getAll, false)
    useEffect(() => {
        if (statusRemove === 'completed' && !errorRemove) {
            enqueueSnackbar("Xóa danh mục thành công", { variant: "success" })
        }
        if (statusRemove === 'completed' && errorRemove) {
            enqueueSnackbar(errorRemove, { variant: "error" })
        }

    }, [statusRemove, errorRemove, enqueueSnackbar])
    useEffect(() => {
        if (statusRemove === 'completed' || flag) {
            flag = false;
            getAllBrand()

        }
    }, [getAllBrand, statusRemove])
    useEffect(() => {
        getAllBrand()
    }, [getAllBrand])
    // useEffect(() => {

    //     (async () => {
    //         try {
    //             const result = await brandApi.getAll();
    //             const { data } = result;
    //             setBrands(data);
    //             console.log(data);

    //         } catch (error) {
    //             console.log("Fetch data fair:", error);
    //         }
    //         setLoading(false);
    //     })();


    // }, []);
    const handelAddClick = (id) => {
        history.push(`${url}/create`)
    }
    const handelEditClick = (id) => {
        history.push(`${url}/${id}/edit`)
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

        removeBrand(id)
    }
    return (
        <Container style={{ maxWidth: '100%' }}>
            <Grid container>
                <Grid item xs={12} align="left" justify="center" alignItems="center">
                    <Box padding={1}>
                        <TextField id="outlined-search" label="Tìm kiếm" type="search" variant="outlined" size="small" fullWidth />

                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Modal handleClick={open} onClose={handleCloseModal} handleDeleteClick={handleDeleteClick} />
                    {statusGet === 'pending' && (<h1>Loading..............</h1>)}
                    {statusGet === 'completed' && (
                        <TableContainer component={Paper}>
                            <Button onClick={handelAddClick} variant="outlined" color="primary">Thêm thương hiệu</Button>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Mã thương hiệu</TableCell>
                                        <TableCell align="left">Tên thương hiệu</TableCell>
                                        <TableCell align="left">Slug</TableCell>
                                        <TableCell align="left">Logo</TableCell>
                                        <TableCell align="left">Danh mục</TableCell>
                                        <TableCell align="left">Hành đông</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listBrand.length > 0 && listBrand.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell align="left">
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="left">{row.name}</TableCell>


                                            <TableCell align="left">{row.slug}</TableCell>
                                            <TableCell align="left"><img src={`${STATIC_HOST}/${row.logo}`} alt="" style={{ width: '100px', height: '100px' }} /></TableCell>
                                            <TableCell align="left">{row.categories.map(category => (
                                                <Chip key={category.id} label={category.name} className={classes.chip} />
                                            ))}</TableCell>
                                            <TableCell align="left">
                                                <IconButton onClick={() => handelEditClick(row.id)}>
                                                    <EditIcon ></EditIcon>
                                                </IconButton>
                                                <IconButton onClick={() => handleClickOpen(row.id)}>
                                                    <DeleteIcon></DeleteIcon>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>)}
                </Grid>
            </Grid>

        </Container>
    );
}

export default ListBrandPage;