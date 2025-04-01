import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { OrbitControls, Html, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { QRCodeSVG } from 'qrcode.react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Model() {
  const [model, setModel] = useState(null);
  const gltf = useLoader(GLTFLoader, './robot.glb');
  console.log(gltf)
  
  useEffect(() => {
    console.log(gltf.scene|| "nhi hai")
    setModel(gltf.scene);
  }, [gltf]);

  return model ? <primitive object={model} /> : null;
}

function ARScene() {
  const [isARAvailable, setIsARAvailable] = useState(false);

  // Check if WebXR is available
  useEffect(() => {
    const checkWebXR = async () => {
      if (navigator.xr) {
        const isAvailable = await navigator.xr.isSessionSupported('immersive-ar');
        setIsARAvailable(isAvailable);
      }
    };

    checkWebXR();
  }, []);

  // Set up AR session
  const startARSession = () => {
    if (navigator.xr) {
      navigator.xr.requestSession('immersive-ar').then((session) => {
        // Do something with the AR session (e.g., attach to canvas, etc.)
        // This part is where you'll need to integrate WebXR with your canvas and 3D model
      });
    }
  };

  return (
    <div>
      {isARAvailable ? (
        <button onClick={startARSession} className="ar-button">
          Start AR
        </button>
      ) : (
        <p>AR is not available on this device.</p>
      )}
    </div>
  );
}

function QRCodeGenerator({ url }) {
  return (
    <div className="qr-container">
      <QRCodeSVG value={url} size={256} />
      <p>Scan to view AR scene!</p>
    </div>
  );
}

export default function App() {
  const [url, setUrl] = useState('https://zippy-tartufo-ab18ef.netlify.app'); // Replace with your hosted URL

  return (
    <div>
      <div className="canvas-container">
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} intensity={1} />
          <Model />
          <OrbitControls />
          <Environment preset="sunset" />
          <ContactShadows opacity={0.5} width={10} height={10} blur={1} far={5} />
        </Canvas>
      </div>

      {/* AR Section */}
      <ARScene />

      {/* QR Code */}
      <QRCodeGenerator url={url} />
    </div>
  );
}
