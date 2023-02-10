import app from "$/main.ts";
import { assertEquals } from "testing";
import { prodUrl } from "$/routes/apiRouter.ts";

Deno.test("Test api/test endpoint should return string", async () => {
  const data = {
    "msg": "Hola Infinity Train 🚂 🐢",
  };

  const res = await app.request("http://localhost:8000/api/test");
  const json = await res.json();
  assertEquals<number>(res.status, 200);
  assertEquals(json, data);
});

Deno.test("Test api/ must return array of strings", async () => {
  const urls = {
    characters: `${prodUrl}/characters`,
    seasons: `${prodUrl}/seasons`,
    eastereggs: `${prodUrl}/eastereggs`,
  };
  const res = await app.request("http://localhost:8000/api");
  const json = await res.json();

  assertEquals(res.status, 200);
  assertEquals(json, urls);
});
