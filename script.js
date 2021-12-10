const $test = $.ajax('https://rickandmortyapi.com/api/character/?name=rick')
console.log($test)


$test.then(function(evt){
    console.log(evt)
    console.log(evt.results[0].name)
    console.log(evt.results[0].species)
    console.log(evt.results[0].status)
})