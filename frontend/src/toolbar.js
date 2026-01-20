
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: '10px' }}>
      <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {/* Original nodes */}
        <DraggableNode type='customInput' label='Input' />
        <DraggableNode type='llm' label='LLM' />
        <DraggableNode type='customOutput' label='Output' />
        <DraggableNode type='text' label='Text' />
        
        {/* New nodes - Part 1 */}
        <DraggableNode type='transformer' label='Transformer' />
        <DraggableNode type='filter' label='Filter' />
        <DraggableNode type='aggregator' label='Aggregator' />
        <DraggableNode type='validator' label='Validator' />
        <DraggableNode type='splitter' label='Splitter' />
      </div>
    </div>
  );
};