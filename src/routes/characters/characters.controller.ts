import { Context } from "hono";
import charactersJson from "$/data/characters.json" assert { type: "json" };

export const get_characters = (c: Context) => {
  try {
    return c.json(charactersJson);
  } catch (error) {
    return c.json({
      msg: "Error",
      error: error.message,
    }, 400);
  }
};
