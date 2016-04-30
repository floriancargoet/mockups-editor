import React, { PropTypes } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { Icon, SR } from '../helpers.jsx';

const VerticalAlign = ({ value, onChange }) => (
  <ButtonGroup vertical>
    <Button onClick={() => onChange('top')}    active={value === 'top'}>
      <Icon name="im-vertical-align-top" title="Top" />
      <SR>Top</SR>
    </Button>
    <Button onClick={() => onChange('middle')}  active={value === 'middle'}>
      <Icon name="im-vertical-align-middle" title="Middle" />
      <SR>Middle</SR>
    </Button>
    <Button onClick={() => onChange('bottom')}   active={value === 'bottom'}>
      <Icon name="im-vertical-align-bottom" title="Bottom" />
      <SR>Bottom</SR>
    </Button>
  </ButtonGroup>
);

VerticalAlign.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired
};

export default VerticalAlign;
