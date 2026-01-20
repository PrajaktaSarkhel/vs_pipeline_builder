import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const ValidatorNode = ({ id, data }) => {
  const [validationType, setValidationType] = useState(data?.validationType || 'email');
  const [pattern, setPattern] = useState(data?.pattern || '');

  const config = {
    type: 'validator',
    title: 'Validator',
    inputs: [{ id: `${id}-input` }],
    outputs: [
      { id: `${id}-valid`, style: { top: '35%' } },
      { id: `${id}-invalid`, style: { top: '65%' } }
    ],
    fields: [
      <label key="type">
        Type:
        <select 
          value={validationType} 
          onChange={(e) => setValidationType(e.target.value)}
          style={{ marginLeft: '5px', width: '130px' }}
        >
          <option value="email">Email</option>
          <option value="url">URL</option>
          <option value="number">Number</option>
          <option value="regex">Regex</option>
        </select>
      </label>,
      validationType === 'regex' && (
        <label key="pattern">
          Pattern:
          <input 
            type="text" 
            value={pattern} 
            onChange={(e) => setPattern(e.target.value)}
            style={{ marginLeft: '5px', width: '130px' }}
            placeholder="/^[A-Z]/"
          />
        </label>
      )
    ]
  };

  return <BaseNode id={id} data={data} config={config} />;
};