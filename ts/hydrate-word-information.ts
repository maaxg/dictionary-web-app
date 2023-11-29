export interface Word {
  word: string;
  phonetic: string;
  phonetics: Phonetic[];
  origin: string;
  sourceUrls: string[];
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

function displaySources(sources: string[]) {
  const divider = document.createElement("div");
  divider.classList.add("word-definition-divider");

  const sourceSection = document.getElementById(
    "source-section"
  ) as HTMLElement;

  const sourceTitle = document.createElement("p");
  sourceTitle.classList.add("body-s");
  sourceTitle.innerText = "Sources";

  sourceSection.appendChild(sourceTitle);
  sources.forEach((source) => {
    const sourceItem = document.createElement("a");
    sourceItem.classList.add("body-s");
    sourceItem.classList.add("source-item");

    sourceItem.href = source;
    sourceItem.innerText = source;
    sourceItem.target = "_blank";

    sourceSection.appendChild(sourceItem);
  });
}

function displayMeanings(meanings: Meaning[]) {
  meanings.forEach((meaning) => {
    const meaningSection = document.getElementById(
      "word-definition-section"
    ) as HTMLElement;

    const meaningIndicator = document.createElement("div");
    meaningIndicator.classList.add("word-type-container");

    const meaningIndicatorText = document.createElement("p");
    meaningIndicatorText.classList.add("body-m");
    meaningIndicatorText.style.fontWeight = "bold";

    meaningIndicatorText.innerText = meaning.partOfSpeech;

    const meaningIndicatorDivider = document.createElement("div");
    meaningIndicatorDivider.classList.add("word-definition-divider");

    const meaningList = document.createElement("ul");
    const definitionIndicator = document.createElement("p");
    definitionIndicator.classList.add("body-m");
    definitionIndicator.style.color = "var(--grey)";
    meaningList.appendChild(definitionIndicator);

    const synonymList = document.createElement("ul");
    synonymList.classList.add("synonyms-container");
    const synonymIndicator = document.createElement("p");
    synonymIndicator.classList.add("body-m");
    synonymIndicator.style.color = "var(--grey)";

    synonymList.appendChild(synonymIndicator);

    meaning.definitions.forEach((definition) => {
      const meaningListItem = document.createElement("li");
      meaningListItem.classList.add("body-m");

      const exampleEl = document.createElement("p");

      exampleEl.classList.add("body-m");
      exampleEl.classList.add("example");
      exampleEl.style.color = "var(--grey)";
      exampleEl.innerText = definition.example ? definition.example : "";

      meaningListItem.innerText = definition.definition;

      meaningListItem.appendChild(exampleEl);
      meaningList.appendChild(meaningListItem);

      synonymIndicator.innerHTML = definition.synonyms.length ? "Synonyms" : "";

      definition.synonyms.forEach((synonym) => {
        const synonymItem = document.createElement("li");
        synonymItem.classList.add("body-m");
        synonymItem.classList.add("no-marker");

        synonymItem.innerText = synonym;
        synonymItem.style.color = "var(--purple)";
        synonymItem.style.fontWeight = "bold";

        synonymList.appendChild(synonymItem);
      });

      definition.antonyms.forEach((synonym) => {
        const synonymItem = document.createElement("li");
        synonymItem.classList.add("body-m");
        synonymItem.classList.add("no-marker");

        synonymItem.innerText = synonym;
        synonymItem.style.color = "var(--purple)";
        synonymItem.style.fontWeight = "bold";

        synonymList.appendChild(synonymItem);
      });
    });

    meaningIndicator.appendChild(meaningIndicatorText);
    meaningIndicator.appendChild(meaningIndicatorDivider);

    meaningSection.appendChild(meaningIndicator);
    meaningSection.appendChild(meaningList);
    meaningSection.appendChild(synonymList);
  });
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
  displayMeanings(word.meanings);
  displaySources(word.sourceUrls);
}
