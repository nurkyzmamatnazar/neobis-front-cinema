const APIKEY = '7323c461-bca7-43e3-8e97-37fd05986f86';
const baseUrl = `https://kinopoiskapiunofficial.tech`;

const searchInput = document.getElementById('search');

searchInput.addEventListener('change', e => {
  e.preventDefault();
  const query = e.target.value;
  const urlSearch = `${baseUrl}/api/v2.1/films/search-by-keyword?keyword=${query}&page=1`;
  get(urlSearch);
});

const urlPremieres = `${baseUrl}/api/v2.2/films/premieres?year=2024&month=MAY&`;
const urlExpected = `${baseUrl}/api/v2.2/films/collections?type=CLOSES_RELEASES&page=1`;
const urlBest = `${baseUrl}/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1`;
const urlReliz = `${baseUrl}/api/v2.1/films/releases?year=2024&month=MAY&page=1`;

const premieres = document.getElementById('premieres');
const expected = document.getElementById('expected');
const best = document.getElementById('best');
const reliz = document.getElementById('reliz');

premieres.addEventListener('click', (event) => {
  event.preventDefault();
  get(urlPremieres);
});

expected.addEventListener('click', (event) => {
  event.preventDefault();
  get(urlExpected);
});

best.addEventListener('click', (event) => {
  event.preventDefault();
  get(urlBest);
});

reliz.addEventListener('click', (event) => {
  event.preventDefault();
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

  const movies = await response.json();
  showMovies(movies);
  console.log(movies);
};

// const getRateById = async (id) => {
//   const response = await fetch(baseUrl + id, {
//     method: 'GET',
//     headers: {
//       'X-API-KEY': '7323c461-bca7-43e3-8e97-37fd05986f86',
//       'Content-Type': 'application/json',
//     },
//   });
  
//   const movieInfo = await response.json();
//   const movieRate = movieInfo.ratingImdb;
//   return movieRate;
// };

const getClassByRate = (rating) => {
   if (rating >= 7) {
    return "green";
  } else if (rating > 5) {
    return "orange";
  } else {
    return "red";
  }
};

const showMovies = async (data) => {
  const moviesBlock = document.querySelector('.movies');
  moviesBlock.innerHTML = '';
  const movies = data.items || data.films || data.releases;
  
  console.log(movies);

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie');
    movieCard.innerHTML = `
      <div class="movie__cover-inner">
        <img
          src="${movie.posterUrlPreview}"
          class="movie__cover"
          alt="${movie.nameRu}"
        />
        <div class="movie__cover_darkened"></div>      
      </div>

      <div class="movie__info">
      <div class="movie__title-block">
        <div class="movie__title">${movie.nameRu}</div>
        <button class="movie__saved">
          <i class="fa-solid fa-heart fa-xl"></i>
        </button>
      </div>
        <div class="movie__category">
        ${movie.genres.map((genre) => `${genre.genre}`)}
        </div>

        ${movie.rating ? `
        <div class="movie__average movie__average_${getClassByRate(movie.rating)}">
        ${movie.rating}
        </div>` : ''
        }
      </div>
    `;
    moviesBlock.appendChild(movieCard);
  });
};

