import React, { useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
} from 'react-flow-renderer';
import { TourPlace } from '../types';
import { TourNode } from './TourNode';

interface TourFlowProps {
  places: TourPlace[];
}

const nodeTypes = {
  tourNode: TourNode,
};

export const TourFlow: React.FC<TourFlowProps> = ({ places }) => {
  const nodes: Node[] = useMemo(
    () =>
      places.map((place, index) => ({
        id: `${index}`,
        type: 'tourNode',
        data: place,
        position: { x: index * 400, y: 0 },
      })),
    [places]
  );

  const edges: Edge[] = useMemo(
    () =>
      places.slice(0, -1).map((_, index) => ({
        id: `e${index}-${index + 1}`,
        source: `${index}`,
        target: `${index + 1}`,
        type: 'smoothstep',
        animated: true,
      })),
    [places]
  );

  return (
    <div className="h-[600px] w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};