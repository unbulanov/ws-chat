import React from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';


const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 1 }}
                >
                    <MenuIcon></MenuIcon>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        ml: 2,
                    }}
                >
                    Chat
                </Typography>
                </IconButton>
            </Toolbar>
        </AppBar>
    </Box>
  )
}

export default Header