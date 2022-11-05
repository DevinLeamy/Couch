import { Euler } from "three"
import { v4 as generateUUID } from "uuid"

import { Element, Model } from "./common"

export const SceneData: Element[] = [

]

export const ModelData: Model[] = [
    {
        id: generateUUID(),
        name: "Chair",
        path: "/chair.gltf",
        scale: 1,
        rotation: new Euler(0, 0, 0)
    },
    {
        id: generateUUID(),
        name: "Couch",
        path: "couch.glb",
        scale: 1,
        rotation: new Euler(0, 1.5 * Math.PI, 0)
    }
]
