import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const SplitterNode = ({ id, data }) => {
  const [splitType, setSplitType] = useState(data?.splitType || 'delimiter');
  const [delimiter, setDelimiter] = useState(data?.delimiter || ',');

  const config = {
    type: 'splitter',
    title: 'Splitter',
    inputs: [{ id: `${id}-input` }],
    outputs: [
      { id: `${id}-part1`, style: { top: '25%' } },
      { id: `${id}-part2`, style: { top: '50%' } },
      { id: `${id}-part3`, style: { top: '75%' } }
    ],
    fields: [
      <label key="splitType">
        Split By:
        <select 
          value={splitType} 
          onChange={(e) => setSplitType(e.target.value)}
          style={{ marginLeft: '5px', width: '120px' }}
        >
          <option value="delimiter">Delimiter</option>
          <option value="length">Length</option>
          <option value="words">Words</option>
        </select>
      </label>,
      splitType === 'delimiter' && (
        <label key="delimiter">
          Delimiter:
          <input 
            type="text" 
            value={delimiter} 
            onChange={(e) => setDelimiter(e.target.value)}
            style={{ marginLeft: '5px', width: '120px' }}
            placeholder=","
          />
        </label>
      )
    ],
    style: { minHeight: 120 }
  };

  return <BaseNode id={id} data={data} config={config} />;
};