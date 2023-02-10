import { Context, Hono } from "hono";
import { serve } from "std/http/server.ts";
import { cors, logger } from "hono_middleware";
import apiRouter from "./routes/apiRouter.ts";
import charactersRouter from "./routes/characters/index.ts";
import { formatJson } from "./common/middlewares/index.ts";

const app = new Hono();

// middlewares
app.use(cors({
  origin: "*",
}));
app.use("*", logger());

app.use("/api/*", async (c, next) => {
  formatJson(c);
  await next();
});

// import routes
app.route(
  "/api",
  apiRouter,
);
app.route(
  "/api/characters",
  charactersRouter,
);

// root route
app.get("/", (c: Context) => {
  return c.text("Hello World!");
});

// 404 route
app.get("*", (c) => {
  return c.json({
    msg: "404 not found",
    suggestion: "try go to /api",
  }, 404);
});

// start server
if (import.meta.main) await serve(app.fetch);
