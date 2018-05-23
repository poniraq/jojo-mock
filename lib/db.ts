import JsonServer = require('json-server')
import { Router } from 'express'
import * as path from 'path'

export interface DatabaseConfig {
    path: string
    data: string | JSON
}

export const DatabaseRouter = function (config: DatabaseConfig | DatabaseConfig[]): Router {
    const router = Router()

    if (!Array.isArray(config)) {
        config = [config]
    }

    for (const dbconfig of config) {
        router.use(
            path.resolve(__dirname, dbconfig.path),
            JsonServer.router(dbconfig.data)
        )
    }

    return router
}

export default DatabaseRouter