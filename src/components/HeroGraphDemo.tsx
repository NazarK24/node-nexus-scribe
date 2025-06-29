import React, { useEffect, useRef, useState } from 'react';

interface DemoNode {
  id: string;
  name: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  connections: string[];
}

const demoNodes: DemoNode[] = [
  { id: '1', name: 'Ideas', x: 200, y: 150, vx: 0, vy: 0, radius: 25, color: '#3b82f6', connections: ['2', '4'] },
  { id: '2', name: 'Research', x: 350, y: 100, vx: 0, vy: 0, radius: 30, color: '#8b5cf6', connections: ['1', '3', '5'] },
  { id: '3', name: 'Analysis', x: 500, y: 200, vx: 0, vy: 0, radius: 28, color: '#06b6d4', connections: ['2', '5'] },
  { id: '4', name: 'Notes', x: 150, y: 300, vx: 0, vy: 0, radius: 22, color: '#10b981', connections: ['1', '5'] },
  { id: '5', name: 'Insights', x: 400, y: 280, vx: 0, vy: 0, radius: 35, color: '#f59e0b', connections: ['2', '3', '4'] },
];

export const HeroGraphDemo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<DemoNode[]>([...demoNodes]);
  const [animationPhase, setAnimationPhase] = useState(0);
  const animationRef = useRef<number>();

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections with animated glow
    const glowIntensity = Math.sin(Date.now() * 0.003) * 0.5 + 0.5;
    
    nodes.forEach(node => {
      node.connections.forEach(connectedId => {
        const connected = nodes.find(n => n.id === connectedId);
        if (connected) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(connected.x, connected.y);
          
          // Animated connection
          ctx.strokeStyle = `rgba(59, 130, 246, ${0.3 + glowIntensity * 0.4})`;
          ctx.lineWidth = 2 + glowIntensity * 2;
          ctx.shadowColor = '#3b82f6';
          ctx.shadowBlur = 10 + glowIntensity * 10;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      });
    });

    // Draw nodes with pulsing animation
    nodes.forEach((node, index) => {
      const pulsePhase = (Date.now() * 0.002) + (index * 0.5);
      const pulse = Math.sin(pulsePhase) * 0.1 + 1;
      const currentRadius = node.radius * pulse;

      // Node shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;

      // Node background
      ctx.beginPath();
      ctx.arc(node.x, node.y, currentRadius, 0, 2 * Math.PI);
      ctx.fillStyle = node.color;
      ctx.fill();

      // Inner highlight
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(node.x - 6, node.y - 6, currentRadius * 0.3, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fill();

      // Node text
      ctx.fillStyle = 'white';
      ctx.font = '600 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.name, node.x, node.y);
    });

    // Simple physics for floating effect
    setNodes(prevNodes => {
      return prevNodes.map(node => {
        const time = Date.now() * 0.001;
        const floatX = Math.sin(time + parseFloat(node.id)) * 2;
        const floatY = Math.cos(time * 0.7 + parseFloat(node.id)) * 2;
        
        return {
          ...node,
          x: node.x + floatX * 0.1,
          y: node.y + floatY * 0.1
        };
      });
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 600;
    canvas.height = 400;

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl"></div>
      <div className="relative bg-white/40 backdrop-blur-sm rounded-3xl shadow-neumorphic-large border border-white/50 p-8">
        <canvas 
          ref={canvasRef}
          className="w-full h-full rounded-2xl"
          style={{ maxWidth: '600px', maxHeight: '400px' }}
        />
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-xl px-3 py-2 shadow-neumorphic">
          <div className="text-xs font-medium text-gray-600">Live Demo</div>
        </div>
      </div>
    </div>
  );
};
