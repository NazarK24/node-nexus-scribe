
import React, { useEffect, useRef, useState } from 'react';
import { ZoomIn, ZoomOut, Center, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Node {
  id: string;
  name: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: string[];
  type: 'file' | 'folder';
}

interface Connection {
  source: string;
  target: string;
}

const sampleNodes: Node[] = [
  { id: '1', name: 'Getting Started', x: 300, y: 200, vx: 0, vy: 0, connections: ['2', '3'], type: 'file' },
  { id: '2', name: 'Machine Learning', x: 500, y: 150, vx: 0, vy: 0, connections: ['1', '4', '5'], type: 'file' },
  { id: '3', name: 'Data Analysis', x: 200, y: 300, vx: 0, vy: 0, connections: ['1', '4'], type: 'file' },
  { id: '4', name: 'Research Notes', x: 400, y: 350, vx: 0, vy: 0, connections: ['2', '3', '5'], type: 'folder' },
  { id: '5', name: 'Daily Notes', x: 600, y: 250, vx: 0, vy: 0, connections: ['2', '4'], type: 'file' },
  { id: '6', name: 'Ideas', x: 150, y: 150, vx: 0, vy: 0, connections: ['1'], type: 'file' },
];

export const GraphView = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<Node[]>([...sampleNodes]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  const connections: Connection[] = [];
  nodes.forEach(node => {
    node.connections.forEach(targetId => {
      if (!connections.find(c => 
        (c.source === node.id && c.target === targetId) || 
        (c.source === targetId && c.target === node.id)
      )) {
        connections.push({ source: node.id, target: targetId });
      }
    });
  });

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Apply transformations
    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    // Draw connections
    connections.forEach(connection => {
      const sourceNode = nodes.find(n => n.id === connection.source);
      const targetNode = nodes.find(n => n.id === connection.target);
      
      if (sourceNode && targetNode) {
        const isHighlighted = hoveredNode === sourceNode.id || hoveredNode === targetNode.id;
        
        ctx.beginPath();
        ctx.moveTo(sourceNode.x, sourceNode.y);
        ctx.lineTo(targetNode.x, targetNode.y);
        
        if (isHighlighted) {
          ctx.strokeStyle = '#3b82f6';
          ctx.lineWidth = 3;
          ctx.shadowColor = '#3b82f6';
          ctx.shadowBlur = 10;
        } else {
          ctx.strokeStyle = '#e2e8f0';
          ctx.lineWidth = 2;
          ctx.shadowBlur = 0;
        }
        
        ctx.stroke();
      }
    });

    // Draw nodes
    nodes.forEach(node => {
      const isHovered = hoveredNode === node.id;
      const radius = 40;
      
      // Node shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
      ctx.shadowBlur = isHovered ? 20 : 10;
      ctx.shadowOffsetX = 4;
      ctx.shadowOffsetY = 4;
      
      // Node background
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
      
      if (node.type === 'folder') {
        ctx.fillStyle = isHovered ? '#f59e0b' : '#fbbf24';
      } else {
        ctx.fillStyle = isHovered ? '#3b82f6' : '#60a5fa';
      }
      
      ctx.fill();
      
      // Inner highlight
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(node.x - 8, node.y - 8, radius * 0.3, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fill();
      
      // Node text
      ctx.fillStyle = 'white';
      ctx.font = `${isHovered ? '14px' : '12px'} Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const maxWidth = radius * 1.5;
      const lines = wrapText(ctx, node.name, maxWidth);
      const lineHeight = 16;
      const startY = node.y - (lines.length - 1) * lineHeight / 2;
      
      lines.forEach((line, i) => {
        ctx.fillText(line, node.x, startY + i * lineHeight);
      });
    });

    ctx.restore();
    
    // Simple physics simulation
    setNodes(prevNodes => {
      const newNodes = [...prevNodes];
      
      // Apply forces
      newNodes.forEach(node => {
        let fx = 0, fy = 0;
        
        // Repulsion from other nodes
        newNodes.forEach(other => {
          if (node.id !== other.id) {
            const dx = node.x - other.x;
            const dy = node.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const force = 1000 / (distance * distance);
            fx += (dx / distance) * force;
            fy += (dy / distance) * force;
          }
        });
        
        // Attraction to connected nodes
        node.connections.forEach(connectedId => {
          const connected = newNodes.find(n => n.id === connectedId);
          if (connected) {
            const dx = connected.x - node.x;
            const dy = connected.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const force = distance * 0.001;
            fx += (dx / distance) * force;
            fy += (dy / distance) * force;
          }
        });
        
        // Center attraction
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const dx = centerX - node.x;
        const dy = centerY - node.y;
        fx += dx * 0.0001;
        fy += dy * 0.0001;
        
        // Update velocity and position
        node.vx = (node.vx + fx) * 0.85;
        node.vy = (node.vy + fy) * 0.85;
        
        if (draggedNode !== node.id) {
          node.x += node.vx;
          node.y += node.vy;
        }
      });
      
      return newNodes;
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + ' ' + word).width;
      if (width < maxWidth) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - pan.x) / zoom;
    const y = (e.clientY - rect.top - pan.y) / zoom;

    let found = false;
    for (const node of nodes) {
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      if (distance < 40) {
        setHoveredNode(node.id);
        found = true;
        break;
      }
    }
    
    if (!found) {
      setHoveredNode(null);
    }

    if (draggedNode) {
      setNodes(prevNodes => 
        prevNodes.map(node => 
          node.id === draggedNode 
            ? { ...node, x, y, vx: 0, vy: 0 }
            : node
        )
      );
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (hoveredNode) {
      setDraggedNode(hoveredNode);
    }
  };

  const handleMouseUp = () => {
    setDraggedNode(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="h-full relative overflow-hidden rounded-3xl">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          size="sm"
          variant="secondary"
          className="rounded-xl shadow-neumorphic bg-white/60 backdrop-blur-sm hover:shadow-neumorphic-large"
          onClick={() => setZoom(Math.min(zoom * 1.2, 3))}
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className="rounded-xl shadow-neumorphic bg-white/60 backdrop-blur-sm hover:shadow-neumorphic-large"
          onClick={() => setZoom(Math.max(zoom / 1.2, 0.3))}
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className="rounded-xl shadow-neumorphic bg-white/60 backdrop-blur-sm hover:shadow-neumorphic-large"
          onClick={() => {
            setZoom(1);
            setPan({ x: 0, y: 0 });
          }}
        >
          <Center className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className="rounded-xl shadow-neumorphic bg-white/60 backdrop-blur-sm hover:shadow-neumorphic-large"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>

      {hoveredNode && (
        <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-neumorphic">
          <div className="text-sm font-medium text-gray-800">
            {nodes.find(n => n.id === hoveredNode)?.name}
          </div>
          <div className="text-xs text-gray-500">
            {nodes.find(n => n.id === hoveredNode)?.connections.length} connections
          </div>
        </div>
      )}
    </div>
  );
};
