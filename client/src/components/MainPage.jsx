import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';

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

  return (
    <>
    <Header />
    <div className=''>
      <div>
        <h1 className=''>Join</h1>

        <form>
          <div>
            <input
              type="text"
              name="name"
              value={values[NAME]}
              placeholder="Username"
              className=""
              autoComplete="off"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="room"
              value={values[ROOM]}
              placeholder="Room"
              className=""
              autoComplete="off"
              required
              onChange={handleChange}
            />
          </div>
          <Link
            onClick={handleClick}
            to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
          >
            <button type="submit" className="">
              Sign In
            </button>
          </Link>
        </form>
      </div>
    </div>
    </>
  );
};

export default MainPage;