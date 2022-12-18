import { Application, Router, Context } from "oak";

import { apiRouter } from '$/apiRouter.ts'

const app = new Application();
const port = 8000;

app.use((ctx, next) => {
  ctx.response.headers.set('Access-Control-Allow-Origin', '*')
  return next()
})

const rootRouter = new Router();

rootRouter.get("/", (ctx: Context) => {
  ctx.response.body = "Hola Infinity Train 🚂 🐢";
})

app.use(rootRouter.routes())

app.use(apiRouter.routes())

app.use((ctx) => {
  ctx.response.body = "404 not found"
  ctx.response.status = 404
})

console.log(`Server running in http://localhost:${port} 🦍`);

await app.listen({ port });
