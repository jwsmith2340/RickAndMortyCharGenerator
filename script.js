//Global variable declarations
const $main = $('main')
const $input = $('input[type="text"]')
const $form = $('form')
const URL = 'https://rickandmortyapi.com/api/character/?name='

//Event initiation
$form.on('submit', handleSubmit)

//const $test = $.ajax('https://rickandmortyapi.com/api/character/?name=rick')
//$test.then(render)

function render(evt){
    $main.html(`
    <p>Name: ${evt.results[0].name}</p>
    <p>Species: ${evt.results[0].species}</p>
    <p>Status: ${evt.results[0].status}</p>
    <div><img src="${evt.results[0].image}"></div>
    `)
}

function handleSubmit(event){
    event.preventDefault(); //prevent page reload
    if (!$input.val()) return; //user must input text
    const userValue = $input.val(); //assigning user input so we can clear text box
    //console.log(userValue)
    $input.val(''); //clears the input field

    $.ajax(URL + userValue).then(function(param){
        render(param);
    },
    function(error){
        console.log('Resultant error: ' + error);
    })
}