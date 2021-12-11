//Global variable declarations
const $main = $('main')
const $input = $('input[type="text"]')
const $form = $('form')
const URL = 'https://rickandmortyapi.com/api/character/?name='

//Event initiation
$form.on('submit', handleSubmit)

//Function Block

//Render retrieved values to HTML
function render(evt){ 
    let randomIndex = arrayRandomizer(evt);
        
    $main.html(`
        <p>Name: ${evt.results[randomIndex].name}</p>
        <p>Species: ${evt.results[randomIndex].species}</p>
        <p>Status: ${evt.results[randomIndex].status}</p>
        <div><img src="${evt.results[randomIndex].image}"></div>
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
        render(param);
    },
    function(error){
        console.log('Resultant error: ' + error);
    })
}

//Arrays for characters are different lengths, this code block returns a random number within
//the range for each character selected so the full catalog can be accessed at random. 
function arrayRandomizer(eo){
    let randomLength = eo.results.length 
    let randomIndex = Math.floor(Math.random() * randomLength); 
    return randomIndex;
}