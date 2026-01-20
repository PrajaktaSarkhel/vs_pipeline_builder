
import { useStore } from './store';

export const SubmitButton = () => {
  const nodes = useStore(state => state.nodes);
  const edges = useStore(state => state.edges);

  const handleSubmit = async () => {
    try {
      // Prepare the pipeline data
      const pipelineData = {
        nodes: nodes.map(node => ({
          id: node.id,
          type: node.type || 'unknown',
          data: node.data || {}
        })),
        edges: edges.map(edge => ({
          id: edge.id || `${edge.source}-${edge.target}`,
          source: edge.source,
          target: edge.target
        }))
      };

      // Send POST request to backend
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pipelineData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Display results in an alert
      showResultAlert(result);

    } catch (error) {
      console.error('Error submitting pipeline:', error);
      alert(`Error: ${error.message}\n\nMake sure the backend is running on http://localhost:8000`);
    }
  };

  const showResultAlert = (result) => {
    const { num_nodes, num_edges, is_dag } = result;
    
    const message = `
Pipeline Analysis Results:
━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Number of Nodes: ${num_nodes}
🔗 Number of Edges: ${num_edges}
${is_dag ? '✅' : '❌'} Is Valid DAG: ${is_dag ? 'Yes' : 'No'}

${!is_dag ? '\n⚠️ Warning: Your pipeline contains cycles!\nA valid pipeline must be a Directed Acyclic Graph (DAG).' : ''}
    `.trim();

    // Create a custom styled alert
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
      z-index: 10000;
      max-width: 500px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    `;

    alertDiv.innerHTML = `
      <div style="text-align: center;">
        <h2 style="margin: 0 0 20px 0; color: #1a202c; font-size: 24px;">
          Pipeline Analysis
        </h2>
        
        <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
            <span style="font-weight: 600; color: #4a5568;">📊 Nodes:</span>
            <span style="font-weight: 700; color: #2d3748; font-size: 20px;">${num_nodes}</span>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
            <span style="font-weight: 600; color: #4a5568;">🔗 Edges:</span>
            <span style="font-weight: 700; color: #2d3748; font-size: 20px;">${num_edges}</span>
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 600; color: #4a5568;">Is Valid DAG:</span>
            <span style="font-weight: 700; font-size: 20px; color: ${is_dag ? '#48bb78' : '#f56565'};">
              ${is_dag ? '✅ Yes' : '❌ No'}
            </span>
          </div>
        </div>
        
        ${!is_dag ? `
          <div style="background: #fff5f5; border: 2px solid #fc8181; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0; color: #c53030; font-weight: 600;">
              ⚠️ Warning: Pipeline contains cycles!
            </p>
            <p style="margin: 10px 0 0 0; color: #742a2a; font-size: 14px;">
              A valid pipeline must be a Directed Acyclic Graph (DAG).
            </p>
          </div>
        ` : ''}
        
        <button 
          onclick="this.parentElement.parentElement.remove(); document.getElementById('alert-overlay').remove();"
          style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
          "
          onmouseover="this.style.transform='scale(1.05)'"
          onmouseout="this.style.transform='scale(1)'"
        >
          Close
        </button>
      </div>
    `;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'alert-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 9999;
    `;
    overlay.onclick = () => {
      alertDiv.remove();
      overlay.remove();
    };

    document.body.appendChild(overlay);
    document.body.appendChild(alertDiv);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
      <button 
        type="submit" 
        onClick={handleSubmit}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          padding: '12px 30px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
        }}
      >
        Submit Pipeline
      </button>
    </div>
  );
};