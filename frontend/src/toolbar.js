// frontend/src/toolbar.js - MINIMAL VERSION

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div className="toolbar-wrapper">
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '10px',
        alignItems: 'center'
      }}>
        <div style={{ 
          width: '100%', 
          marginBottom: '8px',
          fontSize: '11px',
          fontWeight: '600',
          color: '#64748b',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Node Types
        </div>
        
        <DraggableNode type='customInput' label='Input' />
        <DraggableNode type='llm' label='LLM' />
        <DraggableNode type='customOutput' label='Output' />
        <DraggableNode type='text' label='Text' />
        <DraggableNode type='transformer' label='Transformer' />
        <DraggableNode type='filter' label='Filter' />
        <DraggableNode type='aggregator' label='Aggregator' />
        <DraggableNode type='validator' label='Validator' />
        <DraggableNode type='splitter' label='Splitter' />
      </div>
    </div>
  );
};