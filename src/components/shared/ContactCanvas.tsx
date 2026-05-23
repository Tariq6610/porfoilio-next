"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ContactCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current;
    const parent = container.parentElement;
    let width = parent?.clientWidth || window.innerWidth;
    let height = parent?.clientHeight || 600;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup (Orthographic for perfect layout mapping)
    const camera = new THREE.OrthographicCamera(
      -width / 200, width / 200,
      height / 200, -height / 200,
      0.1, 100
    );
    camera.position.z = 10;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas: container,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Create Custom Bokeh Texture
    const canvasDot = document.createElement("canvas");
    canvasDot.width = 64;
    canvasDot.height = 64;
    const ctx = canvasDot.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.2, "rgba(255, 255, 255, 0.8)");
      grad.addColorStop(0.5, "rgba(255, 255, 255, 0.2)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvasDot);

    // 5. Generate Orbs
    const orbCount = 35; // Clean, elegant, non-crowded count
    const orbs: Array<{
      mesh: THREE.Mesh;
      speedY: number;
      swaySpeed: number;
      swayAmp: number;
      swayOffset: number;
      baseX: number;
      scale: number;
      baseOpacity: number;
    }> = [];

    const geometry = new THREE.PlaneGeometry(1, 1);

    const colorDark1 = new THREE.Color("#fb7185"); // Rose
    const colorDark2 = new THREE.Color("#fbbf24"); // Amber
    const colorLight1 = new THREE.Color("#f43f5e"); // Rose
    const colorLight2 = new THREE.Color("#f59e0b"); // Amber

    const getThemeColors = () => {
      const isDark = document.documentElement.classList.contains("dark");
      return isDark ? { c1: colorDark1, c2: colorDark2 } : { c1: colorLight1, c2: colorLight2 };
    };

    const xLimit = width / 200;
    const yLimit = height / 200;

    for (let i = 0; i < orbCount; i++) {
      const { c1, c2 } = getThemeColors();
      const col = new THREE.Color().lerpColors(c1, c2, Math.random());

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        color: col,
        transparent: true,
        opacity: 0.15 + Math.random() * 0.3,
        blending: THREE.NormalBlending,
        depthWrite: false,
      });

      const mesh = new THREE.Mesh(geometry, material);

      // Random position and physical parameters
      const scale = 0.4 + Math.pow(Math.random(), 2) * 1.8; // Blend of small and large blurry circles
      mesh.scale.set(scale, scale, 1);

      const x = (Math.random() - 0.5) * xLimit * 2.2;
      const y = (Math.random() - 0.5) * yLimit * 2.2;
      mesh.position.set(x, y, 0);

      scene.add(mesh);

      orbs.push({
        mesh,
        speedY: 0.003 + Math.random() * 0.005,
        swaySpeed: 0.001 + Math.random() * 0.002,
        swayAmp: 0.1 + Math.random() * 0.4,
        swayOffset: Math.random() * 100,
        baseX: x,
        scale,
        baseOpacity: material.opacity,
      });
    }

    // 6. Mouse Interaction
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

    // 7. Resize Handler
    const onResize = () => {
      if (!canvasRef.current) return;
      const p = canvasRef.current.parentElement;
      if (!p) return;
      width = p.clientWidth || window.innerWidth;
      height = p.clientHeight || 600;

      camera.left = -width / 200;
      camera.right = width / 200;
      camera.top = height / 200;
      camera.bottom = -height / 200;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);
    onResize();

    // 8. Theme mutation observer
    const observer = new MutationObserver(() => {
      const { c1, c2 } = getThemeColors();
      const isDark = document.documentElement.classList.contains("dark");

      orbs.forEach((orb) => {
        const mat = orb.mesh.material as THREE.MeshBasicMaterial;
        mat.color.copy(new THREE.Color().lerpColors(c1, c2, Math.random()));
        mat.blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
        mat.needsUpdate = true;
      });
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // 9. Animation Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) * 0.001;
      const currentXLimit = width / 200;
      const currentYLimit = height / 200;

      orbs.forEach((orb) => {
        // Drift slowly upwards
        orb.mesh.position.y += orb.speedY;

        // Wave sway horizontally
        orb.baseX += Math.sin(elapsedTime * 0.5 + orb.swayOffset) * 0.002;
        const targetX = orb.baseX + Math.sin(elapsedTime + orb.swayOffset) * orb.swayAmp;

        // Mouse repelling force
        if (mouse.x !== -999) {
          const dx = orb.mesh.position.x - mouse.x;
          const dy = orb.mesh.position.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 2.0) {
            const force = (2.0 - dist) * 0.08;
            const angle = Math.atan2(dy, dx);
            orb.mesh.position.x += Math.cos(angle) * force;
            orb.mesh.position.y += Math.sin(angle) * force;
          }
        }

        // Apply natural horizontal sway return
        orb.mesh.position.x += (targetX - orb.mesh.position.x) * 0.05;

        // Infinite loop boundaries (reset at bottom)
        if (orb.mesh.position.y > currentYLimit + orb.scale) {
          orb.mesh.position.y = -currentYLimit - orb.scale;
          orb.baseX = (Math.random() - 0.5) * currentXLimit * 2.2;
          orb.mesh.position.x = orb.baseX;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // 10. Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      texture.dispose();
      orbs.forEach((orb) => {
        const mat = orb.mesh.material as THREE.Material;
        mat.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-35 dark:opacity-40 z-10" />;
}
