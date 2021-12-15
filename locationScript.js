const URL = 'https://rickandmortyapi.com/api/location/'
const URLname = 'https://rickandmortyapi.com/api/location/?name='
const $main = $('main')
const $input = $('input')
const $form = $('form')
let page;
let userInput;

$form.on('submit', handleSubmit)

function handleSubmit(evt){
    evt.preventDefault();
    userInput = $input.val();
    if (userInput == '') {return}
    $input.val('')

    $.ajax(URLname + userInput).then(function(par){
        randomizePlanet(par)
    })
}

function randomizePlanet(data){
    pageRandom(data.info.pages)
    $.ajax(URLname + userInput + '&page=' + page).then(function(final){
        console.log(final)
        renderPlanet(final)
    })
}

function pageRandom(num){
    page = Math.floor(Math.random() * (num + 1 - 1) + 1)
}

function renderPlanet(event){
    console.log(event)
    let randomArray = Math.floor(Math.random() * event.results.length)
        
        $main.html(`
        <p>Name: ${event.results[randomArray].name }</p>
        <div><img src=""></div>`)
}

function renderChars(evt){
  
    for (let i = 0; i < evt.length; i++){
        if (i === 28){ return;}
        $.ajax(evt[i]).then(function(name){
            console.log(name)
            $('#main').append(`<div class="episode_div"><img class="episode_images" src="${name.image}"</div>`)   
        })  
    }
}