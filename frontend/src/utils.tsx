import { v4 } from "uuid"
import { Vector3 } from "@react-three/fiber"
import { Euler } from "three"

import { ModelData } from "./data"
import { Model, Element, SceneElement, ROOM_FLOOR, TV, COUCH, LAMP, CHAIR, TABLE, MODEL_TYPES } from "./common"

export function generateUUID(): string {
    return v4()
}

export function lerp(start: Vector3, end: Vector3, percentage: number): Vector3 {
    const [sx, sy, sz] = start as [x: number, y: number, z: number]
    const [ex, ey, ez] = end as [x: number, y: number, z: number]
    return [
        sx + (ex - sx) * percentage,
        sy + (ey - sy) * percentage,
        sz + (ez - sz) * percentage
    ]
}

export function distance(a: Vector3, b: Vector3): number {
    const [ax, ay, az] = a as [x: number, y: number, z: number]
    const [bx, by, bz] = b as [x: number, y: number, z: number]
    return Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2 + (az - bz) ** 2)
}

export function getModelByName(modelName: string): Model | undefined {
    for (const model of ModelData) {
        if (model.name === modelName) {
            return model
        }
    }

    return undefined
}

export function getSceneElementFromElement(element: Element): SceneElement {
    return {
        id: generateUUID(),
        element: element,
        position: [0, ROOM_FLOOR, 0]
    }
}

function randomNumberInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function generateRandomPosition(): Vector3 {
    return [
        randomNumberInRange(-2.5, 2.5),
        ROOM_FLOOR,
        randomNumberInRange(-2.5, 2.5)
    ]
}

function generateRandomRotation(): Euler {
    return new Euler(
        0,
        randomNumberInRange(0, Math.PI * 2),
        0
    )
}

export function generateRandomElement(): Element {
    const modelType = MODEL_TYPES[Math.floor(Math.random() * MODEL_TYPES.length)]
    const element: Element = {
        id: generateUUID(),
        model: getModelByName(modelType)!,
        rotation: generateRandomRotation(),
    }

    return element
}

export function generateRandomSceneElement(): SceneElement {
    const sceneElement: SceneElement = {
        id: generateUUID(),
        element: generateRandomElement(),
        position: generateRandomPosition()
    }

    return sceneElement
}

const SampleSceneData = [
    {
        modelType: TV,
        rotationY: 0.7,
        position: [-2.26, ROOM_FLOOR, -2.5]
    },
    {
        modelType: COUCH,
        rotationY: 3.88,
        position: [-0.96, ROOM_FLOOR, -0.75]
    },
    {
        modelType: LAMP,
        rotationY: 3.88,
        position: [-2.4, ROOM_FLOOR, -0.2]
    },
    {
        modelType: CHAIR,
        rotationY: 3.14,
        position: [1.53, ROOM_FLOOR, 1.34]
    },
    {
        modelType: CHAIR,
        rotationY: 0,
        position: [1.57, ROOM_FLOOR, 0.2]
    },
    {
        modelType: TABLE,
        rotationY: 3.14,
        position: [1.59, ROOM_FLOOR, 0.7]
    },
    {
        modelType: LAMP,
        rotationY: 0,
        position: [2.43, ROOM_FLOOR, 0.53]
    },
    {
        modelType: CHAIR,
        rotationY: 1.77,
        position: [0.61, ROOM_FLOOR, 0.85]
    },
]

export function generateSampleScene(): SceneElement[] {
    const scene: SceneElement[] = []

    for (const sceneElementSpec of SampleSceneData) {
        const sceneElement: SceneElement = {
            id: generateUUID(),
            element: {
                id: generateUUID(),
                model: getModelByName(sceneElementSpec.modelType)!,
                rotation: new Euler(0, sceneElementSpec.rotationY)
            },
            position: sceneElementSpec.position as Vector3
        }

        scene.push(sceneElement)
    }

    return scene
}
