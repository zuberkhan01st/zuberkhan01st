'use client'
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

export default function Floating3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating geometric shapes
    const shapes = [];
    const geometryTypes = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.TetrahedronGeometry(1),
      new THREE.OctahedronGeometry(1),
    ];

    for (let i = 0; i < 5; i++) {
      const geometry = geometryTypes[Math.floor(Math.random() * geometryTypes.length)];
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(0.7 + Math.random() * 0.1, 0.5, 0.5),
        emissive: new THREE.Color().setHSL(0.7, 0.3, 0.2),
        metalness: 0.7,
        roughness: 0.3,
      });
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      shapes.push({
        mesh,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02,
        },
        floatSpeed: Math.random() * 0.02 + 0.01,
      });
      
      scene.add(mesh);
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x8b5cf6, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 5;

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      shapes.forEach((shape, index) => {
        shape.mesh.rotation.x += shape.rotationSpeed.x;
        shape.mesh.rotation.y += shape.rotationSpeed.y;
        shape.mesh.rotation.z += shape.rotationSpeed.z;
        
        shape.mesh.position.y += Math.sin(time + index) * shape.floatSpeed;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      shapes.forEach(shape => {
        shape.mesh.geometry.dispose();
        shape.mesh.material.dispose();
      });
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ minHeight: '300px' }}
    />
  );
}

