import { Router } from 'oak';
import { urlSeasons } from '../url.ts';

import seasonsJson from '../data/seasons.json' assert { type: "json" }
import { formatJson } from '$/utils/formatJson.ts';

const seasonsRouter = new Router();

seasonsRouter.get(urlSeasons, (ctx) => {
  ctx.response.body = formatJson(ctx, seasonsJson)
})



export default seasonsRouter