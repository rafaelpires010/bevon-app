"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface Star {
    x: number;
    y: number;
    z: number;
    size: number;
    opacity: number;
    twinkleSpeed: number;
    twinklePhase: number;
}

interface ShootingStar {
    x: number;
    y: number;
    z: number;
    speed: number;
    length: number;
    angle: number;
    opacity: number;
    active: boolean;
}

export function HeroBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let stars: Star[] = [];
        let shootingStars: ShootingStar[] = [];
        let lastShootingStarTime = 0;
        let width = window.innerWidth;
        let height = window.innerHeight;

        const initStars = () => {
            stars = [];
            const numStars = 600;
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * width - width / 2,
                    y: Math.random() * height - height / 2,
                    z: Math.random() * width,
                    size: Math.random() * 1.5,
                    opacity: Math.random(),
                    twinkleSpeed: 0.02 + Math.random() * 0.03,
                    twinklePhase: Math.random() * Math.PI * 2
                });
            }
        };

        const createShootingStar = () => {
            const startX = Math.random() * width - width / 2;
            const startY = Math.random() * height - height / 2;
            const startZ = Math.random() * width;

            shootingStars.push({
                x: startX,
                y: startY,
                z: startZ,
                speed: 15 + Math.random() * 10,
                length: 50 + Math.random() * 50,
                angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2, // Diagonal
                opacity: 1,
                active: true
            });
        };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initStars();
        };

        const animate = (time: number) => {
            ctx.clearRect(0, 0, width, height);

            const cx = width / 2;
            const cy = height / 2;

            // Parallax offset based on mouse
            const parallaxX = (mouseRef.current.x - cx) * 0.05;
            const parallaxY = (mouseRef.current.y - cy) * 0.05;

            // Random shooting star generation
            if (time - lastShootingStarTime > 2000 + Math.random() * 3000) {
                createShootingStar();
                lastShootingStarTime = time;
            }

            // Draw stars and connections
            stars.forEach((star, i) => {
                // Move star closer
                star.z -= 0.2;

                if (star.z <= 0) {
                    star.z = width;
                    star.x = Math.random() * width - width / 2;
                    star.y = Math.random() * height - height / 2;
                }

                const depth = 400;
                const scale = depth / (depth + star.z);

                const x3d = star.x - parallaxX * scale;
                const y3d = star.y - parallaxY * scale;

                const x = cx + x3d * scale;
                const y = cy + y3d * scale;

                // Twinkle
                star.twinklePhase += star.twinkleSpeed;
                const twinkle = Math.sin(star.twinklePhase) * 0.5 + 0.5;
                const currentOpacity = star.opacity * twinkle * (1 - star.z / width);

                if (x >= 0 && x < width && y >= 0 && y < height) {
                    ctx.beginPath();
                    ctx.fillStyle = `rgba(200, 200, 255, ${currentOpacity})`;
                    ctx.arc(x, y, star.size * scale, 0, Math.PI * 2);
                    ctx.fill();

                    // Connections (Constellations)
                    // Only check a subset of stars to save performance
                    if (currentOpacity > 0.5) {
                        for (let j = i + 1; j < stars.length; j += 10) {
                            const otherStar = stars[j];
                            const otherScale = depth / (depth + otherStar.z);
                            const otherX = cx + (otherStar.x - parallaxX * otherScale) * otherScale;
                            const otherY = cy + (otherStar.y - parallaxY * otherScale) * otherScale;

                            const dx = x - otherX;
                            const dy = y - otherY;
                            const dist = Math.sqrt(dx * dx + dy * dy);

                            if (dist < 100) {
                                ctx.beginPath();
                                ctx.strokeStyle = `rgba(150, 150, 255, ${0.1 * (1 - dist / 100)})`;
                                ctx.lineWidth = 0.5;
                                ctx.moveTo(x, y);
                                ctx.lineTo(otherX, otherY);
                                ctx.stroke();
                            }
                        }
                    }
                }
            });

            // Update and draw shooting stars
            shootingStars.forEach((star, index) => {
                if (!star.active) return;

                star.x += Math.cos(star.angle) * star.speed;
                star.y += Math.sin(star.angle) * star.speed;
                star.z -= star.speed;
                star.opacity -= 0.01;

                if (star.opacity <= 0 || star.x > width / 2 || star.y > height / 2) {
                    star.active = false;
                    shootingStars.splice(index, 1);
                    return;
                }

                const depth = 400;
                const scale = depth / (depth + star.z);
                const x = cx + star.x * scale;
                const y = cy + star.y * scale;

                const endX = x - Math.cos(star.angle) * star.length * scale;
                const endY = y - Math.sin(star.angle) * star.length * scale;

                const gradient = ctx.createLinearGradient(x, y, endX, endY);
                gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
                gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

                ctx.beginPath();
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2 * scale;
                ctx.moveTo(x, y);
                ctx.lineTo(endX, endY);
                ctx.stroke();
            });

            animationFrameId = requestAnimationFrame(() => animate(Date.now()));
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);

        resize();
        animate(Date.now());

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="absolute inset-0 -z-10 overflow-hidden bg-[#0a0514]">
            {/* Background Image with Blur */}
            <div className="absolute inset-0 z-0 opacity-20">
                <Image
                    src="/assets/office.jpg"
                    alt="Office Background"
                    fill
                    className="object-cover blur-sm"
                    priority
                />
            </div>

            {/* Deep Purple/Blue Radial Gradient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.3),rgba(10,5,20,1)_90%)] z-0 mix-blend-multiply" />

            {/* Subtle Nebula Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[100px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[100px] rounded-full mix-blend-screen" />

            {/* Starfield Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full z-10"
            />
        </div>
    );
}
