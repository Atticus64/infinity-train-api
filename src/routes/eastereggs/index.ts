import { Hono } from "hono/mod.ts";
import easterData from "../../data/eastereggs.json" assert { type: "json" };

const easterRouter = new Hono();

easterRouter.get("/", (c) => {
  return c.json(easterData);
});

easterRouter.get(`/one-one`, (c) => {
  return c.json({
    msg: "You discovered a eastearegg 🐢 watch One-One 3d model",
    egg:
      "https://sketchfab.com/3d-models/infinity-train-one-one-097fcb2a99524e389f99115d08d62f8f",
  });
});

export default easterRouter;
