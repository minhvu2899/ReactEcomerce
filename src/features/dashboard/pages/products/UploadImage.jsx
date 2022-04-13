import React from 'react'
import { Box, Button, Typography, Badge, Avatar, Grid, Paper } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import LoadingLinear from 'components/LoadingLinear';
const UploadImage = ({ form, onUpload, loading, onRemove, onUploadSub }) => {
    const image = form.watch('imageCover')
    const images = form.watch('images')
    console.log(image)
    const handelImageChange = (e) => {
        const file = e.target.files[0];
        if (!onUpload) return;
        onUpload(file)
    }
    const handelImageSubChange = (e, idx) => {
        const file = e.target.files[0];
        console.log("sub", file, idx)
        if (!onUploadSub) return;
        onUploadSub(file, idx)
    }
    const handelRemoveImage = (public_id) => {
        if (!onRemove) return;
        onRemove(public_id)
    }
    const handelClickRemoveImages = () => { }
    return (
        <Paper align="left" sx={{ p: 2 }}>
            <Typography variant="h6" align="left">Chọn ảnh chính</Typography>
            {loading && <LoadingLinear />}
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="images"
                type="file"
                name="imageCover"
                {...form.register("imageCover")}
                onChange={handelImageChange}
            />
            <label htmlFor="images">
                <Button variant="contained" color="primary" component="span">
                    Upload ảnh
                </Button>

            </label>
            <Box align="left" paddingTop={2} >

                <Badge onClick={() => handelRemoveImage(image.public_id)} badgeContent="X" color="secondary" style={{ cursor: 'pointer' }}>
                    <Avatar alt="Remy Sharp" src={image.url} sx={{ width: 120, height: 120 }}
                        variant="rounded" />
                </Badge>
            </Box>
            <Typography variant="h6" align="left">Chọn ảnh phụ</Typography>


            <Grid container>
                {(images && images.length > 0) && images.map((image, idx) => (
                    <Grid item md={3}>
                        <Box align="left" sx={{ p: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <label htmlFor={`image-${idx}`}>
                                <Button variant="contained" color="primary" component="span">
                                    Upload ảnh
                                </Button>

                            </label>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id={`image-${idx}`}
                                name={`image-${idx}`}
                                type="file"
                                onChange={(e) => handelImageSubChange.call(null, e, idx)}
                            />
                            {image.url ? (<Box><Badge onClick={() => handelClickRemoveImages(idx)} badgeContent="X" color="secondary" style={{ cursor: 'pointer' }}>
                                <Avatar alt="Remy Sharp" src={image.url} sx={{ width: 120, height: 120 }}
                                    variant="rounded" />
                            </Badge></Box>) : (

                                <Avatar alt="Remy Sharp" src={image.url} sx={{ width: 120, height: 120 }}
                                    variant="rounded" />

                            )}

                        </Box>

                    </Grid>
                ))}
            </Grid>
        </Paper>
    )
}

export default UploadImage