import { Character } from "./character.ts";

const searchCharacter = (
  characters: Character[],
  query: string | number,
): Character | undefined => {
  const character = characters.find((c) => {
    const name = c.name?.toLowerCase();
    return name.includes(query as string);
  });

  return character;
};

const searchCharacterByIndex = (characters: Character[], index: number) => {
  if (index === 0) return;

  const id = index - 1;

  const character = characters.at(id);

  return character;
};

export { searchCharacter, searchCharacterByIndex };
