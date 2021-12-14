//GLOBAL VARIABLE DECLARATIONS
const $main = $('main')
const $input = $('input[type="text"]')
const $form = $('form')
const URL = 'https://rickandmortyapi.com/api/episode/'
const URLname = 'https://rickandmortyapi.com/api/episode?name='

//EVENT INITIATION
$form.on('submit', searchEpisode)
$('#pickleRick').on('click', randomEpisode)

//FUNCTION BLOCK

//Handle submit button, prevent page reload, require user input text, and assign
//The user's val to a local variable to be used to concatonate the URL for AJAX request
//Input field is then cleared, ajax retrieval initiates render(), error contingency in place
function searchEpisode(event){
    event.preventDefault();
    $('#main').html('');
    let userValue = $input.val();
    if (userValue === '') return;
    $input.val('')

    $.ajax(URLname + userValue).then(function(par){
        renderName(par)
        renderChars(par.results[0].characters)
    },
    function(error){
        console.log('Resultant error: ' + error)
    })
}

//Handle Pickle Rick event, prevent page reload, generate random number based on 
//the length of all characters in the API, add random number to URL, search, for 
//that character via promise, then call renderRandom function.
function randomEpisode(event){
    event.preventDefault();
    $('#main').html('');
    let random = Math.floor(Math.random() * 52)
    //console.log(random)
    $.ajax(URL + random).then(function(evt){
        renderRandom(evt)
        //console.log(evt.characters)
        renderChars(evt.characters)
    },
    function(error){
        console.log('Resultant error: ' + error)
    })
}

//Input Submit - Render episode name and populate value to main
function renderName(evt){
    $main.html(`
        <p class="episodeTitle">Episode Name: <strong>${evt.results[0].name}</strong>`)
        renderChars(evt)
}

//Input Submit and Pickle Rick - Render character list, populate images to HTML, limit to 28 returns
function renderChars(evt){
    // console.log(evt)
    // console.log(evt.length)
    for (let i = 0; i < evt.length; i++){
        if (i === 28){ return;}
        $.ajax(evt[i]).then(function(name){
            console.log(name.name)
            $('#main').append(`<div class="episode_div"><img class="episode_images" src="${name.image}"</div>`)   
        })  
    }
}

//Input Pickle Rick - Render episode name and populate value to main
function renderRandom(num){
    $main.html(`
    <p class="episodeTitle">Episode Name: ${num.name}`)
}