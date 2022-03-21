const fetchPokemon = () =>{
    const pokeName = document.getElementById("pokeName");
    let pokeInput = pokeName.value.toLowerCase();
    let isShiny = document.getElementById('shinyCheck').checked;
    let isFemale = document.getElementById('femaleChek').checked;
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    fetch(url).then((res) => {
        if(res.status != "200"){
            console.log(res);
            //SET THE UNKNOWN IMG AND THE COLOR TYPE TO ORIGINAL STATE
            pokeImage("./assets/img/unknonQuestion.png")
            document.getElementById("mainType").innerHTML = "";
            document.getElementById("type1").style.backgroundColor = "#032d29";
            document.getElementById("secType").innerHTML = "";
            document.getElementById("type2").style.backgroundColor = "#032d29";
            document.getElementById("description").innerHTML = "No data found";
            document.getElementById("number").innerHTML = "";
        }else{
            return res.json();
        }
    }).then((data) => {
        //IF THE POKE IS SHINY
        if(isShiny){
            let pokeImg = data.sprites.front_shiny;
            pokeImage(pokeImg);
            //IF THE POKE IS BOT SHINY AND FEMALE
            if(isFemale){
                let pokeImg = data.sprites.front_shiny_female;
                //IF THE MALE AND FEMALE ARE THE SAME
                if(pokeImg == null){
                    pokeImage(data.sprites.front_shiny);
                }else{
                    pokeImage(pokeImg);
                }
            }
        //IF THE POKE IS FEMALE
        }else if(isFemale){
            let pokeImg = data.sprites.front_female;
            //IF THE MALE AND FEMALE ARE THE SAME
            if(pokeImg == null){
                pokeImage(data.sprites.front_default);
            }else{
                pokeImage(pokeImg);
            }
        }else{
            let pokeImg = data.sprites.front_default;
            pokeImage(pokeImg);
        }

        setType(data);

        fetchDescription(pokeInput);

        fetchNumber(pokeInput);

    })
}

//fetchPokemon();

const imprimir = () => {
    const pokeName = document.getElementById("pokeName");
    let pokeInput = pokeName.value;
    console.log("hi "+pokeInput);
}

//CHANGE POKEMON IMAGE
const pokeImage = (url) => {
    const pokeImg = document.getElementById("pokeImg");
    pokeImg.src = url;
}

//SET THE POKEMON TYPES
const setType = (data) => {
    let pokeType = data.types;
    if(pokeType.length == 1){
        document.getElementById("mainType").innerHTML = pokeType[0].type.name;
        document.getElementById("type1").style.backgroundColor = setColor(pokeType[0].type.name);
        document.getElementById("secType").innerHTML = "";
        document.getElementById("type2").style.backgroundColor = "#032d29";
    }else{
        document.getElementById("mainType").innerHTML = pokeType[0].type.name;
        document.getElementById("type1").style.backgroundColor = setColor(pokeType[0].type.name);
        document.getElementById("secType").innerHTML = pokeType[1].type.name;
        document.getElementById("type2").style.backgroundColor = setColor(pokeType[1].type.name);
    }
} 

function setColor(type){
    document.getElementById("mainType").style.color = "black";
    document.getElementById("secType").style.color = "black";
    switch(type){
        case "water":
            return "#1874cf";
        case "electric":
            return "#f6b110";
        case "normal":
            return "grey";
        case "poison":
            return "#883a89";
        case "ground":
            return "#d1af54";
        case "fire":
            return "#de3408";
        case "fairy":
            return "#f1a5f1";
        case "psychic":
            return "#e43268";
        case "steel":
            return "silver";
        case "rock":
            return "#b69e53";
        case "ice":
            return "#6dd3f5";
        case "dragon":
            return "#745cdc";
        case "dark":
            return "#3d2e23";
        case "grass":
            return "#135600";
        case "bug":
            return "#87950d";
        case "flying":
            return "#5c72d2";
        case "fighting":
            return "#5b210f";
        case "ghost":
            return "#5e5eb0";
    }
}


//SET THE DESCRIPTION
function fetchDescription(name){
    let url = "https://pokeapi.co/api/v2/pokemon-species/"+name;
    fetch(url).then((res) => {
        return res.json();
    }).then((data) => {
        document.getElementById("description").innerHTML = data.flavor_text_entries[2].flavor_text;
    })
}

//NUMBER ON THE NATIONAL DESK
function fetchNumber(name){
    let url = "https://pokeapi.co/api/v2/pokemon-species/"+name;
    fetch(url).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data.pokedex_numbers[0].entry_number);
        document.getElementById("number").innerHTML = data.pokedex_numbers[0].entry_number;
    })
}