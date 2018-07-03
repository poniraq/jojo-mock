import JsonServer = require('json-server')
import * as _ from 'lodash'

import { lowdb } from 'lowdb'
import { JsonRouter } from 'json-server'
import { Router } from 'express'

export const DatabaseRouter = function (config: DatabaseConfig | DatabaseConfig[]): DbRouter {
    const router = Router() as DbRouter
    let dbs: DatabaseCollection = {}

    if (!Array.isArray(config)) {
        config = [config]
    }

    for (const dbconfig of config) {
        const jsonRouter: JsonRouter = JsonServer.router(dbconfig.data)

        dbs[dbconfig.path] = jsonRouter.db
        router.use(
            dbconfig.path,
            JsonServer.router(dbconfig.data)
        )
    }

    if (_.size(dbs) === 1) {
        router.db = _.values(dbs)[0]
    }
    router.dbs = dbs;

    return router
}
export default DatabaseRouter

export interface DatabaseConfig {
    path: string
    data: string | JSON

    priority?: number
}

export interface DbRouter extends Router {
    db?: lowdb
    dbs: DatabaseCollection
}

export interface DatabaseCollection {
    [path: string]: lowdb
}
