import React, { PropTypes } from 'react';
import { ButtonGroup, Button, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { Icon, SR } from '../helpers.jsx';

const VerticalAlign = ({ id, label, value, readOnly, onChange }) => (
  <FormGroup>
    <Col componentClass={ControlLabel} xs={3}>{label}</Col>
    <Col xs={9}>
      <ButtonGroup vertical>
        <Button onClick={() => onChange('top')} active={value === 'top'} disabled={readOnly}>
          <Icon name="im-vertical-align-top" title="Top" />
          <SR>Top</SR>
        </Button>
        <Button onClick={() => onChange('middle')} active={value === 'middle'} disabled={readOnly}>
          <Icon name="im-vertical-align-middle" title="Middle" />
          <SR>Middle</SR>
        </Button>
        <Button onClick={() => onChange('bottom')} active={value === 'bottom'} disabled={readOnly}>
          <Icon name="im-vertical-align-bottom" title="Bottom" />
          <SR>Bottom</SR>
        </Button>
      </ButtonGroup>
    </Col>
  </FormGroup>
);

VerticalAlign.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
};

export default VerticalAlign;
