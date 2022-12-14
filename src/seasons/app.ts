import { Router } from 'oak';
import { urlSeasons } from '../url.ts';

const seasonsRouter = new Router();

seasonsRouter.get(urlSeasons, ( ctx ) => {
    ctx.response.body = 'Hola Seasons'
})



export default seasonsRouter