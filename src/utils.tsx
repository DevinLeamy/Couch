import { v4 } from "uuid"
import { Vector3 } from "@react-three/fiber"
import { Euler } from "three"

import { ModelData } from "./data"
import { Model, Element, SceneElement, ROOM_FLOOR } from "./common"

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
        visible: true,
        selected: false,
        position: [0, ROOM_FLOOR, 0]
    }
}

export function generateRandomRoomPosition(): Vector3 {
    return [0, 0, 0]
}

export function generateRandomScene(): SceneElement[] {
    const scene: SceneElement[] = []

    for (const model of ModelData) {
        const element: Element = {
            id: generateUUID(),
            model: model,
            selected: false,
            rotation: new Euler(0, 0, 0),
        }

        scene.push(getSceneElementFromElement(element))
    }


    return scene
}
