"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

type NodeType = 'black' | 'green';

interface WorkflowNode {
    id: string;
    titleKey: TranslationKey;
    itemKeys: TranslationKey[];
    type: NodeType;
    x: number;
    y: number;
}

interface Connection {
    from: string;
    to: string;
}

// Optimized initial layout for better flow
const INITIAL_NODES: WorkflowNode[] = [
    {
        id: "discovery",
        titleKey: "workflow.discovery.title",
        itemKeys: ["workflow.discovery.1", "workflow.discovery.2", "workflow.discovery.3"],
        type: "green",
        x: 50,
        y: 250
    },
    {
        id: "concept",
        titleKey: "workflow.concept.title",
        itemKeys: ["workflow.concept.1", "workflow.concept.2", "workflow.concept.3"],
        type: "black",
        x: 50,
        y: 50
    },
    {
        id: "design",
        titleKey: "workflow.design.title",
        itemKeys: ["workflow.design.1", "workflow.design.2", "workflow.design.3"],
        type: "green",
        x: 450,
        y: 250
    },
    {
        id: "develop",
        titleKey: "workflow.develop.title",
        itemKeys: ["workflow.develop.1", "workflow.develop.2", "workflow.develop.3"],
        type: "black",
        x: 450,
        y: 550
    },
    {
        id: "polish",
        titleKey: "workflow.polish.title",
        itemKeys: ["workflow.polish.1", "workflow.polish.2", "workflow.polish.3"],
        type: "green",
        x: 850,
        y: 250
    },
    {
        id: "launch",
        titleKey: "workflow.launch.title",
        itemKeys: ["workflow.launch.1", "workflow.launch.2", "workflow.launch.3"],
        type: "black",
        x: 1200,
        y: 250
    }
];

const CONNECTIONS: Connection[] = [
    { from: "discovery", to: "design" },
    { from: "concept", to: "design" },
    { from: "design", to: "polish" },
    { from: "design", to: "develop" },
    { from: "develop", to: "polish" },
    { from: "polish", to: "launch" }
];

export default function WorkflowSection() {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const [nodes, setNodes] = useState<WorkflowNode[]>(INITIAL_NODES);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    // Node dimensions (approximate for anchor calculation)
    const NODE_WIDTH = 300;
    const NODE_HEIGHT = 180;

    useEffect(() => {
        // Initial centering placeholder
    }, []);

    const handlePointerDown = (e: React.PointerEvent, id: string) => {
        e.stopPropagation();
        const node = nodes.find(n => n.id === id);
        if (!node) return;

        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            setDragOffset({
                x: mouseX - node.x,
                y: mouseY - node.y
            });
            setDraggingId(id);
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
        }
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!draggingId || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        setNodes(prev => prev.map(node => {
            if (node.id === draggingId) {
                return {
                    ...node,
                    x: mouseX - dragOffset.x,
                    y: mouseY - dragOffset.y
                };
            }
            return node;
        }));
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        if (draggingId) {
            setDraggingId(null);
            (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        }
    };

    // --- Connection Logic ---

    const getSmartConnection = (fromId: string, toId: string) => {
        const from = nodes.find(n => n.id === fromId);
        const to = nodes.find(n => n.id === toId);
        if (!from || !to) return null;

        const fromCenter = { x: from.x + NODE_WIDTH / 2, y: from.y + NODE_HEIGHT / 2 };
        const toCenter = { x: to.x + NODE_WIDTH / 2, y: to.y + NODE_HEIGHT / 2 };

        const dx = toCenter.x - fromCenter.x;
        const dy = toCenter.y - fromCenter.y;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        let startPoint = { x: 0, y: 0 };
        let endPoint = { x: 0, y: 0 };
        let startSide = 'right';
        let endSide = 'left';

        // FROM Node
        if (angle >= -45 && angle <= 45) { // Right
            startSide = 'right';
            startPoint = { x: from.x + NODE_WIDTH - 2, y: fromCenter.y };
        } else if (angle > 45 && angle < 135) { // Bottom
            startSide = 'bottom';
            startPoint = { x: fromCenter.x, y: from.y + NODE_HEIGHT - 2 };
        } else if (angle >= 135 || angle <= -135) { // Left
            startSide = 'left';
            startPoint = { x: from.x + 2, y: fromCenter.y };
        } else { // Top
            startSide = 'top';
            startPoint = { x: fromCenter.x, y: from.y + 2 };
        }

        // TO Node
        if (startSide === 'right') {
            endSide = 'left';
            endPoint = { x: to.x + 2, y: toCenter.y };
        } else if (startSide === 'bottom') {
            endSide = 'top';
            endPoint = { x: toCenter.x, y: to.y + 2 };
        } else if (startSide === 'left') {
            endSide = 'right';
            endPoint = { x: to.x + NODE_WIDTH - 2, y: toCenter.y };
        } else if (startSide === 'top') {
            endSide = 'bottom';
            endPoint = { x: toCenter.x, y: to.y + NODE_HEIGHT - 2 };
        }

        return { start: startPoint, end: endPoint, startSide, endSide };
    };

    const getControlPoints = (start: { x: number, y: number }, end: { x: number, y: number }, startSide: string, endSide: string) => {
        const dist = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
        const controlDist = Math.max(dist * 0.5, 50); // Minimum curve

        const cp1 = { x: start.x, y: start.y };
        const cp2 = { x: end.x, y: end.y };

        if (startSide === 'right') cp1.x += controlDist;
        else if (startSide === 'left') cp1.x -= controlDist;
        else if (startSide === 'bottom') cp1.y += controlDist;
        else if (startSide === 'top') cp1.y -= controlDist;

        if (endSide === 'right') cp2.x += controlDist;
        else if (endSide === 'left') cp2.x -= controlDist;
        else if (endSide === 'bottom') cp2.y += controlDist;
        else if (endSide === 'top') cp2.y -= controlDist;

        return { cp1, cp2 };
    };

    return (
        <section
            className="relative w-full h-[1000px] bg-[#f9f9f9] overflow-hidden select-none"
            ref={containerRef}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
        >
            {/* Render Independent SVGs for each connection */}
            {CONNECTIONS.map((conn) => {
                const connection = getSmartConnection(conn.from, conn.to);
                if (!connection) return null;

                const { start, end, startSide, endSide } = connection;
                const { cp1, cp2 } = getControlPoints(start, end, startSide, endSide);

                // Calculate bounding box for the curve
                const minX = Math.min(start.x, end.x, cp1.x, cp2.x);
                const maxX = Math.max(start.x, end.x, cp1.x, cp2.x);
                const minY = Math.min(start.y, end.y, cp1.y, cp2.y);
                const maxY = Math.max(start.y, end.y, cp1.y, cp2.y);

                // Add padding to avoid clipping stroke
                const padding = 20;
                const x = minX - padding;
                const y = minY - padding;
                const width = (maxX - minX) + (padding * 2);
                const height = (maxY - minY) + (padding * 2);

                // Relative coordinates for the path
                const relStart = { x: start.x - x, y: start.y - y };
                const relEnd = { x: end.x - x, y: end.y - y };
                const relCp1 = { x: cp1.x - x, y: cp1.y - y };
                const relCp2 = { x: cp2.x - x, y: cp2.y - y };

                return (
                    <svg
                        key={`${conn.from}-${conn.to}`}
                        className="absolute pointer-events-none"
                        style={{
                            left: x,
                            top: y,
                            width: width,
                            height: height,
                            zIndex: 0,
                            // overflow: 'visible' // Optional: safe fallback
                        }}
                        viewBox={`0 0 ${width} ${height}`}
                    >
                        <path
                            d={`M ${relStart.x} ${relStart.y} C ${relCp1.x} ${relCp1.y}, ${relCp2.x} ${relCp2.y}, ${relEnd.x} ${relEnd.y}`}
                            stroke="#ccc"
                            strokeWidth="2"
                            fill="none"
                        />
                        {/* Dots as circles within the local coordinate system */}
                        <circle cx={relStart.x} cy={relStart.y} r="3" fill="#ccc" />
                        <circle cx={relEnd.x} cy={relEnd.y} r="3" fill="#ccc" />
                    </svg>
                );
            })}

            {nodes.map((node) => (
                <div
                    key={node.id}
                    className={`absolute w-[300px] p-8 rounded-3xl shadow-lg cursor-grab active:cursor-grabbing transition-shadow hover:shadow-xl z-10 flex flex-col gap-4
            ${node.type === 'black' ? 'bg-[#18181b] text-white' : 'bg-[#bef264] text-black'}
          `}
                    style={{
                        transform: `translate(${node.x}px, ${node.y}px)`,
                        touchAction: 'none'
                    }}
                    onPointerDown={(e) => handlePointerDown(e, node.id)}
                >
                    {/* Visual Anchors (Decorative) */}
                    <div className={`absolute top-1/2 -left-2 w-4 h-4 rounded-full bg-white border-4 border-[#f9f9f9] -translate-y-1/2 transition-opacity duration-200`} />
                    <div className={`absolute top-1/2 -right-2 w-4 h-4 rounded-full bg-white border-4 border-[#f9f9f9] -translate-y-1/2 transition-opacity duration-200`} />
                    <div className={`absolute -top-2 left-1/2 w-4 h-4 rounded-full bg-white border-4 border-[#f9f9f9] -translate-x-1/2 transition-opacity duration-200`} />
                    <div className={`absolute -bottom-2 left-1/2 w-4 h-4 rounded-full bg-white border-4 border-[#f9f9f9] -translate-x-1/2 transition-opacity duration-200`} />

                    <h3 className="font-bold text-xl tracking-wide uppercase font-sans mb-1">
                        {t(node.titleKey)}
                    </h3>

                    <ul className="space-y-3">
                        {node.itemKeys.map((itemKey, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-sm font-medium opacity-90">
                                <span className="w-2 h-2 rounded-full bg-current shrink-0" />
                                {t(itemKey)}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </section>
    );
}
