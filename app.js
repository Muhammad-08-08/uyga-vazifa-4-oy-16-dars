document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const darkMode = document.querySelector(".dark-mode");
  const lightMode = document.querySelector(".light-mode");
  const body = document.body;
  const search = document.querySelector(".search");
  const select = document.querySelector("#select");

  darkMode.style.display = "block";
  lightMode.style.display = "none";

  async function fetchCountries(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("API dan ma'lumot olinmadi");
      return await response.json();
    } catch (error) {
      console.error("Xatolik:", error.message);
      return [];
    }
  }

  function createCountryCard(country) {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = country.flags?.png || "default-flag.png";
    img.classList.add("flag");

    const name = document.createElement("h2");
    name.classList.add("name");
    name.textContent = country.name.common;

    const population = document.createElement("p");
    population.classList.add("population");
    population.textContent = `Population: ${country.population.toLocaleString()}`;

    const region = document.createElement("p");
    region.classList.add("region");
    region.textContent = `Region: ${country.region}`;

    const capital = document.createElement("p");
    capital.classList.add("capital");
    capital.textContent = `Capital: ${
      country.capital ? country.capital.join(", ") : "N/A"
    }`;

    card.append(img, name, population, region, capital);
    container.append(card);

    card.addEventListener("click", () => {
      window.location.href = `card.html?name=${country.name.common}`;
    });
  }

  async function displayCountries(url) {
    container.innerHTML = "<p>Yuklanmoqda...</p>";
    const data = await fetchCountries(url);
    container.innerHTML = "";
    data.forEach(createCountryCard);
  }

  search.addEventListener(
    "input",
    debounce(async (e) => {
      const query = e.target.value.trim();
      if (query) {
        await displayCountries(`https://restcountries.com/v3.1/name/${query}`);
      } else {
        await displayCountries("https://restcountries.com/v3.1/all");
      }
    }, 300)
  );

  select.addEventListener("change", async (e) => {
    const region = e.target.value;
    const url =
      region === "all"
        ? "https://restcountries.com/v3.1/all"
        : `https://restcountries.com/v3.1/region/${region}`;
    await displayCountries(url);
  });

  darkMode.addEventListener("click", () => {
    body.classList.add("dark-mode");
    body.classList.remove("light-mode");
    darkMode.style.display = "none";
    lightMode.style.display = "block";
  });

  lightMode.addEventListener("click", () => {
    body.classList.add("light-mode");
    body.classList.remove("dark-mode");
    darkMode.style.display = "block";
    lightMode.style.display = "none";
  });

  displayCountries("https://restcountries.com/v3.1/all");
});

function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}
