import update from 'react/lib/update';

export function selectLast(state) {
  if (state.last) {
    return update(state, {
      selection: {
        $set: [state.last]
      }
    });
  }
  return state;
}

export function getSelectedComponents(state) {
  return state.components.filter(c => state.selection.includes(c.id));
}

export function getUnselectedComponents(state) {
  return state.components.filter(c => !state.selection.includes(c.id));
}

// http://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
function move(array, oldIndex, newIndex) {
  if (newIndex >= array.length) {
    let k = newIndex - array.length;
    while ((k--) + 1) {
      array.push(undefined);
    }
  }
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
}

export function moveToIndex(array, items, newIndex) {
  array = [...array];
  let i = items.length;
  while (i--) {
    const currentIndex = array.indexOf(items[i]);
    move(array, currentIndex, newIndex);
  }
  return array;
}
