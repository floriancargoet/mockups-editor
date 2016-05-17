export const UNDO = 'undo::UNDO';
export const REDO = 'undo::REDO';
export const JUMP = 'undo::JUMP';
export const SAVE = 'undo::SAVE';
export const NAME_STATE = 'undo::NAME_STATE';

export function undo() {
  return { type: UNDO };
}
export function redo() {
  return { type: REDO };
}
export function jump(index) {
  return { type: JUMP, index };
}
export function save(name = 'Unnamed action') {
  return dispatch => {
    dispatch({ type: NAME_STATE, name });
    dispatch({ type: SAVE });
  };
}
