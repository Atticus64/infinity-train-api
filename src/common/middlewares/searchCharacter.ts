import { Character } from "$/routes/characters/entities/character.entity.ts";

const searchCharacter = (characters: Character[], query: string | number) => {
  const character = characters.find((c) => {
    const name = c.name?.toLowerCase();
    return name.includes(query as string);
  });

  return character;
};

const searchCharacterByIndex = (characters: Character[], index: number) => {
  if (index === 0) return;

  const id = index - 1;
  console.log(id);

  const character = characters.at(id);
  console.log(character);

  return character;
};

export { searchCharacter, searchCharacterByIndex };
