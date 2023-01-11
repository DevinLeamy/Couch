import React, { useState, createContext, ReactNode } from "react"

import { SceneElement, Element, MovementTween, ElementAnimation } from "./common"
import { generateRandomElement, generateRandomPosition, generateSampleScene, getSceneElementFromElement } from "./utils"

interface SceneContextInterface {
    cameraEnabled: boolean
    sceneElements: SceneElement[],
    addElement: (element: Element) => any,
    setRandomScene: () => any,
    setSampleScene: () => any,
    clearScene: () => any,
    selectedElement: SceneElement | undefined,
    setSelectedElement: (element: SceneElement | undefined) => any,
    getAnimationByElementId: (elementId: string) => undefined | MovementTween,
    removeSceneElement: (sceneElement: SceneElement) => any,
}

export const SceneContext = createContext<SceneContextInterface | null>(null)

interface SceneContextProps {
    children?: ReactNode
}

export function SceneContextProvider({ children }: SceneContextProps) {
    const [sceneElements, setSceneElements] = useState<SceneElement[]>(generateSampleScene())
    const [selectedElement, setSelectedElement] = useState<SceneElement>()
    const [elementAnimations, setElementAnimations] = useState<ElementAnimation[]>([])

    function createSpawningAnimation(elementId: string): ElementAnimation {
        return {
            elementId: elementId,
            animation: {
                targetPosition: generateRandomPosition(),
                movementSpeed: 0.08,
                onTweenComplete: () => removeAnimationsWithElementId(elementId)
            }
        }
    }

    function onAddElement(newElement: Element) {
        const sceneElement = getSceneElementFromElement(newElement)
        sceneElement.position = [0, 0, 0]

        const spawningAnimation = createSpawningAnimation(sceneElement.id)

        setElementAnimations([...elementAnimations, spawningAnimation])
        setSceneElements([...sceneElements, sceneElement])
    }

    function removeAnimationsWithElementId(elementId: string) {
        setElementAnimations(elementAnimations.filter(elementAnimation => elementAnimation.elementId !== elementId))
    }

    function getAnimationByElementId(elementId: string): MovementTween | undefined {
        for (const elementAnimation of elementAnimations) {
            if (elementAnimation.elementId === elementId) {
                return elementAnimation.animation
            }
        }

        return undefined
    }

    function removeSceneElement(sceneElement: SceneElement) {
        if (selectedElement !== undefined && selectedElement.id === sceneElement.id) {
            setSelectedElement(undefined)
        }

        setSceneElements(sceneElements.filter(_sceneElement => _sceneElement.id !== sceneElement.id))
    }

    function spawnRandomScene() {
        const scene: SceneElement[] = []
        const animations: ElementAnimation[] = []

        for (let i = 0; i < 3 + Math.floor(Math.random() * 5); ++i) {
            const element = generateRandomElement()
            const sceneElement = getSceneElementFromElement(element)
            sceneElement.position = [0, 0, 0]

            const spawningAnimation = createSpawningAnimation(sceneElement.id)
            scene.push(sceneElement)
            animations.push(spawningAnimation)
        }

        setElementAnimations(animations)
        setSceneElements(scene)
    }

    return (
        <SceneContext.Provider
            value={{
                // enable the camera when no elements are being manipulated
                cameraEnabled: selectedElement === undefined,
                sceneElements,
                addElement: onAddElement,
                setRandomScene: () => {
                    spawnRandomScene()
                },
                clearScene: () => {
                    setSceneElements([])
                },
                setSampleScene: () => {
                    setSceneElements(generateSampleScene())
                },
                selectedElement,
                setSelectedElement: (element: SceneElement | undefined) => {
                    setSelectedElement(element)
                },
                getAnimationByElementId,
                removeSceneElement
            }}
        >
            {children}
        </SceneContext.Provider>
    )
}
