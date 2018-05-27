import { Router } from 'express';

export interface ApiConfig {
    path: string
    routers: Router[]
}

export const ApiRouter = function (config: ApiConfig): Router {
    const apiRouter: Router = Router()

    for (const router of config.routers) {
        apiRouter.use(config.path, router)
    }

    return apiRouter
}

export default ApiRouter