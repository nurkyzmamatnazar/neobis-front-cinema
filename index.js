const APIKEY = '7323c461-bca7-43e3-8e97-37fd05986f86';
const baseUrl = `https://kinopoiskapiunofficial.tech`;

const urlPremieres = `${baseUrl}/api/v2.2/films/premieres?year=2024&month=MAY&`;
const urlExpected = `${baseUrl}/api/v2.2/films/collections?type=CLOSES_RELEASES&page=1`;
const urlBest = `${baseUrl}/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1`;
const urlReliz = `${baseUrl}/api/v2.1/films/releases?year=2024&month=MAY&page=1`;

const premieres = document.getElementById('premieres');
const expected = document.getElementById('expected');
const best = document.getElementById('best');
const reliz = document.getElementById('reliz');


premieres.addEventListener('click', () => {
  get(urlPremieres);
});

expected.addEventListener('click', () => {
  get(urlExpected);
});

best.addEventListener('click', () => {
  get(urlBest);
});

reliz.addEventListener('click', () => {
  get(urlReliz);
});

const get = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
        'X-API-KEY': APIKEY,
        'Content-Type': 'application/json',
    },
});

  const moviesTop = await response.json();
  // console.log(moviesTop);
  showMovies(moviesTop);
};

const showMovies = (data) => {
  const movies = document.querySelector('.movies');

  for (let i = 0; i < 10; i++) {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie');
    movieCard.innerHTML = `
    <div class="movie__cover-inner">
        <img
          src="${data.items[i].posterUrlPreview}"
          class="movie__cover"
          alt="${data.items[i].nameRu}"
        />
        <div class="movie__cover--darkened"></div>
      </div>
      <div class="movie__info">
        <div class="movie__title">${data.items[i].nameRu}</div>
        <div class="movie__category">${data.items[i].genres.map(
          (genre) => ` ${genre.genre}`
        )}</div>
        ${
          data.items[i].rating &&
          `
        <div class="movie__average movie__average--${getClassByRate(
          data.items[i].rating
        )}">${data.items[i].rating}</div>
        `
        }
      </div>
    `;
    movies.appendChild(movieCard);
  }
};

// const getClassByRate = () => {
  
// };

// const searchInput = document.getElementById('search');

// searchInput.addEventListener('keydown', e => {
//   e.preventDefault();
//   const query = e.target.value;
// });


