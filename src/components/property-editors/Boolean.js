import React, { PropTypes } from 'react';
import { FormGroup, ControlLabel, Checkbox, Col } from 'react-bootstrap';

const BooleanEditor = ({ id, label, value, readOnly, onChange }) => (
  <FormGroup controlId={id}>
    <Col componentClass={ControlLabel} xs={3}>{label}</Col>
    <Col xs={9}>
      <Checkbox
        id={id}
        type="checkbox"
        checked={value}
        readOnly={readOnly}
        onChange={ev => onChange(ev.target.checked)}
      />
    </Col>
  </FormGroup>
);


BooleanEditor.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
};

export default BooleanEditor;
