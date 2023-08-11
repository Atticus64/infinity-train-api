import { Context } from "hono/mod.ts";

export const formatJson = (c: Context) => {
  try {
    const isPretty = JSON.parse(c.req.query().pretty);
    c.pretty(isPretty);
  } catch (_) {
    c.pretty(false);
  }
};
