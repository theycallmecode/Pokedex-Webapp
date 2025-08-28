const poke_container = document.getElementById("poke-container");
const pokemon_count = 1010;
const colors = {
    fire: "#e03a3a",
    grass: "#50C878",
    electric: "#fad343",
    water: "#1E90FF",
    ground: "#735139",
    rock: "#63594f",
    fairy: "#EE99AC",
    poison: "#b34fb3",
    bug: "#A8B820",
    dragon: "#fc883a",
    psychic: "#882eff",
    flying: "#87CEEB",
    fighting: "#bf5858",
    normal: "#D2B48C",
    ghost: "#7B62A3",
    dark: "#414063",
    steel: "#808080",
    ice: "#98D8D8",
};
const regions = {
    kanto: {
        start: 1,
        end: 151,
    },
    johto: {
        start: 152,
        end: 251,
    },
    hoenn: {
        start: 252,
        end: 386,
    },
    sinnoh: {
        start: 387,
        end: 493,
    },
    unova: {
        start: 494,
        end: 649,
    },
    kalos: {
        start: 650,
        end: 721,
    },
    alola: {
        start: 722,
        end: 809,
    },
    galar: {
        start: 810,
        end: 898,
    },
    hisui: {
        start: 899,
        end: 905,
    },
    paldea: {
        start: 906,
        end: 1010,
    },
};

const loader = document.querySelector(".lds-ring");
const fetchPokemons = async (region) => {
    const { start, end } = regions[region];

    loader.classList.add("ring-active");

    for (let i = start; i <= end; i++) {
        const pokemonName = i.toString();
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

        let res = await fetch(url);
        let data = await res.json();
        loader.classList.remove('ring-active')
        createPokemonCard(data);
        setTimeout(() => {
        }, "150");
    }
};

const main_types = Object.keys(colors);

const createPokemonCard = (pokemon) => {

    const pokemonEl = document.createElement("div");
    pokemonEl.classList.add("card");
    pokemonEl.id = pokemon.id;

    let name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    if (name.length > 9) {
        name = name.split("-")[0];
    } else {
        name = name;
    }
    const id = pokemon.id.toString().padStart(3, "0");

    let weight = pokemon.weight / 10 + "kg";
    let height = pokemon.height / 10 + "m";

    const poke_types = pokemon.types.map((type) => type.type.name);
    const type = main_types.find((type) => poke_types.indexOf(type) > -1);
    const color = colors[type];
    let frontImg;
    let backImg;
    try {
        frontImg = pokemon.sprites.front_default;
        backImg = pokemon.sprites.back_default;
    }
    catch (err) {
        frontImg = "#";
        backImg = "#";
    }

    pokemonEl.style.backgroundColor = color;

    const pokemonInnerHTML = `
    <div class="front side">
        <div class="img-container">
        <img class="background" src="./Icons/default/pokeball.svg" alt="pokeball">
        <img class="image" src="${frontImg}" alt="${name}">
        </div>
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <div class="types">
          ${poke_types
            .map(
                (type) => `
                <div class="poke__type__bg ${type}">
                <img src="Icons/${type}.svg" alt="Type">
                </div>
          `
            )
            .join("")}
        </div>
    </div>
    <div class="back side">
        <div class="img-container">
        <img class="image" src="${backImg == null ? frontImg : backImg
        }" alt="${name}" />
        <img class="background" src="./Icons/default/pokeball.svg" alt="pokeball">
        </div>
        <span class="number">#${id}</span>
    <div class="stats">
    <div> Weight:<br> <b>${weight}</b></div>
    <div> Height:<br> <b>${height}</b></div>
    </div>
    </div>
  `;


    pokemonEl.innerHTML = pokemonInnerHTML;
    // Add event listener to open new page on card click
    pokemonEl.addEventListener("click", () => {
        // Open new page with specific card details
        window.open(`details.html?id=${id}`, "_self");
    });

    const pokemonElHolder = document.createElement("div");
    pokemonElHolder.classList.add("cardContainer");
    pokemonElHolder.appendChild(pokemonEl);

    poke_container.appendChild(pokemonElHolder);
};

const changeRegion = () => {
    const regionSelect = document.getElementById("regionSelect");
    regionSelect.addEventListener("click", (event) => {
        const selectedRegion = event.target.getAttribute("data-value");
        const activeRegion = document.querySelector(".active");
        if (selectedRegion) {
            poke_container.innerHTML = "";
            fetchPokemons(selectedRegion);
            activeRegion.classList.remove("active");
            event.target.classList.add("active");
        }
    });
};

fetchPokemons("kanto");

window.addEventListener("scroll", function () {
    var scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (window.scrollY > 100) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
});

document
    .getElementById("scrollToTopBtn")
    .addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

window.addEventListener("scroll", function () {
    var scrollToDownBtn = document.getElementById("scrollToDownBtn");
    if (window.scrollY > 100) {
        scrollToDownBtn.style.display = "block";
    } else {
        scrollToDownBtn.style.display = "none";
    }
});

document
    .getElementById("scrollToDownBtn")
    .addEventListener("click", function () {
        window.scrollTo({
            top: 999999,
            behavior: "smooth",
        });
    });
function search_pokemon() {
    let input = document.getElementById("searchbar").value;
    input = input.toLowerCase();
    input = input.replace(/\s+/g, ""); // removing all spaces from search box
    // storing all card along wiith details in variable
    let x = document.getElementsByClassName("cardContainer");

    for (i = 0; i < x.length; i++) {
        // checking  the name or type entered by user from search box if doesn't match than dont display the message
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
        }
        // checking  the name or type entered by user from search box if doesn't match than dont display the pokemon card
        else {
            x[i].style.display = "block";
        }
    }
}


// dark mode enabled
const darkModeButton = document.getElementById("dark");

darkModeButton.addEventListener("click", () => {

    let element = document.body;
    element.classList.toggle("dark-mode");
    document.body.classList.toggle("dark-mode");

    const regions = document.querySelectorAll(".regionvalue");
    console.log(regions);
    regions.forEach(region => {
        region.classList.toggle("dark-mode");
    });

});

const darkModeIcon = document.getElementById("dark");
darkModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkModeIcon.classList.toggle("fa-toggle-on");
    // You can add additional elements that need dark mode here
});


changeRegion();