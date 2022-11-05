import { Euler } from "three"
import { Vector3 } from "@react-three/fiber"
import React from "react"
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
    // gltfjsx component of the model
    component: (props: any) => JSX.Element,
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
    // the model being rendered
    element: Element,
    // the positioning, animation, etc... mesh props
    meshProps?: any,
    // the props for the specific model (ex: "toggled", for a light)
    componentProps?: any
}

export function ElementMesh({ element, meshProps, componentProps }: ElementMeshProps) {
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
            >
                <element.model.component
                    {...componentProps}
                />
            </a.mesh>
        </React.Suspense >
    )
}
