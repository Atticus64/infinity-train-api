import app from "$/app.ts";
import { superoak } from "superoak";
import { assertEquals } from "testing";

Deno.test("If url dont exist must return 404", async () => {
  const request = await superoak(app);

  const resp = await request.get("/no-exist").expect(404);

  const errorMsg = { msg: "404 not found", suggestion: "try go to /api" };

  assertEquals(errorMsg, resp.body);
});
