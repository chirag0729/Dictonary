// get element
const input = document.querySelector('#input');
const searchBtn = document.getElementById('button-addon2');
const loader = document.getElementById('loader');
const iword = document.querySelector('.iword');
const word = document.querySelector('.word');
 const mean = document.querySelector('.meaning');

// Event listner for search button
searchBtn.addEventListener('click', getData);

function getData(e) {
   e.preventDefault();
   iword.textContent = '';
   word.textContent = '';
   mean.textContent = '';
   
//    get input data
   let inputWord = input.value;

//    call api get data
   if (inputWord === '') {
       alert ('Word is Required')
       return;
   }
   getApiData(inputWord);
}

// get data from api
async function getApiData(inputWord) {
    loader.style.display = 'block';
    const apiKey = `https://www.dictionaryapi.com/api/v3/references/learners/json/${inputWord}?key=a6d01f54-9cfd-4941-957b-55935e9f4c5d`;

    try {
        let response = await fetch(apiKey);
        let data = await response.json();

switch (true) {
    case (!data.length) :
        loader.style.display = 'none';
         iword.textContent = inputWord; 
         word.textContent = 'No Result Found';  
        break;

        case (typeof data[0] === 'string') :
            loader.style.display = 'none';
           iword.textContent = inputWord;
            let sHeading = document.createElement('h3');
            sHeading.textContent = 'Did You Mean ?'
            mean.appendChild(sHeading);
            data.forEach(element => {
              let suggetion = document.createElement('span');
              suggetion.classList.add('suggested');
              suggetion.textContent = element;
              mean.appendChild(suggetion);
              suggetion.addEventListener('click', () => {
                  input.value = element;
              })
            });
            break ; 

            default :
                loader.style.display = 'none';
                meaning = data[0].shortdef[0];
                iword.textContent = inputWord; 
                word.textContent = meaning;
                break ;     
}}
 catch (error) {
    // catch error here
}
}



