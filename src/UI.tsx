import * as THREE from 'three'
import * as React from 'react'
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Slider from "@mui/material/Slider"
import Card from "@mui/material/Card"

import { Element, ElementMesh } from "./common"
import { getModelByName, generateUUID, } from "./utils"
import { SceneContext } from './SceneContext'

const MINIMUM_SCALE = 0.2
const MAXIMUM_SCALE = 4

function UIComponent() {
    const { addElement } = React.useContext(SceneContext)!

    const [focusedElement, setFocusedElement] = useState<Element>({
        id: generateUUID(),
        model: getModelByName("Chair")!,
        selected: false,
        rotation: new THREE.Euler(0, 0, 0),
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

    function ElementPreview() {
        return (
            <Card className="element-preview">
                <Canvas>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[15, 15, 17]} angle={0.15} penumbra={1} />
                    <ElementMesh
                        element={focusedElement}
                        meshProps={{
                            position: [0, -1, 3]
                        }}
                    />
                </Canvas>
            </Card>
        )
    }

    function ElementConfiguration() {
        const onAddElementClick = () => {
            addElement(focusedElement)

            setFocusedElement({ ...focusedElement, id: generateUUID() })
        }

        return (
            <Card className="element-configuration-container">
                <span>Rotation</span>
                <Slider
                    size="small"
                    defaultValue={focusedElement.rotation.y}
                    aria-label="Rotation"
                    valueLabelDisplay="auto"
                    step={2 * Math.PI / 50}
                    min={0}
                    max={2 * Math.PI}
                    onChangeCommitted={(_event, value) => updateRotation(value as number)}
                />
                <button className="add-element-button" onClick={_event => onAddElementClick()}>
                    Add element
                </button>
            </Card>
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
