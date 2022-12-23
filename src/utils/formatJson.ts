import { Context } from "oak";
import { Endpoints } from "$/url.ts";
import { Character, Characters } from "$/characters/character.ts";
import Easteregg from "$/eastereggs/Easteregg.ts";
import { Season, Seasons } from "$/seasons/Season.ts";

export type Data =
  | Endpoints
  | Characters
  | Character
  | Easteregg
  | Season
  | Seasons;


/**
 * Format the json according to the pretty parameter in ctx
 * @param ctx - Context of request
 * @param data - Json to format
 * @returns {Data | string} Json formated 
 */
const formatJson = (ctx: Context, data: Data): string | Data => {
  if (!ctx.request.url.searchParams.has("pretty")) return data;

  const prettyJson = JSON.stringify(data, null, 2);

  return prettyJson;
};

export { formatJson };
