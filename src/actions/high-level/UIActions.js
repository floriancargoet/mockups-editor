import * as LowLevelUIActions from '../low-level/UIActions';
import getInPlaceProperty from '../../util/getInPlaceProperty';

export function showInPlaceEditor(component) {
  return dispatch => {
    // showing the editor is not something we want in the history
    const property = getInPlaceProperty(component.type);
    if (property) {
      dispatch(LowLevelUIActions.showInPlaceEditor(component.id));
    }
  };
};
