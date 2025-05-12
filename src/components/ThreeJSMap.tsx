
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';
import * as THREE from 'three';

interface ParkingSpotProps {
  position: [number, number, number];
  color: string;
  name: string;
  price: string;
  isAvailable: boolean;
  onClick: () => void;
}

const ParkingSpot: React.FC<ParkingSpotProps> = ({ position, color, name, price, isAvailable, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group position={position} onClick={onClick}>
      <mesh
        ref={meshRef}
        position={[0, 0.5, 0]}
        scale={hovered ? 1.2 : 1}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1, 0.2, 1.5]} />
        <meshStandardMaterial color={isAvailable ? color : "gray"} />
      </mesh>
      <Text
        position={[0, 1.2, 0]}
        color="white"
        fontSize={0.3}
        maxWidth={2}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
      <Text
        position={[0, 0.9, 0]}
        color="white"
        fontSize={0.2}
        maxWidth={2}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        {isAvailable ? `₹${price}/hr` : "Unavailable"}
      </Text>
    </group>
  );
};

const Building: React.FC<{ position: [number, number, number]; height: number; width: number; depth: number }> = 
  ({ position, height, width, depth }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial color="#9ca3af" />
    </mesh>
  );
};

const Street: React.FC<{ position: [number, number, number]; width: number; length: number }> = 
  ({ position, width, length }) => {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[width, length]} />
      <meshStandardMaterial color="#4b5563" />
    </mesh>
  );
};

const Ground: React.FC = () => {
  return (
    <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#84cc16" />
    </mesh>
  );
};

interface ThreeJSMapProps {
  onSpotSelect: (spot: any) => void;
}

const ThreeJSMap: React.FC<ThreeJSMapProps> = ({ onSpotSelect }) => {
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);
  
  useEffect(() => {
    // Check if WebGL is supported
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setIsWebGLSupported(!!gl);
      console.info("WebGL is supported");
      console.info("Canvas created");
      console.info("Three.js scene setup complete");
    } catch (e) {
      setIsWebGLSupported(false);
      console.error("WebGL not supported:", e);
    }
  }, []);

  // Mock parking spot data for Indian cities
  const parkingSpots = [
    { id: 1, name: "Delhi Central Park", position: [-5, 0, -2], price: "200", isAvailable: true, color: "#2A9D8F" },
    { id: 2, name: "Mumbai Marina", position: [4, 0, 1], price: "350", isAvailable: true, color: "#2A9D8F" },
    { id: 3, name: "Bangalore Tech Park", position: [-3, 0, 6], price: "250", isAvailable: false, color: "#2A9D8F" },
    { id: 4, name: "Chennai Beach Spot", position: [8, 0, -4], price: "180", isAvailable: true, color: "#2A9D8F" },
    { id: 5, name: "Kolkata Market", position: [0, 0, 0], price: "150", isAvailable: true, color: "#F4A261" },
  ];

  const handleSpotClick = (spot: any) => {
    if (spot.isAvailable) {
      onSpotSelect(spot);
    }
  };

  if (!isWebGLSupported) {
    return (
      <div className="three-scene-container w-full h-[500px] md:h-[700px] overflow-hidden rounded-xl bg-gradient-to-b from-blue-900 to-blue-500 flex items-center justify-center">
        <div className="text-white text-center p-6 bg-black/50 rounded-lg">
          <h3 className="text-xl font-bold mb-2">WebGL Not Supported</h3>
          <p>Your browser or device doesn't support 3D graphics. Please try a different browser or device.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="three-scene-container w-full h-[500px] md:h-[700px] overflow-hidden rounded-xl bg-gradient-to-b from-orange-900 to-orange-500">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 10, 15]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        
        {/* Indian city elements */}
        <Ground />
        <Street position={[0, 0, 0]} width={10} length={30} />
        <Street position={[0, 0, 0]} width={30} length={10} />
        
        {/* Buildings representing Indian architecture */}
        <Building position={[-8, 4, -8]} height={8} width={5} depth={5} /> {/* Representing Taj Hotel */}
        <Building position={[8, 6, -8]} height={12} width={4} depth={4} /> {/* Representing Gateway of India */}
        <Building position={[-8, 7, 8]} height={14} width={6} depth={6} /> {/* Representing India Gate */}
        <Building position={[8, 5, 8]} height={10} width={5} depth={5} /> {/* Representing Lotus Temple */}
        
        {/* Parking spots */}
        {parkingSpots.map((spot) => (
          <ParkingSpot
            key={spot.id}
            position={spot.position as [number, number, number]}
            color={spot.color}
            name={spot.name}
            price={spot.price}
            isAvailable={spot.isAvailable}
            onClick={() => handleSpotClick(spot)}
          />
        ))}
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  );
};

export default ThreeJSMap;
