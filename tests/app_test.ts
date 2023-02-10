import app from "$/main.ts";
import { assertEquals } from "testing";

Deno.test("If url dont exist must return 404", async () => {
  const res = await app.request("http://localhost:8000/no-exist");
  const json = await res.json();

  const errorMsg = { msg: "404 not found", suggestion: "try go to /api" };

  assertEquals(json, errorMsg);
});
