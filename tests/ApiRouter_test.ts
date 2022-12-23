import { superoak } from "superoak";
import app from "$/app.ts";
import { prodUrl } from "../src/apiRouter.ts";

Deno.test("Test api/test endpoint should return string", async () => {
  const request = await superoak(app);
  const expectedJson = {
    "msg": "Hola Infinity Train 🚂 🐢",
  };
  await request.get("/api/test").expect(200).expect(expectedJson);
});

Deno.test("Test api/ must return array of strings", async () => {
  const request = await superoak(app);
  const urls = {
    characters: `${prodUrl}/characters`,
    seasons: `${prodUrl}/seasons`,
    eastereggs: `${prodUrl}/eastereggs`,
  };
  await request.get("/api/").expect(200).expect(urls);
});
