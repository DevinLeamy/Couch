import { v4 } from "uuid"
import { Vector3 } from "@react-three/fiber"
import { Euler } from "three"

import { ModelData } from "./data"
import { Model, Element, SceneElement, ROOM_FLOOR, TV, COUCH, LAMP, CHAIR, TABLE } from "./common"

export function generateUUID(): string {
    return v4()
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

function generateRandomPosition(): Vector3 {
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

export function generateRandomScene(): SceneElement[] {
    const scene: SceneElement[] = []

    for (const model of ModelData) {
        const element: Element = {
            id: generateUUID(),
            model: getModelByName(model.name)!,
            rotation: generateRandomRotation(),
        }
        const sceneElement: SceneElement = {
            id: generateUUID(),
            element: element,
            position: generateRandomPosition()
        }

        scene.push(sceneElement)
    }


    return scene
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
