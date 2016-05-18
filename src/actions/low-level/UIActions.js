export const UI_PAN = 'UI_PAN';
export const UI_ZOOM = 'UI_ZOOM';
export const UI_PANZOOM_RESET = 'UI_PANZOOM_RESET';
export const UI_SET_IN_PLACE_EDITOR = 'UI_SET_IN_PLACE_EDITOR';

export function pan(x, y) {
  return { type: UI_PAN, x, y };
}

export function zoom(matrix) {
  return { type: UI_ZOOM, matrix };
}

export function resetPanZoom() {
  return { type: UI_PANZOOM_RESET };
}

export function showInPlaceEditor(id) {
  return { type: UI_SET_IN_PLACE_EDITOR, id };
}

export function hideInPlaceEditor() {
  return { type: UI_SET_IN_PLACE_EDITOR, id: null };
}
