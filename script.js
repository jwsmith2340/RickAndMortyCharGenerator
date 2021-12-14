//Global variable declarations
const $main = $('main')
const $input = $('input[type="text"]')
const $form = $('form')
const URL = 'https://rickandmortyapi.com/api/character/?name='
const pageURL = 'https://rickandmortyapi.com/api/character/?page=';
let allCharactersArray = []
let nameArray = []
let page;
const idURL = 'https://rickandmortyapi.com/api/character/'

//Copying names of all characters to array for pickle rick button function
// allCharactersArray = ($.ajax(pageURL).then(function(evt){
//     const pageLength = evt.info.pages
//     nameArray;
//     for (let i = 1; i <= pageLength; i++){
//         $.ajax(pageURL + i).then(function(evt2){
//             for (let j = 0; j < pageLength; j++){
//                 nameArray.push(evt2.results[j].name)                
//             }
//         })
//     }
// }))

//Event initiation
$form.on('submit', handleSubmit)   //Form submit event
$('#pickleRick').on('click', handleRandomEvent) //Pickle Rick event

//Function Block

//Input Submit - Render retrieved values to HTML
function render(evt){ 
    let randomIndex = arrayRandomizer(evt);
    $main.html(`
        <p>Name: ${evt.results[randomIndex].name}</p>
        <p>Species: ${evt.results[randomIndex].species}</p>
        <p>Status: ${evt.results[randomIndex].status}</p>
        <div><img src="${evt.results[randomIndex].image}"></div>
    `)
}
//Pickle Rick - Render retrieved values to HTML
function renderRandom(randEvt){  
    $main.html(`
        <p>Name: ${randEvt.name}</p>
        <p>Species: ${randEvt.species}</p>
        <p>Status: ${randEvt.status}</p>
        <div><img src="${randEvt.image}"></div>
    `)
}

//Handle submit button, prevent page reload, require user input text, and assign
//The user's val to a local variable to be used to concatonate the URL for AJAX request
//Input field is then cleared, ajax retrieval initiates render(), error contingency in place
function handleSubmit(event){
    event.preventDefault();
    if (!$input.val()) return; 
    const userValue = $input.val(); 
    $input.val(''); 

    $.ajax(URL + userValue).then(function(param){
        //console.log(param)
        pageRandom(param.info.pages);
        $.ajax(pageURL + page + '&name=' + userValue).then(function(finalParam){
            render(finalParam);
        })
        
    },
    function(error){
        console.log('Resultant error: ' + error);
        backupFunction();
    })
}
//Handle Pickle Rick event, prevent page reload, generate random number based on 
//the length of all characters in the API, add random number to URL, search, for 
//that character via promise, then call renderRandom function.
function handleRandomEvent(listener){
    listener.preventDefault();
    let randomNum = Math.floor(Math.random() * 827)

    $.ajax(idURL + randomNum).then(function(par){
        console.log(par)
        renderRandom(par)
    },
    function(error){
        console.log('Resultant error: ' + error)
        backupFunction();
    })
}

//Arrays for characters are different lengths, this code block returns a random number within
//the range for each character selected so the full catalog can be accessed at random. 
function arrayRandomizer(eo){
    let randomLength = eo.results.length 
    let randomIndex = Math.floor(Math.random() * randomLength); 
    return randomIndex;
}

//Handles Error 404s by returning a set character
function backupFunction() {
    $.ajax(URL + 'pickle+rick').then(function(pa){
        renderRandom(pa)
    })
}

//Takes the page length value from the event object and picks a random number based on that length
function pageRandom(pages){
    page = Math.floor(Math.random() * (pages - 1) + 1)    
}