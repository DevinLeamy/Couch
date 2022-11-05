import { Euler } from "three"
import { Vector3, useLoader, PrimitiveProps, MeshProps } from "@react-three/fiber"
import React, { useMemo, useState, ReactNode } from "react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { a } from "@react-spring/three"

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
    meshProps?: any
}

export function ElementMesh({ element, meshProps }: ElementMeshProps) {
    const { scene } = useLoader(GLTFLoader, element.model.path)
    const modelGeometry = useMemo(() => scene.clone(), [scene])

    const modelRotation = new Euler(
        element.model.rotation.x + element.rotation.x,
        element.model.rotation.y + element.rotation.y,
        element.model.rotation.z + element.rotation.z,
    )

    return (
        <React.Suspense
            key={element.id}
            fallback={null}
        >
            <a.mesh
                scale={element.model.scale}
                rotation={modelRotation}
                {...meshProps}
                opacity={0.5}
                color={"rgb(0, 0, 0)"}
            >
                <meshStandardMaterial opacity={0.5} />
                <primitive
                    object={modelGeometry}
                >
                </primitive>

            </a.mesh>
        </React.Suspense >
    )
}
