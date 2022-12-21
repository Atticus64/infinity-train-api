import { Application, Router, Context, send } from "oak";

import { apiRouter } from '$/apiRouter.ts'

const app = new Application();
const port = 8000;

app.use((ctx, next) => {
  ctx.response.headers.set('Access-Control-Allow-Origin', '*')
  return next()
})

const rootRouter = new Router();

rootRouter.get("/api/test", (ctx: Context) => {
  ctx.response.body = {
    msg: "Hola Infinity Train 🚂 🐢"
  }
})

rootRouter.get("/", async (ctx) => {
  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}`,
    index: 'public/index.html'
  });
})

rootRouter.get('/public/:path+', async (ctx) => {
  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}`,
  });
});

app.use(rootRouter.routes())

app.use(apiRouter.routes())

app.use((ctx) => {
  ctx.response.body = {
    msg: "404 not found",
    suggestion: "try go to /api"
  }
  ctx.response.status = 404
})

console.log(`Server running in http://localhost:${port} 🦍`);

await app.listen({ port });
