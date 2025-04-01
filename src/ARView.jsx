import { Canvas } from '@react-three/fiber';
import { XR, ARButton } from '@react-three/xr';
import { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';

function ARModel() {
  const { scene } = useGLTF('./robot.glb'); // Load your 3D model

  return <primitive object={scene} />;
}

export default function ARView() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas>
        <XR>
          <Suspense fallback={<div>Loading...</div>}>
            <ARModel />
          </Suspense>
          <ARButton />
        </XR>
      </Canvas>
    </div>
  );
}
