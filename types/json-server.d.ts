declare module 'json-server' {
    import { lowdb } from 'lowdb'
    import * as express from 'express'

    export interface JsonRouter extends express.Router {
        db: lowdb;
    }
    
    export function router(data: string | JSON): JsonRouter;
}
