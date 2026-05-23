"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function OrbCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current;
    let width = container.clientWidth || 300;
    let height = container.clientHeight || 300;

    // Scene Setup
    const scene = new THREE.Scene();

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 4.5;

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas: container,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create Torus Knot or Sphere Geometry for holographic wireframe look
    const geometry = new THREE.SphereGeometry(1.4, 28, 28);

    // Get color theme
    const colorDark1 = new THREE.Color("#8b5cf6"); // Violet
    const colorDark2 = new THREE.Color("#ec4899"); // Rose
    const colorLight1 = new THREE.Color("#f59e0b"); // Amber
    const colorLight2 = new THREE.Color("#e11d48"); // Rose-red

    const getThemeColors = () => {
      const isDark = document.documentElement.classList.contains("dark");
      return isDark ? { c1: colorDark1, c2: colorDark2 } : { c1: colorLight1, c2: colorLight2 };
    };

    // Vertex colors based on position
    const count = geometry.attributes.position.count;
    const colors = new Float32Array(count * 3);
    const initialPositions = geometry.attributes.position.clone();

    const updateColors = () => {
      const { c1, c2 } = getThemeColors();
      for (let i = 0; i < count; i++) {
        const mixRatio = (geometry.attributes.position.getY(i) + 1.4) / 2.8;
        const c = new THREE.Color().lerpColors(c1, c2, mixRatio);
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    };

    updateColors();

    // Points Material
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

    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.08,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, pointsMaterial);
    scene.add(points);

    // Wireframe Mesh overlay for holographic grid look
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      vertexColors: true,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geometry, wireframeMaterial);
    scene.add(mesh);

    // Interaction variables
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = event.clientX - rect.left;
      const relativeY = event.clientY - rect.top;
      targetMouseX = (relativeX / width) * 2 - 1;
      targetMouseY = -(relativeY / height) * 2 + 1;
    };

    const onMouseLeave = () => {
      targetMouseX = 0;
      targetMouseY = 0;
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    // Resize Handler
    const onResize = () => {
      if (!canvasRef.current) return;
      const parent = canvasRef.current.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // Theme mutation observer
    const observer = new MutationObserver(() => {
      updateColors();
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

      // Mouse easing
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // Rotation & holographic spin
      points.rotation.y = elapsedTime * 0.15 + mouseX * 0.5;
      points.rotation.x = elapsedTime * 0.08 + mouseY * 0.3;
      mesh.rotation.copy(points.rotation);

      // Morphing / breathing core simulation using vertex coordinate noise
      const positions = geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < count; i++) {
        const x = initialPositions.getX(i);
        const y = initialPositions.getY(i);
        const z = initialPositions.getZ(i);

        // Compute localized organic deformation factors
        const wave = Math.sin(elapsedTime * 2.5 + (x + y + z) * 1.5) * 0.05;
        const targetX = x * (1 + wave);
        const targetY = y * (1 + wave);
        const targetZ = z * (1 + wave);

        positions.setXYZ(i, targetX, targetY, targetZ);
      }
      positions.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      pointsMaterial.dispose();
      wireframeMaterial.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-90 dark:opacity-60 z-0" />;
}
