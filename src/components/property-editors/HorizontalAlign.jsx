import React, { PropTypes } from 'react';
import { ButtonGroup, Button, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { Icon, SR } from '../helpers.jsx';

const HorizontalAlign = ({ id, label, value, readOnly, onChange }) => (
  <FormGroup>
    <Col componentClass={ControlLabel} xs={3}>{label}</Col>
    <Col xs={9}>
      <ButtonGroup>
        <Button onClick={() => onChange('left')} active={value === 'left'} disabled={readOnly}>
          <Icon name="fa-align-left" title="Left" />
          <SR>Left</SR>
        </Button>
        <Button onClick={() => onChange('center')} active={value === 'center'} disabled={readOnly}>
          <Icon name="fa-align-center" title="Center" />
          <SR>Center</SR>
        </Button>
        <Button onClick={() => onChange('right')} active={value === 'right'} disabled={readOnly}>
          <Icon name="fa-align-right" title="Right" />
          <SR>Right</SR>
        </Button>
        <Button onClick={() => onChange('justify')} active={value === 'justify'} disabled={readOnly}>
          <Icon name="fa-align-justify" title="Justify" />
          <SR>Justify</SR>
        </Button>
      </ButtonGroup>
    </Col>
  </FormGroup>
);

HorizontalAlign.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
};

export default HorizontalAlign;
