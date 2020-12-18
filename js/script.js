// {
//      "adult": false,
//      "backdrop_path": "/fq3wyOs1RHyz2yfzsb4sck7aWRG.jpg",
//      "genre_ids": [
//          12,
//          35,
//          878,
//          10751
//      ],
//      "id": 105,
//      "original_language": "en",
//      "original_title": "Back to the Future",
//      "overview": "Marty McFly è stato catapultato per errore nel 1955, grazie alla macchina del tempo ideata dal suo amico scienziato Doc. Non avendo più \"carburante\" per poter tornare nel futuro si rivolge alla versione più giovane di Doc, che nonostante l'incredulità iniziale si farà in quattro per aiutarlo. Ma nel 1955 non è solo Doc ad essere più giovane, Marty infatti si imbatte casualmente nei suoi genitori, all'epoca teenager, ma l'incontro aggiungerà altri problemi.",
//      "popularity": 48.943,
//      "poster_path": "/AkmUoSHkxW9txpzZ52gCcWweEkE.jpg",
//      "release_date": "1985-07-03",
//      "title": "Ritorno al futuro",
//      "video": false,
//      "vote_average": 8.3,
//      "vote_count": 14221
//  }
var root = new Vue({
  el: '#root',
  data: {
    searchString: '',
    movies: [],
    // moviesCovers: [],
    startImgSrc: 'https://image.tmdb.org/t/p/w220_and_h330_face/',
  },
  methods: {
    searchMovie: function () {
      console.log(this.searchString);
      this.movies = [],
          axios
          .get('https://api.themoviedb.org/3/search/movie?api_key=9465910b329a81a6e089bd8b3ea2ac56&query=' + this.searchString + '&language=it-IT')
          .then( (result) => {
            result.data.results.forEach((item, i) => {
              this.movies.push(item);
              console.log(item.poster_path);
              this.searchString = '';
            }
          );
        }
      );
    }
  }
});
