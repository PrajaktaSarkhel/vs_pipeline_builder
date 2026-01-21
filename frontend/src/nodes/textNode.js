
import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 220, height: 100 });
  const textareaRef = useRef(null);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  useEffect(() => {
    const regex = /\{\{(\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*)\}\}/g;
    const matches = [...currText.matchAll(regex)];
    const foundVars = matches.map(match => match[1].trim());
    const uniqueVars = [...new Set(foundVars)];
    setVariables(uniqueVars);
  }, [currText]);

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      const newHeight = Math.max(60, Math.min(textarea.scrollHeight, 300));
      
      const lines = currText.split('\n');
      const maxLineLength = Math.max(...lines.map(line => line.length), 10);
      const newWidth = Math.max(220, Math.min(maxLineLength * 8 + 80, 400));
      
      setDimensions({ 
        width: newWidth, 
        height: newHeight + 80
      });
    }
  }, [currText]);

  return (
    <div style={{
      width: dimensions.width,
      minHeight: dimensions.height,
      border: '2px solid #818cf8',
      background: 'linear-gradient(135deg, #312e81 0%, #3730a3 100%)',
      borderRadius: '8px',
      padding: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(129, 140, 248, 0.3)',
      position: 'relative',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Variable handles - purple glow */}
      {variables.map((variable, index) => (
        <Handle
          key={`${id}-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{
            top: `${((index + 1) * 100) / (variables.length + 1)}%`,
            width: '10px',
            height: '10px',
            border: '2px solid #1f2937',
            background: '#a855f7',
            boxShadow: '0 2px 8px rgba(168, 85, 247, 0.6)'
          }}
          title={`Variable: ${variable}`}
        />
      ))}

      {/* Header */}
      <div style={{ 
        fontWeight: '700', 
        marginBottom: '12px', 
        fontSize: '12px',
        color: '#c7d2fe',
        paddingBottom: '10px',
        borderBottom: '2px solid rgba(129, 140, 248, 0.3)',
        textTransform: 'uppercase',
        letterSpacing: '0.8px'
      }}>
        Text
      </div>

      {/* Text input */}
      <div style={{ fontSize: '13px' }}>
        <label style={{ 
          display: 'block', 
          color: '#9ca3af', 
          fontSize: '12px', 
          marginBottom: '6px', 
          fontWeight: '500' 
        }}>
          Content:
        </label>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          style={{
            width: '100%',
            minHeight: '50px',
            padding: '8px',
            fontSize: '13px',
            borderRadius: '6px',
            border: '1px solid #374151',
            resize: 'none',
            overflow: 'hidden',
            fontFamily: 'ui-monospace, Monaco, monospace',
            lineHeight: '1.5',
            color: '#e5e7eb',
            background: '#1f2937'
          }}
          placeholder="Enter text with {{variables}}"
        />
      </div>

      {/* Variable badges - purple theme */}
      {variables.length > 0 && (
        <div style={{ 
          marginTop: '10px', 
          fontSize: '11px',
          paddingTop: '10px',
          borderTop: '1px solid rgba(129, 140, 248, 0.3)'
        }}>
          <div style={{ color: '#9ca3af', marginBottom: '6px', fontWeight: '600' }}>
            Variables ({variables.length})
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {variables.map(variable => (
              <span 
                key={variable}
                style={{
                  backgroundColor: '#581c87',
                  color: '#d8b4fe',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  border: '1px solid #a855f7',
                  fontFamily: 'ui-monospace, Monaco, monospace',
                  fontWeight: '600'
                }}
              >
                {variable}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          top: '50%',
          width: '10px',
          height: '10px',
          border: '2px solid #1f2937',
          background: '#6b7280',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
        }}
      />
    </div>
  );
};