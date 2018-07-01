import JsonServer = require('json-server')
import { Router } from 'express'

export interface DatabaseConfig {
    path: string
    data: string | JSON

    priority?: number
}

export const DatabaseRouter = function (config: DatabaseConfig | DatabaseConfig[]): Router {
    const router = Router()

    if (!Array.isArray(config)) {
        config = [config]
    }

    for (const dbconfig of config) {
        router.use(
            dbconfig.path,
            JsonServer.router(dbconfig.data)
        )
    }

    return router
}

export default DatabaseRouter