import React, { useRef, useState, createContext } from 'react'
import { useLoader } from "@react-three/fiber"

// import Header from "./Header"
import UI from "./UI"
import Scene from "./Scene"
import { Element, ChairModel } from "./common"
import { ObjectMap } from '@react-three/fiber';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface MainContextInterface {
    models: Map<string, GLTF & ObjectMap>
}

export const MainContext = createContext<MainContextInterface | null>(null);

function App() {
    const chairModel = useLoader(GLTFLoader, ChairModel)

    const [sceneElements, setSceneElements] = useState<Element[]>([])
    const [selectedElement, setSelectedElement] = useState<Element>()

    function onAddElement(newElement: Element) {
        newElement.selected = true

        setSceneElements([...sceneElements, newElement])
    }

    function onSelectElement(element: Element) {
        console.log("Selected a new element")
    }

    return (
        <div className="app-container">
            {/* <Header /> */}
            <MainContext.Provider
                value={{
                    models: new Map<string, GLTF & ObjectMap>([
                        [ChairModel, chairModel]
                    ])
                }}
            >
                <Scene
                    elements={sceneElements}
                    onSelect={() => undefined}
                />
                <UI
                    addElement={onAddElement}
                    selectElement={onSelectElement}
                />
            </ MainContext.Provider>
        </div>
    )
}


export default App
