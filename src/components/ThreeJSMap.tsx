
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';

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
        {isAvailable ? `$${price}/hr` : "Unavailable"}
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
  // Mock parking spot data
  const parkingSpots = [
    { id: 1, name: "Downtown Spot A", position: [-5, 0, -2], price: "5.00", isAvailable: true, color: "#2A9D8F" },
    { id: 2, name: "Main St Spot", position: [4, 0, 1], price: "3.50", isAvailable: true, color: "#2A9D8F" },
    { id: 3, name: "Oak Avenue Spot", position: [-3, 0, 6], price: "4.25", isAvailable: false, color: "#2A9D8F" },
    { id: 4, name: "Market Parking", position: [8, 0, -4], price: "2.75", isAvailable: true, color: "#2A9D8F" },
    { id: 5, name: "Central Spot", position: [0, 0, 0], price: "6.50", isAvailable: true, color: "#F4A261" },
  ];

  const handleSpotClick = (spot: any) => {
    if (spot.isAvailable) {
      onSpotSelect(spot);
    }
  };

  return (
    <div className="three-scene-container w-full h-[500px] md:h-[700px] overflow-hidden rounded-xl bg-gradient-to-b from-blue-900 to-blue-500">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 10, 15]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        
        {/* City elements */}
        <Ground />
        <Street position={[0, 0, 0]} width={10} length={30} />
        <Street position={[0, 0, 0]} width={30} length={10} />
        
        <Building position={[-8, 2, -8]} height={4} width={5} depth={5} />
        <Building position={[8, 3, -8]} height={6} width={4} depth={4} />
        <Building position={[-8, 4, 8]} height={8} width={6} depth={6} />
        <Building position={[8, 2.5, 8]} height={5} width={5} depth={5} />
        
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
