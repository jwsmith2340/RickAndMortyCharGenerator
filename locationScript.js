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
    $('#main').html('');
    userInput = $input.val();
    if (userInput === '') return;
    $input.val('')

    $.ajax(URLname + userInput).then(function(par){
        randomizePlanet(par)
    }, 
    function(error){
        console.log('Resultant error: ' + error)
    })
}

function randomizePlanet(data){
    pageRandom(data.info.pages)
    $.ajax(URLname + userInput + '&page=' + page).then(function(final){
        //console.log(final)
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
        <p>Name: ${event.results[randomArray].name }`)
        //console.log(event.results[randomArray].residents)
        renderChars(event.results[randomArray].residents)
        // $('#main').append(`
        // <img src="${event.results.image}"`)
}

function renderChars(evt){
    if (evt.length === 0){
        $('main').append('<p><strong>There are no permanent residents on this planet</strong>')
    }
    for (let i = 0; i < evt.length; i++){
        //if (i === 28){ return;}
        $.ajax(evt[i]).then(function(name){
            console.log(name)
            $('#main').append(`<div class="episode_div"><img class="episode_images" src="${name.image}"</div>`)   
        })  
    }
}