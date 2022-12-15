import { Router } from 'oak';
import { urlEastereggs } from '../url.ts';
import easterData from '../data/eastereggs.json' assert { type: "json" }

const easterRouter = new Router();

easterRouter.get(urlEastereggs, (ctx) => {
  ctx.response.body = easterData
})



export default easterRouter