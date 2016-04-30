import React, { PropTypes } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { Icon, SR } from '../helpers.jsx';

const HorizontalAlign = ({ value, onChange }) => (
  <ButtonGroup>
    <Button onClick={() => onChange('left')}    active={value === 'left'}>
      <Icon name="fa-align-left" title="Left" />
      <SR>Left</SR>
    </Button>
    <Button onClick={() => onChange('center')}  active={value === 'center'}>
      <Icon name="fa-align-center" title="Center" />
      <SR>Center</SR>
    </Button>
    <Button onClick={() => onChange('right')}   active={value === 'right'}>
      <Icon name="fa-align-right" title="Right" />
      <SR>Right</SR>
    </Button>
    <Button onClick={() => onChange('justify')} active={value === 'justify'}>
      <Icon name="fa-align-justify" title="Justify" />
      <SR>Justify</SR>
    </Button>
  </ButtonGroup>
);

HorizontalAlign.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired
};

export default HorizontalAlign;
