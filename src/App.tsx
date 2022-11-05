import React, { useState } from 'react'

import UI from "./UI"
import Scene from "./Scene"
import { Element, SceneElement } from "./common"
import { generateRandomScene, getSceneElementFromElement } from "./utils"

function App() {
    const [sceneElements, setSceneElements] = useState<SceneElement[]>(generateRandomScene())

    function onAddElement(newElement: Element) {
        const sceneElement = getSceneElementFromElement(newElement)
        sceneElement.selected = true

        setSceneElements([...sceneElements, sceneElement])
    }

    function onSelectElement(element: Element) {
        console.log("Selected a new element")
    }

    return (
        <div className="app-container">
            <Scene
                sceneElements={sceneElements}
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
