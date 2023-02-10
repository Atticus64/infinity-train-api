import { Hono } from "hono";
import { serve } from "std/http/server.ts";
import { cors, logger, prettyJSON, serveStatic } from "hono_middleware";
import apiRouter from "./routes/apiRouter.ts";

const app = new Hono();

// middlewares
app.use(cors({
  origin: "*",
}));

app.use("*", prettyJSON());

app.use("*", logger());

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
if (import.meta.main) await serve(app.fetch);

export default app;
