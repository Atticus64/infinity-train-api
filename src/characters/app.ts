import { Router } from "oak";

import { urlCharacters } from '../url.ts'
import charactersJson from '../data/characters.json' assert { type: "json" }

const charachersRouter = new Router();

charachersRouter.get(urlCharacters, (ctx) => {
  ctx.response.body = charactersJson
})


export default charachersRouter