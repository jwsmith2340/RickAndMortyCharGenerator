//GLOBAL VARIABLE DECLARATIONS
const URL = 'https://rickandmortyapi.com/api/location'
const URLname = 'https://rickandmortyapi.com/api/location/?name='
const URLpage = 'https://rickandmortyapi.com/api/location/?page='
const $main = $('main')
const $input = $('input[type="text"')
const $form = $('form')
const URLcharacter = 'https://rickandmortyapi.com/api/character/'
let page;
let userInput;

//EVENT INITIATION
$form.on('submit', handleSubmit)    //Form submit event
$('#pickleRick').on('click', handlePickleRick)  //Pickle Rick event
$('#main').on('click', 'img', function(evt){
    let testUrl = evt.target.src
    let testString = testUrl.slice(0, -5) //Removes ' .jpeg ' from the image source
    testString = testString.substring(49) //Removes all string chars before char index
    $.ajax(URLcharacter + testString).then(function(ev){
        renderClickedChar(ev)
    })
})
$('#main_small').on('click', 'img', function(evt){
    let testUrl = evt.target.src
    let testString = testUrl.slice(0, -5) //Removes ' .jpeg ' from the image source
    testString = testString.substring(49) //Removes all string chars before char index
    $.ajax(URLcharacter + testString).then(function(ev){
        renderClickedChar(ev)
        })
    })
//FUNCTION BLOCK

//Handles submit button, prevents page load, clears html values from prior searches, requires user
//input, that input is assigned to a global variable to concatonate URL for AJAX request. Input is 
//cleared, ajax retrieval initiates randomizePlanet(), error contingency in place
function handleSubmit(evt){
    evt.preventDefault();
    if (!$input.val()) return;
    userInput = $input.val();
    $input.val('')
    $('#main_small').html('')
    $('#main').html('')
    $('#mainInfo').html('')

    $.ajax(URLname + userInput).then(function(par){
        randomizePlanet(par)
    }, 
    function(error){
        console.log('Resultant error: ' + error)
    })
}

//Handle Pickle Rick event, prevent page reload, clears html values, ajax request, 
//that value then sent to pickleRandomizePlanet function
function handlePickleRick(evt){
    evt.preventDefault();
    $main.html('')
    $('#main').html('')
    $('#main_small').html('')
    $('#mainInfo').html('')

    $.ajax(URL).then(function(par){
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

//Calls page randomizer function, ajax request without user input, initiates render planet
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

//Render character images, contingencies in place for length === 0 for a message to come 
//up in place of the expected image, classes are made in the div and image html elements
//in the event that there are less than five characters due to formatting issues with CSS
function renderChars(evt){
    if (evt.length === 0){
        $('main').append('<p><strong>There are no permanent residents of this location</strong>')
    }

    if (evt.length < 5){
        for (let i = 0; i < evt.length; i++){
            $.ajax(evt[i]).then(function(name){
                $('#main_small').append(`<div class="location_small"><img class="location_small_images" src="${name.image}"</div>`)   
            })  
        }
    }else if (evt.length >= 5) {
        for (let i = 0; i < evt.length; i++){
        $.ajax(evt[i]).then(function(name){
            $('#main').append(`<div class="episode_div"><img class="episode_images" src="${name.image}"</div>`)   
        })  
    }}
}

function renderClickedChar(object){
    $.ajax(object.episode[0]).then(function(episode){
        $('#mainInfo').html(`
        <p class="imgInfo">Name: ${object.name}</p>
        <p class="imgInfo">First seen in: ${episode.name}</p>
        `)
    })
}