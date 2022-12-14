import { Router } from "oak";

import { urlCharacters } from '../url.ts'

const charachersRouter = new Router();

charachersRouter.get( urlCharacters, ( ctx ) => {
    ctx.response.body = 'Hola!!! characters'
})


export default charachersRouter