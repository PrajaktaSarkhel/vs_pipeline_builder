
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const config = {
    type: 'customInput',
    title: 'Input',
    outputs: [{ id: `${id}-value` }],
    fields: [
      <label key="name">
        Name:
        <input 
          type="text" 
          value={currName} 
          onChange={handleNameChange}
          style={{ marginLeft: '5px', width: '140px' }}
        />
      </label>,
      <label key="type">
        Type:
        <select value={inputType} onChange={handleTypeChange} style={{ marginLeft: '5px', width: '140px' }}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    ]
  };

  return <BaseNode id={id} data={data} config={config} />;
};