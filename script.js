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