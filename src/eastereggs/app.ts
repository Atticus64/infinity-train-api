import { Router } from 'oak';
import { urlEastereggs } from '../url.ts';
import easterData from '../data/eastereggs.json' assert { type: "json" }

const easterRouter = new Router();

easterRouter.get(urlEastereggs, (ctx) => {
  ctx.response.body = easterData
})

easterRouter.get(`${urlEastereggs}/one-one`, (ctx) => {
  ctx.response.body = {
    congratulations: "You discovered a eastearegg 🐢 watch One-One 3d model",
    model: "https://sketchfab.com/3d-models/infinity-train-one-one-097fcb2a99524e389f99115d08d62f8f"
  }
})


export default easterRouter