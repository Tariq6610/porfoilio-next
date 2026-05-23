"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 500;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 4, 12);
    camera.lookAt(0, 0, 0);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas: container,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Create Wave Grid Geometry (columns x rows)
    const cols = 35;
    const rows = 20;
    const pointCount = cols * rows;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(pointCount * 3);
    const colors = new Float32Array(pointCount * 3);

    // Grid details
    const xSpacing = 0.5;
    const zSpacing = 0.5;
    const xOffset = -(cols - 1) * xSpacing / 2;
    const zOffset = -(rows - 1) * zSpacing / 2;

    const colorDark1 = new THREE.Color("#fac37b"); // Amber
    const colorDark2 = new THREE.Color("#ec4899"); // Rose
    const colorLight1 = new THREE.Color("#f59e0b"); // Amber
    const colorLight2 = new THREE.Color("#f43f5e"); // Soft Rose

    const getThemeColors = () => {
      const isDark = document.documentElement.classList.contains("dark");
      return isDark ? { c1: colorDark1, c2: colorDark2 } : { c1: colorLight1, c2: colorLight2 };
    };

    // Initial position fill
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const index = r * cols + c;
        const x = xOffset + c * xSpacing;
        const z = zOffset + r * zSpacing;
        const y = 0;

        positions[index * 3] = x;
        positions[index * 3 + 1] = y;
        positions[index * 3 + 2] = z;

        // Colors
        const { c1, c2 } = getThemeColors();
        const mixRatio = c / cols;
        const col = new THREE.Color().lerpColors(c1, c2, mixRatio);
        colors[index * 3] = col.r;
        colors[index * 3 + 1] = col.g;
        colors[index * 3 + 2] = col.b;
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Point Texture
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
    const dotTexture = new THREE.CanvasTexture(canvasDot);

    const material = new THREE.PointsMaterial({
      size: 0.18,
      map: dotTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const gridPoints = new THREE.Points(geometry, material);
    scene.add(gridPoints);

    // 5. Interactivity & Mouse Easing
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onMouseLeave = () => {
      targetMouseX = 0;
      targetMouseY = 0;
    };

    window.addEventListener("mousemove", onMouseMove);
    container.parentElement?.addEventListener("mouseleave", onMouseLeave);

    // Resize Handler
    const onResize = () => {
      if (!canvasRef.current) return;
      width = canvasRef.current.parentElement?.clientWidth || window.innerWidth;
      height = canvasRef.current.parentElement?.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // Theme Mutation Observer
    const observer = new MutationObserver(() => {
      const colorAttr = geometry.getAttribute("color") as THREE.BufferAttribute;
      const { c1, c2 } = getThemeColors();
      for (let i = 0; i < pointCount; i++) {
        const c = i % cols;
        const col = new THREE.Color().lerpColors(c1, c2, c / cols);
        colorAttr.setXYZ(i, col.r, col.g, col.b);
      }
      colorAttr.needsUpdate = true;
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

      // Mouse easing
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      // Rotate camera angle slightly based on mouse
      camera.position.x = mouseX * 2.5;
      camera.position.y = 4 + mouseY * 1.5;
      camera.lookAt(0, -1, 0);

      // Height deformation wave simulation
      const positionAttr = geometry.getAttribute("position") as THREE.BufferAttribute;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const index = r * cols + c;
          const x = xOffset + c * xSpacing;
          const z = zOffset + r * zSpacing;

          // Compute complex wave function (wave interference)
          const d1 = Math.sin(x * 0.4 + elapsedTime * 1.2) * 0.4;
          const d2 = Math.cos(z * 0.3 - elapsedTime * 0.9) * 0.3;
          const d3 = Math.sin((x + z) * 0.2 + elapsedTime * 0.7) * 0.25;

          let y = d1 + d2 + d3;

          // Mouse proximity deformation
          const nodePos = new THREE.Vector3(x, 0, z);
          // Standard mouse projection plane
          const mouseProj = new THREE.Vector3(mouseX * 6, 0, -mouseY * 4);
          const distToMouse = nodePos.distanceTo(mouseProj);
          if (distToMouse < 3) {
            const push = (3 - distToMouse) * 0.25;
            y -= push; // Depress grid
          }

          positionAttr.setY(index, y);
        }
      }
      positionAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      material.dispose();
      dotTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40 dark:opacity-20" />;
}
