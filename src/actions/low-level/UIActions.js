export const UI_PAN = 'UI_PAN';
export const UI_PANZOOM = 'UI_PANZOOM';
export const UI_PANZOOM_RESET = 'UI_PANZOOM_RESET';
export const UI_SET_IN_PLACE_EDITOR = 'UI_SET_IN_PLACE_EDITOR';

export function panZoom(matrix) {
  return { type: UI_PANZOOM, matrix };
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
