import React from 'react' ;
import { useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, Stack, Collapse, Alert } from '@mui/material';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import FormatAlignLeftRoundedIcon from '@mui/icons-material/FormatAlignLeftRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import { useNavigate } from 'react-router-dom';
import ImageSearchRoundedIcon from '@mui/icons-material/ImageSearchRounded';

const HomeScreen = () => { 
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const handleCheckout = async (e) => { 
        e.preventDefault();
        if (localStorage.getItem("authToken")) {
            try { 
                const token = await axios.get("/api/auth/refresh-token");
                if (token.data) {
                    const config = {headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token.data}` } };
                    const sub = await axios.get("/api/auth/subscription", config);
                    if (sub.data.subscription) { 
                        console.log("SHould Navigate to Summary");
                        navigate("/summary")
                    } else {
                        const session = await axios.post("/api/stripe/checkout", {priceId: "price_1MoT9QKFl1X2m5yhnqpozGKI", sub: "normal"}, config);
                        if (session.data) {
                            window.open(session.data.url, "_self");
                        }
                    }
                } 
            } catch (err) {
                if (err.response.data.message) {
                    setError(err.response.data.message);
                    setTimeout(() => {setError("");}, 3000);
                }
            }
        } else {
            setError("Please login to continue");
            setTimeout(() => {setError("");}, 3000);
        }
    }

    return (
        <Box p={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Collapse in={Boolean(error)}>
                <Alert severity="error" sx={{mb:2}}>{error}</Alert>
            </Collapse>
            <Typography  ml={4} fontWeight="bold" variant="h4" my={2}>Text Generation</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Card onClick={ handleCheckout }
                        sx={{ boxShadow:2, borderRadius: 5, height:190, width:280, '&:hover': {border: 2, boxShadow: 0, borderColor:"primary.dark", cursor: "pointer"}, mb: 3, mr: 3 }}>
                    <DescriptionRoundedIcon sx={{fontSize: 80, color: "primary.main", mt: 2, ml: 2}}/>
                    <Stack p={3} pt={0}>
                        <Typography fontWeight="bold" variant="h5">Text Summarizer</Typography>
                        <Typography variant="h6">Summarize long and tedious articles into just a few sentences!</Typography>
                    </Stack>
                </Card>
                <Card onClick={  () => navigate("/paragraph") }
                        sx={{ boxShadow:2, borderRadius: 5, height:190, width:280, '&:hover': {border: 2, boxShadow: 0, borderColor:"primary.dark", cursor: "pointer"}, mb: 3, mr: 3 }}>
                    <FormatAlignLeftRoundedIcon sx={{fontSize: 80, color: "primary.main", mt: 2, ml: 2}}/>
                    <Stack p={3} pt={0}>
                        <Typography fontWeight="bold" variant="h5">Paragraph Generator</Typography>
                        <Typography variant="h6">Generate an informative blurb about any topic!</Typography>
                    </Stack>
                </Card>
                <Card onClick={  () => navigate("/chatbot") }
                        sx={{ boxShadow:2, borderRadius: 5, height:190, width:280, '&:hover': {border: 2, boxShadow: 0, borderColor:"primary.dark", cursor: "pointer"}, mb: 3, mr: 3 }}>
                    <ChatRoundedIcon sx={{fontSize: 80, color: "primary.main", mt: 2, ml: 2}}/>
                    <Stack p={3} pt={0}>
                        <Typography fontWeight="bold" variant="h5">Yoda Chat Bot</Typography>
                        <Typography variant="h6">Gain insight from a yoda-like virtual assistant!</Typography>
                    </Stack>
                </Card>
            </Box>

            <Typography fontWeight="bold" variant="h4" ml={4} mt={8} mb={2}>Code Generation</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Card onClick={  () => navigate("/js-convert") }
                        sx={{ ml: 4, boxShadow:2, borderRadius: 5, height:190, width:280, '&:hover': {border: 2, boxShadow: 0, borderColor:"primary.dark", cursor: "pointer"}, mb: 3, mr: 3 }}>
                    <DescriptionRoundedIcon sx={{fontSize: 80, color: "primary.main", mt: 2, ml: 2}}/>
                    <Stack p={3} pt={0}>
                        <Typography fontWeight="bold" variant="h5">Javascript Converter</Typography>
                        <Typography variant="h6">Translate english into javascript code!</Typography>
                    </Stack>
                </Card>
            </Box>
            <Typography fontWeight="bold" variant="h4" ml={4} mt={8} mb={2}>Image Generation</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Card onClick={  () => navigate("/scifi-img") }
                        sx={{ ml: 4, boxShadow:2, borderRadius: 5, height:190, width:280, '&:hover': {border: 2, boxShadow: 0, borderColor:"primary.dark", cursor: "pointer"}, mb: 3, mr: 3 }}>
                    <ImageSearchRoundedIcon sx={{fontSize: 80, color: "primary.main", mt: 2, ml: 2}}/>
                    <Stack p={3} pt={0}>
                        <Typography fontWeight="bold" variant="h5">Scifi Image Generator</Typography>
                        <Typography variant="h6">Create a science-fiction version of an image concept!</Typography>
                    </Stack>
                </Card>
            </Box>
        </Box>
    )
}

export default HomeScreen;