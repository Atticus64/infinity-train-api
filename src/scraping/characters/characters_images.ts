import * as cheerio from "npm:cheerio";
import { characters } from "./data/characters.ts";

export async function getCharacterImages() {
  const images = [];

  for (const c of characters) {
    const res = await fetch(`https://infinity-train.fandom.com/wiki/${c}`);
    const html = await res.text();

    const $ = cheerio.load(html);

    const figure = $(".pi-item.pi-image");
    const imageUrl = figure.find("a").attr("href") ?? "";

    const image = {
      name: c,
      imageUrl,
    };
    images.push(image);
  }

  return images;
}

export const writeImagesCharacters = async () => {
  const images = await getCharacterImages();
  for (const img of images) {
    try {
      const resp = await fetch(img.imageUrl);

      // arrayBuffer is a array of bytes - every byte is a number between 0 and 255 and an image is a array of bytes, any file is a array of bytes
      const bytes = await resp.arrayBuffer();

      // convert arrayBuffer to Uint8Array because Deno.writeFile only accepts Uint8Array
      const imgToUint8 = new Uint8Array(bytes);

      // rename the image name
      img.name = img.name.split(" ").join("-").toLowerCase();

      // create inside the static folder a folder called img and inside that folder create a folder called characters if it doesn't exist
      await Deno.mkdir(`./static/img/characters`, { recursive: true });

      // write the image to the file system
      await Deno.writeFile(
        `./static/img/characters/${img.name}.png`,
        imgToUint8,
      );
    } catch (error) {
      console.log(error);
    }
  }
};

writeImagesCharacters();
