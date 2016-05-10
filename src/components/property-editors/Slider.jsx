import React, { Component, PropTypes } from 'react';
import { FormGroup, ControlLabel, FormControl, Col } from 'react-bootstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';

export default class Slider extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func,

    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number
  }

  static defaultProps = {
    min: 0,
    max: 100,
    step: 1
  }

  render() {
    const { id, label, value, readOnly, onChange, min, max, step } = this.props;
    return (
      <FormGroup controlId={id}>
        <Col componentClass={ControlLabel} xs={3}>{label}</Col>
        <Col xs={9}>
          <ReactBootstrapSlider
            min={min} max={max} step={step}
            value={value}
            readOnly={readOnly}
            handleChange={ev => onChange(ev.target.value)}
          />
          <FormControl.Feedback />
        </Col>
      </FormGroup>
    );
  }
}
