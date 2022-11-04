import { Vector3, useLoader } from "@react-three/fiber"
import React, { useRef, useMemo, useContext, useState } from "react"
import { Group } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

import { MainContext } from "./App"

export const RoomModel = "/room.glb"
export const ChairModel = "/chair.gltf"

export type Element = {
    id: string
    modelPath: string,
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

export const ElementMesh = ({ element, onClick }: ElementMeshProps) => {
    const { scene } = useLoader(GLTFLoader, element.modelPath)
    const copiedScene = useMemo(() => scene.clone(), [scene])

    const [hovering, setHovering] = useState(false)

    return (
        <React.Suspense
            fallback={null}
            key={element.id}
        >
            <mesh
                scale={element.scale}
                onPointerOver={(_e) => setHovering(true)}
                onPointerOut={(_e) => setHovering(false)}
            >
                <primitive
                    object={copiedScene}
                    position={element.position}
                    rotation={element.rotation}
                />
            </mesh>
        </React.Suspense>
    )
}
