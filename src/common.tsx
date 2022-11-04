import { Vector3 } from "@react-three/fiber"
import React, { useRef, useState } from "react"

export const RoomModel = "/room.glb"
export const ChairModel = "/chair.gltf"

export type Element = {
    id: string
    // modelPath: string,
    selected: boolean,
    rotation: THREE.Euler,
    scale: number,
    position: Vector3,
    inScene: boolean,
}

export interface ElementMeshProps {
    element: Element,
    onClick?: () => undefined,
}

export function ElementMesh({ element, onClick }: ElementMeshProps) {
    const ref = useRef<THREE.Mesh>(null)
    const [hovering, setHovering] = useState(false)

    return (
        <mesh
            key={element.id}
            ref={ref}
            position={element.position}
            rotation={element.rotation}
            scale={element.scale}
            onPointerOver={(_e) => setHovering(true)}
            onPointerOut={(_e) => setHovering(false)}
        >
            <boxGeometry />
            <meshStandardMaterial color={'orange'} />
        </mesh >
    )
}
