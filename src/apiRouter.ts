import { Context, Router } from "oak";
import { Endpoints } from './url.ts';
import charachersRouter from './characters/app.ts';
import easterRouter from './eastereggs/app.ts';
import seasonsRouter from "./seasons/app.ts";

const apiRouter = new Router();

const prodUrl = "https://the-infinity-train-api.deno.dev/api"

const urls: Endpoints = {  
  characters: `${prodUrl}/characters`,  
  seasons: `${prodUrl}/seasons`, 
  eastereggs: `${prodUrl}/eastereggs`  
}


apiRouter.get('/api', (ctx: Context): Endpoints => {
  return ctx.response.body = urls
})

apiRouter.use(charachersRouter.routes())

apiRouter.use(easterRouter.routes())

apiRouter.use(seasonsRouter.routes())


export {
  apiRouter
}
