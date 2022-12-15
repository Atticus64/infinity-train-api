import { Character } from './character.ts';

const searchCharacter = ( characters: Character[], name: string ): Character | undefined => {
    return characters.find( c => {
        const query = c.name?.toLowerCase()
        return query.includes(name)
    })
    
}

export default searchCharacter
