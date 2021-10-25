import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPlayer } from '../api/data/playerData';

const initialState = {
  name: '',
  imageUrl: '',
  position: '',
  uid: '',
};

export default function PlayerForm({ obj, setPlayers, setEditItem }) {
  const [formInput, setInput] = useState(initialState);

  useEffect(() => {
    if (obj.firebaseKey) {
      setInput({
        name: obj.name,
        imageUrl: obj.imageUrl,
        position: obj.position,
        firebaseKey: obj.firebaseKey,
        uid: obj.uid,
      });
    }
  }, [obj]);

  const resetForm = () => {
    setInput({ ...initialState });
    setEditItem({});
  };

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      // update
    } else {
      createPlayer({ ...formInput }).then((players) => {
        setPlayers(players);
        resetForm();
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <br />
          <input
            type="text"
            id="name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

PlayerForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    position: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }),
  setPlayers: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};

PlayerForm.defaultProps = {
  obj: {},
};
