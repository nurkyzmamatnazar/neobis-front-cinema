const APIKEY = '7323c461-bca7-43e3-8e97-37fd05986f86';
const baseUrl = `https://kinopoiskapiunofficial.tech`;

const searchInput = document.getElementById('search');

searchInput.addEventListener('change', e => {
  e.preventDefault();
  const query = e.target.value;
  const urlSearch = `${baseUrl}/api/v2.1/films/search-by-keyword?keyword=${query}&page=1`;
  getMovies(urlSearch);
});


const urlPremieres = `${baseUrl}/api/v2.2/films/premieres?year=2024&month=MAY&`;
const urlExpected = `${baseUrl}/api/v2.2/films/collections?type=CLOSES_RELEASES&page=1`;
const urlBest = `${baseUrl}/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1`;
const urlReliz = `${baseUrl}/api/v2.1/films/releases?year=2024&month=MAY&page=1`;

const premieres = document.getElementById('premieres');
const expected = document.getElementById('expected');
const best = document.getElementById('best');
const reliz = document.getElementById('reliz');
const saved = document.getElementById('saved');

premieres.addEventListener('click', (event) => {
  event.preventDefault();
  getMovies(urlPremieres);
});

expected.addEventListener('click', (event) => {
  event.preventDefault();
  getMovies(urlExpected);
});

best.addEventListener('click', (event) => {
  event.preventDefault();
  getMovies(urlBest);
});

reliz.addEventListener('click', (event) => {
  event.preventDefault();
  getMovies(urlReliz);
});

saved.addEventListener('click', (event) => {
  event.preventDefault();
  handleFav();
});


const getMovies = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-API-KEY': APIKEY,
      'Content-Type': 'application/json',
    },
  });

  const movies = await response.json();
  showMovies(movies);
};

const getClassByRate = (rating) => {
   if (rating >= 7) {
    return "green";
  } else if (rating > 5) {
    return "orange";
  } else {
    return "red";
  }
};


const savedArr = [];

const handleFav = async () => {
  let favs = JSON.parse(localStorage.getItem('favs')) || [];

  for (let fav of favs) {
    const urlSaved = `${baseUrl}/api/v2.2/films/${fav}`;

    const response = await fetch(urlSaved, {
      method: 'GET',
      headers: {
        'X-API-KEY': APIKEY,
        'Content-Type': 'application/json',
      },
    });

    const movie = await response.json();
    savedArr.unshift(movie);
  }
  showFavs(savedArr);
};

const updateFav = () => {
  let favs = JSON.parse(localStorage.getItem('favs')) || [];
  const buttons = document.querySelectorAll('.movie__save');

  buttons.forEach(button => {
    const movieId = button.getAttribute('id');
    if (favs.includes(movieId)) {
      button.querySelector('i').style.color = '#ff0000';
    }
  });
};

const showFavs = async (data) => {
  const moviesBlock = document.querySelector('.movies');
  moviesBlock.innerHTML = '';

  data.forEach(movie => {
    const id = movie.kinopoiskId || movie.filmId;
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
        <button class="movie__save" id="${id}">
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

    const button = movieCard.querySelector('.movie__save');

    button.addEventListener('click', () => {
      const movieId = button.getAttribute('id');
      let favs = JSON.parse(localStorage.getItem('favs')) || [];

      if (favs.includes(movieId)) {
        favs = favs.filter(id => id !== movieId);
        button.querySelector('i').style.color = "#FFFFFF";
      } else {
        favs.unshift(movieId);
        button.querySelector('i').style.color = "#FF0000";
      }

      localStorage.setItem('favs', JSON.stringify(favs));
    });

  });
  updateFav();
};


const showMovies = async (data) => {
  const moviesBlock = document.querySelector('.movies');
  moviesBlock.innerHTML = '';
  const movies = data.items || data.films || data.releases;
  
  movies.forEach(movie => {
    const id = movie.kinopoiskId || movie.filmId;
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
        <button class="movie__save" id="${id}">
          <i class="fa-solid fa-heart fa-xl class="movie__fav""></i>
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

    const button = movieCard.querySelector('.movie__save');
    button.addEventListener('click', () => {
      const movieId = button.getAttribute('id');
      let favs = JSON.parse(localStorage.getItem('favs')) || [];

      if (favs.includes(movieId)) {
        favs = favs.filter(id => id !== movieId);
        button.querySelector('i').style.color = "#FFFFFF";
      } else {
        favs.unshift(movieId);
        button.querySelector('i').style.color = "#FF0000";
      }

      localStorage.setItem('favs', JSON.stringify(favs));
    });

  });
  updateFav();
};