import React from 'react' ;
import { Box, Link, Typography, useTheme, useMediaQuery, Collapse, Alert, TextField, Button, Card, Stack } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

const ChatbotScreen = () => { 
    const theme = useTheme();
    const isNotMobile = useMediaQuery("(min-width: 1000px)");
    
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const [response, setResponse] = useState("");

    
    const chatbotHandler = async (e) => { 
        e.preventDefault();

        try {
            const {data} = await axios.post("/api/openai/chatbot", {text});
            setResponse(data);
        } catch (err) {
            console.log(err);
            if (err.response.data.error) {
                setError(err.response.data.error);
            } else if (err.message) {
                setError(err.message);
            }
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }
    
    return (
        <Box width={isNotMobile ? "40%" : "80%" } 
            p="2rem" 
            m="2rem auto" 
            borderRadius={5} 
            backgroundColor={theme.palette.background.alt} 
            sx={{boxShadow:5}}
        >
            <Collapse in={Boolean(error)}>
                <Alert severity="error" sx={{mb:2}}>{error}</Alert>
            </Collapse>
            <form onSubmit={chatbotHandler}>
                <Typography variant="h3" mb={2}>Yoda Chatbot</Typography>
                <Stack direction="row" spacing={1}>
                    <Box width="87%">
                        <TextField multiline={Boolean(true)} placeholder="Enter question topic here" fullWidth value={text} onChange={(e) => setText(e.target.value)}/>
                    </Box>
                    <Button disableElevation variant="contained" type="submit" sx={{color:"white"}}>Ask You Must</Button>
                </Stack>
            </form>
            { response ? 
                <Card sx={{mt:4, p:2, border: 1, boxShadow: 0, borderColor:"neutral.medium", borderRadius: 2, height: "300px", bgcolor: "background.default", overflow: "auto"}}>
                    <Typography variant="h3" color="primary.dark" sx={{textAlign: "left", verticalAlign: "middle", lineHeight: "40px"}} style={{wordWrap: "break-word" }}>
                        {response}
                    </Typography>
                </Card>
                : 
                <Card sx={{mt:4, p:2, border: 1, boxShadow: 0, borderColor:"neutral.medium", borderRadius: 2, height: "300px", bgcolor: "background.default"}}>
                    <Typography variant="h3" color="neutral.main" sx={{textAlign: "center", verticalAlign: "middle", lineHeight: "250px"}}>Response will appear here</Typography>
                </Card>
            }
            <Typography mt={2}>Not the tool you were looking for? <Link href="/">Go back</Link></Typography>
        </Box>
    )
}

export default ChatbotScreen;
