import { Context } from "hono/mod.ts";
import { z } from "zod";
import charactersJson from "$/data/characters.json" assert { type: "json" };
import {
  searchCharacter,
  searchCharacterByIndex,
} from "../../common/middlewares/searchCharacter.ts";
import { Character } from "./entities/character.entity.ts";
import { Environment } from "https://deno.land/x/hono@v2.7.7/types.ts";

const characters = charactersJson as Character[];

export const get_characters = (c: Context) => {
  try {
    const { search } = c.req.query();
    if (!search) return c.json(characters);

    console.log({
      search,
    });
    const filteredCharacters = characters.filter((character) => {
      return character.name.toLowerCase().includes(search.toLowerCase());
    });
    return c.json(filteredCharacters);
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
