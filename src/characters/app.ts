import { Router } from "oak";

import { urlCharacters } from '../url.ts'
import charactersJson from '../data/characters.json' assert { type: "json" }
import searchCharacter from './searchCharacter.ts';

const charachersRouter = new Router();
const characters = charactersJson.characters

charachersRouter.get(urlCharacters, (ctx) => {
  ctx.response.body = charactersJson
})

charachersRouter.get(`${urlCharacters}/:name`, (ctx) => {

  const name = ctx.params.name
  const character = searchCharacter(characters, name)
  
  if ( !character ) {
    ctx.response.body = 'Not found character 404'
    ctx.response.status = 404
    // ctx.response.status = 404
    return 'Not found'
  }

  ctx.response.body = character
})


export default charachersRouter