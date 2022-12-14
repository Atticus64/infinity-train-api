import { Application, Context } from "oak";

const app = new Application();
const port = 3000;

app.use((ctx: Context) => {
  ctx.response.body = "Hola Infinity Train 🚂 🐈‍⬛";
});

console.log(`Server running in http://localhost:${port} 🦍`);

await app.listen({ port });
