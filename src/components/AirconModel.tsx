"use client"

import { useRef, useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

useGLTF.setDecoderPath("/draco/")

export function AirconModel({
  scrollProgress = 0,
  autoRotate = false,
}: {
  scrollProgress?: number
  autoRotate?: boolean
}) {
  const { scene } = useGLTF("/aircon.glb")
  const ref = useRef<THREE.Group>(null)

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.castShadow = true
        mesh.receiveShadow = true
        const mat = mesh.material as THREE.MeshStandardMaterial
        if (mat) {
          mat.envMapIntensity = 1.2
        }
      }
    })
  }, [scene])

  useFrame((_, delta) => {
    if (!ref.current) return
    if (autoRotate) {
      ref.current.rotation.y += delta * 0.4
    }
  })

  // Map scrollProgress (0–1) to model transforms
  const rotY = scrollProgress * Math.PI * 2      // full spin over scroll
  const posY = -scrollProgress * 0.5             // slight drop
  const scale = 1 + scrollProgress * 0.15        // subtle scale up

  return (
    <group
      ref={ref}
      rotation={[0.05, rotY, 0]}
      position={[0, posY, 0]}
      scale={[scale, scale, scale]}
    >
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload("/aircon.glb")
