import React, { useState, createContext, ReactNode } from "react"

import { SceneElement, Element } from "./common"
import { generateRandomScene, getSceneElementFromElement } from "./utils"

interface SceneContextInterface {
    cameraEnabled: boolean
    setCameraEnabled: (enabled: boolean) => any,
    sceneElements: SceneElement[],
    addElement: (element: Element) => any,
    randomizeScene: () => any,
    clearScene: () => any,
}

export const SceneContext = createContext<SceneContextInterface | null>(null)

interface SceneContextProps {
    children?: ReactNode
}

export function SceneContextProvider({ children }: SceneContextProps) {
    const [cameraEnabled, setCameraEnabled] = useState(false)
    const [sceneElements, setSceneElements] = useState<SceneElement[]>(generateRandomScene())

    function onAddElement(newElement: Element) {
        const sceneElement = getSceneElementFromElement(newElement)
        sceneElement.selected = true

        setSceneElements([...sceneElements, sceneElement])
    }

    return (
        <SceneContext.Provider
            value={{
                cameraEnabled: cameraEnabled,
                setCameraEnabled: (enabled: boolean) => {
                    setCameraEnabled(enabled)
                },
                sceneElements,
                addElement: onAddElement,
                randomizeScene: () => {
                    setSceneElements(generateRandomScene())
                },
                clearScene: () => {
                    setSceneElements([])
                }
            }}
        >
            {children}
        </SceneContext.Provider>
    )
}
