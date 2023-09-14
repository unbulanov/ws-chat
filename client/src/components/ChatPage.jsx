import React, { Fragment, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';

import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Box, Button, Container, DialogContentText, Grid, Input, InputBase, Paper, TextField, Typography } from '@mui/material';
import SendIcon from "@mui/icons-material/Send";

import Messages from './Messages';
import Header from './Header';

const socket = io.connect("http://localhost:5001");

const ChatPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [params, setParams] = useState({ room: "", user: "" });
  const [state, setState] = useState([]);
  const [message, setMessage] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [users, setUsers] = useState(0);


  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit('join', searchParams);
  }, [search]);

  useEffect(() => {
    socket.on('message', ({ data }) => {
      setState((_state) => [..._state, data]);
    });
  }, []);

  useEffect(() => {
    socket.on('room', ({ data: { users } }) => {
      setUsers(users.length);
    });
  }, []);

  const leftRoom = () => {
    socket.emit('leftRoom', { params });
    navigate('/');
  };

  const handleChange = ({ target: { value }}) => setMessage(value);

  const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message) return;

    socket.emit('sendMessage', { message, params });

    setMessage('');
  };

  return (
    <Fragment>
      <Header />
      <Container maxWidth='md'>
        <Box sx={{
          bgcolor: 'grey.200',
          height: '600px',
          mt: 1,
          display: 'flex',
          flexDirection: 'column',
          }}>
            <Typography
              sx={{ textAlign: 'center' }}
              variant='h7'
            >
            {params.room}
            </Typography>
            
            <Typography
              sx={{ textAlign: 'center' }}
              variant='h7'
            >
            {users} users in this room
            </Typography>      
        <Box sx={{ flexGrow: 1, overflow: "auto", p: 1 }}>
          <Messages messages={state} name={params.name} />
        </Box>

        <Box sx={{ p: 2, backgroundColor: "background.default" }}>
          <Button variant="contained" onClick={leftRoom}>
            Left the room
          </Button>
        </Box>

        <Paper
          component='form'
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '400' }}
          onSubmit={handleSubmit}>

            <InputBase
              sx={{ ml: 1, flex: 1 }}
              name="message"
              value={message}
              placeholder="What do you want to say?"
              autoComplete="off"
              required
              onChange={handleChange}
            />
          
          <div>
            <EmojiEmotionsIcon sx={{ mr: 2 }} color="info" onClick={() => setOpen(!isOpen)} />

            {isOpen && (
              <div>
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>

          
            <Button color='primary' variant='contained' endIcon={<SendIcon />} onSubmit={handleSubmit} />
        </Paper>
        </Box>
      </Container>
    </Fragment>
  );
};

export default ChatPage;