"use client"
import React, { useRef, useMemo } from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';

const BirthdayCrackers = () => {
  const group = useRef();

  // Customizable options
  const numCrackers = 100; // Number of crackers
  const spreadRadius = 4; // Radius for crackers' spread

  // Create cracker "explosion" group
  const explosionGroup = useMemo(() => {
    const group = new THREE.Group();

    for (let i = 0; i < numCrackers; i++) {
      // Create a custom cracker geometry
      const crackerGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.2, 16);

      // Create random colors for each cracker
      const randomColor = new THREE.Color(
        Math.random(),
        Math.random(),
        Math.random()
      );

      const crackerMaterial = new THREE.MeshPhongMaterial({
        color: randomColor,
        emissive: randomColor,
      });

      const crackerMesh = new THREE.Mesh(crackerGeometry, crackerMaterial);

      // Randomly position and rotate the cracker
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      const radius = Math.random() * spreadRadius;

      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);

      crackerMesh.position.set(x, y, z);

      crackerMesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      crackerMesh.scale.set(1, 1, 1); // Make crackers appear more 3D

      group.add(crackerMesh);
    }

    return group;
  }, []);

  useFrame(() => {
    explosionGroup.rotation.x += 0.005;
    explosionGroup.rotation.y += 0.005;
    explosionGroup.rotation.z += 0.005;
  });

  return <primitive ref={group} object={explosionGroup} />;
};

export default BirthdayCrackers;
