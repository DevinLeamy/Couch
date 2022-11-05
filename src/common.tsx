import { Euler } from "three"
import { Vector3, useLoader, PrimitiveProps } from "@react-three/fiber"
import React, { useMemo, useState, ReactNode } from "react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export const ROOM_CENTER_X = 0
export const ROOM_FLOOR = -2.3
export const ROOM_CENTER_Z = 0

export const CHAIR = "Chair"
export const COUCH = "Couch"

export const MODEL_TYPES = [
    CHAIR, COUCH
]

export type Model = {
    id: string,
    // name of the model (ex: "chair")
    name: string,
    // path to the model
    path: string,
    // default scale of the model
    scale: number,
    // default (front-facing) rotation 
    rotation: Euler
}

export type Element = {
    id: string
    model: Model,
    selected: boolean,
    rotation: Euler,
}

export type SceneElement = {
    id: string,
    element: Element,
    visible: boolean,
    selected: boolean,
    position: Vector3
}

export interface ElementMeshProps {
    element: Element,
    onClick?: () => undefined,
    position?: Vector3
}

export function ElementMesh({ element, onClick, position }: ElementMeshProps) {
    const { scene } = useLoader(GLTFLoader, element.model.path)
    const modelGeometry = useMemo(() => scene.clone(), [scene])

    const [hovering, setHovering] = useState(false)

    const modelRotation = new Euler(
        element.model.rotation.x + element.rotation.x,
        element.model.rotation.y + element.rotation.y,
        element.model.rotation.z + element.rotation.z,
    )
    const modelPosition = position ?? [0, 0, 0]

    return (
        <React.Suspense
            fallback={null}
            key={element.id}
        >
            <mesh
                scale={element.model.scale}
                onPointerOver={(_e) => setHovering(true)}
                onPointerOut={(_e) => setHovering(false)}

            >
                <primitive
                    object={modelGeometry}
                    rotation={modelRotation}
                    position={modelPosition}
                />
            </mesh>
        </React.Suspense >
    )
}
