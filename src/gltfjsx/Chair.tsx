import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { GroupProps } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    N01: THREE.Mesh
  }
  materials: {
    N01: THREE.MeshStandardMaterial
  }
}

interface ChairProps extends GroupProps {
  color?: THREE.Color,
  opacity?: number
}

export function ChairModel({ color, opacity, ...props }: ChairProps) {
  const { nodes, materials } = useGLTF('/chair.gltf') as unknown as GLTFResult

  const material = materials['N01'].clone()

  if (opacity !== undefined) {
    material.transparent = true
    material.opacity = opacity
  }
  if (color !== undefined) {
    material.color = color
  }

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <mesh name="N01" geometry={nodes.N01.geometry} material={material} scale={0.01} />
      </group>
    </group>
  )
}

useGLTF.preload('/chair.gltf')
