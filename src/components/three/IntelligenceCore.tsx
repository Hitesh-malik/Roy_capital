"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, Line, PerformanceMonitor } from "@react-three/drei";
import { easing } from "maath";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { float3D } from "@/config/motion";
import { theme } from "@/config/theme";

export type Quality = "high" | "low";

export type IntelligenceCoreProps = {
  /** 0 → 1 scroll progress through the hero (written by GSAP ScrollTrigger). */
  progress: React.RefObject<number>;
  /** Normalised window pointer position (-1 → 1). */
  pointer: React.RefObject<{ x: number; y: number }>;
  active: boolean;
  quality: Quality;
  onReady?: () => void;
};

const c = theme.three;

const RINGS = [
  { radius: 1.95, tube: 0.018, rotation: [1.25, 0.15, 0] as const, speed: 0.16, nodes: [0.4, 3.6] },
  { radius: 2.42, tube: 0.013, rotation: [0.35, -0.95, 0.3] as const, speed: -0.1, nodes: [1.9, 5.1] },
  { radius: 2.9, tube: 0.009, rotation: [1.8, 0.65, -0.45] as const, speed: 0.06, nodes: [2.7] },
];

function ellipse(rx: number, ry: number, segments = 160) {
  return Array.from({ length: segments + 1 }, (_, i) => {
    const a = (i / segments) * Math.PI * 2;
    return new THREE.Vector3(Math.cos(a) * rx, Math.sin(a) * ry, 0);
  });
}

function Sculpture({ progress, pointer, quality }: Pick<IntelligenceCoreProps, "progress" | "pointer" | "quality">) {
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const lattice = useRef<THREE.LineSegments>(null);
  const rings = useRef<(THREE.Group | null)[]>([]);

  const latticeGeometry = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.45, 1)), []);
  const shellGeometry = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.03, 0)), []);
  const orbitA = useMemo(() => ellipse(3.45, 1.15), []);
  const orbitB = useMemo(() => ellipse(3.1, 2.2), []);
  const tubularSegments = quality === "high" ? 240 : 120;

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const p = progress.current ?? 0;
    const ptr = pointer.current ?? { x: 0, y: 0 };

    if (spin.current) spin.current.rotation.y += delta * float3D.rotationSpeed;
    if (tilt.current) {
      easing.dampE(
        tilt.current.rotation,
        [ptr.y * float3D.pointerTilt * 0.6 + p * 0.7, ptr.x * float3D.pointerTilt, p * -0.25],
        float3D.damping,
        delta,
      );
    }
    rings.current.forEach((ring, i) => {
      if (!ring) return;
      ring.rotation.z += delta * RINGS[i].speed;
      const s = 1 + p * 0.14 * (i + 1);
      easing.damp3(ring.scale, [s, s, s], 0.35, delta);
    });
    if (lattice.current) {
      lattice.current.rotation.y -= delta * 0.05;
      lattice.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <group ref={tilt}>
      <group ref={spin}>
        <mesh>
          <icosahedronGeometry args={[1, quality === "high" ? 1 : 0]} />
          <meshPhysicalMaterial
            color={c.core}
            metalness={0.92}
            roughness={0.28}
            clearcoat={1}
            clearcoatRoughness={0.18}
            envMapIntensity={1.5}
            flatShading
          />
        </mesh>
        <lineSegments geometry={shellGeometry}>
          <lineBasicMaterial color={c.lattice} transparent opacity={0.4} />
        </lineSegments>
      </group>

      <lineSegments ref={lattice} geometry={latticeGeometry}>
        <lineBasicMaterial color={c.lattice} transparent opacity={0.14} />
      </lineSegments>

      {RINGS.map((r, i) => (
        <group key={i} rotation={r.rotation}>
          <group
            ref={(el) => {
              rings.current[i] = el;
            }}
          >
            <mesh>
              <torusGeometry args={[r.radius, r.tube, 16, tubularSegments]} />
              <meshStandardMaterial color={c.ring} metalness={1} roughness={0.22} envMapIntensity={1.6} />
            </mesh>
            {r.nodes.map((a) => (
              <mesh key={a} position={[Math.cos(a) * r.radius, Math.sin(a) * r.radius, 0]}>
                <sphereGeometry args={[0.045, 16, 16]} />
                <meshStandardMaterial color={c.node} emissive={c.node} emissiveIntensity={0.6} />
              </mesh>
            ))}
          </group>
        </group>
      ))}

      <group rotation={[1.1, 0.3, -0.35]}>
        <Line points={orbitA} color={c.orbit} lineWidth={0.8} transparent opacity={0.4} dashed dashSize={0.06} gapSize={0.1} />
      </group>
      <group rotation={[-0.5, 1.2, 0.2]}>
        <Line points={orbitB} color={c.lattice} lineWidth={0.6} transparent opacity={0.18} />
      </group>
    </group>
  );
}

/** The Intelligence Core — Roy Capital's signature WebGL sculpture. */
export default function IntelligenceCore({ progress, pointer, active, quality, onReady }: IntelligenceCoreProps) {
  const [dpr, setDpr] = useState(() =>
    typeof window === "undefined" ? 1 : Math.min(window.devicePixelRatio, quality === "high" ? 1.75 : 1.25),
  );

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 10], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"}
      onCreated={() => onReady?.()}
      aria-hidden
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 5, 3]} intensity={1.6} color={c.keyLight} />
      <pointLight position={[-4, -1.5, -3]} intensity={40} color={c.rimLight} />
      <pointLight position={[3, -3, 2]} intensity={8} color={c.lattice} />

      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.2} color={c.keyLight} position={[0, 5, -6]} scale={[10, 1.5, 1]} rotation-x={Math.PI / 2} />
        <Lightformer intensity={1.4} color={c.keyLight} position={[5, 1, -2]} scale={[2, 6, 1]} rotation-y={-Math.PI / 2} />
        <Lightformer intensity={3} color={c.rimLight} position={[-5, 0, -1]} scale={[3, 3, 1]} form="ring" rotation-y={Math.PI / 2} />
        <Lightformer intensity={0.8} color={c.lattice} position={[0, -5, 2]} scale={[8, 1, 1]} rotation-x={-Math.PI / 2} />
      </Environment>

      <Float speed={float3D.floatSpeed} rotationIntensity={0.15} floatIntensity={float3D.floatIntensity}>
        <Sculpture progress={progress} pointer={pointer} quality={quality} />
      </Float>
    </Canvas>
  );
}
