let pokemonContainer = document.querySelector('#pokeman_card_container');
let searchInput = document.querySelector('#search')
let filterBtn = document.querySelector('#filter');
let type = document.querySelector('#type');
console.log(searchInput.value);
let color ={
    grass:'#a0cf59',
    normal:'#a9b0b3',
    poison:'#bd86cc',
    ground:'#f7e049',
    rock:'#a8922c',
    bug:'#79a449',
    ghost:'#826aa8',
    fire:'#fd842f',
    water:'#4e98c7',
    electric:'#efd73f',
    phychic:'#f46ebd',
    ice:'#C52984',
    dragon:'#dcaa2b',
    fairy:'#fdbdea'
}



function createPokemonCard(details){
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML=`
    <div class='card-inner'>
        <div class='card-front'>
            <div class='id'>${details.id}</div>
            <img src='${details.sprites.front_default}'></img>
            <div class='name'>${details.name}</div>
            <div class='type'>${details.types[0].type.name}</div>
        </div>
        <div class='card-back'>
        <img src='${details.sprites.back_default}'>
        <div class='ability'>${details.abilities[0].ability.name}</div>
        <div class='name'>${details.name}</div>
        </div>
    </div>
    `
    card.querySelector('.card-inner').style.backgroundColor=color[details.types[0].type.name];
    return card;

}
searchInput.addEventListener('input',()=>{
    let allCards = document.querySelectorAll(".card");
    let pokeArray = Array.from(allCards);
    pokeArray.forEach((element)=>{
        let pokemonName = element.children[0].children[0].children[2].innerText;
        if(pokemonName.startsWith(searchInput.value)){
            element.style.display="block";
        }else{
            element.style.display="none";
        }

    })
})
filterBtn.addEventListener('click',()=>{
    let allCards = document.querySelectorAll(".card");
    let pokeArray = Array.from(allCards);
    pokeArray.forEach((element)=>{
        let pokemonType = element.children[0].children[0].children[3].innerText;
        if(pokemonType === type.value){
            element.style.display="block";
        }else{
            element.style.display="none";
        }

    })
})  

async function fetchPokemon(i){
     let response =  await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    let result = await response.json();
    console.log(result);
    return result;
}

async function fetchmainpage(){
    for(let i=1;i<=500;i++){
        let pokemon = await fetchPokemon(i);
        let card = createPokemonCard(pokemon);
        console.log(pokemon);
        pokemonContainer.appendChild(card);
    }
}
fetchmainpage()