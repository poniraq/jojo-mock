import express = require('express')
import { Router } from 'express'

export interface StaticConfig {
    path: string
    dir: string

    priority?: number
}

export const StaticRouter = function (config: StaticConfig | StaticConfig[]): Router {
    const router = Router()

    if (!Array.isArray(config)) {
        config = []
    }

    for (const staticConfig of config) {
        router.use(staticConfig.path, express.static(staticConfig.dir))
    }

    return router
}

export default StaticConfig