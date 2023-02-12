import { Context, Hono } from "hono";
import { Endpoints } from "$/common/interfaces/url.ts";
import charactersRouter from "./characters/index.ts";
import easterRouter from "./eastereggs/index.ts";
import seasonsRouter from "./seasons/index.ts";
import { formatJson } from "../common/middlewares/formatJson.ts";

const apiRouter = new Hono();

export const prodUrl = "https://the-infinity-train-api.deno.dev/api";

// use middlewares
apiRouter.use("/*", async (c, next) => {
  formatJson(c);
  await next();
});

// import routes
apiRouter.route("/characters", charactersRouter);
apiRouter.route("/eastereggs", easterRouter);
apiRouter.route("/seasons", seasonsRouter);

const urls = {
  characters: `${prodUrl}/characters`,
  seasons: `${prodUrl}/seasons`,
  eastereggs: `${prodUrl}/eastereggs`,
} satisfies Endpoints;

apiRouter.get("/test", (c: Context) => {
  return c.json({
    msg: "Hola Infinity Train 🚂 🐢",
  });
});

apiRouter.get("/", (c: Context) => {
  c.pretty(true);
  return c.json(urls);
});

apiRouter.get("/test", (c: Context) => {
  c.pretty(true);
  return c.json({
    msg: "Hola Infinity Train 🚂 🐢",
  });
});

export default apiRouter;
