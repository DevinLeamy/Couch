import React, { useRef, useState } from 'react'

import Header from "./Header"
import UI from "./UI"
import Scene from "./Scene"
import { Element } from "./common"


function App() {
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
            <Header />
            <Scene
                elements={sceneElements}
                onSelect={() => undefined}
            />
            <UI
                addElement={onAddElement}
                selectElement={onSelectElement}
            />
        </div>
    )
}


export default App
