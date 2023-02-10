import { Hono } from "hono";
import { serve } from "std/http/server.ts";
import { cors, logger, serveStatic } from "hono_middleware";
import apiRouter from "./routes/apiRouter.ts";

const app = new Hono();

// middlewares
app.use(cors({
  origin: "*",
}));
app.use("*", logger());

// import routes
app.route("/api", apiRouter);

// serve static files
app.use("/*", serveStatic({ root: "./public" }));

// 404 route
app.notFound((c) =>
  c.json({ msg: "404 not found", suggestion: "try go to /api" }, 404)
);

// start server
if (import.meta.main) await serve(app.fetch);
