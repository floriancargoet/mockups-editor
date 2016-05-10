
import shallowEqual from './shallowEqual';

export default function shouldPureComponentUpdate(nextProps, nextState) {
  return !shallowEqual(this.props, nextProps) ||
         !shallowEqual(this.state, nextState);
}

shouldPureComponentUpdate.debug = function (logPrefix) {
  return function (nextProps, nextState) {
    return !shallowEqual.debug(logPrefix + '.props', this.props, nextProps) ||
           !shallowEqual.debug(logPrefix + '.state', this.state, nextState);
  };
};

