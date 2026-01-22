import { useEffect, useRef } from 'react';
import './ParticleBackground.css';

export default function ParticleBackground() {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let interactionParticle = null;
        let mouseIsDown = false;
        let createIntervalId = null;

        const options = {
            velocity: 1.2,
            density: 12000,
            netLineDistance: 180,
            netLineColor: 'rgba(0, 240, 255, 0.15)',
            particleColors: ['#00f0ff', '#bd00ff', '#ffffff']
        };

        const resizeCanvas = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
            createParticles(false);
        };

        class Particle {
            constructor(x, y) {
                this.x = x || Math.random() * canvas.width;
                this.y = y || Math.random() * canvas.height;
                this.radius = Math.random() * 1.5 + 1;
                this.color = options.particleColors[Math.floor(Math.random() * options.particleColors.length)];
                this.opacity = 0;
                this.velocity = {
                    x: (Math.random() - 0.5) * options.velocity,
                    y: (Math.random() - 0.5) * options.velocity
                };
            }

            update() {
                if (this.opacity < 1) this.opacity += 0.02;

                if (this.x > canvas.width + 100 || this.x < -100) this.velocity.x = -this.velocity.x;
                if (this.y > canvas.height + 100 || this.y < -100) this.velocity.y = -this.velocity.y;

                this.x += this.velocity.x;
                this.y += this.velocity.y;
            }

            draw() {
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity * 0.6;
                ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
                ctx.fill();
            }
        }

        const createParticles = (isInitial) => {
            particles = [];
            const quantity = (canvas.width * canvas.height) / options.density;

            if (isInitial) {
                let counter = 0;
                if (createIntervalId) clearInterval(createIntervalId);
                createIntervalId = setInterval(() => {
                    if (counter < quantity - 1) {
                        particles.push(new Particle());
                    } else {
                        clearInterval(createIntervalId);
                    }
                    counter++;
                }, 100);
            } else {
                for (let i = 0; i < quantity; i++) {
                    particles.push(new Particle());
                }
            }
        };

        const update = () => {
            if (!ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];

                    const dx = Math.abs(p1.x - p2.x);
                    const dy = Math.abs(p1.y - p2.y);

                    if (dx > options.netLineDistance || dy > options.netLineDistance) continue;

                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < options.netLineDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = options.netLineColor;
                        ctx.globalAlpha = ((options.netLineDistance - distance) / options.netLineDistance) * p1.opacity * p2.opacity * 0.5;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            // Update and draw particles
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationFrameId = requestAnimationFrame(update);
        };

        // Interaction Handlers
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            if (!interactionParticle) {
                interactionParticle = new Particle(e.clientX - rect.left, e.clientY - rect.top);
                interactionParticle.velocity = { x: 0, y: 0 };
                interactionParticle.opacity = 1;
                particles.push(interactionParticle);
            } else {
                interactionParticle.x = e.clientX - rect.left;
                interactionParticle.y = e.clientY - rect.top;
            }
        };

        const handleMouseDown = () => {
            mouseIsDown = true;
            const interval = setInterval(() => {
                if (mouseIsDown && interactionParticle) {
                    for (let i = 0; i < 2; i++) {
                        particles.push(new Particle(interactionParticle.x, interactionParticle.y));
                    }
                } else {
                    clearInterval(interval);
                }
            }, 50);
        };

        const handleMouseUp = () => { mouseIsDown = false; };

        const handleMouseOut = () => {
            if (interactionParticle) {
                const index = particles.indexOf(interactionParticle);
                if (index > -1) particles.splice(index, 1);
                interactionParticle = null;
            }
        };

        // Touch Handlers
        const handleTouchMove = (e) => {
            if (e.touches.length > 0) {
                const rect = canvas.getBoundingClientRect();
                const touch = e.touches[0];
                if (!interactionParticle) {
                    interactionParticle = new Particle(touch.clientX - rect.left, touch.clientY - rect.top);
                    interactionParticle.velocity = { x: 0, y: 0 };
                    interactionParticle.opacity = 1;
                    particles.push(interactionParticle);
                } else {
                    interactionParticle.x = touch.clientX - rect.left;
                    interactionParticle.y = touch.clientY - rect.top;
                }
            }
        };

        resizeCanvas();
        createParticles(true);
        update();

        window.addEventListener('resize', resizeCanvas);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mouseout', handleMouseOut);
        canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
        canvas.addEventListener('touchend', handleMouseOut);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('mouseout', handleMouseOut);
            canvas.removeEventListener('touchmove', handleTouchMove);
            canvas.removeEventListener('touchend', handleMouseOut);
            cancelAnimationFrame(animationFrameId);
            if (createIntervalId) clearInterval(createIntervalId);
        };
    }, []);

    return (
        <div className="particle-network-container" ref={containerRef}>
            <div className="glow glow-1"></div>
            <div className="glow glow-2 glow-purple"></div>
            <div className="glow glow-3"></div>
            <canvas ref={canvasRef} className="particle-canvas" />
        </div>
    );
}
