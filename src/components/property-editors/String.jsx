import React, { PropTypes } from 'react';
import { FormGroup, ControlLabel, FormControl, Col } from 'react-bootstrap';

const StringEditor = ({ id, label, value, readOnly, onChange }) => (
  <FormGroup controlId={id}>
    <Col componentClass={ControlLabel} xs={3}>{label}</Col>
    <Col xs={9}>
      <FormControl
        type="text"
        value={value}
        readOnly={readOnly}
        onChange={ev => onChange(ev.target.value)}
      />
      <FormControl.Feedback />
    </Col>
  </FormGroup>
);


StringEditor.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
};

export default StringEditor;
