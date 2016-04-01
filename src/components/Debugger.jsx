import React from 'react';

function format(c, state) {
  let str = c.id;
  if (state.selection.includes(c.id)) {
    str += '*';
  }
  return str;
}

const Debugger = ({ state }) => {
  return (
    <div className="debugger">
      <pre>
        {JSON.stringify(state.components.map(c => format(c, state)), null, 2)}
      </pre>
    </div>
  );
};

Debugger.propTypes = {
  state: React.PropTypes.object
};

export default Debugger;
