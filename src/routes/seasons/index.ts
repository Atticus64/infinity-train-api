import { Hono } from "hono/mod.ts";
import seasonsJson from "../../data/seasons.json" assert { type: "json" };

const seasonsRouter = new Hono();

seasonsRouter.get("/", (c) => {
  return c.json(seasonsJson);
});

export default seasonsRouter;
