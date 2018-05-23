import express = require('express')
import { Application } from 'express';

import { ProxyRouter, ProxyConfig } from './proxy'
import { DatabaseRouter, DatabaseConfig } from './db'
import { ApiRouter, ApiConfig } from './api'

interface MockConfig {
    api?: ApiConfig
    database?: DatabaseConfig
    proxy?: ProxyConfig
}

const MockServer = function(config: MockConfig): Application {
    const app: Application = express()

    if (config.api) {
        app.use(ApiRouter(config.api))
    }
    if (config.database) {
        app.use(DatabaseRouter(config.database))
    }
    if (config.proxy) {
        app.use(ProxyRouter(config.proxy))
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