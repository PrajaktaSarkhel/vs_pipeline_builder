
// Features:
// 1. Dynamic width and height based on text content
// 2. Detects variables in {{variableName}} format
// 3. Creates dynamic input handles for each variable

import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 200, height: 80 });
  const textareaRef = useRef(null);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Extract variables from text using regex
  useEffect(() => {
    // Match {{variableName}} pattern - valid JS variable names
    const regex = /\{\{(\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*)\}\}/g;
    const matches = [...currText.matchAll(regex)];
    const foundVars = matches.map(match => match[1].trim());
    
    // Get unique variables
    const uniqueVars = [...new Set(foundVars)];
    setVariables(uniqueVars);
  }, [currText]);

  // Dynamic resizing based on content
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      
      // Calculate height based on scroll height
      textarea.style.height = 'auto';
      const newHeight = Math.max(60, Math.min(textarea.scrollHeight, 300));
      
      // Calculate width based on text content
      const lines = currText.split('\n');
      const maxLineLength = Math.max(...lines.map(line => line.length), 10);
      const newWidth = Math.max(200, Math.min(maxLineLength * 8 + 80, 400));
      
      setDimensions({ 
        width: newWidth, 
        height: newHeight + 60 // Add space for label and padding
      });
    }
  }, [currText]);

  return (
    <div style={{
      width: dimensions.width,
      minHeight: dimensions.height,
      border: '2px solid #3b82f6',
      backgroundColor: '#eff6ff',
      borderRadius: '8px',
      padding: '10px',
      position: 'relative'
    }}>
      {/* Dynamic input handles for variables */}
      {variables.map((variable, index) => (
        <Handle
          key={`${id}-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{
            top: `${((index + 1) * 100) / (variables.length + 1)}%`,
            background: '#f59e0b',
            width: '10px',
            height: '10px'
          }}
          title={`Variable: ${variable}`}
        />
      ))}

      {/* Node header */}
      <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>
        Text
      </div>

      {/* Text input */}
      <div style={{ fontSize: '12px' }}>
        <label>
          Text:
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            style={{
              width: '100%',
              minHeight: '40px',
              marginTop: '5px',
              padding: '5px',
              fontSize: '12px',
              borderRadius: '4px',
              border: '1px solid #3b82f6',
              resize: 'none',
              overflow: 'hidden',
              fontFamily: 'monospace'
            }}
            placeholder="Enter text with {{variables}}"
          />
        </label>
      </div>

      {/* Display detected variables */}
      {variables.length > 0 && (
        <div style={{ 
          marginTop: '8px', 
          fontSize: '10px', 
          color: '#666',
          borderTop: '1px solid #ddd',
          paddingTop: '5px'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '3px' }}>
            Variables: {variables.length}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {variables.map(variable => (
              <span 
                key={variable}
                style={{
                  backgroundColor: '#fef3c7',
                  color: '#92400e',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  border: '1px solid #fbbf24'
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
          background: '#3b82f6'
        }}
      />
    </div>
  );
};