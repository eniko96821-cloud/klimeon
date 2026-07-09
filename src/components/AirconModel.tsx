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
  const normalizedRef = useRef<THREE.Group>(null)

  useEffect(() => {
    // Auto-fit: compute bounding box and center+scale the model to fit in a 1-unit box
    const box = new THREE.Box3().setFromObject(scene)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)

    const maxDim = Math.max(size.x, size.y, size.z)
    const fitScale = 1.0 / maxDim

    scene.position.set(-center.x * fitScale, -center.y * fitScale, -center.z * fitScale)
    scene.scale.setScalar(fitScale)

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.castShadow = true
        mesh.receiveShadow = true
        const mat = mesh.material as THREE.MeshStandardMaterial
        if (mat) mat.envMapIntensity = 1.2
      }
    })
  }, [scene])

  useFrame((_, delta) => {
    if (!ref.current) return
    if (autoRotate) ref.current.rotation.y += delta * 0.4
  })

  const rotY = scrollProgress * Math.PI * 1.5
  const scale = 1 + scrollProgress * 0.1

  return (
    <group ref={normalizedRef}>
      <group
        ref={ref}
        rotation={[0.05, rotY, 0]}
        scale={[scale, scale, scale]}
      >
        <primitive object={scene} />
      </group>
    </group>
  )
}

useGLTF.preload("/aircon.glb")
