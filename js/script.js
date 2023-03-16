//
//
// Initialize list of Pokemons using IIFE to protect variables

// DATA...
const pokemonRepository = (function () {
	const pokemonList = [];
	// let pokemon = {};
	let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

	// pokemon = {
	// 	name: "Bulbasaur",
	// 	height: 0.7,
	// 	types: ["grass", "poison"],
	// 	color: "green",
	// };
	// pokemonList.push(pokemon);

	// pokemon = {
	// 	name: "Ivysaur",
	// 	height: 1,
	// 	types: ["grass", "poison"],
	// 	color: "green",
	// };
	// pokemonList.push(pokemon);

	// pokemon = {
	// 	name: "Venusaur",
	// 	height: 2,
	// 	types: ["grass", "poison"],
	// 	color: "green",
	// };
	// pokemonList.push(pokemon);

	// pokemon = {
	// 	name: "Charmander",
	// 	height: 0.6,
	// 	types: ["fire"],
	// 	color: "red",
	// };
	// pokemonList.push(pokemon);
	///////////////////////////////////////////////////////////////
	// FUNCTIONS...

	function add(pokemon) {
		// Check if argument received is NOT of type "Object"
		// if (typeof pokemon !== "object") {
		// 	console.log(`The argument passed to the function "add" is of type ${typeof pokemon}`);
		// 	console.log(
		// 		`The argument passed to the function "add" MUST be an object
		//     with the following keys: ${Object.keys(pokemonRepository.getAll()[0])}.`
		// 	);
		// 	console.log(
		// 		`The New Object has NOT been added to the list. Please correct the Error and Resubmit...`
		// 	);
		// } else {
		// find Valid keys from first ogject
		// console.log(pokemonRepository.getAll()[0]);
		// const validPokemonKeys = Object.keys(pokemonRepository.getAll()[0]);

		// Compare keys of argument received with valid keys
		// if (Object.keys(pokemon).toString() !== validPokemonKeys.toString()) {
		// 	console.log(`INVALID KEYS of the received Argument: `);
		// 	console.log(`${Object.keys(pokemon)} `);

		// 	console.log(`VALID KEYS are: `);
		// 	console.log(`${Object.keys(pokemonRepository.getAll()[0])}.`);
		// 	console.log(
		// 		`The New Object has NOT been added to the list. Please correct the Error and Resubmit...`
		// 	);
		// } else {
		// If Keys are Valid, Push pokemon to the pokemonRepository
		pokemonList.push(pokemon);
		// }
		// }
	}
	///////////////////////////////////////////////
	function getAll() {
		return pokemonList;
	}
	////////////////////////////////////////////////
	function loadPokeListFromApi() {
		return fetch(apiUrl)
			.then(function (response) {
				return response.json();
			})
			.then(function (json) {
				json.results.forEach(function (item) {
					let pokemon = {
						name: item.name,
						detailsUrl: item.url,
					};
					add(pokemon);
				});
			})
			.catch(function (e) {
				console.error(e);
			});
	}
	////////////////////////////////////////////////
	function addListItem(pokemon) {
		// Variables from HTML Elements:
		const pokemonHtmlList = document.querySelector(".pokemon-list");
		const li = document.createElement("li");
		const button = document.createElement("button");

		// add CSS Class to button
		button.classList.add("pokemon-button");

		// add Pokemon name to button text
		button.innerText = pokemon.name;

		// add eventListener to the Button
		addEventListenerToButton(button, "click", pokemon);

		// insert the button into the line element
		li.appendChild(button);

		// add Class to line element
		li.classList.add("pokemon-list__item");

		// add the line element into the list element
		pokemonHtmlList.appendChild(li);
	}

	function addEventListenerToButton(button, type, pokemon) {
		button.addEventListener(type, function (event) {
			showDetails(pokemon);
		});
	}
	///////////////////////////////////////////////////////////////
	function showDetails(pokemon) {
		console.log(pokemon);
	}
	///////////////////////////////////////////////////////////////
	function search(searchName) {
		// Find Pokemon
		const foundPokemon = pokemonRepository.getAll().filter(function (pokemon) {
			if (pokemon.name.toLowerCase() === searchName.toLowerCase()) {
				return pokemon;
			}
		});
		return foundPokemon;
	}
	////////////////////////////////////////////////////////////////
	function showHTML(pokemonList) {
		pokemonList.forEach(function (pokemon) {
			pokemonRepository.addListItem(pokemon);
		});
	}

	return {
		add,
		getAll,
		loadPokeListFromApi,
		addListItem,
		search,
		showHTML,
	};
})();
//
///////////////////////   END OF IIFE POKEMON INITIALIZATION FUNCTIONS  ////////////////////

///////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////// PROGRAM FLOW... ///////////////////////////////
//
// Add a new Pokemon
// const newPokemon = {
// 	name: "Tutu",
// 	height: 100,
// 	types: ["car", "truck"],
// 	color: "purple",
// };
// pokemonRepository.add(newPokemon);
//
//  FETCH ALL POKEMONS FROM API then SHOW ALL POKEMONS
pokemonRepository.loadPokeListFromApi().then(function () {
	pokemonRepository.showHTML(pokemonRepository.getAll());
});

// SHOW ONLY SEARCHED POKEMON
// const pokemonSearchName = "VenUsaur";
// const resultOfSearch = pokemonRepository.search(pokemonSearchName);
// pokemonRepository.showHTML(resultOfSearch);
