const params = new URLSearchParams(window.location.search);
const countryName = params.get("name");
const detailsContainer = document.getElementById("details-container");

let darkMode = document.querySelector(".dark-mode");
let lightMode = document.querySelector(".light-mode");
let body = document.querySelector("body");
darkMode.style.display = "block";
lightMode.style.display = "none";

async function showDetails() {
  let response = await fetch("https://restcountries.com/v3.1/all");
  let data = await response.json();

  const country = data.find((c) => c.name.common === countryName);

  if (!country) {
    detailsContainer.innerHTML = `<h2>Country not found</h2>`;
    return;
  }

  let card = document.createElement("div");
  card.classList.add("card");

  let card1 = document.createElement("div");
  card1.classList.add("card1");

  let card2 = document.createElement("div");
  card2.classList.add("card2");

  let img = document.createElement("img");
  img.src = country.flags.png;
  img.classList.add("flag");

  let name = document.createElement("h2");
  name.classList.add("name");
  name.textContent = country.name.common;

  let nativeName = document.createElement("p");
  nativeName.classList.add("native-name");
  nativeName.textContent = `Native Name: ${
    Object.values(country.name.nativeName || {})
      .map((n) => n.common)
      .join(", ") || "N/A"
  }`;

  let population = document.createElement("p");
  population.classList.add("population");
  population.textContent = `Population: ${country.population}`;

  let region = document.createElement("p");
  region.classList.add("region");
  region.textContent = `Region: ${country.region}`;

  let capital = document.createElement("p");
  capital.classList.add("capital");
  capital.textContent = `Capital: ${country.capital || "N/A"}`;

  let subRegion = document.createElement("p");
  subRegion.classList.add("sub-region");
  subRegion.textContent = `Subregion: ${country.subregion || "N/A"}`;

  let topLevelDomain = document.createElement("p");
  topLevelDomain.classList.add("top-level-domain");
  topLevelDomain.textContent = `Top Level Domain: ${
    country.tld?.join(", ") || "N/A"
  }`;

  let currencies = document.createElement("p");
  currencies.classList.add("currencies");
  currencies.textContent = `Currencies: ${
    Object.values(country.currencies || {})
      .map((c) => c.name)
      .join(", ") || "N/A"
  }`;

  let languages = document.createElement("p");
  languages.classList.add("languages");
  languages.textContent = `Languages: ${
    Object.values(country.languages || {}).join(", ") || "N/A"
  }`;

  let borderCountries = document.createElement("p");
  borderCountries.classList.add("border-countries");
  borderCountries.textContent = `Border Countries: ${
    country.borders?.join(", ") || "N/A"
  }`;

  let backbutton = document.createElement("button");
  backbutton.textContent = "Back";
  backbutton.classList.add("back");

  card2.append(img);
  card.append(name, nativeName, population, region, capital, subRegion);
  card1.append(
    topLevelDomain,
    currencies,
    languages,
    borderCountries,
    backbutton
  );
  detailsContainer.append(card2, card, card1);

  backbutton.addEventListener("click", () => {
    window.location.replace("./index.html");
  });

  lightMode.addEventListener("click", () => {
    body.style.backgroundColor = "aliceblue";
    document.querySelector(".navtest").style.backgroundColor = "white";
    body.style.color = "black";
    darkMode.style.display = "block";
    lightMode.style.display = "none";
  });

  darkMode.addEventListener("click", () => {
    body.style.backgroundColor = "#202D36";
    document.querySelectorAll(".navtest").forEach((card) => {
      card.style.backgroundColor = "#2B3743";
      card.style.border = "none";
    });
    body.style.color = "white";
    darkMode.style.display = "none";
    lightMode.style.display = "block";
  });
}

showDetails();
