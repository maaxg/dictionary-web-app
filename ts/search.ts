import { hydrateWordInformation } from "./hydrate-word-information";

const BASE_URL = "https://api.dictionaryapi.dev/";
const searchInput = document.getElementById("search-input") as HTMLInputElement;
const searchButton = document.getElementById(
  "search-button"
) as HTMLButtonElement;

function displayNotFoundMessage() {
  const notFoundMessage = document.getElementById(
    "not-found-message"
  ) as HTMLElement;
  notFoundMessage.style.display = "flex";
}

function removeNotFoundMessage() {
  const notFoundMessage = document.getElementById(
    "not-found-message"
  ) as HTMLElement;
  notFoundMessage.style.display = "none";
}

const search = async (word: string) => {
  const res = await fetch(`${BASE_URL}api/v2/entries/en/${word}`);
  if (res.status === 404) {
    displayNotFoundMessage();
    return [];
  }
  removeNotFoundMessage();
  const data = await res.json();
  return data;
};

function displayErrorMessage() {
  const errorMessage = document.getElementById("error-message") as HTMLElement;
  const errorContainer = document.getElementById(
    "search-bar-container"
  ) as HTMLDivElement;
  errorContainer.classList.add("error");
  errorMessage.innerText = "Whoops, can’t be empty…";
}

function removeErrorMessage() {
  const errorMessage = document.getElementById("error-message") as HTMLElement;
  const errorContainer = document.getElementById(
    "search-bar-container"
  ) as HTMLDivElement;
  errorContainer.classList.remove("error");
  errorMessage.innerText = "";
}

searchButton.addEventListener("click", async () => {
  if (!searchInput.value) return displayErrorMessage();
  removeErrorMessage();
  const word = searchInput.value;
  const data = await search(word);
  console.log(data);
  hydrateWordInformation(data);
});

document.addEventListener("keypress", async (e) => {
  if (e.key === "Enter" && !searchInput.value) return displayErrorMessage();
  if (e.key === "Enter" && searchInput.value) {
    removeErrorMessage();
    const word = searchInput.value;
    const data = await search(word);
    hydrateWordInformation(data);
  }
});
