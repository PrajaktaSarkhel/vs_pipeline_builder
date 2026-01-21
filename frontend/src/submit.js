
import { useStore } from './store';

export const SubmitButton = () => {
  const nodes = useStore(state => state.nodes);
  const edges = useStore(state => state.edges);

  const handleSubmit = async () => {
    try {
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
      showResultAlert(result);

    } catch (error) {
      console.error('Error submitting pipeline:', error);
      alert(`Error: ${error.message}\n\nMake sure the backend is running on http://localhost:8000`);
    }
  };

  const showResultAlert = (result) => {
    const { num_nodes, num_edges, is_dag } = result;
    
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #1f2937;
      padding: 32px;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(124, 58, 237, 0.3);
      z-index: 10000;
      max-width: 450px;
      width: 90%;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      border: 2px solid #374151;
    `;

    alertDiv.innerHTML = `
      <div>
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
          <div style="
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #7c3aed 0%, #6366f1 100%);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            box-shadow: 0 4px 12px rgba(124, 58, 237, 0.4);
          ">
            📊
          </div>
          <h2 style="margin: 0; color: #f3f4f6; font-size: 22px; font-weight: 700;">
            Pipeline Analysis
          </h2>
        </div>
        
        <div style="background: #111827; padding: 20px; border-radius: 10px; margin-bottom: 20px; border: 1px solid #374151;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #374151;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 18px;">🔵</span>
              <span style="font-weight: 600; color: #9ca3af; font-size: 14px;">Nodes</span>
            </div>
            <span style="font-weight: 700; color: #f3f4f6; font-size: 20px;">${num_nodes}</span>
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #374151;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 18px;">🔗</span>
              <span style="font-weight: 600; color: #9ca3af; font-size: 14px;">Edges</span>
            </div>
            <span style="font-weight: 700; color: #f3f4f6; font-size: 20px;">${num_edges}</span>
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 18px;">${is_dag ? '✅' : '❌'}</span>
              <span style="font-weight: 600; color: #9ca3af; font-size: 14px;">Valid DAG</span>
            </div>
            <span style="font-weight: 700; font-size: 20px; color: ${is_dag ? '#10b981' : '#ef4444'};">
              ${is_dag ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
        
        ${!is_dag ? `
          <div style="background: #7f1d1d; border-left: 4px solid #ef4444; padding: 14px 16px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #991b1b;">
            <div style="display: flex; gap: 10px;">
              <span style="font-size: 20px;">⚠️</span>
              <div>
                <p style="margin: 0 0 6px 0; color: #fca5a5; font-size: 14px; font-weight: 600;">
                  Cycle Detected
                </p>
                <p style="margin: 0; color: #fecaca; font-size: 13px; line-height: 1.5;">
                  Your pipeline contains cycles. A valid pipeline must be a Directed Acyclic Graph (DAG).
                </p>
              </div>
            </div>
          </div>
        ` : ''}
        
        <button 
          onclick="this.parentElement.parentElement.remove(); document.getElementById('alert-overlay').remove();"
          style="
            width: 100%;
            background: linear-gradient(135deg, #7c3aed 0%, #6366f1 100%);
            color: white;
            border: none;
            padding: 14px;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
            box-shadow: 0 4px 12px rgba(124, 58, 237, 0.4);
          "
          onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(124, 58, 237, 0.6)'"
          onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(124, 58, 237, 0.4)'"
        >
          Close
        </button>
      </div>
    `;

    const overlay = document.createElement('div');
    overlay.id = 'alert-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      z-index: 9999;
      backdrop-filter: blur(4px);
    `;
    overlay.onclick = () => {
      alertDiv.remove();
      overlay.remove();
    };

    document.body.appendChild(overlay);
    document.body.appendChild(alertDiv);
  };

  return (
    <div className="submit-wrapper">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button 
          type="submit" 
          onClick={handleSubmit}
          style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
            color: 'white',
            border: 'none',
            padding: '14px 40px',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(124, 58, 237, 0.6)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.4)';
          }}
        >
        Analyze Pipeline
        </button>
      </div>
    </div>
  );
};