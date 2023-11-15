const headerTypes = document.querySelectorAll(".btn-header");
const pokemonList = document.querySelector("#pokemon-list");
const url = "https://pokeapi.co/api/v2/pokemon/";

const fetchPokeApi = async (url) => {
	for (let i = 1; i <= 151; i++) {
		try {
			const response = await fetch(url + i);
			const data = await response.json();
			showData(data);
		} catch (err) {
			console.error(err);
		}
	}
};

const showData = (data) => {
	let types = data.types.map(
		(type) => `<p class="${type.type.name} type">${type.type.name}</p>`
	);
	types = types.join("");

	let pokeId = data.id.toString();
	if (pokeId.length === 1) {
		pokeId = "00" + pokeId;
	} else if (pokeId.length === 2) {
		pokeId = "0" + pokeId;
	}

	const div = document.createElement("div");
	div.classList.add("pokemon");
	div.innerHTML = `<p class="pokemon-id-background">#${pokeId}</p>
	<div class="pokemon-image">
		<img
			src="${data.sprites.front_default}"
			alt="" />
	</div>
	<div class="pokemon-info">
		<div class="pokemon-name-container">
			<p class="pokemon-id">#${pokeId}</p>
			<h2 class="pokemon-name">${data.name}</h2>
		</div>
		<div class="pokemon-type">
        ${types}
		</div>
		<div class="pokemon-stats">
			<p class="stat">${data.height}m</p>
			<p class="stat">${data.weight}kg</p>
		</div>
	</div>`;

	pokemonList.appendChild(div);
};

headerTypes.forEach((type) => {
	type.addEventListener("click", (event) => {
		const typeId = event.currentTarget.id;

		pokemonList.innerHTML = "";

		for (let i = 1; i <= 151; i++) {
			fetch(url + i)
				.then((response) => response.json())
				.then((data) => {
					if (typeId === "see-all") {
						showData(data);
					} else {
						const types = data.types.map((type) => type.type.name);
						if (types.some((type) => type.includes(typeId))) {
							showData(data);
						}
					}
				});
		}
	});
});

fetchPokeApi(url);
