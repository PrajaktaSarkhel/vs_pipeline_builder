
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const config = {
    type: 'customOutput',
    title: 'Output',
    inputs: [{ id: `${id}-value` }],
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
        <select value={outputType} onChange={handleTypeChange} style={{ marginLeft: '5px', width: '140px' }}>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    ]
  };

  return <BaseNode id={id} data={data} config={config} />;
};