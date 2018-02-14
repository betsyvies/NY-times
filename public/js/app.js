const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

// Inicializamos al objeto en una variable
form.addEventListener('submit', function(e) {
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  getNews();
});

function getNews() {
  const articleRequest =  new XMLHttpRequest();
  articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=347d672874fd431eb13860e1a3f4d50b`);
  articleRequest.onload = addNews;
  articleRequest.onerror = handleError;
  articleRequest.send();
}

function handleError() {
  console.log('An error has occurred');
}

function addNews() {
  const data = JSON.parse(this.responseText);
  const article = data.response.docs;

  article.forEach(function(element) {
    const title = element.headline.main;
    const snippet = element.snippet;
    const imgUrl = element.multimedia[2].url;
    const webUrl = element.web_url;
  
    let h1 = document.createElement('h1');
    let img = document.createElement('img');
    let text = document.createElement('p');
    let link = document.createElement('a');
    let div = document.createElement('div');

    text.className = 'articleClass';
    img.className = 'imgClass';
    h1.className = 'title';
    link.className = 'link';
    div.className = 'container';

    text.innerHTML = snippet;
    img.setAttribute('src', 'https://static01.nyt.com/' + imgUrl);
    link.setAttribute('href', webUrl);
    link.textContent = 'Read more';
    h1.innerHTML = title; 

    div.appendChild(h1);
    div.appendChild(img);
    div.appendChild(text);
    div.appendChild(link);
  
    responseContainer.appendChild(div);
  });
}