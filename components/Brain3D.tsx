"use client";

import { useEffect, useRef } from "react";

interface Point {
    x: number;
    y: number;
    z: number;
    baseX: number;
    baseY: number;
    baseZ: number;
}

export function Brain3D() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let points: Point[] = [];
        let rotationX = 0;
        let rotationY = 0;
        let targetRotationX = 0;
        let targetRotationY = 0;

        // Generate points for a "Brain" shape (approximate with two hemispheres)
        const initPoints = () => {
            points = [];
            const numPoints = 600;
            const radius = 100;

            for (let i = 0; i < numPoints; i++) {
                // Use spherical coordinates but split into two hemispheres
                const theta = Math.random() * Math.PI * 2; // Angle around Y axis
                const phi = Math.acos(2 * Math.random() - 1); // Angle from Y axis

                // Create a gap in the middle for hemispheres
                let x = radius * Math.sin(phi) * Math.cos(theta);
                let y = radius * Math.sin(phi) * Math.sin(theta);
                let z = radius * Math.cos(phi);

                // Flatten slightly to look more like a brain
                y *= 0.8;

                // Separate hemispheres
                if (x > 0) x += 10;
                else x -= 10;

                points.push({
                    x, y, z,
                    baseX: x,
                    baseY: y,
                    baseZ: z
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            // Smooth rotation
            rotationX += (targetRotationX - rotationX) * 0.1;
            rotationY += (targetRotationY - rotationY) * 0.1;

            // Auto rotation
            rotationY += 0.005;

            points.forEach(point => {
                // Rotate around Y
                let x1 = point.baseX * Math.cos(rotationY) - point.baseZ * Math.sin(rotationY);
                let z1 = point.baseZ * Math.cos(rotationY) + point.baseX * Math.sin(rotationY);

                // Rotate around X
                let y1 = point.baseY * Math.cos(rotationX) - z1 * Math.sin(rotationX);
                let z2 = z1 * Math.cos(rotationX) + point.baseY * Math.sin(rotationX);

                // Project
                const scale = 300 / (300 + z2);
                const x2D = x1 * scale + cx;
                const y2D = y1 * scale + cy;
                const size = 1.5 * scale;
                const opacity = (z2 + 100) / 200; // Fade back points

                if (opacity > 0) {
                    ctx.beginPath();
                    ctx.fillStyle = `rgba(168, 85, 247, ${opacity})`; // Purple-500
                    ctx.arc(x2D, y2D, size, 0, Math.PI * 2);
                    ctx.fill();

                    // Connect close points
                    points.forEach(otherPoint => {
                        // Simple distance check in 3D space (expensive, but okay for 600 points)
                        // Optimization: check only a few neighbors or pre-calculate connections
                        // For this demo, we'll skip connections to keep FPS high or add them if needed
                    });
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            targetRotationY = x * 0.001;
            targetRotationX = -y * 0.001;
        };

        initPoints();
        animate();

        // Local mouse move for the component
        canvas.addEventListener("mousemove", handleMouseMove);

        return () => {
            canvas.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={300}
            height={300}
            className="w-[200px] h-[200px] cursor-pointer"
        />
    );
}
