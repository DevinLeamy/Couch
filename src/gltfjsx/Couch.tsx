import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { GroupProps } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    Pillow002: THREE.Mesh
    Pillow001: THREE.Mesh
    Cylinder021: THREE.Mesh
    Cylinder021_1: THREE.Mesh
  }
  materials: {
    PillowMaterial: THREE.MeshStandardMaterial
    CouchFootMaterial: THREE.MeshStandardMaterial
    ['CouchClothGreyMaterial.001']: THREE.MeshStandardMaterial
  }
}

interface CouchProps extends GroupProps {
  color?: THREE.Color,
  opacity?: number
}

export function CouchModel({ color, opacity, ...props }: CouchProps) {
  const { nodes, materials } = useGLTF('/couch.glb') as unknown as GLTFResult

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
      <mesh geometry={nodes.Pillow002.geometry} material={addMaterialProps(materials.PillowMaterial)} position={[-0.35, 0.9, 0.85]} rotation={[0, 0.44, -1]} scale={0.21} />
      <mesh geometry={nodes.Pillow001.geometry} material={addMaterialProps(materials.PillowMaterial)} position={[-0.39, 0.78, -0.85]} rotation={[0.07, -0.63, -1.01]} scale={0.21} />
      <group position={[-0.37, 0.48, -0.13]} rotation={[0, 0.02, 0]}>
        <mesh geometry={nodes.Cylinder021.geometry} material={addMaterialProps(materials.CouchFootMaterial)} />
        <mesh geometry={nodes.Cylinder021_1.geometry} material={addMaterialProps(materials['CouchClothGreyMaterial.001'])} />
      </group>
    </group>
  )
}

useGLTF.preload('/couch.glb')
