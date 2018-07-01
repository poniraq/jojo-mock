import express = require('express')
import { Application, Router } from 'express'

import { ProxyRouter, ProxyConfig } from './proxy'
import { DatabaseRouter, DatabaseConfig } from './db'
import { ApiRouter, ApiConfig } from './api'
import { StaticRouter, StaticConfig } from './static'

interface MockConfig {
    api?: ApiConfig
    database?: DatabaseConfig
    proxy?: ProxyConfig
    static?: StaticConfig
}

type ConfigType = 'proxy' | 'api' | 'database' | 'static'
const routerMap = {
    proxy: ProxyRouter,
    api: ApiRouter,
    database: DatabaseRouter,
    static: StaticRouter
}

const MockServer = function(config: MockConfig): Application {
    const app: Application = express()
    let configs: any[] = [];
    
    let type: ConfigType
    for (type in config) {
        if (config.hasOwnProperty(type)) {
            let conf = config[type];
            let item = conf && {
                priority: conf.priority || 0,
                type: type,
                config: conf,
                router: routerMap[type]
            };
            
            if (conf) {
                configs.push({
                    priority: conf.priority || 0,
                    type: type,
                    config: conf,
                    router: routerMap[type]
                });
            }
        }
    }

    configs.sort((a, b) => a.priority > b.priority ? 1 : (a.priority === b.priority ? 0 : -1))
    
    for (const item of configs) {
        app.use(item.router(item.config))
    }

    return app
}

export {
    ProxyRouter,
    DatabaseRouter,
    ApiRouter,

    MockConfig,
    MockServer,
    MockServer as default
}