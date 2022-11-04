import * as THREE from 'three'
import * as React from 'react'
import { useRef, useState, useContext } from 'react'
import { Canvas, Euler, useFrame, useLoader, Vector3 } from '@react-three/fiber'
import { v4 as generateUUID } from "uuid"
import Slider from "@mui/material/Slider"
import Card from "@mui/material/Card"

import { ChairModel, Element, ElementMesh } from "./common"
import { MainContext } from './App'

const MINIMUM_SCALE = 0.2
const MAXIMUM_SCALE = 4

interface UIComponentProps {
    addElement: ((element: Element) => void),
    selectElement: ((element: Element) => void)
}

const UIComponent = ({ addElement, selectElement }: UIComponentProps) => {
    const [focusedElement, setFocusedElement] = useState<Element>({
        id: generateUUID(),
        modelPath: ChairModel,
        selected: false,
        rotation: new THREE.Euler(0, 0, 0),
        scale: 1,
        position: [0, 0, 0],
        inScene: false,
    });

    const updateRotation = (newRotationY: number) => {
        setFocusedElement({
            ...focusedElement,
            rotation: new THREE.Euler(
                focusedElement.rotation.x,
                newRotationY,
                focusedElement.rotation.z,
            )
        })
    }

    const updateScale = (newScale: number) => {
        setFocusedElement({
            id: generateUUID(),
            modelPath: ChairModel,
            selected: false,
            rotation: new THREE.Euler(0, 0, 0),
            scale: 1,
            position: [0, 0, 0],
            inScene: false,
        })
    }

    const ElementPreview = () => {
        return (
            <div className="element-preview">
                <Canvas>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[15, 15, 17]} angle={0.15} penumbra={1} />
                    <ElementMesh
                        element={{
                            ...focusedElement,
                            position: [0, 0, 3],
                        }}
                    />
                </Canvas>
            </div>
        )
    }

    const ElementConfiguration = () => {
        const onAddElementClick = () => {
            if (!focusedElement.inScene) {
                addElement(focusedElement)
            }

            setFocusedElement({
                ...focusedElement,
                id: generateUUID()
            })
        }

        return (
            <div className="element-configuration-container">
                <span>Scale</span>
                <Slider
                    size="small"
                    defaultValue={focusedElement.scale}
                    aria-label="Scale"
                    valueLabelDisplay="auto"
                    step={(MAXIMUM_SCALE - MINIMUM_SCALE) / 50}
                    min={MINIMUM_SCALE}
                    max={MAXIMUM_SCALE}
                    onChangeCommitted={(_event, value) => updateScale(value as number)}
                />
                <span>Rotation Y</span>
                <Slider
                    size="small"
                    defaultValue={focusedElement.rotation.y}
                    aria-label="Rotation"
                    valueLabelDisplay="auto"
                    step={3.14 / 50}
                    min={0}
                    max={3.14}
                    onChangeCommitted={(_event, value) => updateRotation(value as number)}
                />
                <button className="add-element-button" onClick={_event => onAddElementClick()}>
                    Add element
                </button>
            </div>
        )
    }

    return (
        <Card className="ui-container">
            <ElementPreview />
            <ElementConfiguration />
        </Card>
    )
}

export default UIComponent
