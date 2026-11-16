import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useGameStore } from '../store/gameStore';

export default function Office() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const doorLRef = useRef<THREE.Mesh | null>(null);
  const doorRRef = useRef<THREE.Mesh | null>(null);
  const lightsRef = useRef<{
    overhead: THREE.PointLight;
    sideL: THREE.PointLight;
    sideR: THREE.PointLight;
  } | null>(null);

  const { doors, lights, officeLight } = useGameStore((s) => ({
    doors: s.doors,
    lights: s.lights,
    officeLight: s.officeLight,
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07090e);
    scene.fog = new THREE.FogExp2(0x07090e, 0.05);

    const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 1.45, 2.8);
    camera.lookAt(0, 1.45, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambient = new THREE.AmbientLight(0xffffff, 0.12);
    scene.add(ambient);

    const overhead = new THREE.PointLight(0xffffff, officeLight ? 1.4 : 0, 9);
    overhead.position.set(0, 2.7, 0);
    overhead.castShadow = true;
    scene.add(overhead);

    const sideL = new THREE.PointLight(0xffffff, lights.left ? 0.9 : 0, 5.5);
    sideL.position.set(-2.7, 1.7, 1.4);
    sideL.castShadow = true;
    scene.add(sideL);

    const sideR = new THREE.PointLight(0xffffff, lights.right ? 0.9 : 0, 5.5);
    sideR.position.set(2.7, 1.7, 1.4);
    sideR.castShadow = true;
    scene.add(sideR);

    lightsRef.current = { overhead, sideL, sideR };

    const matWall = new THREE.MeshStandardMaterial({ color: 0x131921, roughness: 0.85, metalness: 0.1 });
    const matFloor = new THREE.MeshStandardMaterial({ color: 0x0c1016, roughness: 0.95, metalness: 0.05 });
    const matDesk = new THREE.MeshStandardMaterial({ color: 0x2b333d, roughness: 0.6, metalness: 0.15 });
    const matDoor = new THREE.MeshStandardMaterial({ color: 0x1d252e, roughness: 0.75, metalness: 0.1 });

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), matFloor);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    const back = new THREE.Mesh(new THREE.BoxGeometry(9, 3.2, 0.15), matWall);
    back.position.set(0, 1.6, -4.6);
    back.receiveShadow = true;
    scene.add(back);

    const wl = new THREE.Mesh(new THREE.BoxGeometry(0.15, 3.2, 10), matWall);
    wl.position.set(-4.6, 1.6, 0);
    scene.add(wl);
    const wr = new THREE.Mesh(new THREE.BoxGeometry(0.15, 3.2, 10), matWall);
    wr.position.set(4.6, 1.6, 0);
    scene.add(wr);

    const desk = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.85, 1), matDesk);
    desk.position.set(0, 0.425, 0);
    desk.castShadow = true;
    desk.receiveShadow = true;
    scene.add(desk);

    const doorL = new THREE.Mesh(new THREE.BoxGeometry(1, 2.3, 0.15), matDoor);
    doorL.position.set(-1.7, 1.15, -4.52);
    doorL.userData = { side: 'left' };
    doorL.castShadow = true;
    doorL.receiveShadow = true;
    scene.add(doorL);
    doorLRef.current = doorL;

    const doorR = new THREE.Mesh(new THREE.BoxGeometry(1, 2.3, 0.15), matDoor);
    doorR.position.set(1.7, 1.15, -4.52);
    doorR.userData = { side: 'right' };
    doorR.castShadow = true;
    doorR.receiveShadow = true;
    scene.add(doorR);
    doorRRef.current = doorR;

    let raf = 0;
    let last = 0;
    const OPEN = Math.PI / 2;

    const render = (now: number) => {
      if (!containerRef.current) return;
      raf = requestAnimationFrame(render);
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      const s = useGameStore.getState();
      const targetL = s.doors.left ? -OPEN : 0;
      const targetR = s.doors.right ? OPEN : 0;
      if (doorLRef.current) doorLRef.current.rotation.y += (targetL - doorLRef.current.rotation.y) * dt * 6;
      if (doorRRef.current) doorRRef.current.rotation.y += (targetR - doorRRef.current.rotation.y) * dt * 6;

      if (lightsRef.current) {
        lightsRef.current.overhead.intensity = s.officeLight ? 1.4 : 0;
        lightsRef.current.sideL.intensity = s.lights.left ? 0.9 : 0;
        lightsRef.current.sideR.intensity = s.lights.right ? 0.9 : 0;
      }

      renderer.render(scene, camera);
    };

    render(performance.now());

    const onResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
      renderer.dispose();
      if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    const targetL = doors.left ? -Math.PI / 2 : 0;
    const targetR = doors.right ? Math.PI / 2 : 0;
    if (doorLRef.current) doorLRef.current.rotation.y = targetL;
    if (doorRRef.current) doorRRef.current.rotation.y = targetR;
    if (lightsRef.current) {
      lightsRef.current.overhead.intensity = officeLight ? 1.4 : 0;
      lightsRef.current.sideL.intensity = lights.left ? 0.9 : 0;
      lightsRef.current.sideR.intensity = lights.right ? 0.9 : 0;
    }
  }, [doors, lights, officeLight]);

  return <div className="office" ref={containerRef} />;
}
