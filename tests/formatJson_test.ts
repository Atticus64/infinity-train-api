import { superoak } from "superoak";
import { testing } from "oak";
import { assertEquals } from "testing";

import app from "$/app.ts";
import { formatJson } from "$/utils/formatJson.ts";
import charactersJson from "$/data/characters.json" assert { type: "json" };
import { Data } from '$/utils/formatJson.ts';

Deno.test("If the url have pretty must return json formatted", async () => {
  const request = await superoak(app);

  const url = "/api/characters?pretty";

  const resp = await request.get(url).expect(200);

  const ctx = testing.createMockContext({
    path: url,
  });

  assertEquals<string | Data>(resp.text, formatJson(ctx, charactersJson));
});

Deno.test("If the url doesn't have pretty return normal json", async () => {
  const request = await superoak(app);

  const url = "/api/characters";

  const resp = await request.get(url).expect(200);

  const ctx = testing.createMockContext({
    path: url,
  });

  const json = formatJson(ctx, charactersJson);

  assertEquals<string>(resp.text, JSON.stringify(json));
});

Deno.test("formatJson with pretty must return json with pretty format", () => {
  const data = {
    name: "Alex",
    species: "Human",
    location: "California",
    gender: "male",
    alive: true,
  };

  const url = "/data/person?pretty";

  const ctx = testing.createMockContext({
    path: url,
  });

  const formatData = JSON.stringify(data, null, 2);

  assertEquals<Data | string>(formatData, formatJson(ctx, data));
});

Deno.test("formatJson without pretty must return raw json", () => {
  const data = {
    name: "Alex",
    species: "Human",
    location: "California",
    gender: "male",
    alive: true,
  };

  const url = "/data/person";

  const ctx = testing.createMockContext({
    path: url,
  });

  assertEquals<Data | string>(formatJson(ctx, data), data);
});
