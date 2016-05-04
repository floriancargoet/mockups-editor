import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Button, ButtonGroup } from 'react-bootstrap';

export default class MockupSelector extends Component {

  static propTypes = {
    mockups: PropTypes.array.isRequired,
    currentMockup: PropTypes.number.isRequired,
    onMockupClicked: PropTypes.func.isRequired,
    onMockupDoubleClicked: PropTypes.func.isRequired
  }

  render() {
    const { mockups, onMockupClicked, onMockupDoubleClicked, currentMockup } = this.props;
    return (
      <ButtonGroup vertical>
      {
        mockups.map((m, i) =>
          <Button
            key={i} active={i === currentMockup}
            onClick={() => onMockupClicked(i)}
            onDoubleClick={() => onMockupDoubleClicked(i)}
          >
            {m.name}
          </Button>

        )
      }
      </ButtonGroup>
    );
  }

  onZoom = ({ zoomFactor }) => {
    this.setState({
      zoomFactor: zoomFactor
    });
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    const el = ReactDOM.findDOMNode(this);
    this.setState({
      width: el.clientWidth,
      height: el.clientHeight
    });
  }

}
