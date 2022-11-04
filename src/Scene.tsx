import { Canvas, useLoader } from "@react-three/fiber"
import React, { useRef, useState } from "react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

import { Element, ElementMesh, RoomModel } from "./common"

const ROOM_CENTER_X = 0
const ROOM_FLOOR = -2.3
const ROOM_CENTER_Z = 0

const Room = () => {
    const model = useLoader(GLTFLoader, RoomModel)
    return (
        <React.Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <primitive position={[1.5, ROOM_FLOOR, 7]} object={model.scene} />
            <pointLight position={[-30, -30, 10]} />
        </React.Suspense>
    )
}

interface SceneComponentProps {
    elements: Element[],
    onSelect: () => undefined,
}

const Test = ({ element }: { element: Element }) => {
    const [test, setTest] = useState(false)

    return (
        <div key={element.id}>
            <h1>{element.id}</h1>
        </div>
    )
}

const SceneComponent = ({ elements, onSelect }: SceneComponentProps) => {
    return (
        <div className="scene-container">
            <Canvas>
                <Room />
                {elements.map(element => <ElementMesh element={element} onClick={onSelect} />)}
            </Canvas>

        </div>
    )
}

export default SceneComponent
