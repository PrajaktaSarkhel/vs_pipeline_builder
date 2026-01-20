# backend/main.py - UPDATED for Part 4
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict, deque

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request validation
class NodeData(BaseModel):
    id: str
    type: str = None
    data: Dict[str, Any] = {}

class EdgeData(BaseModel):
    source: str
    target: str
    id: str = None

class PipelineData(BaseModel):
    nodes: List[NodeData]
    edges: List[EdgeData]

def is_dag(nodes: List[NodeData], edges: List[EdgeData]) -> bool:
    """
    Check if the graph is a Directed Acyclic Graph (DAG) using Kahn's algorithm.
    
    Algorithm:
    1. Build adjacency list and calculate in-degrees
    2. Start with nodes that have in-degree 0
    3. Process each node, reducing in-degrees of neighbors
    4. If all nodes are processed, it's a DAG; otherwise, there's a cycle
    
    Time Complexity: O(V + E) where V is vertices (nodes) and E is edges
    """
    if not nodes:
        return True
    
    # Create adjacency list and in-degree count
    graph = defaultdict(list)
    in_degree = {node.id: 0 for node in nodes}
    
    # Build the graph
    for edge in edges:
        # Only add edge if both source and target exist
        if edge.source in in_degree and edge.target in in_degree:
            graph[edge.source].append(edge.target)
            in_degree[edge.target] += 1
    
    # Find all nodes with in-degree 0 (starting nodes)
    queue = deque([node_id for node_id, degree in in_degree.items() if degree == 0])
    processed_count = 0
    
    # Process nodes using topological sort
    while queue:
        current = queue.popleft()
        processed_count += 1
        
        # Reduce in-degree for all neighbors
        for neighbor in graph[current]:
            in_degree[neighbor] -= 1
            # If in-degree becomes 0, add to queue
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If all nodes were processed, it's a DAG
    return processed_count == len(nodes)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    """
    Parse the pipeline and return:
    - num_nodes: number of nodes in the pipeline
    - num_edges: number of edges in the pipeline
    - is_dag: whether the pipeline is a valid DAG (no cycles)
    """
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag_check = is_dag(pipeline.nodes, pipeline.edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag_check
    }