import { Hono } from "hono";
import { get_characters } from "./characters.controller.ts";

const charactersRouter = new Hono();

charactersRouter.get("/", get_characters);

export default charactersRouter;
