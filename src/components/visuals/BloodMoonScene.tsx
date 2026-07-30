import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
} from "react";
import type { MutableRefObject } from "react";
import {
  Canvas,
  useFrame,
  useLoader,
} from "@react-three/fiber";
import {
  Box3,
  Group,
  Mesh,
  MeshStandardMaterial,
  Vector3,
} from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";

const MOON_MODEL_URL = "/models/vandort/moon.glb";

type BloodMoonSceneProps = {
  active: MutableRefObject<boolean>;
  onReady?: () => void;
};

/**
 * Loads the optimized GLB and normalizes its size and center.
 * The outer MoonJourney component remains responsible for moving
 * the moon throughout the complete page.
 */
function MoonModel({
  active,
  onReady,
}: BloodMoonSceneProps) {
  const rotationGroup = useRef<Group>(null);
  const scrollProgress = useRef(0);

  const gltf = useLoader(
    GLTFLoader,
    MOON_MODEL_URL,
    (loader) => {
      loader.setMeshoptDecoder(MeshoptDecoder);
    },
  );

  const model = useMemo(() => {
    const clonedScene = gltf.scene.clone(true);

    clonedScene.traverse((child) => {
      if (!(child instanceof Mesh)) return;

      child.frustumCulled = true;

      const originalMaterials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      const clonedMaterials = originalMaterials.map((material) => {
        const clonedMaterial = material.clone();

        if (clonedMaterial instanceof MeshStandardMaterial) {
          /*
           * Preserve all original textures while preventing the moon
           * from looking metallic or artificially glossy.
           */
          clonedMaterial.metalness = 0;
          clonedMaterial.roughness = Math.max(
            clonedMaterial.roughness,
            0.72,
          );
          clonedMaterial.needsUpdate = true;
        }

        return clonedMaterial;
      });

      child.material = Array.isArray(child.material)
        ? clonedMaterials
        : clonedMaterials[0];
    });

    return clonedScene;
  }, [gltf.scene]);

  const normalization = useMemo(() => {
    const bounds = new Box3().setFromObject(model);
    const center = bounds.getCenter(new Vector3());
    const size = bounds.getSize(new Vector3());

    const longestSide =
      Math.max(size.x, size.y, size.z) || 1;

    return {
      offset: [
        -center.x,
        -center.y,
        -center.z,
      ] as [number, number, number],

      /*
       * The resulting diameter is normalized to fit the current
       * MoonJourney camera and wrapper.
       */
      scale: 3.2 / longestSide,
    };
  }, [model]);

  useEffect(() => {
    const updateScrollProgress = () => {
      const maximumScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;

      scrollProgress.current =
        maximumScroll > 0
          ? window.scrollY / maximumScroll
          : 0;
    };

    updateScrollProgress();

    window.addEventListener(
      "scroll",
      updateScrollProgress,
      { passive: true },
    );

    onReady?.();

    return () => {
      window.removeEventListener(
        "scroll",
        updateScrollProgress,
      );
    };
  }, [onReady]);

  useFrame((_, delta) => {
    if (!rotationGroup.current || !active.current) return;
  
    /*
     * Continuous rotation around the moon's vertical Y axis.
     * Using delta keeps the speed consistent across different frame rates.
     */
    const verticalRotationSpeed = 0.2;
  
    rotationGroup.current.rotation.y +=
      delta * verticalRotationSpeed;
  
    /*
     * Keep only a subtle scroll-linked tilt on the X axis.
     * This does not interrupt the continuous vertical rotation.
     */
    rotationGroup.current.rotation.x =
      0.06 + scrollProgress.current * 0.12;
  });

  return (
    <group
  ref={rotationGroup}
  rotation={[0.06, 0, 0]}
>
      <group scale={normalization.scale}>
        <primitive
          object={model}
          position={normalization.offset}
        />
      </group>
    </group>
  );
}

/*
 * Begin requesting the model as soon as this lazy-loaded module
 * becomes available.
 */
useLoader.preload(
  GLTFLoader,
  MOON_MODEL_URL,
  (loader) => {
    loader.setMeshoptDecoder(MeshoptDecoder);
  },
);
export default function BloodMoonScene({
  active,
  onReady,
}: BloodMoonSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.35]}
      camera={{
        position: [0, 0, 5],
        fov: 42,
        near: 0.1,
        far: 100,
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      }}
      style={{ background: "transparent" }}
    >
      <ambientLight
        intensity={0.08}
        color="#280208"
      />

      <directionalLight
        position={[3.5, 2.5, 4]}
        intensity={2.15}
        color="#ff304b"
      />

      <directionalLight
        position={[-3, -1.5, 2]}
        intensity={0.32}
        color="#6d0717"
      />

      <Suspense fallback={null}>
        <MoonModel
          active={active}
          onReady={onReady}
        />
      </Suspense>
    </Canvas>
  );
}