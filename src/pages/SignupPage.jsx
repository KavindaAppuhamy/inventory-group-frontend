import React from 'react'
import { Avatar, Box, Container, Paper, TextField, Typography, Button, Grid, Link } from '@mui/material';
import LockOutlinedIcon from "@mui/icons-material/LockOutline";
import { Link as RouterLink } from 'react-router-dom';

const SignupPage = () => {

    return (
        <Container maxWidth="xs">
            <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
                <Avatar sx={{
                    mx: "auto",
                    bgcolor: "secondary.main",
                    textAlign: "center",
                    mb: "1",
                }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
                    Sign Up
                </Typography>
                <Box
                    component='form'
                    sx={{ mt: 1 }}>
                    <TextField
                        placeholder="Enter username"
                        fullWidth
                        required
                        autoFocus
                        sx={{ mb: 2 }} />
                    <TextField
                        placeholder="Enter password"
                        fullWidth
                        required
                        type='password'
                        sx={{ mb: 2 }} />
                    <TextField
                        placeholder="Enter email"
                        fullWidth
                        required
                        type='email' />
                    <Button type='submit' variant='contained' fullWidth sx={{ mt: 2 }}>Register</Button>
                </Box>
                <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                    <Grid item>
                        <Link component={RouterLink} to="/" >Already have an account ?</Link>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default SignupPage
