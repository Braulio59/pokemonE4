const mainForm = document.getElementById("main_form")
const input = document.getElementById("pokemon_input")
const pokemonImg = document.getElementById("pokemon_img")
const pokemonName = document.getElementById("pokemon_name")
const pokemonType = document.getElementById("pokemon_type")
const pokemonHeight = document.getElementById("pokemon_height") 
const pokemonWeight = document.getElementById("pokemon_weight")
const pokemonCard = document.querySelector(".pokemon_card") 
const errorMessage = document.getElementById("error")



const hideElement = (element) => {
    element.classList.add("hidden")
} 

const showElement = (element) => {
    element.classList.remove("hidden")
}

const init  = () => {
    hideElement(pokemonCard)
}

init();

const getAndSetPokemon = async (e) => { 
    try {
        e.preventDefault();
        const inputValue = input.value;
        if(inputValue === "") {
            hideElement(pokemonCard);
            alert("Por favor ingrese un Numero")
            return
        }
        const response =  await fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
        const pokemon = await response.json();
        setPokemon(pokemon)
    } catch(err) {
        hideElement(pokemonCard)
        showElement(errorMessage);
    } 
}  

const setPokemon = (pokemon) => {
    hideElement(errorMessage)
    pokemonImg.src = pokemon.sprites.front_shiny
    pokemonName.textContent = pokemon.name 
    pokemonType.textContent = pokemon.types[0].type.name
    pokemonHeight.textContent = pokemon.height/10 + ("m") 
    pokemonWeight.textContent = pokemon.weight/10 + "Kg"
    showElement(pokemonCard)

    console.log(pokemon)
}



mainForm.addEventListener("submit", getAndSetPokemon)