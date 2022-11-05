import { Canvas, useThree } from "@react-three/fiber"
import React, { useContext, useState } from "react"
import { Color, Euler } from "three"
import { PresentationControls } from "@react-three/drei"
import { useGesture } from "@use-gesture/react"
import Card from "@mui/material/Card"

import { SceneElement, ElementMesh, ROOM_FLOOR } from "./common"
import { SceneContext } from "./SceneContext"
import { RoomModel } from "./gltfjsx/Room"
import { Button } from "@mui/material"

// the room model that lays the background for the scene
const Room = () => {
    return (
        <React.Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <RoomModel position={[1.61, ROOM_FLOOR, 7]} />
            <pointLight intensity={0.5} position={[0, 0, 0]} />
        </React.Suspense>
    )
}

interface SceneElementMeshProps {
    sceneElement: SceneElement,
}

function SceneElementMesh({ sceneElement }: SceneElementMeshProps) {
    const { size, viewport } = useThree()
    const { selectedElement, setSelectedElement } = useContext(SceneContext)!
    const [rotationY, setRotationY] = useState<number>(sceneElement.element.rotation.y)
    const [meshProps, setMeshProps] = useState<any>({
        position: sceneElement.position,
        // react-spring config
        config: { friction: 10 }
    })
    const [componentProps, setComponentProps] = useState<any>({})
    const aspect = size.width / viewport.width
    const gestureProps = useGesture({
        onDrag,
        onHover,
        onWheel
    })

    // rotate
    function onWheel({ distance: [, distanceY], direction: [, directionY] }: any) {
        // only manipulate one element at a time
        if (selectedElement !== undefined && selectedElement.id !== sceneElement.id) {
            return
        }
        const deltaY = (distanceY * directionY) / 300

        setRotationY(rotationY + deltaY)
    }

    // move
    function onDrag({ offset: [x, y] }: any) {
        // only manipulate one element at a time
        if (selectedElement !== undefined && selectedElement.id !== sceneElement.id) {
            return
        }
        setMeshProps({ ...meshProps, position: [x / aspect, ROOM_FLOOR, y / aspect], })
    }

    // highlight
    function onHover(state: any) {
        // only manipulate one element at a time
        if (selectedElement !== undefined && selectedElement.id !== sceneElement.id) {
            return
        }

        if (state.first) {
            // on mouse enter
            setComponentProps({
                color: new Color("cyan"),
                opacity: 0.7
            })
            setSelectedElement(sceneElement)
        } else if (state.last) {
            // on mouse leave
            setComponentProps({})
            setSelectedElement(undefined)
        }
    }

    sceneElement.element.rotation = new Euler(0, rotationY, 0)

    return <ElementMesh
        key={sceneElement.id}
        element={sceneElement.element}
        meshProps={{
            ...meshProps,
            ...gestureProps(),
        }}
        componentProps={componentProps}
    />
}

function SceneController() {
    const { clearScene, setRandomScene, setSampleScene } = useContext(SceneContext)!
    const [instructionsEnabled, setInstructionsEnabled] = useState(true)

    function toggleInstructions() {
        setInstructionsEnabled(!instructionsEnabled)
    }

    return (
        <Card className="scene-controller-container">
            Controller
            <Button variant="contained" onClick={clearScene}>
                Clear scene
            </Button>
            <Button variant="contained" onClick={setRandomScene}>
                Set random scene
            </Button>
            <Button variant="contained" onClick={setSampleScene}>
                Set sample scene
            </Button>
            <Button variant="outlined" onClick={toggleInstructions}>
                Toggle instructions
            </Button>
            {instructionsEnabled && <div>
                <p>Instructions and notes</p>
                <ul style={{ fontSize: "13px" }}>
                    <li><b>Moving</b>: Move items by hovering over them and dragging.</li>
                    <li><b>Rotating</b>: Rotate items by scrolling while hovering over them.</li>
                    <li><b>Camera</b>: Hold down the left mouse button and move your cursor to orbit around the scene. Interacting with an element will temporarily disable this ability.</li>
                    <li><b>Changing scenes</b>: Clear the scene before setting a new scene, using the <b>"Clear scene"</b> option above.</li>
                    <li><b>Lag</b>: Creating complex scenes and manipulating items can be laggy.</li>
                    <li style={{ fontSize: "10px" }}><i>There are many things that could (and should) be improved. Be warned!</i></li>
                </ul>
            </div>}
        </Card>
    )
}

function SceneComponent() {
    const { cameraEnabled, sceneElements } = useContext(SceneContext)!

    return (
        <div className="scene-container">
            <Canvas>
                <PresentationControls
                    // vertical limits
                    polar={[0, 0]}
                    // horizontal limits
                    azimuth={[-Math.PI / 5, Math.PI / 5]}
                    enabled={cameraEnabled}
                >
                    <Room />
                    {sceneElements.map(sceneElement => <SceneElementMesh key={sceneElement.id} sceneElement={sceneElement} />)}
                </PresentationControls >
            </Canvas>
            <SceneController />
        </div>
    )
}

export default SceneComponent
