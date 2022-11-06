import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { GroupProps } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    Plane: THREE.Mesh
    Plane001: THREE.Mesh
    Plane002: THREE.Mesh
    Cylinder023: THREE.Mesh
    Cylinder001: THREE.Mesh
    Circle002: THREE.Mesh
    Cube: THREE.Mesh
    Cylinder: THREE.Mesh
    Plane005: THREE.Mesh
    Plane004: THREE.Mesh
    Plane003: THREE.Mesh
  }
  materials: {
    Wood: THREE.MeshPhysicalMaterial
    ['Metal Holder']: THREE.MeshPhysicalMaterial
    ['Material.001']: THREE.MeshPhysicalMaterial
    ['Glass Archviz.001']: THREE.MeshStandardMaterial
    ['Adjustable Emission.001']: THREE.MeshStandardMaterial
    ['Metallic.001']: THREE.MeshPhysicalMaterial
  }
}


interface LampModelProps extends GroupProps {
  color?: THREE.Color
  opacity?: number
}

export function LampModel({ color, opacity, ...props }: LampModelProps) {
  const { nodes, materials } = useGLTF('/lamp.glb') as unknown as GLTFResult
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
      <mesh geometry={nodes.Plane.geometry} material={addMaterialProps(materials.Wood)} />
      <mesh geometry={nodes.Plane001.geometry} material={addMaterialProps(materials['Metal Holder'])} position={[0, 2.28, 0]} scale={1.06} />
      <mesh geometry={nodes.Plane002.geometry} material={addMaterialProps(materials['Material.001'])} position={[0, 1.73, 0]} scale={1.02} />
      <mesh geometry={nodes.Cylinder023.geometry} material={addMaterialProps(materials.Wood)} position={[0, 1.68, 0]} rotation={[-Math.PI, -Math.PI / 2, 0]} scale={[0.04, -0.01, 0.04]} />
      <mesh geometry={nodes.Cylinder001.geometry} material={addMaterialProps(materials.Wood)} position={[0, 1.69, 0]} rotation={[-Math.PI, -Math.PI / 2, 0]} scale={[0.03, -0.01, 0.03]} />
      <mesh geometry={nodes.Circle002.geometry} material={addMaterialProps(materials['Glass Archviz.001'])} position={[0, 1.72, 0]} scale={0.09} />
      <mesh geometry={nodes.Cube.geometry} material={addMaterialProps(materials['Adjustable Emission.001'])} position={[-0.01, 1.76, 0]} rotation={[Math.PI / 2, 0, 0]} scale={1.43} />
      <mesh geometry={nodes.Cylinder.geometry} material={addMaterialProps(materials['Metallic.001'])} position={[0, 1.72, 0]} scale={[2.15, 0.1, 2.15]} />
    </group>
  )
}

useGLTF.preload('/lamp.glb')
