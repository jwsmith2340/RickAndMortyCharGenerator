//Global variable declarations
const $main = $('main')
const $input = $('input[type="text"]')
const $form = $('form')
const URL = 'https://rickandmortyapi.com/api/character/?name='

//Event initiation
$form.on('submit', handleSubmit)
// for (let i = 0; i < 1000; i ++){
//     let array = []
//     array[i] = randomIndex;
//     console.log(array[i])
//     if (array[i] > 19 || array[i] < 0){
//         alert('problem')
//     }
// }


function render(evt){ 
    let randomIndex = arrayRandomizer(evt);
        
    $main.html(`
    <p>Name: ${evt.results[randomIndex].name}</p>
    <p>Species: ${evt.results[randomIndex].species}</p>
    <p>Status: ${evt.results[randomIndex].status}</p>
    <div><img src="${evt.results[randomIndex].image}"></div>
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

function arrayRandomizer(eo){
    let randomLength = eo.results.length //Random return of array value, all names are stored in an array, 
    let randomIndex = Math.floor(Math.random() * randomLength); //so this is how they can be accessed
    return randomIndex;
}