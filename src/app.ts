import { Application, Router } from "oak";

import { apiRouter } from '$/apiRouter.ts'

const app = new Application();
const port = 3000;

const rootRouter = new Router();

rootRouter.get("/", (ctx) => {
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
