import { Context } from "oak"
import { Endpoints } from '$/url.ts';
import { Character, Characters } from '$/characters/character.ts';
import Easteregg from '$/eastereggs/Easteregg.ts';
import { Season, Seasons } from '$/seasons/Season.ts';

export type Data = Endpoints | Characters | Character | Easteregg | Season | Seasons;

const formatJson = (ctx: Context, data: Data) => {

  if (!ctx.request.url.searchParams.has('pretty')) return data

  const prettyJson = JSON.stringify(data, null, 2)

  return prettyJson
}



export {
  formatJson
}