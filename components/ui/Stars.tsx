"use client";

import { useRef, useEffect, useState } from "react";
import {
  Color,
  Mesh,
  PlaneGeometry,
  Vector2,
  OrthographicCamera,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";

// Shader code with customizable colors and mouse interaction
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uMouseIntensity;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform int uColorMode;
  varying vec2 vUv;

  // Function to convert HSV to RGB
  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  void main() {
    // Convert UV to centered coordinates
    vec2 uv = (2.0 * vUv - 1.0) * vec2(uResolution.x / uResolution.y, 1.0);
    
    // Calculate mouse influence - normalized mouse position
    vec2 mouse = uMouse / uResolution;
    mouse = 2.0 * mouse - 1.0;
    mouse.x *= uResolution.x / uResolution.y;
    
    // Calculate distance from current point to mouse position
    float dist = length(uv - mouse);
    float influence = uMouseIntensity * (0.5 / (dist + 0.8));
    
    // Apply the wave distortion with mouse influence
    for(float i = 1.0; i < 10.0; i++){
      float mouseFactor = max(0.6, influence * 0.8);
      float timeOffset = uTime + influence * 2.0 * sin(uTime * 0.1);
      
      uv.x += mouseFactor / i * cos(i * 2.5 * uv.y + timeOffset);
      uv.y += mouseFactor / i * cos(i * 1.5 * uv.x + timeOffset);
    }
    
    // Different color modes
    vec3 color;
    
    if (uColorMode == 0) {
      // Original monochrome style
      color = vec3(0.1) / abs(sin(uTime - uv.y - uv.x));
    } 
    else if (uColorMode == 1) {
      // Gradient between two colors
      float t = abs(sin(uTime - uv.y - uv.x));
      color = mix(uColorA, uColorB, t);
    }
    else if (uColorMode == 2) {
      // RGB color cycling
      float r = abs(sin(uTime - uv.y - uv.x));
      float g = abs(sin(uTime - uv.y - uv.x + 2.0));
      float b = abs(sin(uTime - uv.y - uv.x + 4.0));
      color = vec3(r, g, b);
    }
    else if (uColorMode == 3) {
      // HSV rainbow effect
      float hue = mod(uTime * 0.1 + (uv.x + uv.y) * 0.5, 1.0);
      color = hsv2rgb(vec3(hue, 0.8, 0.8)) / abs(sin(uTime - uv.y - uv.x) * 0.5 + 0.5);
    }
    else if (uColorMode == 4) {
      // Three color palette
      float t = abs(sin(uTime - uv.y - uv.x));
      if (t < 0.33) {
        color = mix(uColorA, uColorB, t * 3.0);
      } else if (t < 0.66) {
        color = mix(uColorB, uColorC, (t - 0.33) * 3.0);
      } else {
        color = mix(uColorC, uColorA, (t - 0.66) * 3.0);
      }
    }
    
    // Apply subtle color boost based on mouse distance
    color *= (1.0 + influence * 0.3);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Color presets
const colorPresets = {
  blueViolet: {
    colorA: new Color("#3a0ca3"), // Deep blue
    colorB: new Color("#f72585"), // Pink
    colorC: new Color("#4cc9f0"), // Light blue
  },
  sunset: {
    colorA: new Color("#ff7b00"), // Orange
    colorB: new Color("#ff006e"), // Pink
    colorC: new Color("#8338ec"), // Purple
  },
  ocean: {
    colorA: new Color("#006466"), // Dark teal
    colorB: new Color("#065a60"), // Teal
    colorC: new Color("#0b525b"), // Blue-green
  },
  forest: {
    colorA: new Color("#2d6a4f"), // Dark green
    colorB: new Color("#40916c"), // Medium green
    colorC: new Color("#52b788"), // Light green
  },
  neon: {
    colorA: new Color("#ff00ff"), // Magenta
    colorB: new Color("#00ffff"), // Cyan
    colorC: new Color("#ffff00"), // Yellow
  },
};

interface WavyShaderBackgroundProps {
  colorMode?: number; // 0-4: different color modes
  colorPreset?: keyof typeof colorPresets; // preset name
  customColors?: {
    colorA?: string;
    colorB?: string;
    colorC?: string;
  };
  mouseIntensity?: number; // How strongly mouse affects the waves (0-1)
  enableMouseInteraction?: boolean; // Toggle mouse interaction
}

export default function StarsCanvas({
  colorMode = 1,
  colorPreset = "blueViolet",
  customColors,
  mouseIntensity = 0.5,
  enableMouseInteraction = true,
}: WavyShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const materialRef = useRef<ShaderMaterial | null>(null);
  const mouseRef = useRef<{
    x: number;
    y: number;
    targetX: number;
    targetY: number;
  }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    // Only run this effect on the client
    if (typeof window === "undefined" || !containerRef.current) return;

    let animationId: number;
    let scene: Scene;
    let camera: OrthographicCamera;
    let material: ShaderMaterial;
    let geometry: PlaneGeometry;

    // Initialize the scene
    const init = () => {
      // Set up scene
      scene = new Scene();
      camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
      camera.position.z = 1;

      // Set up renderer with alpha for transparency
      const renderer = new WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      rendererRef.current = renderer;

      // Get container dimensions
      const container = containerRef.current;
      if (!container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);

      // Clear any existing canvas
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      container.appendChild(renderer.domElement);

      // Get colors from preset or custom colors
      const colors = { ...colorPresets[colorPreset] };

      // Override with custom colors if provided
      if (customColors) {
        if (customColors.colorA) colors.colorA = new Color(customColors.colorA);
        if (customColors.colorB) colors.colorB = new Color(customColors.colorB);
        if (customColors.colorC) colors.colorC = new Color(customColors.colorC);
      }

      // Center mouse initially
      mouseRef.current = {
        x: width / 2,
        y: height / 2,
        targetX: width / 2,
        targetY: height / 2,
      };

      // Create shader material
      const uniforms = {
        uTime: { value: 0 },
        uResolution: { value: new Vector2(width, height) },
        uMouse: { value: new Vector2(width / 2, height / 2) },
        uMouseIntensity: { value: isMouseOver ? mouseIntensity : 0 },
        uColorA: { value: colors.colorA },
        uColorB: { value: colors.colorB },
        uColorC: { value: colors.colorC },
        uColorMode: { value: colorMode },
      };

      material = new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
      });
      materialRef.current = material;

      // Create mesh
      geometry = new PlaneGeometry(2, 2);
      const mesh = new Mesh(geometry, material);
      scene.add(mesh);

      // Start animation
      animate();
    };

    // Animation loop with efficient mouse smoothing
    const animate = () => {
      if (!materialRef.current || !rendererRef.current) return;

      // Update time for animation
      materialRef.current.uniforms.uTime.value += 0.01;

      // Smooth mouse movement for better performance
      mouseRef.current.x +=
        (mouseRef.current.targetX - mouseRef.current.x) * 0.1;
      mouseRef.current.y +=
        (mouseRef.current.targetY - mouseRef.current.y) * 0.1;

      // Update mouse position uniform
      materialRef.current.uniforms.uMouse.value.set(
        mouseRef.current.x,
        mouseRef.current.y
      );

      // Adjust mouse intensity based on mouse over state
      const targetIntensity = isMouseOver ? mouseIntensity : 0;
      materialRef.current.uniforms.uMouseIntensity.value +=
        (targetIntensity - materialRef.current.uniforms.uMouseIntensity.value) *
        0.1;

      // Render the scene
      rendererRef.current.render(scene, camera);

      // Continue animation loop
      animationId = requestAnimationFrame(animate);
    };

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !materialRef.current)
        return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      rendererRef.current.setSize(width, height);
      materialRef.current.uniforms.uResolution.value.set(width, height);

      // Re-center mouse on resize
      mouseRef.current = {
        x: width / 2,
        y: height / 2,
        targetX: width / 2,
        targetY: height / 2,
      };

      // Re-render after resize
      rendererRef.current.render(scene, camera);
    };

    // Initialize everything
    init();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);

      if (rendererRef.current) rendererRef.current.dispose();
      if (geometry) geometry.dispose();
      if (materialRef.current) materialRef.current.dispose();
    };
  }, [colorMode, colorPreset, customColors, mouseIntensity]); // Re-initialize when color options change

  // Mouse event handlers
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!enableMouseInteraction || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.targetX = e.clientX - rect.left;
    mouseRef.current.targetY = rect.height - (e.clientY - rect.top); // Invert Y for shader space
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (
      !enableMouseInteraction ||
      !containerRef.current ||
      e.touches.length === 0
    )
      return;

    e.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.targetX = e.touches[0].clientX - rect.left;
    mouseRef.current.targetY = rect.height - (e.touches[0].clientY - rect.top); // Invert Y for shader space
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[1]"
      style={{ pointerEvents: enableMouseInteraction ? "auto" : "none" }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    />
  );
}

