const form = document.getElementById('js-search-form');

form.addEventListener('submit',handleRequest);


async function handleRequest(event){

    //Prevent Page from relaoding
    event.preventDefault();
   
    //Get user search
    const inputBox = document.getElementById('js-search-input').value;

    //Trim the white space
    const searchQuery = inputBox.trim();

    //Call the searchWiki function
    searchWiki(searchQuery);
}


async function searchWiki(input){
    try {

        //API Link 
        const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${input}`
        const response = await fetch(endpoint);

        if(!response.ok){
            throw Error(response.statusText);
        }
        const data = await response.json();

        //Clear the output of the last searchQuery
        const resultSection = document.getElementById('js-search-results');
        resultSection.innerHTML = '';

        //Call function that displays the searchQuery
        displayWiki(data);
    }catch (error) {
        console.log(error);
        alert('Failed to fetch the data');
    }
}


function displayWiki(data){

    
    console.log(data);

    const resultSection = document.getElementById('js-search-results');


    //Iterate through each result from the searchQuery
    data.query.search.forEach(data =>{

    
    const dataContainer = document.createElement('div');
    dataContainer.className = 'result-item';

    const searchTitle = document.createElement('h3');
    searchTitle.className = 'result-title';
    searchTitle.innerText = data.title;

    const searchLink = document.createElement('a');
    searchLink.setAttribute('href',`https://en.wikipedia.org/?curid=${data.pageid}`);
    searchLink.innerText = searchTitle.innerText;

    const searchLinkView = document.createElement('a');
    searchLinkView.setAttribute('href',`https://en.wikipedia.org/?curid=${data.pageid}`);
    searchLinkView.className = 'result-link';
    searchLinkView.innerText = `https://en.wikipedia.org/?curid=${data.pageid}`;

    const snippetText = document.createElement('span');
    snippetText.className = 'result-snippet'
    snippetText.innerHTML = data.snippet;

    resultSection.appendChild(dataContainer);
    dataContainer.appendChild(searchLink);
    dataContainer.appendChild(searchLinkView);
    dataContainer.appendChild(snippetText);
    
    });

}

