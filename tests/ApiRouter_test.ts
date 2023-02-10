import { assertEquals } from "std/testing/asserts.ts";
import { Hono } from "hono";
import { prodUrl } from "../src/routes/apiRouter.ts";

Deno.test("Test api/test endpoint should return string", async () => {
  const app = new Hono();

  const json = {
    msg: "Hola Infinity Train 🚂 🐢",
  };

  app.get("/api/test", (c) => {
    c.pretty(true);
    return c.json({
      msg: "Hola Infinity Train 🚂 🐢",
    });
  });

  const res = await app.request("http://localhost:8000/api/test");
  const body = await res.json();

  assertEquals(body, json);
});

Deno.test("Test api/ must return array of strings", async () => {
  const app = new Hono();

  const urls = {
    characters: `${prodUrl}/characters`,
    seasons: `${prodUrl}/seasons`,
    eastereggs: `${prodUrl}/eastereggs`,
  };

  app.get("/api", (c) => {
    c.pretty(true);
    return c.json({
      eastereggs: `${prodUrl}/eastereggs`,
      seasons: `${prodUrl}/seasons`,
      characters: `${prodUrl}/characters`,
    });
  });

  const res = await app.request("http://localhost:8000/api");
  const body = await res.json();
  assertEquals(body, urls);
});
