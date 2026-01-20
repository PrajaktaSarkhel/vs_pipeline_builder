import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'contains');
  const [value, setValue] = useState(data?.value || '');

  const config = {
    type: 'filter',
    title: 'Filter',
    inputs: [{ id: `${id}-input` }],
    outputs: [
      { id: `${id}-passed`, style: { top: '35%' } },
      { id: `${id}-filtered`, style: { top: '65%' } }
    ],
    fields: [
      <label key="condition">
        Condition:
        <select 
          value={condition} 
          onChange={(e) => setCondition(e.target.value)}
          style={{ marginLeft: '5px', width: '120px' }}
        >
          <option value="contains">Contains</option>
          <option value="equals">Equals</option>
          <option value="startsWith">Starts With</option>
          <option value="endsWith">Ends With</option>
        </select>
      </label>,
      <label key="value">
        Value:
        <input 
          type="text" 
          value={value} 
          onChange={(e) => setValue(e.target.value)}
          style={{ marginLeft: '5px', width: '140px' }}
          placeholder="Filter value"
        />
      </label>
    ]
  };

  return <BaseNode id={id} data={data} config={config} />;
};
