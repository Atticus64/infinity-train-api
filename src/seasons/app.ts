import { Router } from 'oak';
import { urlSeasons } from '../url.ts';

import seasonsJson from '../data/seasons.json' assert { type: "json" }

const seasonsRouter = new Router();

seasonsRouter.get(urlSeasons, (ctx) => {
  ctx.response.body = seasonsJson
})



export default seasonsRouter