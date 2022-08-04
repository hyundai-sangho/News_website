// 변수들
const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsDetails = document.getElementById("newsDetails");

// Array
let newsDataArr = [];

// apis
const API_KEY = "81ac4aeac23b48f8b004184377360170";
const HEADLINES_NEWS = `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`;
const GENERAL_NEWS = `https://newsapi.org/v2/top-headlines?country=kr&category=general&apiKey=${API_KEY}`;
const BUSINESS_NEWS = `https://newsapi.org/v2/top-headlines?country=kr&category=business&apiKey=${API_KEY}`;
const SPORTS_NEWS = `https://newsapi.org/v2/top-headlines?country=kr&category=sports&apiKey=${API_KEY}`;
const ENTERTAINMENT_NEWS = `https://newsapi.org/v2/top-headlines?country=kr&category=entertainment&apiKey=${API_KEY}`;
const TECHNOLOGY_NEWS = `https://newsapi.org/v2/top-headlines?country=kr&category=technology&apiKey=${API_KEY}`;
const SEARCH_NEWS = `https://newsapi.org/v2/everything?q=`;

const fetchHeadlines = async () => {
  newsType.innerHTML = "<h4 class='newsType'>일반 뉴스</h4>";

  const response = await fetch(HEADLINES_NEWS);
  newsDataArr = [];

  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    // handle errors
    console.log(response.status, response.statusText);
  }

  displayNews();
};

const fetchGeneralNews = async () => {
  newsType.innerHTML = "<h4 class='newsType'>일반 뉴스</h4>";

  const response = await fetch(GENERAL_NEWS);
  newsDataArr = [];

  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    // handle errors
    console.log(response.status, response.statusText);
  }

  displayNews();
};

const fetchBusinessNews = async () => {
  newsType.innerHTML = "<h4 class='newsType'>비지니스 뉴스</h4>";

  const response = await fetch(BUSINESS_NEWS);
  newsDataArr = [];

  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    // handle errors
    console.log(response.status, response.statusText);
  }

  displayNews();
};

const fetchSportsNews = async () => {
  newsType.innerHTML = "<h4 class='newsType'>스포츠 뉴스</h4>";

  const response = await fetch(SPORTS_NEWS);
  newsDataArr = [];

  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    // handle errors
    console.log(response.status, response.statusText);
  }

  displayNews();
};

const fetchEntertainmentNews = async () => {
  newsType.innerHTML = "<h4 class='newsType'>연예 뉴스</h4>";

  const response = await fetch(ENTERTAINMENT_NEWS);
  newsDataArr = [];

  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    // handle errors
    console.log(response.status, response.statusText);
  }

  displayNews();
};

const fetchTechnologyNews = async () => {
  newsType.innerHTML = "<h4 class='newsType'>과학 뉴스</h4>";

  const response = await fetch(TECHNOLOGY_NEWS);
  newsDataArr = [];

  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    // handle errors
  }

  displayNews();
};

const fetchQueryNews = async () => {
  newsType.innerHTML = `<h4 class='newsType'>검색: ${newsQuery.value}</h4>`;

  if (newsQuery.value === null) return;

  const response = await fetch(SEARCH_NEWS + encodeURIComponent(newsQuery.value) + "&apiKey=" + API_KEY);
  newsDataArr = [];

  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    // error handle
  }

  displayNews();
};

const displayNews = () => {
  newsDetails.innerHTML = "";

  if (newsDataArr.length == 0) {
    newsDetails.innerHTML = "<h5 class='newsType'>데이터가 존재하지 않습니다.</h5>";
    return;
  }

  newsDataArr.forEach((news) => {
    console.log(news);

    let date = news.publishedAt.split("T");

    let col = document.createElement("div");
    col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card imgBox";

    let card = document.createElement("div");
    card.className = "p-2";

    let image = document.createElement("img");
    image.src = news.urlToImage;

    let cardBody = document.createElement("div");
    let newsHeading = document.createElement("h5");

    newsHeading.className = "card-title";
    newsHeading.innerHTML = news.title;

    let dateHeading = document.createElement("h6");
    dateHeading.className = "text-primary";
    dateHeading.innerHTML = date[0];

    let description = document.createElement("p");
    description.className = "text-muted";
    description.innerHTML = news.description;

    let link = document.createElement("a");
    link.className = "btn btn-dark";
    link.setAttribute("target", "_blank");
    link.href = news.url;
    link.innerHTML = "더보기";

    cardBody.appendChild(newsHeading);
    cardBody.appendChild(dateHeading);
    cardBody.appendChild(description);
    cardBody.appendChild(link);

    card.appendChild(image);
    card.appendChild(cardBody);

    col.appendChild(card);

    newsDetails.appendChild(col);
  });
};

generalBtn.addEventListener("click", fetchGeneralNews);
businessBtn.addEventListener("click", fetchBusinessNews);
sportsBtn.addEventListener("click", fetchSportsNews);
entertainmentBtn.addEventListener("click", fetchEntertainmentNews);
technologyBtn.addEventListener("click", fetchTechnologyNews);
searchBtn.addEventListener("click", fetchQueryNews);
newsQuery.addEventListener("keypress", (이벤트) => {
  if (이벤트.key == "Enter") {
    fetchQueryNews();
  }
});

window.onload = () => {
  fetchHeadlines();
};
