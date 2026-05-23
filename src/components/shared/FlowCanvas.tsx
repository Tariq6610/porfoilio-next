"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FlowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 500;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.OrthographicCamera(
      -width / 200, width / 200,
      height / 200, -height / 200,
      0.1, 100
    );
    camera.position.z = 5;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas: container,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Create Stream Particles
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Initial positioning on random lines flowing across the horizontal space
    const xLimit = width / 200;
    const yLimit = height / 200;

    const particles: Array<{
      x: number;
      y: number;
      speed: number;
      offset: number;
      amplitude: number;
    }> = [];

    const colorDark1 = new THREE.Color("#ec4899"); // Rose
    const colorDark2 = new THREE.Color("#f59e0b"); // Amber
    const colorLight1 = new THREE.Color("#f59e0b"); // Amber
    const colorLight2 = new THREE.Color("#f43f5e"); // Soft Rose

    const getThemeColors = () => {
      const isDark = document.documentElement.classList.contains("dark");
      return isDark ? { c1: colorDark1, c2: colorDark2 } : { c1: colorLight1, c2: colorLight2 };
    };

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * xLimit * 2;
      const y = (Math.random() - 0.5) * yLimit * 2;
      const speed = 0.01 + Math.random() * 0.02;
      const offset = Math.random() * 100;
      const amplitude = 0.1 + Math.random() * 0.3;

      particles.push({ x, y, speed, offset, amplitude });

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = 0;

      // Color mapping
      const { c1, c2 } = getThemeColors();
      const mixRatio = Math.random();
      const col = new THREE.Color().lerpColors(c1, c2, mixRatio);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle texture
    const canvasDot = document.createElement("canvas");
    canvasDot.width = 16;
    canvasDot.height = 16;
    const ctx = canvasDot.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvasDot);

    const material = new THREE.PointsMaterial({
      size: 0.16,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pointSystem = new THREE.Points(geometry, material);
    scene.add(pointSystem);

    // Mouse interactive target
    const mouse = new THREE.Vector2(-999, -999);

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = event.clientX - rect.left;
      const relativeY = event.clientY - rect.top;
      mouse.x = (relativeX / width) * xLimit * 2 - xLimit;
      mouse.y = -(relativeY / height) * yLimit * 2 + yLimit;
    };

    const onMouseLeave = () => {
      mouse.set(-999, -999);
    };

    window.addEventListener("mousemove", onMouseMove);
    container.parentElement?.addEventListener("mouseleave", onMouseLeave);

    // Resize Handler
    const onResize = () => {
      if (!canvasRef.current) return;
      const parent = canvasRef.current.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;

      camera.left = -width / 200;
      camera.right = width / 200;
      camera.top = height / 200;
      camera.bottom = -height / 200;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // Theme mutation observer
    const observer = new MutationObserver(() => {
      const colorAttr = geometry.getAttribute("color") as THREE.BufferAttribute;
      const { c1, c2 } = getThemeColors();
      for (let i = 0; i < particleCount; i++) {
        const col = new THREE.Color().lerpColors(c1, c2, Math.random());
        colorAttr.setXYZ(i, col.r, col.g, col.b);
      }
      colorAttr.needsUpdate = true;
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Animation loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) * 0.001;
      const positionAttr = geometry.getAttribute("position") as THREE.BufferAttribute;

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        // Move horizontally
        p.x += p.speed;

        // Wave motion vertically
        let currentY = p.y + Math.sin(p.x * 0.5 + elapsedTime + p.offset) * p.amplitude;

        // Mouse displacement
        if (mouse.x !== -999) {
          const dx = p.x - mouse.x;
          const dy = currentY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 1.8) {
            const force = (1.8 - dist) * 0.15;
            currentY += (dy / (dist || 1)) * force; // Push away from cursor vertically
          }
        }

        // Loop boundaries horizontally
        if (p.x > xLimit + 0.5) {
          p.x = -xLimit - 0.5;
          p.y = (Math.random() - 0.5) * yLimit * 2;
        }

        positionAttr.setXYZ(i, p.x, currentY, 0);
      }
      positionAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40 dark:opacity-20 z-0" />;
}
