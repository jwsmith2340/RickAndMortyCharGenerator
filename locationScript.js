//GLOBAL 
const URL = 'https://rickandmortyapi.com/api/location'
const URLname = 'https://rickandmortyapi.com/api/location/?name='
const URLpage = 'https://rickandmortyapi.com/api/location/?page='
const $main = $('main')
const $input = $('input')
const $form = $('form')
let page;
let userInput;

//Event initiation
$form.on('submit', handleSubmit)
$('#pickleRick').on('click', handlePickleRick)

//Form input - handles user submissions
function handleSubmit(evt){
    evt.preventDefault();
    $('#main_small').html('')
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

//Pickle Rick - Handles random event
function handlePickleRick(evt){
    evt.preventDefault();
    $main.html('')
    $('#main').html('')
    $('#main_small').html('')

    $.ajax(URL).then(function(par){
        console.log(par)
        pickleRandomizePlanet(par)
    })
}

//Calls page randomizer function, ajax request, initiates renderPlanet function
function randomizePlanet(data){
    pageRandom(data.info.pages)
    $.ajax(URLname + userInput + '&page=' + page).then(function(final){
    renderPlanet(final)
    })
}

function pickleRandomizePlanet(data){
    pageRandom(data.info.pages)
    $.ajax(URLpage + page).then(function(info){
        renderPlanet(info)
    })
}

//function to randomize page results from pagination so all locations can be accessed
function pageRandom(num){
    page = Math.floor(Math.random() * (num + 1 - 1) + 1)
}

//render planet with random array
function renderPlanet(event){
    let randomArray = Math.floor(Math.random() * event.results.length)
    $main.html(`
        <p>Name: ${event.results[randomArray].name }`)
        renderChars(event.results[randomArray].residents)
}

//Render character images
function renderChars(evt){
    if (evt.length === 0){
        $('main').append('<p><strong>There are no permanent residents of this location</strong>')
    }

    if (evt.length < 5){
        for (let i = 0; i < evt.length; i++){
            $.ajax(evt[i]).then(function(name){
                console.log(name)
                $('#main_small').append(`<div class="location_small"><img class="location_small_images" src="${name.image}"</div>`)   
            })  
        }
    }else if (evt.length >= 5) {
        for (let i = 0; i < evt.length; i++){
        $.ajax(evt[i]).then(function(name){
            console.log(name)
            $('#main').append(`<div class="episode_div"><img class="episode_images" src="${name.image}"</div>`)   
        })  
    }}
}