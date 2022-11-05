import { Canvas, useLoader, useThree } from "@react-three/fiber"
import React, { useContext, useRef, useState } from "react"
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
            <RoomModel position={[1.61, ROOM_FLOOR, 4]} />
            <pointLight intensity={0.5} position={[0, 0, 0]} />
        </React.Suspense>
    )
}

interface SceneElementMeshProps {
    sceneElement: SceneElement,
}

function SceneElementMesh({ sceneElement }: SceneElementMeshProps) {
    const { size, viewport } = useThree()
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
        const deltaY = (distanceY * directionY) / 300

        setRotationY(rotationY + deltaY)
    }

    // move
    function onDrag({ offset: [x, y] }: any) {
        setMeshProps({ ...meshProps, position: [x / aspect, ROOM_FLOOR, y / aspect], })
    }

    // highlight
    function onHover(state: any) {
        if (state.first) {
            // on mouse enter
            setComponentProps({
                color: new Color("cyan"),
                opacity: 0.7
            })
        } else if (state.last) {
            // on mouse leave
            setComponentProps({})
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
    const { cameraEnabled, setCameraEnabled, clearScene, randomizeScene } = useContext(SceneContext)!

    function toggleCamera(_event: any) {
        setCameraEnabled(!cameraEnabled)
    }
    return (
        <Card className="scene-controller-container">
            Controller
            <Button variant="contained" onClick={toggleCamera}>
                {
                    cameraEnabled && "Turn off camera controller"
                }
                {
                    !cameraEnabled && "Turn on camera controller"
                }
            </Button>
            <Button variant="contained" onClick={clearScene}>
                Clear scene
            </Button>
            <Button variant="contained" onClick={randomizeScene}>
                Randomize scene
            </Button>
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
                    {sceneElements.map(sceneElement => <SceneElementMesh sceneElement={sceneElement} />)}
                </PresentationControls >
            </Canvas>
            <SceneController />
        </div>
    )
}

export default SceneComponent
