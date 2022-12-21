import { Router } from 'oak';
import { urlEastereggs } from '../url.ts';
import easterData from '../data/eastereggs.json' assert { type: "json" }
import { formatJson } from '$/utils/formatJson.ts';

const easterRouter = new Router();

easterRouter.get(urlEastereggs, (ctx) => {
  ctx.response.body = formatJson(ctx, easterData)
})

easterRouter.get(`${urlEastereggs}/one-one`, (ctx) => {
  ctx.response.body = {
    msg: "You discovered a eastearegg 🐢 watch One-One 3d model",
    egg: "https://sketchfab.com/3d-models/infinity-train-one-one-097fcb2a99524e389f99115d08d62f8f"
  }
})


export default easterRouter