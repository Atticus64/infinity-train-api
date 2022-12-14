import { Context, Router } from "oak";

const apiRouter = new Router();


apiRouter.get('/api', (ctx: Context) => {
  return ctx.response.body = { msg: 'apiRouter' }
})


export default apiRouter
