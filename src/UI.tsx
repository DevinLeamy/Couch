import * as THREE from 'three'
import * as React from 'react'
import { useRef, useState } from 'react'
import { Canvas, Euler, useFrame, useLoader, Vector3 } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { v4 as generateUUID } from "uuid"
import Slider from "@mui/material/Slider"

import { Element, ElementMesh } from "./common"

const MINIMUM_SCALE = 0.2
const MAXIMUM_SCALE = 4

interface UIComponentProps {
    addElement: ((element: Element) => void),
    selectElement: ((element: Element) => void)
}

function UIComponent({ addElement, selectElement }: UIComponentProps) {
    let [focusedElement, setFocusedElement] = useState<Element>({
        id: generateUUID(),
        selected: false,
        rotation: new THREE.Euler(0, 0, 0),
        scale: 1,
        position: [0, 0, 0],
        inScene: false,
    });

    function updateRotation(newRotationY: number) {
        setFocusedElement({
            ...focusedElement,
            rotation: new THREE.Euler(
                focusedElement.rotation.x,
                newRotationY,
                focusedElement.rotation.z,
            )
        })
    }

    function updateScale(newScale: number) {
        setFocusedElement({
            ...focusedElement,
            scale: newScale
        })
    }

    function ElementPreview() {
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

    function ElementConfiguration() {

        function onAddElementClick() {
            if (!focusedElement.inScene) {
                addElement(focusedElement)
            }
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
        <div className="ui-container">
            <ElementPreview />
            <ElementConfiguration />
        </div>
    )
}

export default UIComponent
