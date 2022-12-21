import { Router } from "oak";

import { urlCharacters } from '../url.ts'
import charactersJson from '../data/characters.json' assert { type: "json" }
import { searchCharacter, searchCharacterByIndex } from './searchCharacter.ts';
import { Character } from './character.ts';
import { formatJson } from "$/utils/formatJson.ts";

const charachersRouter = new Router();
const characters = charactersJson.characters

charachersRouter.get(urlCharacters, (ctx) => {
  ctx.response.body = formatJson(ctx, charactersJson)
})

charachersRouter.get(`${urlCharacters}/:query`, (ctx) => {

  const query = ctx.params.query
  let character: Character | undefined;

  if (isNaN(Number(query))) {
    character = searchCharacter(characters, query)
  } else {
    character = searchCharacterByIndex(characters, Number(query))
  }


  if (!character) {
    ctx.response.body = 'Not found character 404'
    ctx.response.status = 404
    // ctx.response.status = 404
    return 'Not found'
  }

  ctx.response.body = formatJson(ctx, character)
})


export default charachersRouter