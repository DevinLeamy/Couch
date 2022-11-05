import { Canvas, useLoader } from "@react-three/fiber"
import React, { useRef, useState } from "react"
import { Euler } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { FlyControls, PerspectiveCamera, PresentationControls } from "@react-three/drei"

import { Element, SceneElement, ElementMesh, ROOM_FLOOR } from "./common"


const Room = () => {
    const model = useLoader(GLTFLoader, "/room.glb")
    return (
        <React.Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <primitive position={[1.61, ROOM_FLOOR, 7]} object={model.scene} />
            <pointLight position={[-30, -30, 10]} />
        </React.Suspense>
    )
}


interface SceneComponentProps {
    sceneElements: SceneElement[],
    onSelect: () => undefined,
}

function SceneComponent({ sceneElements, onSelect }: SceneComponentProps) {
    const cameraRef = useRef()
    const [viewRotationY, setViewRotationY] = useState<number>(0)
    interface SceneElementMeshProps {
        sceneElement: SceneElement,
        onClick: () => undefined
    }


    function SceneElementMesh({ sceneElement, onClick }: SceneElementMeshProps) {
        return <ElementMesh
            element={sceneElement.element}
            onClick={onClick}
            position={sceneElement.position}
        />
    }

    return (
        <div className="scene-container">
            <Canvas>
                <PresentationControls
                    // vertical limits
                    polar={[0, 0]}
                    // horizontal limits
                    azimuth={[-Math.PI / 5, Math.PI / 5]}
                >
                    <Room />
                    {sceneElements.map(sceneElement => <SceneElementMesh sceneElement={sceneElement} onClick={onSelect} />)}
                </PresentationControls >
            </Canvas>

        </div>
    )
}

export default SceneComponent
