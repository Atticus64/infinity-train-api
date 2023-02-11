import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";

const characters = [
  "Alan Dracula",
  "Alex",
  "Aloysius",
  "Alrick Timmens",
  "Amelia Hughes",
  "Andy Olsen",
  "Ant Blacksmith",
  "Atticus",
  "Ballerina Kids",
  "Beehive",
  "Beetle Bailiff",
  "Ben Greene",
  "Brando",
  "Bug Cowboys",
  "Building Man",
  "Building People",
  "Candy Girl",
  "Carrot People",
  "Chandelier",
  "Concession People",
  "Concession Stand Monster",
  "Corginian Corgis",
  "Cow Creamer",
  "Crochet People",
  "Cross-Eyed Ducks",
  "Cubey Denizens",
  "Danny Nougat",
  "Danny Nougat's daughter",
  "Denizens",
  "Docent",
  "Driveway",
  "Floating Jellyfish",
  "Flying Snakes",
  "Frank",
  "Fyodor",
  "Ghoms",
  "Giant",
  "Grace Monroe",
  "Grace's babysitters",
  "Grace's Father",
  "Grace's Mother",
  "Grasshopper",
  "Greige",
  "Hazel",
  "Hill Man",
  "Horace",
  "Hot Dog",
  "Insect Denizens",
  "Jeremy Bradford",
  "Jesse Cosay",
  "Jesse's Father",
  "Jesse's Friends",
  "Jesse's Mother",
  "Joe",
  "Judge Morpho",
  "Kaiju Monsters",
  "Kevin",
  "Kez",
  "Khaki Bottoms",
  "Lake",
  "Lava Mole",
  "Lindsay",
  "Linnette Ramsey-Wilkinson",
  "Louise",
  "Lucy",
  "Mace",
  "Mail Lady",
  "Mantis",
  "Marcel",
  "Masked Monsters",
  "Megan Olsen",
  "Mermaids",
  "Messenger Corgi",
  "Mikayla",
  "Mildred the Tyrannosaur",
  "Min-Gi Park",
  "Min-Gi's Father",
  "Min-Gi's Mother",
  "Minor Characters",
  "Mirror Atticus",
  "Mirror Medics",
  "Mirror One",
  "Morgan",
  "Mrs. Graham",
  "Musical Denizens",
  "Nacho Girl",
  "Nancy",
  "Nate Cosay",
  "Nigel",
  "Octopus People",
  "One-One",
  "Origami Birds",
  "Paco",
  "Parka Denizens",
  "Passengers",
  "Pencil People",
  "Perry",
  "Pig Baby",
  "Popcorn Girl",
  "Porters",
  "Rabbit Dwarfs",
  "Randall",
  "Roy",
  "Ryan Akagi",
  "Ryan's Ex-Girlfriends",
  "Ryan's Father",
  "Ryan's Mother",
  "Ryan's Siblings",
  "Sashay",
  "Sea Serpent",
  "Sieve",
  "Simon Laurent",
  "Slug People",
  "Soda Girl",
  "Spiceman",
  "Spotlight",
  "Steward",
  "Terrance",
  "The Apex",
  "The Cat",
  "Tiny Wizards",
  "Todd",
  "Tuba",
  "Tulip Olsen",
  "Turtle People",
  "Ugly Irwin",
];

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
