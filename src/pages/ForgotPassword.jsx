import React from 'react'
import { Avatar, Box, Container,  Paper, TextField, Typography,  Button} from '@mui/material';
import LockOutlinedIcon from "@mui/icons-material/LockOutline";

const ForgotPassword = () => {
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
                <Typography component="h1" variant="h5" sx={{ textAlign: "center", mb: 2 }}>
                    Recover your password
                </Typography>
                <Box
                    component='form'
                    sx={{ mt: 1 }}>
                    <TextField
                        placeholder="Enter your valid email address"
                        fullWidth
                        required
                        autoFocus
                        sx={{ mb: 2 }}
                        type='email' />
                    <Button type='submit' variant='contained' fullWidth sx={{ mt: 1 }}>Send</Button>
                </Box>
            </Paper>
        </Container>
  )
}

export default ForgotPassword
