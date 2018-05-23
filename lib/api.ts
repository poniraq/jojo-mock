import { Router } from 'express';

export interface ApiConfig {
    path: string
    routers: Router[]
}

export const ApiRouter = function (config: ApiConfig): Router {
    const router: Router = Router()

    for (const router of config.routers) {
        router.use(config.path, router)
    }

    return router
}

export default ApiRouter