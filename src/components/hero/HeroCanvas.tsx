"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas: container,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Create Particle System
    const particleCount = 1400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const initialPositions: Array<{ x: number; y: number; z: number }> = [];

    // Base colors
    // Dark theme: Amber (#fac37b) to Rose (#ec4899)
    // Light theme: Warm Amber (#f59e0b) to soft rose (#e11d48)
    const colorDark1 = new THREE.Color("#fac37b");
    const colorDark2 = new THREE.Color("#ec4899");
    const colorLight1 = new THREE.Color("#f59e0b");
    const colorLight2 = new THREE.Color("#e11d48");

    // Populate coordinates
    for (let i = 0; i < particleCount; i++) {
      // Create a nice distribution (spiral galaxy / nebula field shape)
      const r = Math.random() * 6 + 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi) * 0.5; // Flatten slightly

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialPositions.push({ x, y, z });

      // Color interpolation
      const mixRatio = Math.random();
      const isDark = document.documentElement.classList.contains("dark");
      const c = new THREE.Color();
      if (isDark) {
        c.lerpColors(colorDark1, colorDark2, mixRatio);
      } else {
        c.lerpColors(colorLight1, colorLight2, mixRatio);
      }

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle texture (circle helper)
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.flipY = false;

    const material = new THREE.PointsMaterial({
      size: 0.05,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 5. Interactivity Variables
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    let scrollY = 0;
    let targetScrollY = 0;

    // Listeners
    const onMouseMove = (event: MouseEvent) => {
      // Normalize to -1 to 1
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);

    // Resize Handler
    const onResize = () => {
      if (!canvasRef.current) return;
      const w = canvasRef.current.parentElement?.clientWidth || window.innerWidth;
      const h = canvasRef.current.parentElement?.clientHeight || window.innerHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // MutationObserver to watch dark mode class shifts
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      const colorAttribute = geometry.getAttribute("color") as THREE.BufferAttribute;

      for (let i = 0; i < particleCount; i++) {
        const mixRatio = Math.random();
        const c = new THREE.Color();
        if (isDark) {
          c.lerpColors(colorDark1, colorDark2, mixRatio);
        } else {
          c.lerpColors(colorLight1, colorLight2, mixRatio);
        }
        colorAttribute.setXYZ(i, c.r, c.g, c.b);
      }
      colorAttribute.needsUpdate = true;
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // 6. Animation Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth mouse follow (easing)
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Smooth scroll follow (easing)
      scrollY += (targetScrollY - scrollY) * 0.05;

      // Rotate whole particle nebula
      particles.rotation.y = elapsedTime * 0.03 + mouseX * 0.2;
      particles.rotation.x = elapsedTime * 0.01 + mouseY * 0.1;

      // Float effect on particles
      const positionAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        const x = initialPositions[i].x;
        const y = initialPositions[i].y;
        const z = initialPositions[i].z;

        // Apply a small organic oscillation per particle
        const newX = x + Math.sin(elapsedTime + i) * 0.05;
        const newY = y + Math.cos(elapsedTime * 0.5 + i) * 0.05;
        const newZ = z + Math.sin(elapsedTime * 0.8 + i) * 0.02;

        // Shift away dynamically based on scroll
        const scrollOffset = (scrollY / window.innerHeight) * 0.8;
        positionAttr.setXYZ(i, newX, newY - scrollOffset, newZ);
      }
      positionAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      // Dispose resources
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60 dark:opacity-40" />;
}
