import * as cheerio from "npm:cheerio";
import { characters } from "./data/characters.ts";

type getCharactersProps = {
  refetch?: boolean;
};

type ImageLink = {
  name: string;
  image_link: string;
  extension: string;
};

export async function getCharacterImages({
  refetch = false,
}: getCharactersProps): Promise<ImageLink[]> {
  const baseDir = "./src/scraping/characters/data/image_links.json";
  if (!refetch) {
    const data = await Deno.readTextFile(baseDir);

    return JSON.parse(data);
  }

  const imageLinks = [] as ImageLink[];

  for (const c of characters) {
    try {
      const res = await fetch(`https://infinity-train.fandom.com/wiki/${c}`);
      const html = await res.text();

      const $ = cheerio.load(html);

      const figure = $(".pi-item.pi-image");
      const image_link = figure.find("a").attr("href") ?? "";

      const imgName = image_link.split("/")[7];
      console.log({ imgName });
      const extension = imgName.split(".")[imgName.split(".").length - 1];
      console.log({ extension });

      const image = {
        name: c,
        image_link,
        extension,
      };
      imageLinks.push(image);
    } catch (error) {
      console.log(error);
    }
  }

  // write the data to the file system
  await Deno.writeTextFile(baseDir, JSON.stringify(imageLinks, null, 2));

  return imageLinks;
}

type writeImagesCharactersProps = {
  refetch?: boolean;
};

export const writeImagesCharacters = async (
  { refetch = false }: writeImagesCharactersProps,
) => {
  const images = await getCharacterImages({ refetch });
  for (const img of images) {
    try {
      const resp = await fetch(img.image_link);

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
        `./static/img/characters/${img.name}.${img.extension}`,
        imgToUint8,
      );
    } catch (error) {
      console.log(error);
    }
  }
};

await writeImagesCharacters({
  refetch: false,
});
