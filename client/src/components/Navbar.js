import React from 'react';
import { Box, Link, Typography, useTheme } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

const Navbar = () => {
    const theme = useTheme();
    const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem("authToken")));

    const logoutHandler = async () => {
        try {
            await axios.post("/api/auth/logout").then(res => fullyLogout(res.data));
        }catch(err) {
            console.log(err);
        }
    }

    const fullyLogout = (data) => {
        if(data.success) {
            localStorage.removeItem("authToken");
            window.location.reload();
        }
    }

    const checkRefresh = async () => {
        try {
            const token = await axios.get("/api/auth/refresh-token");

            if(!token.data) {
                localStorage.removeItem("authToken");
                setLoggedIn(false);
                logoutHandler();
            }
        } catch (err) {
            console.log(err);
        }
    }

    checkRefresh();

    return (
        <Box width="100%" p="1rem 6%" backgroundColor={theme.palette.background.alt} textAlign="center" sx={{boxShadow:3, mb: 2}}>
            <Typography variant="h3" color="primary" fontWeight="bold"><Link href="/" underline="none">AI Toolkit SaaS</Link></Typography>
            { loggedIn ? <Link href="/" onClick={logoutHandler} p={2}>Logout</Link> : <><Link href="/register" p={1}>Register</Link> 
            <Link href="/login" p={1}>Login</Link></> }
        </Box>
    )
}

export default Navbar;

