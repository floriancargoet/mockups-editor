import React, { PropTypes } from 'react';

const Color = ({ id, value, onChange }) => (
  <input id={id} type="color" value={value} onChange={ev => onChange(ev.target.value)} />
);

Color.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Color;
