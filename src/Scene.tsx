import { Canvas, useLoader, useThree } from "@react-three/fiber"
import React, { useRef, useState } from "react"
import { Color, Euler } from "three"
import { PresentationControls } from "@react-three/drei"
import { useGesture } from "@use-gesture/react"

import { SceneElement, ElementMesh, ROOM_FLOOR } from "./common"
import { RoomModel } from "./gltfjsx/Room"


const Room = () => {
    return (
        <React.Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <RoomModel position={[1.61, ROOM_FLOOR, 4]} />
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
    })

    function onDrag({ offset: [x, y] }: any) {
        setMeshProps({ ...meshProps, position: [x / aspect, ROOM_FLOOR, y / aspect], })
    }

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
