export interface Word {
  word: string;
  phonetic: string;
  phonetics: Phonetic[];
  origin: string;
  meanings: Meaning[];
}

export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

export interface Definition {
  definition: string;
  example: string;
  synonyms: any[];
  antonyms: any[];
}

export interface Phonetic {
  text: string;
  audio?: string;
}

function displayWord(item: Word) {
  const word = document.getElementById("word") as HTMLElement;
  const pronounce = document.getElementById("pronounce") as HTMLElement;

  pronounce.innerText = item.phonetic;
  word.innerText = item.word;
}

export function hydrateWordInformation(data: Word[]) {
  const word = data[0];

  displayWord(word);
}
