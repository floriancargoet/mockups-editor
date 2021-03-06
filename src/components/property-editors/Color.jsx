import React, { PropTypes } from 'react';
import { FormGroup, ControlLabel, FormControl, Col } from 'react-bootstrap';

const Color = ({ id, label, value, readOnly, onChange }) => (
  <FormGroup controlId={id}>
    <Col componentClass={ControlLabel} xs={3}>{label}</Col>
    <Col xs={9}>
      <FormControl
        type="color"
        value={value}
        disabled={readOnly}
        onChange={ev => onChange(ev.target.value)}
      />
      <FormControl.Feedback />
    </Col>
  </FormGroup>
);

Color.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
};

export default Color;
