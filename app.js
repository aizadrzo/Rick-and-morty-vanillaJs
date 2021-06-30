let searchBar = document.querySelector(".search-bar");
let searchBtn = document.querySelector(".search-button");
let containerDiv = document.querySelector(".container");
let characterDiv = document.querySelector(".container");
let nextBtn = document.querySelector(".next-button");
let prevBtn = document.querySelector(".previous-button");
let baseUrl = "https://rickandmortyapi.com/api/character/";
let html = "";
let page = 1;
let rmCharacters = [];

searchBtn.addEventListener("click", () => {
  let searchString = searchBar.value;
  let characterSearch = `?name=${searchString}`;
  let searchUrl = baseUrl + characterSearch;
  fetchData(searchUrl);
});

document.querySelector(".logo").addEventListener("click", () => {
  fetchData(baseUrl);
});

function fetchData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((rmCharacters) => {
      displayCharacter(rmCharacters.results);
    })
    .catch((err) => console.log(err));
}

function displayCharacter(data) {
  let html = data
    .map((character) => {
      return `
<div class='character-body'>
<div class='character-image'>
<img src='${character.image}'/>
</div>
<div class='character-info'>
<h1>${character.name}</h1>
<p>${character.species} (${character.gender})</p>
<p>Location:</p>
<p>${character.location.name}</p>
</div>
</div>
`;
    })
    .join("");
  containerDiv.innerHTML = html;
}

nextBtn.addEventListener("click", function nextPage() {
  if (page >= 0 && page < 35) {
    page++;
    let pageUrl = `?page=${page}`;
    pageUrl = baseUrl + pageUrl;
    fetchData(pageUrl);
  }
});

prevBtn.addEventListener("click", function prevPage() {
  if (page >= 1 && page !== 0) {
    page -= 1;
    let pageUrl = `?page=${page}`;
    pageUrl = baseUrl + pageUrl;
    fetchData(pageUrl);
  }
});

window.addEventListener("onload", fetchData(baseUrl));
