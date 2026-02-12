"use client";

import { useRef, useEffect, useState } from 'react';
import Matter from 'matter-js';
import { useCursor } from "@/context/CursorContext";

// --- AUDIO ENGINE (Procedural) ---
let audioContext: AudioContext | null = null;
let lastSoundTime = 0;

const initAudioContext = () => {
    if (typeof window === 'undefined') return;
    if (!audioContext) {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
};

const playProceduralClick = (intensity: number) => {
    if (!audioContext) return;

    // Throttling
    const now = Date.now();
    if (now - lastSoundTime < 150) return; // Increased throttle to 150ms for separation
    lastSoundTime = now;

    // --- METALLIC SOUND RECIPE ---
    // Metallic sounds need inharmonic partials (frequencies that aren't perfect multiples)
    // and a longer "ringing" decay.

    const masterGain = audioContext.createGain();
    masterGain.connect(audioContext.destination);

    // Volume based on intensity (clamped) - SUBTLE
    const masterVol = Math.min(0.04 * intensity, 0.1); // significantly lowered
    masterGain.gain.setValueAtTime(masterVol, audioContext.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3); // Shortened tail for clarity

    // Base Pitch (High for metal)
    const baseFreq = 800 + (intensity * 100);

    // Oscillator 1: Fundamental
    const osc1 = audioContext.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(baseFreq, audioContext.currentTime);
    osc1.connect(masterGain);

    // Oscillator 2: First Overtone (Inharmonic - e.g. 1.5 ratio)
    const osc2 = audioContext.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(baseFreq * 1.58, audioContext.currentTime); // 1.58 gives a metallic ring
    osc2.connect(masterGain);

    // Oscillator 3: Second Overtone (High pitched ring)
    const osc3 = audioContext.createOscillator();
    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(baseFreq * 2.3, audioContext.currentTime);
    osc3.connect(masterGain);

    // Filter to remove low mud
    const filter = audioContext.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 500;
    masterGain.disconnect();
    masterGain.connect(filter);
    filter.connect(audioContext.destination);

    // Start all
    const time = audioContext.currentTime;
    osc1.start(time);
    osc1.stop(time + 0.3);
    osc2.start(time);
    osc2.stop(time + 0.3);
    osc3.start(time);
    osc3.stop(time + 0.15); // Higher freq decays faster
};

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
}

interface PhysicsCanvasProps {
    width?: number;
    height?: number;
    items?: PhysicsItem[];
    shouldDrop?: boolean;
}

export default function PhysicsCanvas({ width = 800, height = 600, items = [], shouldDrop = true }: PhysicsCanvasProps) {
    const { showDrag, resetCursor } = useCursor();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const renderRef = useRef<Matter.Render | null>(null);
    const runnerRef = useRef<Matter.Runner | null>(null);
    const bodiesRef = useRef<Matter.Body[]>([]); // Keep track of bodies
    const [isEngineReady, setIsEngineReady] = useState(false); // Track engine initialization

    // Initialize Matter.js Engine & Renderer FIRST (Previously Effect 2)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // ... (engine setup remains same) ...
        const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events, Body, Query, Vector, Vertices } = Matter;

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
            Bodies.rectangle(width / 2, -20000, width, 60, { isStatic: true, render: { visible: false }, collisionFilter: { category: 0x0002 } }), // Ceiling extremely high
            Bodies.rectangle(-30, height / 2, 60, height + 40000, { isStatic: true, render: { visible: false }, collisionFilter: { category: 0x0002 } }),
            Bodies.rectangle(width + 30, height / 2, 60, height + 40000, { isStatic: true, render: { visible: false }, collisionFilter: { category: 0x0002 } })
        ];
        Composite.add(world, walls);

        // Preload icon images
        const iconImages: { [key: string]: HTMLImageElement } = {};
        items.forEach(item => {
            if (item.icon) {
                const img = new Image();
                img.src = `/images/icons/${item.icon}`;
                iconImages[item.id] = img;
            }
        });

        // Create physics bodies from items
        const bodies: Matter.Body[] = [];

        items.forEach((item, index) => {
            // Grid layout: position bodies INSIDE the viewport initially
            const cols = 5;
            const row = Math.floor(index / cols);
            const col = index % cols;
            const startX = 100 + col * 150;
            const startY = 100 + row * 120;
            const x = startX + (Math.random() - 0.5) * 40;
            const y = startY + (Math.random() - 0.5) * 30;

            let body: Matter.Body;

            // Icon Mode: Rounded rectangle with Brand Color
            const itemWidth = item.width || 90;
            const itemHeight = item.height || 90;
            const radius = itemWidth * 0.2; // Proportional 20% radius

            body = Bodies.rectangle(x, y, itemWidth, itemHeight, {
                // NOT static - let physics handle it, gravity controls movement
                chamfer: { radius: radius },
                render: {
                    fillStyle: item.color,
                    strokeStyle: 'transparent',
                    lineWidth: 0
                },
                restitution: 0.5, // Bouncy
                friction: 0.02,
                frictionAir: 0.02, // Less air friction for faster fall
                label: item.text,
                collisionFilter: { category: 0x0001 }
            });
            (body as any).grabRadius = itemWidth;

            // Random rotation
            Body.setAngle(body, Math.random() * Math.PI * 2);

            // Attach data to body for rendering
            (body as any).itemData = item;
            bodies.push(body);
        });

        bodiesRef.current = bodies;
        Composite.add(world, bodies);

        // Signal that engine is ready
        setIsEngineReady(true);

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

        const mouseConstraint = MouseConstraint.create(engine, {
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
            initAudioContext(); // Initialize audio on first interaction
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

        const handleTouchStart = (e: TouchEvent) => {
            // Prevent scrolling while interacting with physics objects
            // We only prevent default if we actually hit a body? 
            // Ideally yes, but for simplicity let's prevent on canvas touch for now or check.
            // Matter.MouseConstraint usually handles this if connected right, 
            // but we're manually boosting interaction.

            // Touch support for manual boosting not fully implemented here, 
            // but adding the listener allows the MouseConstraint to work if we map touches to mouse.
            // Actually, Matter.Mouse automatically handles touch events if the pixel ratio is right.
            // But we might need to stop propagation.
        };

        // Matter.js Mouse handles touch automatically if mapped correctly. 
        // We just need to ensure the canvas doesn't capture scroll when we want to drag.

        canvas.addEventListener('mousedown', handleMouseDown);
        // canvas.addEventListener('touchstart', handleTouchStart, { passive: false });

        // Custom wheel handler - allow scroll when not dragging
        const handleWheel = (e: WheelEvent) => {
            // Only prevent scroll if actively dragging a body
            if (mouseConstraint.body) {
                e.preventDefault();
            }
            // Otherwise let the scroll happen naturally
        };
        canvas.addEventListener('wheel', handleWheel, { passive: false });

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

                // --- ICON MODE RENDERING ---
                // Use dimensions from item data attached to body
                const itemWidth = item.width || 90;
                const itemHeight = item.height || 90;
                const radius = itemWidth * 0.2; // Match chamfer radius

                // CLIP: Create path for rounded rectangle to prevent image corners from overflowing
                // Using manual path for maximum compatibility (context.roundRect is newer)
                context.beginPath();
                const rx = -itemWidth / 2;
                const ry = -itemHeight / 2;
                context.moveTo(rx + radius, ry);
                context.lineTo(rx + itemWidth - radius, ry);
                context.quadraticCurveTo(rx + itemWidth, ry, rx + itemWidth, ry + radius);
                context.lineTo(rx + itemWidth, ry + itemHeight - radius);
                context.quadraticCurveTo(rx + itemWidth, ry + itemHeight, rx + itemWidth - radius, ry + itemHeight);
                context.lineTo(rx + radius, ry + itemHeight);
                context.quadraticCurveTo(rx, ry + itemHeight, rx, ry + itemHeight - radius);
                context.lineTo(rx, ry + radius);
                context.quadraticCurveTo(rx, ry, rx + radius, ry);
                context.closePath();
                context.clip();

                const iconSize = itemWidth * 0.6; // Scale icon relative to body size

                // Check if background color is dark (needs white icon)
                const hexColor = item.color.replace('#', '');
                const r = parseInt(hexColor.substr(0, 2), 16);
                const g = parseInt(hexColor.substr(2, 2), 16);
                const b = parseInt(hexColor.substr(4, 2), 16);
                const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
                const isDark = luminance < 0.5;

                // Draw Icon
                const imgOrCanvas = iconImages[item.id];
                if (item.icon && imgOrCanvas) {
                    const isReady = (imgOrCanvas instanceof HTMLImageElement) ? imgOrCanvas.complete : true;

                    if (isReady) {
                        if (isDark) {
                            // Make icon white for dark backgrounds
                            context.filter = 'brightness(0) invert(1)';
                        }
                        context.drawImage(imgOrCanvas, -iconSize / 2, -iconSize / 2, iconSize, iconSize);
                        context.filter = 'none'; // Reset filter
                    }
                }

                context.restore();

                // Labels removed per user request
            });
        });

        // Gravity starts at 0 - items stay in place until drop triggered
        engine.world.gravity.y = 0;
        engine.world.gravity.x = 0;

        // --- COLLISION SOUNDS ---
        Events.on(engine, 'collisionStart', (event) => {
            // Only play sounds if user is actively dragging something
            if (!mouseConstraint.body) return;

            event.pairs.forEach((pair) => {
                const bodyA = pair.bodyA;
                const bodyB = pair.bodyB;

                // Check if the dragged body is involved in this collision
                const isDraggingBody = (bodyA === mouseConstraint.body) || (bodyB === mouseConstraint.body);

                if (!isDraggingBody) return;

                // Calculate relative velocity for intensity
                const vA = bodyA.velocity;
                const vB = bodyB.velocity;
                const relVel = Math.sqrt(
                    Math.pow(vA.x - vB.x, 2) +
                    Math.pow(vA.y - vB.y, 2)
                );

                // Only play sound for significant hits
                if (relVel > 0.5) {
                    playProceduralClick(relVel);
                }
            });
        });

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
            setIsEngineReady(false); // Reset ready state on cleanup
            canvas.removeEventListener('mousedown', handleMouseDown);
            // canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('wheel', handleWheel);
            if (runnerRef.current) Runner.stop(runnerRef.current);
            if (renderRef.current) Render.stop(renderRef.current);
            if (engineRef.current) Engine.clear(engineRef.current);
        };
    }, [width, height, items]);

    // Handle dropping - SIMPLIFIED: just toggle gravity like InfluenceCanvas
    useEffect(() => {
        if (!engineRef.current) return;

        let timeoutId: NodeJS.Timeout;

        if (shouldDrop) {
            // Enable gravity - items will fall
            engineRef.current.world.gravity.y = 0.8;
        } else {
            // Delay before resetting - allows section to fully exit viewport
            timeoutId = setTimeout(() => {
                if (engineRef.current) {
                    // Disable gravity
                    engineRef.current.world.gravity.y = 0;

                    // Reset bodies to grid positions
                    bodiesRef.current.forEach((body, index) => {
                        const cols = 5;
                        const row = Math.floor(index / cols);
                        const col = index % cols;
                        const x = 100 + col * 150 + (Math.random() - 0.5) * 40;
                        const y = 100 + row * 120 + (Math.random() - 0.5) * 30;

                        Matter.Body.setPosition(body, { x, y });
                        Matter.Body.setVelocity(body, { x: 0, y: 0 });
                        Matter.Body.setAngularVelocity(body, 0);
                    });
                }
            }, 500);
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [shouldDrop]);

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
