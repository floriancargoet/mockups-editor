import React, { PropTypes } from 'react';
import { FormGroup, ControlLabel, Button, Col } from 'react-bootstrap';

import { Icon, SR } from '../helpers.jsx';

const BooleanEditor = ({ id, label, value, readOnly, onChange }) => (
  <FormGroup controlId={id}>
    <Col componentClass={ControlLabel} xs={3}>{label}</Col>
    <Col xs={9}>
      <Button
        active={value} disable={readOnly} title={value ? 'UnLock' : 'Lock'}
        onClick={() => onChange(!value)}
      >
        <Icon name="fa-lock"  />
        <SR>{value ? 'UnLock' : 'Lock'}</SR>
      </Button>
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
