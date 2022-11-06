import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { GroupProps } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    Plane003: THREE.Mesh
    Cube062: THREE.Mesh
    Cube062_1: THREE.Mesh
    tablet: THREE.Mesh
    Plane006: THREE.Mesh
    Plane006_1: THREE.Mesh
    tablet001: THREE.Mesh
    tablet002: THREE.Mesh
    tablet003: THREE.Mesh
    tablet004: THREE.Mesh
  }
  materials: {
    ['tv screen']: THREE.MeshStandardMaterial
    ['Material.003']: THREE.MeshStandardMaterial
    metall: THREE.MeshStandardMaterial
    wallpaper: THREE.MeshStandardMaterial
    ['White mdf']: THREE.MeshStandardMaterial
  }
}

interface TableModelProps extends GroupProps {
  color?: THREE.Color
  opacity?: number
}

export function TVModel({ color, opacity, ...props }: TableModelProps) {
  const { nodes, materials } = useGLTF('/tv.glb') as unknown as GLTFResult
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
      <group position={[-0.05, 2.2, 0]} scale={[0.02, 0.83, 1.14]}>
        <mesh geometry={nodes.Cube062.geometry} material={addMaterialProps(materials['tv screen'])} />
        <mesh geometry={nodes.Cube062_1.geometry} material={addMaterialProps(materials['Material.003'])} />
      </group>
      <mesh geometry={nodes.tablet.geometry} material={addMaterialProps(materials.metall)} position={[0.22, 0.61, 1.19]} scale={0.83} />
      <mesh geometry={nodes.tablet001.geometry} material={addMaterialProps(materials.metall)} position={[0.22, 0.61, 1.19]} scale={0.83} />
      <mesh geometry={nodes.tablet002.geometry} material={addMaterialProps(materials['White mdf'])} position={[0.22, 0.54, 1.19]} scale={0.83} />
      <mesh geometry={nodes.tablet003.geometry} material={addMaterialProps(materials['White mdf'])} position={[0.22, 0.12, 1.19]} scale={0.83} />
      <mesh geometry={nodes.tablet004.geometry} material={addMaterialProps(materials['White mdf'])} position={[0.22, -0.3, 1.19]} scale={0.83} />
    </group>
  )
}

useGLTF.preload('/tv.glb')
