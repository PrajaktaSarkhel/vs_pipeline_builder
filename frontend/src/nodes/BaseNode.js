// frontend/src/nodes/BaseNode.js - DARK THEME

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

  // Dark theme color scheme - vibrant colors on dark
  const colorSchemes = {
    customInput: {
      bg: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
      border: '#3b82f6',
      text: '#93c5fd',
      borderGlow: 'rgba(59, 130, 246, 0.3)'
    },
    customOutput: {
      bg: 'linear-gradient(135deg, #831843 0%, #9f1239 100%)',
      border: '#ec4899',
      text: '#fda4af',
      borderGlow: 'rgba(236, 72, 153, 0.3)'
    },
    llm: {
      bg: 'linear-gradient(135deg, #581c87 0%, #6b21a8 100%)',
      border: '#a855f7',
      text: '#d8b4fe',
      borderGlow: 'rgba(168, 85, 247, 0.3)'
    },
    text: {
      bg: 'linear-gradient(135deg, #312e81 0%, #3730a3 100%)',
      border: '#818cf8',
      text: '#c7d2fe',
      borderGlow: 'rgba(129, 140, 248, 0.3)'
    },
    transformer: {
      bg: 'linear-gradient(135deg, #78350f 0%, #92400e 100%)',
      border: '#f59e0b',
      text: '#fcd34d',
      borderGlow: 'rgba(245, 158, 11, 0.3)'
    },
    filter: {
      bg: 'linear-gradient(135deg, #134e4a 0%, #115e59 100%)',
      border: '#14b8a6',
      text: '#5eead4',
      borderGlow: 'rgba(20, 184, 166, 0.3)'
    },
    aggregator: {
      bg: 'linear-gradient(135deg, #7c2d12 0%, #9a3412 100%)',
      border: '#f97316',
      text: '#fdba74',
      borderGlow: 'rgba(249, 115, 22, 0.3)'
    },
    validator: {
      bg: 'linear-gradient(135deg, #14532d 0%, #166534 100%)',
      border: '#22c55e',
      text: '#86efac',
      borderGlow: 'rgba(34, 197, 94, 0.3)'
    },
    splitter: {
      bg: 'linear-gradient(135deg, #881337 0%, #9f1239 100%)',
      border: '#f43f5e',
      text: '#fda4af',
      borderGlow: 'rgba(244, 63, 94, 0.3)'
    }
  };

  const colors = colorSchemes[type] || {
    bg: '#1f2937',
    border: '#4b5563',
    text: '#e5e7eb',
    borderGlow: 'rgba(75, 85, 99, 0.3)'
  };

  const nodeStyle = {
    width: 220,
    minHeight: 100,
    border: `2px solid ${colors.border}`,
    background: colors.bg,
    borderRadius: '8px',
    padding: '12px',
    boxShadow: `0 4px 12px rgba(0, 0, 0, 0.5), 0 0 20px ${colors.borderGlow}`,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    ...style
  };

  const headerStyle = {
    fontWeight: '700',
    marginBottom: '12px',
    fontSize: '12px',
    color: colors.text,
    paddingBottom: '10px',
    borderBottom: `2px solid ${colors.border}40`,
    textTransform: 'uppercase',
    letterSpacing: '0.8px'
  };

  const fieldContainerStyle = {
    fontSize: '13px',
    color: '#d1d5db'
  };

  return (
    <div style={nodeStyle}>
      {/* Input handles */}
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={input.id}
          style={{
            top: inputs.length === 1 ? '50%' : `${((index + 1) * 100) / (inputs.length + 1)}%`,
            width: '10px',
            height: '10px',
            border: '2px solid #1f2937',
            background: '#6b7280',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
            ...input.style
          }}
        />
      ))}

      {/* Header */}
      <div style={headerStyle}>
        {title}
      </div>

      {/* Fields */}
      <div style={fieldContainerStyle}>
        {fields.map((field, index) => (
          <div key={index} style={{ marginBottom: '8px' }}>
            {field}
          </div>
        ))}
      </div>

      {/* Output handles */}
      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{
            top: outputs.length === 1 ? '50%' : `${((index + 1) * 100) / (outputs.length + 1)}%`,
            width: '10px',
            height: '10px',
            border: '2px solid #1f2937',
            background: '#6b7280',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
            ...output.style
          }}
        />
      ))}
    </div>
  );
};