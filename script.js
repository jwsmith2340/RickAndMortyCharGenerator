// //Global variable declarations
// const $main = $('main')
// const $input = $('input[type="text"]')
// const $form = $('form')
// const URL = 'https://rickandmortyapi.com/api/character/?name='

// //Event initiation
// $form.on('submit', handleSubmit)

// //Function Block

// //Render retrieved values to HTML
// function render(evt){ 
//     let randomIndex = arrayRandomizer(evt);
        
//     $main.html(`
//         <p>Name: ${evt.results[randomIndex].name}</p>
//         <p>Species: ${evt.results[randomIndex].species}</p>
//         <p>Status: ${evt.results[randomIndex].status}</p>
//         <div><img src="${evt.results[randomIndex].image}"></div>
//     `)
// }

// //Handle submit button, prevent page reload, require user input text, and assign
// //The user's val to a local variable to be used to concatonate the URL for AJAX request
// //Input field is then cleared, ajax retrieval initiates render(), error contingency in place
// function handleSubmit(event){
//     event.preventDefault();
//     if (!$input.val()) return; 
//     const userValue = $input.val(); 
//     $input.val(''); 

//     $.ajax(URL + userValue).then(function(param){
//         render(param);
//     },
//     function(error){
//         //console.log('Resultant error: ' + error);
//     })
// }

// //Arrays for characters are different lengths, this code block returns a random number within
// //the range for each character selected so the full catalog can be accessed at random. 
// function arrayRandomizer(eo){
//     let randomLength = eo.results.length 
//     let randomIndex = Math.floor(Math.random() * randomLength); 
//     return randomIndex;
// }


//Overcoming Pagination Limiting My Searches (Hopefully)
const pageURL = 'https://rickandmortyapi.com/api/character/?page=';
//console.log($.ajax('https://rickandmortyapi.com/api/character'));
//let allNames = [];
let allCharactersArray = []
let nameArray = []

allCharactersArray = ($.ajax(pageURL).then(function(evt){
    const pageLength = evt.info.pages
    nameArray;
    for (let i = 1; i <= pageLength; i++){
        $.ajax(pageURL + i).then(function(evt2){
            for (let j = 0; j < pageLength; j++){
                nameArray.push(evt2.results[j].name)                
            }
        })
    }
}))

$('form').on('submit', function(event){
    event.preventDefault();
    console.log(nameArray.length)
    let randomNum = Math.floor(Math.random() * nameArray.length)
    console.log(randomNum);
    console.log(nameArray[randomNum])
    //console.log(nameArray);
    //nameArray.forEach(nm => console.log(nm))  LOGS ALL 800 SOME ODD CHARACTERS
    
    // let soughtChar = [];         DOES NOT WORK
    // soughtChar = nameArray.map(function(id){
    //     if (id == 'rick'){
    //         console.log(id);  
    //     }
    // })
    // console.log(soughtChar)

    
    
}
)

$('#pickleRick').on('click', function(listener){
    alert('clicked')
})