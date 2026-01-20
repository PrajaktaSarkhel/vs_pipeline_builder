
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const config = {
    type: 'llm',
    title: 'LLM',
    inputs: [
      { id: `${id}-system`, style: { top: `${100/3}%` } },
      { id: `${id}-prompt`, style: { top: `${200/3}%` } }
    ],
    outputs: [{ id: `${id}-response` }],
    fields: [
      <span key="description">This is a LLM.</span>
    ]
  };

  return <BaseNode id={id} data={data} config={config} />;
};