"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function MeshCanvas() {
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
      0.1, 1000
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

    // 4. Create Node Elements (Floating vertices)
    const nodeCount = 70;
    const nodes: Array<{
      pos: THREE.Vector3;
      vel: THREE.Vector3;
      targetPos: THREE.Vector3;
    }> = [];

    const xLimit = width / 200;
    const yLimit = height / 200;

    for (let i = 0; i < nodeCount; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * xLimit * 2,
        (Math.random() - 0.5) * yLimit * 2,
        0
      );
      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015,
        0
      );
      nodes.push({ pos, vel, targetPos: pos.clone() });
    }

    // Geometry & Materials
    const dotGeometry = new THREE.BufferGeometry();
    const dotPositions = new Float32Array(nodeCount * 3);
    const dotColors = new Float32Array(nodeCount * 3);

    // Color definitions
    const colorDark1 = new THREE.Color("#fac37b"); // Amber
    const colorDark2 = new THREE.Color("#ec4899"); // Rose
    const colorLight1 = new THREE.Color("#f59e0b"); // Amber
    const colorLight2 = new THREE.Color("#f43f5e"); // Soft Rose

    const getThemeColors = () => {
      const isDark = document.documentElement.classList.contains("dark");
      return isDark ? { c1: colorDark1, c2: colorDark2 } : { c1: colorLight1, c2: colorLight2 };
    };

    // Populate buffers
    const updateBuffers = () => {
      const { c1, c2 } = getThemeColors();
      for (let i = 0; i < nodeCount; i++) {
        dotPositions[i * 3] = nodes[i].pos.x;
        dotPositions[i * 3 + 1] = nodes[i].pos.y;
        dotPositions[i * 3 + 2] = nodes[i].pos.z;

        const mixRatio = i / nodeCount;
        const c = new THREE.Color().lerpColors(c1, c2, mixRatio);
        dotColors[i * 3] = c.r;
        dotColors[i * 3 + 1] = c.g;
        dotColors[i * 3 + 2] = c.b;
      }
      dotGeometry.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));
      dotGeometry.setAttribute("color", new THREE.BufferAttribute(dotColors, 3));
    };

    updateBuffers();

    // Node Dot Material
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

    const dotMaterial = new THREE.PointsMaterial({
      size: 0.24,
      map: dotTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pointSystem = new THREE.Points(dotGeometry, dotMaterial);
    scene.add(pointSystem);

    // Dynamic Connections (Lines)
    const lineMaterial = new THREE.LineBasicMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      linewidth: 1,
    });

    let lineSegments: THREE.LineSegments<THREE.BufferGeometry, THREE.Material> = new THREE.LineSegments(new THREE.BufferGeometry(), lineMaterial);
    scene.add(lineSegments);

    // 5. Interaction Setup
    const mouse = new THREE.Vector2(-999, -999);

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = event.clientX - rect.left;
      const relativeY = event.clientY - rect.top;

      // Map to 3D Orthographic Space
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

    // Theme Mutation Observer
    const observer = new MutationObserver(() => {
      updateBuffers();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // 6. Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Node Physics
      const positionAttr = dotGeometry.getAttribute("position") as THREE.BufferAttribute;
      const linePositions: number[] = [];
      const lineColors: number[] = [];

      const { c1, c2 } = getThemeColors();

      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];

        // Organic float movement
        node.pos.add(node.vel);

        // Screen boundary rebound
        const padding = 0.5;
        if (node.pos.x > xLimit + padding || node.pos.x < -xLimit - padding) node.vel.x *= -1;
        if (node.pos.y > yLimit + padding || node.pos.y < -yLimit - padding) node.vel.y *= -1;

        // Mouse attraction/repulsion ripple effect
        if (mouse.x !== -999) {
          const distToMouse = node.pos.distanceTo(new THREE.Vector3(mouse.x, mouse.y, 0));
          if (distToMouse < 2.2) {
            const dir = new THREE.Vector3().subVectors(node.pos, new THREE.Vector3(mouse.x, mouse.y, 0)).normalize();
            // Gentle push away
            const force = (2.2 - distToMouse) * 0.008;
            node.pos.addScaledVector(dir, force);
          }
        }

        positionAttr.setXYZ(i, node.pos.x, node.pos.y, node.pos.z);
      }
      positionAttr.needsUpdate = true;

      // Generate Distance-Based Lines
      const lineThreshold = 1.6;
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dist = nodes[i].pos.distanceTo(nodes[j].pos);
          if (dist < lineThreshold) {
            // Add Line Vertices
            linePositions.push(nodes[i].pos.x, nodes[i].pos.y, nodes[i].pos.z);
            linePositions.push(nodes[j].pos.x, nodes[j].pos.y, nodes[j].pos.z);

            // Opacity scales with proximity
            const opacity = 1 - dist / lineThreshold;
            const lineCol = new THREE.Color().lerpColors(c1, c2, (i + j) / (2 * nodeCount));

            lineColors.push(lineCol.r, lineCol.g, lineCol.b, opacity);
            lineColors.push(lineCol.r, lineCol.g, lineCol.b, opacity);
          }
        }
      }

      // Recreate line geometry
      scene.remove(lineSegments);
      lineSegments.geometry.dispose();

      const lineGeom = new THREE.BufferGeometry();
      lineGeom.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
      
      // Setup float attributes for customized dynamic transparency
      const mat = new THREE.ShaderMaterial({
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexShader: `
          attribute vec4 color;
          varying vec4 vColor;
          void main() {
            vColor = color;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec4 vColor;
          void main() {
            gl_FragColor = vColor;
          }
        `
      });
      lineGeom.setAttribute("color", new THREE.Float32BufferAttribute(lineColors, 4));

      lineSegments = new THREE.LineSegments(lineGeom, mat);
      scene.add(lineSegments);

      renderer.render(scene, camera);
    };

    animate();

    // 7. Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      dotGeometry.dispose();
      dotMaterial.dispose();
      dotTexture.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60 dark:opacity-65" />;
}
