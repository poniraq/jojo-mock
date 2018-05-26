import express = require('express')
import { Application } from 'express';

import { ProxyRouter, ProxyConfig } from './proxy'
import { DatabaseRouter, DatabaseConfig } from './db'
import { ApiRouter, ApiConfig } from './api'
import { StaticRouter, StaticConfig } from './static';

interface MockConfig {
    api?: ApiConfig
    database?: DatabaseConfig
    proxy?: ProxyConfig
    static?: StaticConfig
}

const MockServer = function(config: MockConfig): Application {
    const app: Application = express()

    if (config.proxy) {
        app.use(ProxyRouter(config.proxy))
    }
    if (config.api) {
        app.use(ApiRouter(config.api))
    }
    if (config.database) {
        app.use(DatabaseRouter(config.database))
    }
    if (config.static) {
        app.use(StaticRouter(config.static))
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
};