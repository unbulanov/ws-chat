import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import { Avatar, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const FIELDS = {
  NAME: "name",
  ROOM: "room",
}

const MainPage = () => {
  const { NAME, ROOM } = FIELDS;

  const [values, setValues] = useState({ [NAME]: "", [ROOM]: "" });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleClick = (e) => {
    const isDisabled = Object.values(values).some((v) => !v);
    
    if (isDisabled) {
      e.preventDefault();
    };
  };

  const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" };

  return (
    <Fragment>
      <Header />
      <Grid>
        <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar sx={{ backgroundColor:'#1bbd7e' }}><LockOutlinedIcon/></Avatar>
          <Typography variant='h4' sx={{ mt: '20px' }}>Join chat</Typography>
        </Grid>

        <TextField
          type="text"
          name="name"
          value={values[NAME]}
          placeholder="Username"
          autoComplete="off"
          required
          fullWidth
          onChange={handleChange}
          sx={{
            mt: '50px',
            mb: '20px'
          }}
        />

        <TextField
          type="text"
          name="room"
          value={values[ROOM]}
          placeholder="Room"
          autoComplete="off"
          required
          fullWidth
          onChange={handleChange}
          sx={{
            mb: '20px'
          }}
        />
          <FormControlLabel control={<Checkbox name='checkedB' color='primary' />} label='Remember me' />
            <Link
              onClick={handleClick}
              to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
            >
              <Button variant='contained' color='primary'>
                Sign In
              </Button>
            </Link>
        </Paper>
      </Grid>
    </Fragment>
  );
};

export default MainPage;