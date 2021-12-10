const $test = $.ajax('https://rickandmortyapi.com/api/character/?name=rick')
const $main = $('main')
console.log($test)


$test.then(render)

function render(evt){
    $main.html(`
        <p>Name: ${evt.results[0].name}</p>
        <p>Species: ${evt.results[0].species}</p>
        <p>Status: ${evt.results[0].status}</p>
        <div><img src="${evt.results[0].image}"></div>
    `)
}