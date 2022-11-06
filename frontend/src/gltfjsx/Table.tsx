import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { GroupProps } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    Tea_Table_1: THREE.Mesh
  }
  materials: {
    ['Tea Table']: THREE.MeshStandardMaterial
  }
}

interface TableModelProps extends GroupProps {
  color?: THREE.Color
  opacity?: number
}

export function TableModel({ color, opacity, ...props }: TableModelProps) {
  const { nodes, materials } = useGLTF('/Tea Table01.glb') as unknown as GLTFResult
  function addMaterialProps(material: THREE.MeshStandardMaterial): THREE.MeshStandardMaterial {
    const updatedMaterial = material.clone()

    if (opacity !== undefined) {
      updatedMaterial.transparent = true
      updatedMaterial.opacity = opacity
    }
    if (color !== undefined) {
      updatedMaterial.color = color
    }

    return updatedMaterial
  }
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <mesh geometry={nodes.Tea_Table_1.geometry} material={addMaterialProps(materials['Tea Table'])} />
      </group>
    </group>
  )
}

useGLTF.preload('/Tea Table01.glb')
