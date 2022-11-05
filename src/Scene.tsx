import { Canvas, useLoader, useThree } from "@react-three/fiber"
import React, { useRef, useState } from "react"
import { Color, Euler } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { PresentationControls } from "@react-three/drei"
import { useGesture } from "react-use-gesture"
import { useSpring, a } from "@react-spring/three"

import { SceneElement, ElementMesh, ROOM_FLOOR } from "./common"
import { RoomModel } from "./gltfjsx/Room"


const Room = () => {
    // const model = useLoader(GLTFLoader, "/room.glb")
    return (
        <React.Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            {/* <primitive position={[1.61, ROOM_FLOOR, 7]} object={model.scene} /> */}
            <RoomModel position={[1.61, ROOM_FLOOR, 4]} />
            {/* <RoomModel position={[1.3, ROOM_FLOOR, 4]} /> */}
            <pointLight position={[-30, -30, 10]} />
        </React.Suspense>
    )
}

interface SceneElementMeshProps {
    sceneElement: SceneElement,
    onClick: () => undefined
}


function SceneElementMesh({ sceneElement, onClick }: SceneElementMeshProps) {
    const { size, viewport } = useThree()

    const [springProps, setSpringProps] = useSpring(() => ({ config: { friction: 10 } }))
    const [meshProps, setMeshProps] = useState<any>({
        position: sceneElement.position
    })
    const aspect = size.width / viewport.width
    const gestureProps = useGesture({
        onDrag,
        // onHover
    })

    function onDrag({ offset: [x, y] }: { offset: [number, number] }) {
        setMeshProps({ ...meshProps, position: [x / aspect, ROOM_FLOOR, y / aspect], })
    }

    // function onHover({ hovering }: { hovering: boolean }) {

    // }
    return <ElementMesh
        key={sceneElement.id}
        element={sceneElement.element}
        meshProps={{
            ...springProps,
            ...meshProps,
            ...gestureProps(),
        }}
    />
}


interface SceneComponentProps {
    sceneElements: SceneElement[],
    onSelect: () => undefined,
}

function SceneComponent({ sceneElements, onSelect }: SceneComponentProps) {
    return (
        <div className="scene-container">
            <Canvas>
                <PresentationControls
                    // vertical limits
                    polar={[0, 0]}
                    // horizontal limits
                    azimuth={[-Math.PI / 5, Math.PI / 5]}
                    enabled={false}
                >
                    <Room />
                    {sceneElements.map(sceneElement => <SceneElementMesh sceneElement={sceneElement} onClick={onSelect} />)}
                </PresentationControls >
            </Canvas>

        </div>
    )
}

export default SceneComponent
