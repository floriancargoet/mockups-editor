
export function getPossibleAlignments(offsetX, offsetY, component, components) {
  const xs = [];
  const ys = [];
  components.forEach(c => {
    if (c === component) {
      return;
    }
    xs.push(c.x, c.x + c.width);
    ys.push(c.y, c.y + c.height);
  });

  let minX, minXDelta = Infinity, xSide;
  xs.forEach(x => {
    let delta;
    delta = Math.abs(component.x + offsetX - x);
    if (delta < minXDelta) {
      minXDelta = delta;
      minX = x;
      xSide = 'left';
    }
    delta = Math.abs(component.x + offsetX + component.width - x);
    if (delta < minXDelta) {
      minXDelta = delta;
      minX = x;
      xSide = 'right';
    }
  });
  let minY, minYDelta = Infinity, ySide;
  ys.forEach(y => {
    let delta;
    delta = Math.abs(component.y + offsetY - y);
    if (delta < minYDelta) {
      minYDelta = delta;
      minY = y;
      ySide = 'top';
    }
    delta = Math.abs(component.y + offsetY + component.height - y);
    if (delta < minYDelta) {
      minYDelta = delta;
      minY = y;
      ySide = 'bottom';
    }
  });

  const alignments = {};
  if (minXDelta < 10) {
    alignments.x = minX;
    alignments.xSide = xSide;
  }
  if (minYDelta < 10) {
    alignments.y = minY;
    alignments.ySide = ySide;
  }
  return alignments;
}


export function applyAlignments(offsetX, offsetY, alignments, component) {
  if (alignments.x) {
    if (alignments.xSide === 'left') {
      offsetX = (alignments.x - component.x);
    }
    else {
      offsetX = (alignments.x - (component.x + component.width));
    }
  }
  if (alignments.y) {
    if (alignments.ySide === 'top') {
      offsetY = (alignments.y - component.y);
    }
    else {
      offsetY = (alignments.y - (component.y + component.height));
    }
  }
  return { offsetX, offsetY };
}
