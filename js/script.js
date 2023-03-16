//
//
// Initialize list of Pokemons using IIFE to protect variables

// DATA...
const pokemonRepository = (function () {
	const pokemonList = [];
	// let pokemon = {};
	let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

	// FUNCTIONS...

	function add(pokemon) {
		pokemonList.push(pokemon);
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
	function loadDetails(pokemon) {
		let url = pokemon.detailsUrl;
		return fetch(url)
			.then(function (response) {
				return response.json();
			})
			.then(function (pokemonDetails) {
				// Pokemon details received from API
				pokemon.imageUrl = pokemonDetails.sprites.other.home.front_default;
				pokemon.height = pokemonDetails.height;
				pokemon.types = pokemonDetails.types;
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
		loadDetails(pokemon).then(function () {
			console.log(pokemon);
		});
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
		loadDetails,
	};
})();
//
///////////////////////   END OF IIFE POKEMON INITIALIZATION FUNCTIONS  ////////////////////

///////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////// PROGRAM FLOW... ///////////////////////////////
//
//
//  FETCH ALL POKEMONS FROM API then SHOW ALL POKEMONS
pokemonRepository.loadPokeListFromApi().then(function () {
	pokemonRepository.getAll().forEach(function (pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});
