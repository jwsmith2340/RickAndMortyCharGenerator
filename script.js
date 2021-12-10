const $main = $('main')
const $input = $('input[type="text"]')
const $form = $('form')

$form.on('submit', function(event){
    event.preventDefault();
    if (!$input.val()) return;
    const userValue = $input.val();
    console.log(userValue)
})










//const $test = $.ajax('https://rickandmortyapi.com/api/character/?name=rick')
//$test.then(render)

// function render(evt){
//     $main.html(`
//         <p>Name: ${evt.results[0].name}</p>
//         <p>Species: ${evt.results[0].species}</p>
//         <p>Status: ${evt.results[0].status}</p>
//         <div><img src="${evt.results[0].image}"></div>
//     `)
// }