import { Hono } from "hono";
import { serve } from "std/http/server.ts";
import { cors, logger, prettyJSON, serveStatic } from "hono_middleware";
import apiRouter from "./routes/apiRouter.ts";
import charactersRouter from "./routes/characters/index.ts";
import { formatJson } from "./common/middlewares/index.ts";
import easterRouter from "./routes/eastereggs/index.ts";
import seasonsRouter from "./routes/seasons/index.ts";

const app = new Hono();

// middlewares
app.use(cors({
  origin: "*",
}));

app.use("*", prettyJSON());

app.use("*", logger());

app.use("/api/*", async (c, next) => {
  formatJson(c);
  await next();
});

// import routes
app.route("/api", apiRouter);
app.route("/api/characters", charactersRouter);
app.route("/api/eastereggs", easterRouter);
app.route("/api/seasons", seasonsRouter);

// static route
app.get("/*", serveStatic({ root: "./static" }));

app.get("/", (c) => c.redirect("/app"));

// 404 route
app.get("*", (c) => {
  return c.json({
    msg: "404 not found",
    suggestion: "try go to /api",
  }, 404);
});

// start server
if (import.meta.main) await serve(app.fetch);
