import React, { PropTypes } from 'react';
import { FormGroup, ControlLabel, FormControl, Col } from 'react-bootstrap';

const NumberEditor = ({ id, label, value, readOnly, onChange }) => (
  <FormGroup controlId={id}>
    <Col componentClass={ControlLabel} xs={3}>{label}</Col>
    <Col xs={9}>
      <FormControl
        type="number"
        value={value}
        readOnly={readOnly}
        onChange={ev => onChange(Number(ev.target.value))}
      />
      <FormControl.Feedback />
    </Col>
  </FormGroup>
);


NumberEditor.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
};

export default NumberEditor;
