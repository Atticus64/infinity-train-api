import { Context } from "hono";
import { z } from "zod";
import charactersJson from "$/data/characters.json" assert { type: "json" };
import {
  searchCharacter,
  searchCharacterByIndex,
} from "../../common/middlewares/searchCharacter.ts";
import { Character } from "./entities/character.entity.ts";
import { Environment } from "https://deno.land/x/hono@v2.7.7/types.ts";

const characters: Character[] = charactersJson;

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

export const get_character = (c: Context<"query", Environment, unknown>) => {
  const query = c.req.param("query");
  let character: Character | undefined;

  const stringSchema = z.string();
  const numberSchema = z.number();

  if (numberSchema.safeParse(Number(query)).success) {
    character = searchCharacterByIndex(characters, Number(query));
  } else if (stringSchema.safeParse(query).success) {
    character = searchCharacter(characters, query);
  }

  if (character === undefined) {
    return c.json({
      error: "Not found",
    }, 404);
  }

  return c.json(character);
};
