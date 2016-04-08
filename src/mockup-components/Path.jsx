import React, { PropTypes } from 'react';
import random from 'random-number-in-range';
// SVGElement.getBBox() is buggy (at least in Chrome), let's compute it ourselves
import getBBox from '../util/path_bbox';

const originalPath = 'M 37.524798,88.138754 C 15.583576,97.582814 12.170495,109.05051 6.3195012,86.114984 0.46850624,63.179444 -2.9445738,48.338754 5.8319185,32.148964 14.608408,15.959144 21.434571,-4.9527021 39.475134,1.7930539 57.515691,8.5388239 52.298507,10.514604 64.829441,26.077774 88.413502,55.368694 108.22431,0.44390391 95.547163,37.545554 82.870009,74.647184 80.432098,94.884494 64.341855,77.345514 48.251617,59.806574 52.152293,67.901434 43.375799,44.965894 34.599306,22.030324 31.186221,-0.90524609 24.84765,21.355754 c -6.338577,22.26099 -5.603251,24.57448 -0.544527,33.11337 5.447076,9.19442 35.162904,24.2256 13.221675,33.66963 z';

/*
 * Takes a SVG path string, find the min/max on x/y axes,
 * and translate/scale every coordinate to fit the width/height + margin
 */
const xyRe = /(-?[0-9.]+),(-?[0-9.]+)/g;
function transformPath(path, width, height, margin = 0) {
  const bbox = getBBox(path);
  const minX = bbox.left - margin, minY = bbox.top - margin;
  const scaleX = width / (bbox.width + 2 * margin), scaleY = height / (bbox.height + 2 * margin);
  const newPath = path.replace(xyRe, (_, x, y) => ((Number(x) - minX) * scaleX) + ',' + ((Number(y) - minY) * scaleY));

  return newPath;
}

function getStyles({ stroke, strokeWidth, strokeDasharray }) {
  return {
    fill: 'none',
    stroke,
    strokeWidth,
    strokeDasharray
  };
}

const Path  = ({ width, height, properties }) => {
  const margin = (Number(properties.strokeWidth) / 2) || 0; // use a margin of half the path width
  const path = transformPath(originalPath, width, height, margin);

  return (
    <svg height={height} width={width}>
      <path
        d={path}
        style={getStyles(properties)}
      />
    </svg>
  );
};

Path.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  properties: PropTypes.object
};

Path.create = (config = {}) => ({
  type: 'Path',
  x: random(50, 500),
  y: random(50, 500),
  width: 205,
  height: 205,
  ...config,

  properties: {
    stroke: '#800',
    strokeWidth: '2',
    strokeDasharray: '12 6',
    ...config.properties
  }
});

export default Path;
