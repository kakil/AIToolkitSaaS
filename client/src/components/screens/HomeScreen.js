import React from 'react';
import { Box,Typography, Card, Stack } from '@mui/material';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import FormatAlignLeftRoundedIcon from '@mui/icons-material/FormatAlignLeftRounded';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
    const navigate = useNavigate();

    return (
        <Box p={2}>
            <Typography fontWeight="bold" variant="h4">Text Generation</Typography>
            <Stack direction="row" spacing={2}>
                <Card onClick={ () => navigate("/summary") }
                    sx={{ boxShadow:2, borderRadius: 5, height:190, width:280, '&:hover': {border: 2, boxShadow: 0, borderColor:"primary.dark", cursor: "pointer"}}}>
                    <DescriptionRoundedIcon sx={{fontSize: 80, color: "primary.main", mt: 2, ml: 2}}/>
                    <Stack p={3} pt={0}>
                        <Typography fontWeight="bold" variant="h5">Text Summarizer</Typography>
                        <Typography variant="h6">Summarize long and tedious articles into just a few sentences!</Typography>
                    </Stack>
                </Card>
                <Card onClick={ () => navigate("/paragraph") }
                    sx={{ boxShadow:2, borderRadius: 5, height:190, width:280, '&:hover': {border: 2, boxShadow: 0, borderColor:"primary.dark", cursor: "pointer"}}}>
                    <FormatAlignLeftRoundedIcon sx={{fontSize: 80, color: "primary.main", mt: 2, ml: 2}}/>
                    <Stack p={3} pt={0}>
                        <Typography fontWeight="bold" variant="h5">Paragraph Generator</Typography>
                        <Typography variant="h6">Generate an informative blurb about any topic.</Typography>
                    </Stack>
                </Card>
            </Stack>
        </Box>

    )
}

export default HomeScreen;

