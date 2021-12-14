const $main = $('main')
const $input = $('input[type="text"]')
const $form = $('form')
const URL = 'https://rickandmortyapi.com/api/episode'
const URLname = 'https://rickandmortyapi.com/api/episode?name='

$form.on('submit', searchEpisode)

// console.log($.ajax('https://rickandmortyapi.com/api/character/1').then(function(test){
//     console.log(test.name)
// }))

function searchEpisode(event){
    event.preventDefault();
    let userValue = $input.val();
    if (userValue === '') return;
    $input.val('')

    $.ajax(URLname + userValue).then(function(par){
        //console.log(par)
        //console.log(par.results[0].characters)
        renderName(par)
        renderChars(par.results[0].characters)
    },
    function(error){
        console.log('Resultant error: ' + error)
    })
}

function renderName(evt){
    //console.log(evt.results[0].name)
    //console.log(evt)
    $main.html(`
        <p class="episodeTitle">Episode Name: ${evt.results[0].name}`)
        renderChars(evt)
}

function renderChars(evt){
    // console.log(evt)
    // console.log(evt.length)
    for (let i = 0; i < evt.length; i++){
        $.ajax(evt[i]).then(function(name){
            console.log(name.name)
            $('#main').append(`<div class="episode_div"><img class="episode_images" src="${name.image}"</div>`)
            
        })  
    }
}



// $.ajax(URL).then(function(evt){
//     console.log(evt)
//     //console.log(evt.info.pages)
//    for (let i = 1; i <= evt.info.pages; i++){
//        $.ajax(URL + '?page=' + i).then(function(par){
//            //console.log(par)
//             for (let j = 0; j < par.results.length; j++){
//                 console.log(par.results[j].name)
//            }
//        })
//    }
// })