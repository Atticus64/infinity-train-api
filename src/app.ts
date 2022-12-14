import { Application, Context } from "oak";

import { apiRouter } from '$/apiRouter.ts'

const app = new Application();
const port = 3000;

app.use(apiRouter.routes())

app.use((ctx: Context) => {
  ctx.response.body = "Hola Infinity Train 🚂 🐢";
});

console.log(`Server running in http://localhost:${port} 🦍`);

await app.listen({ port });
