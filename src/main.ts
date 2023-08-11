import { Hono } from "hono/mod.ts";
import { cors, logger, serveStatic, prettyJSON } from "hono/middleware.ts";
import apiRouter from "./routes/apiRouter.ts";


const app = new Hono();

// middlewares
app.use(cors());

app.use(prettyJSON());

app.use(logger());

// import routes
app.route("/api", apiRouter);

// static route
app.get("/*", serveStatic({ root: "./static" }));

app.get("/", (c) => c.redirect("/app"));

// 404 route
app.notFound((c) => {
  const { pathname } = new URL(c.req.url);

  if (c.req.url.at(-1) === "/") {
    return c.redirect(pathname.slice(0, -1));
  }

  return c.json({
    msg: "404 not found",
    suggestion: "try go to /api",
  }, 404);
});

// start server
if (import.meta.main) Deno.serve(app.fetch);

export default app;
