import { Hono } from "hono";
import { get_character, get_characters } from "./characters.controller.ts";

const charactersRouter = new Hono();

charactersRouter.get("/", get_characters);

charactersRouter.get("/:query", (c) => {
  return get_character(c);
});

export default charactersRouter;
