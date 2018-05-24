import { Router } from 'express'
const requestProxy = require('express-request-proxy')

export interface ProxyConfig {
    enable: boolean
    host: string
    
    routes: {
        url: string
        options?: Object
    }[]
}


export const ProxyRouter = function(config: ProxyConfig): Router {
    const router = Router()

    if (config.enable) {
        const { host, routes } = config

        for (const route of routes) {
            let routeConfig = {
                url: host + route.url,
                ...route.options
            }

            router.all(route.url, requestProxy(routeConfig))
        }
    }

    return router
}

export default ProxyRouter