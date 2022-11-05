import React, { useState, createContext, ReactNode } from "react"

import { SceneElement, Element } from "./common"
import { generateRandomScene, generateSampleScene, getSceneElementFromElement } from "./utils"

interface SceneContextInterface {
    cameraEnabled: boolean
    sceneElements: SceneElement[],
    addElement: (element: Element) => any,
    setRandomScene: () => any,
    setSampleScene: () => any,
    clearScene: () => any,
    selectedElement: SceneElement | undefined,
    setSelectedElement: (element: SceneElement | undefined) => any
}

export const SceneContext = createContext<SceneContextInterface | null>(null)

interface SceneContextProps {
    children?: ReactNode
}

export function SceneContextProvider({ children }: SceneContextProps) {
    const [sceneElements, setSceneElements] = useState<SceneElement[]>(generateSampleScene())
    const [selectedElement, setSelectedElement] = useState<SceneElement>()

    function onAddElement(newElement: Element) {
        const sceneElement = getSceneElementFromElement(newElement)

        setSceneElements([...sceneElements, sceneElement])
    }

    return (
        <SceneContext.Provider
            value={{
                // enable the camera when no elements are being manipulated
                cameraEnabled: selectedElement === undefined,
                sceneElements,
                addElement: onAddElement,
                setRandomScene: () => {
                    setSceneElements([])
                    setSceneElements(generateRandomScene())
                },
                clearScene: () => {
                    setSceneElements([])
                },
                setSampleScene: () => {
                    setSceneElements([])
                    setSceneElements(generateSampleScene())
                },
                selectedElement,
                setSelectedElement: (element: SceneElement | undefined) => {
                    setSelectedElement(element)
                }
            }}
        >
            {children}
        </SceneContext.Provider>
    )
}
