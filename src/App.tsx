import React, { useState } from 'react'

import UI from "./UI"
import Scene from "./Scene"
import { Element, SceneElement } from "./common"
import { generateRandomScene, getSceneElementFromElement } from "./utils"
import { SceneContextProvider } from "./SceneContext"

function App() {


    return (
        <div className="app-container">
            <SceneContextProvider>
                <Scene />
                <UI />
            </SceneContextProvider>
        </div>
    )
}


export default App
