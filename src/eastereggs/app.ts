import { Router } from 'oak';
import { urlEastereggs } from '../url.ts';

const easterRouter = new Router();

easterRouter.get(urlEastereggs, ( ctx ) => {
    ctx.response.body = 'Hola Easteregg'
})



export default easterRouter