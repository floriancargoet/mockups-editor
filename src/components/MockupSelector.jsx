import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import MockupPreview from './svg/MockupPreview.jsx';

import { Icon } from './helpers.jsx';

export default class MockupSelector extends Component {

  static propTypes = {
    mockups: PropTypes.array.isRequired,
    currentMockup: PropTypes.number.isRequired,
    onMockupClicked: PropTypes.func.isRequired,
    onMockupNameClicked: PropTypes.func.isRequired,
    onAddClicked: PropTypes.func.isRequired
  }

  render() {
    const {
      mockups, currentMockup,
      onMockupClicked, onMockupNameClicked, onAddClicked
    } = this.props;

    return (
      <div>
        <ButtonGroup vertical block>
        {
          mockups.map((m, i) =>
            <Button
              key={i} active={i === currentMockup}
              onClick={() => onMockupClicked(i)}
            >
              <MockupPreview width={120} height={90} components={mockups[i].components} />
              <a title="Rename" style={{ display: 'block' }} onClick={(ev) => {
                ev.stopPropagation(); onMockupNameClicked(i);
              }}>
                {m.name}
              </a>
            </Button>

          )
        }
        </ButtonGroup>
        <Button block bsStyle="primary" onClick={onAddClicked}>
          <Icon name="fa-plus" />
          Add mockup
        </Button>
      </div>
    );
  }


}
