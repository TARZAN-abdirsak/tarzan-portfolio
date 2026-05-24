"use client";

import { useRef, useEffect } from 'react';
import Matter from 'matter-js';
import { useCursor } from "@/context/CursorContext";

export interface PhysicsItem {
    id: string;
    type: 'rectangle' | 'circle' | 'pill' | 'hexagon';
    text: string;
    color: string;
    textColor?: string;
    icon?: string; // Path to SVG if icon mode
    width?: number; // For rect/pill
    height?: number; // For rect/pill
    radius?: number; // For circle/hexagon
    fontSize?: number; // Custom font size
}

interface PhysicsCanvasProps {
    width?: number;
    height?: number;
    items?: PhysicsItem[];
    shouldDrop?: boolean;
}

// Specialized for HorizontalScrollSection (Influence)
export default function InfluenceCanvas({ width = 800, height = 600, items = [], shouldDrop = true }: PhysicsCanvasProps) {
    const { showDrag, resetCursor } = useCursor();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const renderRef = useRef<Matter.Render | null>(null);
    const runnerRef = useRef<Matter.Runner | null>(null);
    const bodiesRef = useRef<Matter.Body[]>([]);

    // Toggle gravity and reset positions when shouldDrop changes
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (engineRef.current) {
            if (shouldDrop) {
                // Enable gravity - items will fall
                engineRef.current.world.gravity.y = 0.8;
            } else {
                // Delay before resetting - allows section to fully exit viewport
                timeoutId = setTimeout(() => {
                    if (engineRef.current) {
                        // Disable gravity and reset positions to top
                        engineRef.current.world.gravity.y = 0;

                        // Reset bodies to initial positions
                        bodiesRef.current.forEach((body, index) => {
                            // Adaptive Grid Logic
                            const isMobile = width < 768;
                            const cols = isMobile ? 2 : 4;
                            const spacingX = isMobile ? 160 : 220;
                            const spacingY = isMobile ? 110 : 140;

                            // Calculate grid dimensions
                            const gridWidth = (cols - 1) * spacingX;
                            const startX = (width - gridWidth) / 2;
                            const startY = isMobile ? 100 : 100;

                            const row = Math.floor(index / cols);
                            const col = index % cols;

                            const x = startX + col * spacingX + (Math.random() - 0.5) * (isMobile ? 40 : 80);
                            const y = startY + row * spacingY + (Math.random() - 0.5) * 60;

                            Matter.Body.setPosition(body, { x, y });
                            Matter.Body.setVelocity(body, { x: 0, y: 0 });
                            Matter.Body.setAngularVelocity(body, 0);
                        });
                    }
                }, 800); // 800ms delay - enough time for section to exit
            }
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [shouldDrop]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events, Body, Query } = Matter;

        // Create engine
        const engine = Engine.create({
            positionIterations: 10,
            velocityIterations: 10,
            constraintIterations: 4
        });
        engineRef.current = engine;
        const world = engine.world;

        // Create renderer
        const render = Render.create({
            canvas: canvas,
            engine: engine,
            options: {
                width: width,
                height: height,
                wireframes: false,
                showAngleIndicator: false,
                background: 'transparent',
                pixelRatio: window.devicePixelRatio
            }
        });
        renderRef.current = render;

        // Create walls (invisible boundaries)
        const walls = [
            Bodies.rectangle(width / 2, height - 10, width, 60, { isStatic: true, render: { visible: false }, collisionFilter: { category: 0x0002 } }),
            Bodies.rectangle(width / 2, -30, width, 60, { isStatic: true, render: { visible: false }, collisionFilter: { category: 0x0002 } }),
            Bodies.rectangle(-30, height / 2, 60, height + 60, { isStatic: true, render: { visible: false }, collisionFilter: { category: 0x0002 } }),
            Bodies.rectangle(width + 30, height / 2, 60, height + 60, { isStatic: true, render: { visible: false }, collisionFilter: { category: 0x0002 } })
        ];
        Composite.add(world, walls);

        // Create physics bodies from items
        const bodies: Matter.Body[] = [];

        // Adaptive Grid Logic for Initial Creation
        const isMobile = width < 768;
        const cols = isMobile ? 2 : 4;
        const spacingX = isMobile ? 160 : 220;
        const spacingY = isMobile ? 110 : 140;

        // Calculate grid dimensions to center it
        const gridWidth = (cols - 1) * spacingX;
        const startXOffset = (width - gridWidth) / 2;
        const startYOffset = isMobile ? 100 : 100;

        items.forEach((item, index) => {
            const row = Math.floor(index / cols);
            const col = index % cols;

            const baseX = startXOffset + col * spacingX;
            const baseY = startYOffset + row * spacingY;

            const x = baseX + (Math.random() - 0.5) * (isMobile ? 40 : 80);
            const y = baseY + (Math.random() - 0.5) * 60;

            let body: Matter.Body;

            // Influence Mode: Varied shapes
            const renderStyle = {
                fillStyle: item.color,
                strokeStyle: '#000000',
                lineWidth: 0
            };

            const commonOptions = {
                restitution: 0.5,
                friction: 0.01,
                label: item.text
                // Not static - let physics handle it
            };

            if (item.type === 'pill') {
                const w = item.width || 180;
                const h = item.height || 60;
                body = Bodies.rectangle(x, y, w, h, {
                    ...commonOptions,
                    chamfer: { radius: h / 2 },
                    render: renderStyle
                });
            } else if (item.type === 'hexagon') {
                const r = item.radius || 60;
                body = Bodies.polygon(x, y, 6, r, {
                    ...commonOptions,
                    render: renderStyle
                });
            } else if (item.type === 'circle') {
                const r = item.radius || 60;
                body = Bodies.circle(x, y, r, {
                    ...commonOptions,
                    render: renderStyle
                });
            } else {
                // Default rect
                body = Bodies.rectangle(x, y, item.width || 100, item.height || 100, {
                    ...commonOptions,
                    chamfer: { radius: 10 },
                    render: renderStyle
                });
            }

            // Randomize angle for influence shapes
            Body.setAngle(body, (Math.random() - 0.5) * Math.PI);

            // Attach data to body for rendering
            (body as any).itemData = item;
            bodies.push(body);
        });

        bodiesRef.current = bodies;
        Composite.add(world, bodies);

        // Detect mobile/touch device
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        let mouseConstraint: Matter.MouseConstraint | null = null;

        // Only add mouse/drag interaction on desktop (non-touch)
        if (!isTouchDevice) {
            // Mouse control - with proper pixel ratio handling
            const mouse = Mouse.create(canvas);

            // Fix mouse offset for proper coordinate mapping
            Mouse.setOffset(mouse, { x: 0, y: 0 });
            Mouse.setScale(mouse, { x: 1, y: 1 });

            // Allow page scrolling - remove Matter.js wheel event capture
            const wheelHandler = (mouse as any).mousewheel;
            if (wheelHandler) {
                canvas.removeEventListener('wheel', wheelHandler);
                canvas.removeEventListener('mousewheel', wheelHandler);
                canvas.removeEventListener('DOMMouseScroll', wheelHandler);
            }

            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.8,
                    damping: 0.1,
                    render: { visible: false }
                },
                collisionFilter: { mask: 0x0001 }
            });
            Composite.add(world, mouseConstraint);
            render.mouse = mouse;

            // Improved grab detection
            const handleMouseDown = (e: MouseEvent) => {
                const rect = canvas.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                const mousePoint = { x: mouseX, y: mouseY };

                const bodiesAtPoint = Query.point(bodies, mousePoint);
                let targetBody: Matter.Body | null = null;

                if (bodiesAtPoint.length > 0) {
                    targetBody = bodiesAtPoint[0];
                } else {
                    let closestDistance = Infinity;
                    bodies.forEach(body => {
                        const dx = body.position.x - mouseX;
                        const dy = body.position.y - mouseY;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        const bodyGrabRadius = (body as any).grabRadius || 60;
                        if (distance < bodyGrabRadius && distance < closestDistance) {
                            closestDistance = distance;
                            targetBody = body;
                        }
                    });
                }

                if (targetBody) {
                    // If object is near floor, nudge it toward mouse for easier grab
                    const floorThreshold = height - 100;
                    if (targetBody.position.y > floorThreshold) {
                        const moveStrength = 1.0;
                        Body.setPosition(targetBody, {
                            x: targetBody.position.x + (mouseX - targetBody.position.x) * moveStrength,
                            y: targetBody.position.y + (mouseY - targetBody.position.y) * moveStrength
                        });
                    }
                    Body.setVelocity(targetBody, { x: 0, y: 0 });
                    Body.setAngularVelocity(targetBody, 0);
                }
            };

            canvas.addEventListener('mousedown', handleMouseDown);

            // Custom wheel handler - allow scroll when not dragging
            const handleWheel = (e: WheelEvent) => {
                if (mouseConstraint && mouseConstraint.body) {
                    e.preventDefault();
                }
            };
            canvas.addEventListener('wheel', handleWheel, { passive: false });

            // Store cleanup refs
            (canvas as any)._handleMouseDown = handleMouseDown;
            (canvas as any)._handleWheel = handleWheel;
        } else {
            // Mobile: disable all touch interaction on canvas
            canvas.style.pointerEvents = 'none';
            canvas.style.touchAction = 'auto';
        }

        // Custom rendering loop
        Events.on(render, 'afterRender', function () {
            const context = render.context;

            bodies.forEach(body => {
                const item = (body as any).itemData as PhysicsItem;
                if (!item) return;

                const pos = body.position;
                const angle = body.angle;

                context.save();
                context.translate(pos.x, pos.y);
                context.rotate(angle);

                // --- INFLUENCE MODE RENDERING ---
                // Draw Text inside the shape
                context.fillStyle = item.textColor || '#FFFFFF';
                const fontSize = item.fontSize || (item.type === 'pill' ? 20 : 18);
                context.font = `bold ${fontSize}px sans-serif`;
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText(item.text, 0, 0);

                context.restore();
            });
        });

        // Gravity - starts at 0, enabled via shouldDrop prop
        engine.world.gravity.y = 0;
        engine.world.gravity.x = 0;

        // Air friction
        Events.on(engine, 'beforeUpdate', function () {
            bodies.forEach(body => {
                Body.setVelocity(body, { x: body.velocity.x * 0.99, y: body.velocity.y * 0.99 });
                Body.setAngularVelocity(body, body.angularVelocity * 0.98);
            });
        });

        // Run engine
        const runner = Runner.create();
        runnerRef.current = runner;
        Runner.run(runner, engine);
        Render.run(render);

        // Cleanup
        return () => {
            if ((canvas as any)._handleMouseDown) {
                canvas.removeEventListener('mousedown', (canvas as any)._handleMouseDown);
            }
            if ((canvas as any)._handleWheel) {
                canvas.removeEventListener('wheel', (canvas as any)._handleWheel);
            }
            if (runnerRef.current) Runner.stop(runnerRef.current);
            if (renderRef.current) Render.stop(renderRef.current);
            if (engineRef.current) Engine.clear(engineRef.current);
        };
    }, [width, height, items]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            style={{ borderRadius: '40px' }}
            onMouseEnter={showDrag}
            onMouseLeave={resetCursor}
        />
    );
}
