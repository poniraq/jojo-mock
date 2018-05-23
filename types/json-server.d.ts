declare module 'json-server' {
    import * as express from 'express'
    
    export function router(data: string | JSON): express.Router
}
