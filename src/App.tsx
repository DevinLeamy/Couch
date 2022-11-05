import React from 'react'

import UI from "./UI"
import Scene from "./Scene"
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
