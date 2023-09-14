import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

const Messages = ({ messages, name }) => {
    return (
      <Box 
        sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}
      >
        <Box
            sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}
        >
            {messages.map(({ user, message }, i) => {
            const itsMe =
                user.name.trim().toLowerCase() === name.trim().toLowerCase();

            return (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: itsMe ? 'flex-end' : 'flex-start',
                        mb: 2,
                    }}
                    key={i}
                >
                    <Paper
                        variant='outlined'
                        sx={{
                            p: 1,
                            backgroundColor: itsMe ? 'primary.light' : 'secondary.light',
                            borderRadius: itsMe ? '20px 20px 20px 5px' : '20px 20px 5px 20px'
                        }}
                    >
                        <Typography variant='body1'>{message}</Typography>
                    </Paper>
                </Box>
            );
            })}
        </Box>
      </Box>
    );
  };

export default Messages;