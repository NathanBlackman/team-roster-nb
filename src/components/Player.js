import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

export default function Player({ array }) {
  return (
    <>
      <div className="alert alert-light" role="alert">
        {array.imageUrl}
        {array.name}
        <button className="btn btn-success" type="button">
          Delete
        </button>
      </div>
    </>
  );
}

Player.propTypes = {
  array: PropTypes.shape({
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};
