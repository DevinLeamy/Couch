import { Euler } from "three"
import { v4 as generateUUID } from "uuid"

import { Element, Model } from "./common"
import { ChairModel, CouchModel } from "./gltfjsx"

export const SceneData: Element[] = [

]

export const ModelData: Model[] = [
    {
        id: generateUUID(),
        name: "Chair",
        component: ChairModel,
        scale: 1,
        rotation: new Euler(0, 0, 0)
    },
    {
        id: generateUUID(),
        name: "Couch",
        component: CouchModel,
        scale: 1,
        rotation: new Euler(0, 1.5 * Math.PI, 0)
    }
]
