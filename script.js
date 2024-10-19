const API_KEY  = "5816e46a6a1b496ca06ba53a449f02f9"
const url = "https://newsapi.org/v2/everything?q="


window.addEventListener('load', () => fetchNews('India'));

function reload() {
   window.location.reload();
}

async function fetchNews(query) {
   const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
   const data = await res.json();
   bindData(data.articles);
}

function bindData(articles) {
   const cardContainer = document.getElementById('card-container');
   const newsCardTemplate = document.getElementById('template-news-card');

   cardContainer.innerHTML = '';

   articles.forEach(article => {
      if(!article.urlToImage) return;
      const cardClone = newsCardTemplate.content.cloneNode(true);
      fillDataInCard(cardClone, article);
      cardContainer.appendChild(cardClone);

   });
}

function fillDataInCard(cardClone, article) {
   const newsImg = cardClone.querySelector('#news-image');
   const newsTitle = cardClone.querySelector('#news-title');
   const newsSource = cardClone.querySelector('#news-source');
   const newsdesc = cardClone.querySelector('#news-desc');

   newsImg.src = article.urlToImage;
   newsTitle.innerHTML = article.title;
   newsdesc.innerHTML = article.description;

   const date = new Date(article.publishedAt).toLocaleString("en-US", {
      timeZone: "asia/jakarta"
   });

   newsSource.innerHTML = `${article.source.name} . ${date}`;

   cardClone.firstElementChild.addEventListener("click", () => {
      window,open(article.url,"_blank");
   });
}

let curSelectedNav = null;
function onNavItemClick(id) {
   fetchNews(id);
   const navItems = document.getElementById(id);
   curSelectedNav?.classList.remove('active');
   curSelectedNav = navItems;
   curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-input');

searchButton.addEventListener("click", () => {
   const query = searchText.value;
   if (!query) return;
   fetchNews(query);
   curSelectedNav?.classList.remove('active');
   curSelectedNav = null;
});