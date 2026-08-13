"use client";
import * as THREE from "three";
import gsap from "gsap";
import { Float, Environment, ContactShadows, useGLTF } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";

export default function Shapes() {
  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
      <Canvas
        className="z-0"
        shadows
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{
          position: [0, 0, 25],
          fov: 30,
          near: 1,
          far: 40,
        }}
      >
        <Suspense fallback={null}>
          <Geometries />
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.65}
            scale={40}
            blur={1}
            far={9}
          />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Geometries() {
  const geometries = [
    {
      position: [2, 1, 0],
      r: 0.4,
      scale:1,
      glbPath: "/shield_protection_icon.glb", //
    },
    {
      position: [0.5  , -0.75, 2],
      r: 0.3,
      scale:1,
      glbPath: "/react.glb", //
    },{
      position: [-1.4, 1  , -4],
      r: 0.6,
      scale:1.2,
      glbPath: "/certificate.glb", //
    },
    {
      position: [1, -0.9, 4],
      r: 0.7,
      scale:0.15,
      glbPath: "/github.glb", //
    },
    {
      position: [-0.8, -0.75, 5],
      r: 0.6,
      scale:0.03,
      glbPath: "/node.glb", //
    },
  ];
  const materials = [
    new THREE.MeshStandardMaterial({ color: 0x00FFFF, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.4 }),
    new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0x8e44ad, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0 }),
    new THREE.MeshNormalMaterial(),
    new THREE.MeshStandardMaterial({
      roughness: 0,
      metalness: 0.5,
      color: 0x2980b9,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x2c3e50,
      roughness: 0.1,
      metalness: 0.5,
    }),
  ];

  const soundEffects=[
    new Audio("/sounds/knock1.ogg"),
    new Audio("/sounds/knock2.ogg"),
    new Audio("/sounds/knock3.ogg"),
  ]
  return geometries.map(({ position, r, glbPath,scale }) => (
    <Geometry
      key={JSON.stringify(position)}
      position={position.map((p) => p * 2)}
      glbPath={glbPath}
      materials={materials}
      scale={scale}
      soundEffects={soundEffects}
      r={r}
    />
  ));
}

function Geometry({ r, position, glbPath, materials,scale,soundEffects }) {
  const meshRef = useRef();
  const [visible, setVisible] = useState(true);
  const { scene } = useGLTF(glbPath);
  const clonedScene = scene.clone();
  const startingMaterial = getRandomMaterial();

  function getRandomMaterial() {
    return gsap.utils.random(materials);
  }

  // useEffect(() => {
  //   clonedScene.traverse((child) => {
  //     if (child.isMesh) {
  //       child.material = startingMaterial;
  //     }
  //   });
  // }, [clonedScene, startingMaterial]);

  useEffect(() => {
    setVisible(true);
    let ctx = gsap.context(() => {
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: "elastic.out(1,0.3)",
        delay: 0.3,
      });
    });
    return () => ctx.revert();
  }, []);

  function handleClick(e) {
    // Rotate the entire cloned scene instead of just the clicked mesh

    gsap.utils.random(soundEffects).play();
    gsap.to(clonedScene.rotation, {
      x: `+=${gsap.utils.random(0, 2)}`,
      y: `+=${gsap.utils.random(0, 2)}`,
      z: `+=${gsap.utils.random(0, 2)}`,
      duration: 1.3,
      ease: "elastic.out(1,0.3)",
      yoyo: true,
    });
    
    // Still change material of the clicked mesh
    const mesh = e.object;
    mesh.material = getRandomMaterial();
  }

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };
  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };
  return (
    <group position={position} ref={meshRef}>
      <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
        
        <primitive
          object={clonedScene}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          visible={visible}
          scale={scale}
        />
      </Float>
    </group>
  );
}
