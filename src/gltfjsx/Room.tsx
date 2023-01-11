import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    CTRL_Hole: THREE.Mesh
    Window_1: THREE.Mesh
    Window_2: THREE.Mesh
    Window_3: THREE.Mesh
    Window_4: THREE.Mesh
    Cube001_1: THREE.Mesh
    Cube001_2: THREE.Mesh
    Sphere: THREE.Mesh
    Cylinder: THREE.Mesh
    Sphere001: THREE.Mesh
    rug: THREE.Mesh
    Plane: THREE.Mesh
    Plane001: THREE.Mesh
    Plane002: THREE.Mesh
    Cylinder001: THREE.Mesh
    Cylinder002: THREE.Mesh
    Cylinder003: THREE.Mesh
    Cylinder004: THREE.Mesh
    Cylinder005: THREE.Mesh
    Cube001: THREE.Mesh
    Cube003: THREE.Mesh
    Cube004: THREE.Mesh
    Cube005: THREE.Mesh
    Cube006: THREE.Mesh
    Cylinder006: THREE.Mesh
    Cube008_1: THREE.Mesh
    Cube008_2: THREE.Mesh
    Cube007: THREE.Mesh
    Cube009: THREE.Mesh
    Plane003: THREE.Mesh
    Plane004: THREE.Mesh
    Cube002: THREE.Mesh
    Cube010: THREE.Mesh
    Cube018: THREE.Mesh
    Cube018_1: THREE.Mesh
    Cube018_2: THREE.Mesh
    Cube012: THREE.Mesh
    Plane007: THREE.Mesh
    Cube013: THREE.Mesh
    Wall_outlet007_Plane339_1: THREE.Mesh
    Wall_outlet007_Plane339_2: THREE.Mesh
    Light_switch003_Plane344: THREE.Mesh
    Cube014: THREE.Mesh
    Cube015: THREE.Mesh
    Cube016: THREE.Mesh
    Cube017: THREE.Mesh
  }
  materials: {
    hidden_material: THREE.MeshStandardMaterial
    PVC: THREE.MeshStandardMaterial
    Plastic: THREE.MeshStandardMaterial
    Glass: THREE.MeshStandardMaterial
    Marble: THREE.MeshStandardMaterial
    ['Material.002']: THREE.MeshStandardMaterial
    ['Material.011']: THREE.MeshStandardMaterial
    ['Material.003']: THREE.MeshStandardMaterial
    ['Material.004']: THREE.MeshStandardMaterial
    rug: THREE.MeshStandardMaterial
    ['Material.001']: THREE.MeshStandardMaterial
    ['Material.009']: THREE.MeshStandardMaterial
    ['Material.005']: THREE.MeshStandardMaterial
    ['Material.010']: THREE.MeshStandardMaterial
    ['Material.006']: THREE.MeshStandardMaterial
    ['Material.007']: THREE.MeshStandardMaterial
    ['Material.015']: THREE.MeshStandardMaterial
    ['Material.008']: THREE.MeshStandardMaterial
    ['Material.014']: THREE.MeshStandardMaterial
    ['Material.012']: THREE.MeshStandardMaterial
    ['Material.013']: THREE.MeshStandardMaterial
    ['Material.024']: THREE.MeshStandardMaterial
    ['Material.018']: THREE.MeshStandardMaterial
    Wall_socket_white: THREE.MeshStandardMaterial
    Wall_socket_black: THREE.MeshStandardMaterial
  }
}

export function RoomModel(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/room.glb') as unknown as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group position={[-2.53, 0.46, 1.36]} scale={[1.05, 0.95, 1]}>
        <mesh geometry={nodes.CTRL_Hole.geometry} material={materials.hidden_material} position={[0, 0.98, 0]} />
        <group position={[0, 0.94, -0.02]}>
          <mesh geometry={nodes.Window_1.geometry} material={materials.PVC} />
          <mesh geometry={nodes.Window_2.geometry} material={materials.Plastic} />
          <mesh geometry={nodes.Window_3.geometry} material={materials.Glass} />
          <mesh geometry={nodes.Window_4.geometry} material={materials.Marble} />
        </group>
      </group>
      <group position={[-2.37, 1.06, -2.62]} scale={1.37}>
        <mesh geometry={nodes.Cube001_1.geometry} material={materials['Material.002']} />
        <mesh castShadow geometry={nodes.Cube001_2.geometry} material={materials['Material.011']} />
      </group>
      <mesh geometry={nodes.Plane.geometry} material={materials['Material.001']} position={[-2, -0.19, -1.64]} scale={[3.38, 3.38, 3.05]} />
      <mesh geometry={nodes.Plane001.geometry} material={materials['Material.009']} position={[-1.15, 1.16, 1.23]} rotation={[-Math.PI, 0, 0]} scale={[0.56, 1, 1]} />
      <mesh geometry={nodes.Plane002.geometry} material={materials['Material.009']} position={[-3.94, 1.16, 1.24]} rotation={[-Math.PI, 0, 0]} scale={[-0.56, 1, 1]} />
      <mesh geometry={nodes.Plane003.geometry} material={materials['Material.001']} position={[-2, -0.19, -7.7]} scale={[3.38, 3.38, 3.05]} />
    </group>
  )
}

useGLTF.preload('/room.glb')