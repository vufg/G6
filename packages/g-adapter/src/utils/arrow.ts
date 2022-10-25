import { Path } from '../shapes';
// import { Path } from '@antv/g'; //  as GPath

const DEFAULT_ARROW_PATH = 'M 12,6 L 0,0 L 12,-6';

const getDefaultArrow = (pathStyle) => {
  const { sin, cos, PI } = Math;
  return new Path({
    style: {
      ...pathStyle,
      anchor: [0, 0.5],
      path: `M${10 * cos(PI / 6)},${10 * sin(PI / 6)} L0,0 L${10 * cos(PI / 6)},-${10 *
        sin(PI / 6)}`,
    },
  });
}

const getArrowHead = (arrow, bodyStyle = {}) => {
  let arrowHead: Path = undefined;
  if (!arrow) return;
  if (arrow === true) {
    arrow = {};
  }
  arrow.path = arrow.path || DEFAULT_ARROW_PATH;
  const { lineWidth = 1, stroke = '#5F95FF' } = bodyStyle as any;
  if (typeof arrow === 'object') {
    if (arrow.nodeName) {
      arrowHead = arrow;
    } else {
      const { d, ...otherAttrs } = arrow;
      arrowHead = new Path({
        style: {
          x: 0,
          y: 0,
          anchor: '0.5 0.5',
          transformOrigin: 'center',
          lineWidth,
          stroke,
          ...otherAttrs,
        }
      });
    }
  }
  return arrowHead;
}

const updateArrow = (body, key, value) => {
  if (!body) return;
  const arrowKey = key === 'startArrow' ? 'markerStart' : 'markerEnd';
  if (!value) {
    body.style[arrowKey] = undefined;
    return;
  }
  let arrowStyle = {
    lineWidth: body.style.lineWidth || 1,
    stroke: body.style.stroke || '#5F95FF',
  };
  let d = 0;
  if (typeof value === 'object') {
    arrowStyle = value;
    d = value.d;
    delete (arrowStyle as any).d;
  }
  let arrow = body.style[arrowKey];
  // TODO: 需要确定 G 更新箭头的方法 https://codesandbox.io/s/how-to-update-arrow-head-f2qbl3?file=/index.js
  if (!arrow) {
    arrow = getArrowHead(arrowStyle, body.attr());
    body.style[arrowKey] = arrow;
  } else {
    arrow.attr(arrowStyle);
  }
  if (key === 'startArrow') {
    body.style.markerEndOffset = - 2 * d;
  } else {
    body.style.markerStartOffset = - 2 * d;
  }
}

export { getDefaultArrow, getArrowHead, updateArrow };