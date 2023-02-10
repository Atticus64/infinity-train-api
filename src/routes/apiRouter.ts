import { Context, Hono } from "hono";
import { Endpoints } from "$/common/interfaces/url.ts";

const apiRouter = new Hono();

export const prodUrl = "https://the-infinity-train-api.deno.dev/api";

const urls = {
  characters: `${prodUrl}/characters`,
  seasons: `${prodUrl}/seasons`,
  eastereggs: `${prodUrl}/eastereggs`,
} satisfies Endpoints;

apiRouter.get("/", (c: Context) => {
  c.pretty(true);
  return c.json(urls);
});

export default apiRouter;
