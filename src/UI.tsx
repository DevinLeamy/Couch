import * as THREE from 'three'
import * as React from 'react'
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Slider from "@mui/material/Slider"
import Card from "@mui/material/Card"
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

import { CHAIR, COUCH, TABLE, Element, ElementMesh, Model, MODEL_TYPES, LAMP, TV } from "./common"
import { getModelByName, generateUUID, generateRandomElement } from "./utils"
import { SceneContext } from './SceneContext'
import { Button } from '@mui/material'

function UIComponent() {
    const { addElement } = React.useContext(SceneContext)!
    const [elementId, setElementId] = useState<string>(generateUUID())
    const [modelIndex, setModelIndex] = useState<number>(0)
    const [model, setModel] = useState<Model>(getModelByName(CHAIR)!)
    const [rotationY, setRotationY] = useState<number>(0)

    function createElement(): Element {
        return {
            id: elementId,
            model: model,
            rotation: new THREE.Euler(0, rotationY, 0)
        }
    }

    function updateRotation(newRotationY: number) {
        setRotationY(newRotationY)
    }

    function ElementPreview() {
        const modelType = MODEL_TYPES[modelIndex]
        // position such that the element display within the view
        let position = [0, 0, 0];

        if (modelType === CHAIR) {
            position = [0, -1, 3];
        } else if (modelType === COUCH) {
            position = [0, -1, 0]
        } else if (modelType === TABLE) {
            position = [0, -1, 2]
        } else if (modelType === LAMP) {
            position = [0, -1, 3]
        } else if (modelType == TV) {
            position = [0, -1, 2]
        }

        return (
            <Card className="element-preview">
                <Canvas>
                    <ambientLight intensity={0.5} />
                    <spotLight intensity={0.5} position={[0, 0, 17]} angle={0.15} penumbra={1} />
                    <ElementMesh
                        element={createElement()}
                        meshProps={{
                            position: position
                        }}
                    />
                </Canvas>
            </Card>
        )
    }

    function ElementConfiguration() {
        function onAddElement() {
            addElement(createElement())
            setElementId(generateUUID())
        }

        function onAddRandomElement() {
            addElement(generateRandomElement())
            setElementId(generateUUID())
        }

        function onNextElement() {
            const newModelIndex = (modelIndex + 1) % MODEL_TYPES.length
            setModelIndex(newModelIndex)
            setModel(getModelByName(MODEL_TYPES[newModelIndex])!)
        }

        function onPreviousElement() {
            let newModelIndex = modelIndex - 1
            if (newModelIndex < 0) {
                newModelIndex = MODEL_TYPES.length - 1
            }

            setModelIndex(newModelIndex)
            setModel(getModelByName(MODEL_TYPES[newModelIndex])!)
        }

        return (
            <Card className="element-configuration-container">
                <div className="element-switcher-container">
                    <Button variant="outlined" className="previous-element-button" onClick={onPreviousElement}>
                        <ArrowCircleLeftIcon />
                    </Button>
                    <Button variant="outlined" className="next-element-button" onClick={onNextElement}>
                        <ArrowCircleRightIcon />
                    </Button>
                </div>
                <span>Rotation</span>
                <Slider
                    size="small"
                    defaultValue={rotationY}
                    step={2 * Math.PI / 10}
                    min={0}
                    max={2 * Math.PI}
                    onChangeCommitted={(_event, value) => updateRotation(value as number)}
                />
                <Button variant="contained" className="add-element-button" onClick={onAddElement}>
                    Add element
                </Button>
                <Button variant="contained" className="add-element-button" onClick={onAddRandomElement}>
                    Add random element
                </Button>
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
