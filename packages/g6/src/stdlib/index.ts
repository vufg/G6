import { registry as layoutRegistry } from '@antv/layout';
import { Lib } from '../types/stdlib';
import DragCanvas from './behavior/drag-canvas';
import ClickSelect from "./behavior/click-select";
import BrushSelect from './behavior/brush-select';
import LassoSelect from './behavior/lasso-select';
import { comboFromNode } from './data/comboFromNode';
import { LineEdge } from './item/edge';
import { CircleNode } from './item/node';
import rectSelector from './selector/rect';
import lassoSelector from './selector/lasso';

const stdLib = {
  transforms: {
    comboFromNode,
  },
  themes: {},
  layouts: layoutRegistry,
  behaviors: {
    'drag-canvas': DragCanvas,
    'click-select': ClickSelect,
    'brush-select': BrushSelect,
    'lasso-select': LassoSelect
  },
  plugins: {},
  nodes: {
    'circle-node': CircleNode
  },
  edges: {
    'line-edge': LineEdge
  },
  combos: {},
}

const useLib: Lib = {
  transforms: {},
  themes: {},
  layouts: {},
  behaviors: {},
  plugins: {},
  nodes: {},
  edges: {},
  combos: {},
};

const utils = {
  rectSelector,
  lassoSelector
}

const registery = { useLib };
export default registery;
export { stdLib, registery, utils };
