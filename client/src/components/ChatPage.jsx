import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Box, Button, Container } from '@mui/material';

const socket = io.connect("http://localhost:5001");

const ChatPage = () => {
  const { search } = useLocation();
  const [params, setParams] = useState({ room: "", user: "" });
  const [state, setState] = useState([]);
  const [message, setMessage] = useState("");
  const [isOpen, setOpen] = useState(false);


  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit('join', searchParams);
  }, [search]);

  useEffect(() => {
    socket.on('message', ({ data }) => {
      setState((_state) => ([..._state, data]));
    });
  }, []);

  const leftRoom = () => {};
  const handleChange = () => {};
  const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`);
  const handleSubmit = () => {};

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Box sx={{ bgcolor: '#cfe8fc' }}>
          <div>
            {params.room}
          </div>
          <div>
            0 users in this room
          </div>
          <div>
            {state.map(({ message }, i) => <span key={i}>{message}</span>)}
          </div>
          <Button variant="contained" onClick={leftRoom}>
            Left the room
          </Button>
        </Box>
        <form>
          <div>
            <input
              type="text"
              name="message"
              value={message}
              placeholder="What do you want to say?"
              autoComplete="off"
              required
              onChange={handleChange}
            />
          </div>
          
          <div>
            <EmojiEmotionsIcon color="info" onClick={() => setOpen(!isOpen)} />

            {isOpen && (
              <div>
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>

          <div>
            <input type="submit" onSubmit={handleSubmit} value="Send a message" />
          </div>
        </form>
      </Container>
    </React.Fragment>
  );
};

export default ChatPage;