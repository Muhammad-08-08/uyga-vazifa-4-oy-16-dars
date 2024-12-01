document.addEventListener("DOMContentLoaded", () => {
  let container = document.querySelector(".container");
  container.innerHTML = "";
  let darkMode = document.querySelector(".dark-mode");
  let lightMode = document.querySelector(".light-mode");
  let body = document.querySelector("body");
  darkMode.style.display = "block";
  lightMode.style.display = "none";

  let search = document.querySelector(".search");
  let qidirish;
  let select = document.querySelector("#select");

  async function createCard() {
    let response = await fetch("https://restcountries.com/v3.1/all");
    let data = await response.json();
    console.log(data);
    qidirish = data;

    data.forEach((elem) => {
      let card = document.createElement("div");
      card.classList.add("card");
      let img = document.createElement("img");
      img.src = elem.flags.png;
      img.classList.add("flag");
      let name = document.createElement("h2");
      name.classList.add("name");
      name.textContent = elem.name.common;
      let population = document.createElement("p");
      population.classList.add("population");
      population.textContent = `Population: ${elem.population}`;
      let region = document.createElement("p");
      region.classList.add("region");
      region.textContent = `Region: ${elem.region}`;
      let capital = document.createElement("p");
      capital.classList.add("capital");
      capital.textContent = `Capital: ${elem.capital}`;
      card.append(img, name, population, region, capital);
      container.append(card);

      card.addEventListener("click", () => {
        window.location.replace(`card.html?name=${elem.name.common}`);
      });
    });

    lightMode.addEventListener("click", () => {
      body.style.backgroundColor = "aliceblue";
      document.querySelector(".navtest").style.backgroundColor = "white";
      document.querySelectorAll(".card").forEach((card) => {
        card.style.backgroundColor = "white";
        card.style.color = "black";
        card.style.border = "1px solid lightgray";
      });
      document.querySelectorAll(".search").forEach((card) => {
        card.style.backgroundColor = "white";
        card.style.color = "black";
        card.style.border = "1px solid lightgray";
      });
      document.querySelectorAll("#select").forEach((card) => {
        card.style.backgroundColor = "white";
        card.style.color = "black";
        card.style.border = "none";
      });
      body.style.color = "black";
      darkMode.style.display = "block";
      lightMode.style.display = "none";
    });

    darkMode.addEventListener("click", () => {
      body.style.backgroundColor = "#202D36";
      document.querySelectorAll(".navtest").forEach((card) => {
        card.style.backgroundColor = "#2B3743";
        card.style.border = "none";
      })
      document.querySelectorAll(".card").forEach((card) => {
        card.style.backgroundColor = "#2B3743";
        card.style.color = "white";
        card.style.border = "none";
      });
      document.querySelectorAll(".search").forEach((card) => {
        card.style.backgroundColor = "#2B3743";
        card.style.color = "white";
        card.style.border = "none";
      });
      document.querySelectorAll("#select").forEach((card) => {
        card.style.backgroundColor = "#2B3743";
        card.style.color = "white";
        card.style.border = "none";
      });   
      body.style.color = "white";
      darkMode.style.display = "none";
      lightMode.style.display = "block";
    });
  }
  search.addEventListener("keydown", async (e) => {
    try {
      let res = await fetch(
        `https://restcountries.com/v3.1/name/${e.target.value}`
      );
      if (!res.ok) throw new Error("API dan ma'lumot olinmadi");
      let data = await res.json();
      container.innerHTML = "";
      data.forEach((elem) => {
        let card = document.createElement("div");
        card.classList.add("card");
        let img = document.createElement("img");
        img.src = elem.flags.png;
        img.classList.add("flag");
        let name = document.createElement("h2");
        name.classList.add("name");
        name.textContent = elem.name.common;
        let population = document.createElement("p");
        population.classList.add("population");
        population.textContent = `Population: ${elem.population}`;
        let region = document.createElement("p");
        region.classList.add("region");
        region.textContent = `Region: ${elem.region}`;
        let capital = document.createElement("p");
        capital.classList.add("capital");
        capital.textContent = `Capital: ${elem.capital}`;
        card.append(img, name, population, region, capital);
        container.append(card);
      });
    } catch (error) {
      console.error("Xatolik:", error.message);
    }
  });
  select.addEventListener("change", async (e) => {
    try {
      let url;
      if (e.target.value === "all") {
        url = `https://restcountries.com/v3.1/all`;
      } else {
        url = `https://restcountries.com/v3.1/region/${e.target.value}`;
      }

      let res = await fetch(url);
      let data = await res.json();

      container.innerHTML = "";
      data.forEach((elem) => {
        let card = document.createElement("div");
        card.classList.add("card");

        let img = document.createElement("img");
        img.src = elem.flags.png;
        img.classList.add("flag");

        let name = document.createElement("h2");
        name.classList.add("name");
        name.textContent = elem.name.common;

        let population = document.createElement("p");
        population.classList.add("population");
        population.textContent = `Population: ${elem.population}`;

        let region = document.createElement("p");
        region.classList.add("region");
        region.textContent = `Region: ${elem.region}`;

        let capital = document.createElement("p");
        capital.classList.add("capital");
        capital.textContent = `Capital: ${elem.capital}`;

        card.append(img, name, population, region, capital);
        container.append(card);
      });
    } catch (error) {
      console.error("Xatolik:", error.message);
    }
  });

  createCard();
});
