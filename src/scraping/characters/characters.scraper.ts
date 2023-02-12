import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";
import { character_names as characters } from "./data/characters.ts";

async function scrapeCharacters() {
  const array = [];
  let index = 1;
  for (const c of characters) {
    let url_character;
    if (c.split(" ").length > 1) {
      url_character = c.split(" ").join("_");
    } else {
      url_character = c;
    }

    const res = await fetch(
      `https://infinity-train.fandom.com/wiki/${url_character}`,
    );
    const html = await res.text();

    const $ = cheerio.load(html);

    const name = $(".pi-title").text();
    const name_img = $(".pi-title").text().toLocaleLowerCase().split(" ").join(
      "-",
    );
    const img = `/img/characters/${name_img}.png`;
    let friends: string[] = [];
    const d = $(".pi-data").text().split("\n").join(" ").trim().split("\t")
      .filter(Boolean);
    $("*[data-source='Friends']")
      .children(".pi-data-value")
      .children()
      .each((_i, item) => {
        friends.push($(item).text());
      });
    let enemies: string[] = [];
    $("*[data-source='Enemies']")
      .children(".pi-data-value")
      .children()
      .each((_i, item) => {
        enemies.push($(item).text());
      });

    const realdata = d.filter((d) => d !== " ");

    let flag = 0;
    const data = [];
    let temp: string[] = [];
    data.push(["name", name]);
    data.push(["img", img]);
    realdata.forEach((d) => {
      if (flag === 2) {
        data.push(temp);
        flag = 0;
        temp = [];
      }

      temp.push(d.trim());
      flag++;
    });

    const character = Object.fromEntries(data);

    friends = friends.filter(Boolean);
    enemies = enemies.filter(Boolean);

    character.Friends = friends;

    character.Enemies = enemies;

    array.push(character);
    console.log(`Scrap in clap ${character.name}`);
    if (index === characters.length) {
      console.log("%cEnd scraping", "color: blue");
    }

    index++;
  }

  const path = `${Deno.cwd()}/src/data/characters.json`;

  await Deno.writeTextFile(
    path,
    JSON.stringify(array, null, "\t"),
  );
}

scrapeCharacters();
