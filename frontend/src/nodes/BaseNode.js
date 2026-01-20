// Part 1: Node Abstraction - Reusable base component for all nodes

import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, data, config }) => {
  const {
    type = 'default',
    title = 'Node',
    inputs = [],
    outputs = [],
    fields = [],
    style = {}
  } = config;

  // Default styling based on node type
  const defaultStyles = {
    customInput: { borderColor: '#10b981', backgroundColor: '#f0fdf4' },
    customOutput: { borderColor: '#ef4444', backgroundColor: '#fef2f2' },
    llm: { borderColor: '#8b5cf6', backgroundColor: '#faf5ff' },
    text: { borderColor: '#3b82f6', backgroundColor: '#eff6ff' },
    transformer: { borderColor: '#f59e0b', backgroundColor: '#fffbeb' },
    filter: { borderColor: '#ec4899', backgroundColor: '#fdf2f8' },
    aggregator: { borderColor: '#6366f1', backgroundColor: '#eef2ff' },
    validator: { borderColor: '#14b8a6', backgroundColor: '#f0fdfa' },
    splitter: { borderColor: '#f97316', backgroundColor: '#fff7ed' },
  };

  const nodeStyle = {
    width: 200,
    minHeight: 80,
    border: `2px solid ${defaultStyles[type]?.borderColor || '#000'}`,
    backgroundColor: defaultStyles[type]?.backgroundColor || '#fff',
    borderRadius: '8px',
    padding: '10px',
    ...style
  };

  return (
    <div style={nodeStyle}>
      {/* Render input handles */}
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={input.id}
          style={{
            top: inputs.length === 1 ? '50%' : `${((index + 1) * 100) / (inputs.length + 1)}%`,
            ...input.style
          }}
        />
      ))}

      {/* Node header */}
      <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>
        {title}
      </div>

      {/* Render fields */}
      <div style={{ fontSize: '12px' }}>
        {fields.map((field, index) => (
          <div key={index} style={{ marginBottom: '5px' }}>
            {field}
          </div>
        ))}
      </div>

      {/* Render output handles */}
      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{
            top: outputs.length === 1 ? '50%' : `${((index + 1) * 100) / (outputs.length + 1)}%`,
            ...output.style
          }}
        />
      ))}
    </div>
  );
};