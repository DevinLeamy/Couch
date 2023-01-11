import { Euler } from "three"
import { v4 as generateUUID } from "uuid"

import { Model } from "./common"
import { ChairModel, CouchModel, TableModel, LampModel, TVModel } from "./gltfjsx"

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
    },
    {
        id: generateUUID(),
        name: "Table",
        component: TableModel,
        scale: 1.3,
        rotation: new Euler(0, 0.5 * Math.PI, 0)
    },
    {
        id: generateUUID(),
        name: "Lamp",
        component: LampModel,
        scale: 0.5,
        rotation: new Euler(0, 0, 0)
    },
    {
        id: generateUUID(),
        name: "TV",
        component: TVModel,
        scale: 0.5,
        rotation: new Euler(0, 1.5 * Math.PI, 0)
    },

]
