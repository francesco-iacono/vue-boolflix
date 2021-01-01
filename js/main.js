var root = new Vue({
  el: '#root',
  data: {
    clickSerach: false, //open input-search con cilck su icon
    clickMenu: false, //open menu responsive
    clickHamburgerMenu: false, //open menu nav responsive
    searchString: '', //parola di ricerca
    apiKey: '9465910b329a81a6e089bd8b3ea2ac56',
    movies: [],
    tvShows: [],
    allCollections: [],
    startImgSrc: 'https://image.tmdb.org/t/p/w220_and_h330_face/', //img URL
    genres: [],
    selectedGenre: 'Generi'
  },
  methods: {
    openMenu: function () { //open menu responsive
      if (this.clickMenu == false) {
          this.clickMenu = true;
      } else {
          this.clickMenu = false;
      }
    },
    openInput: function () { //open input-search con cilck su icon
      if (this.clickSerach == false) {
          this.clickSerach = true;
      } else {
          this.clickSerach = false;
      }
    },
    openHamburgerMenu: function () { //open menu nav responsive
      if (this.clickHamburgerMenu == false) {
          this.clickHamburgerMenu = true;
      } else {
          this.clickHamburgerMenu = false;
      }
    },
    mouseLeave: function () { //close menu mouseLeave
        this.clickMenu = false;
        this.clickHamburgerMenu = false;
    },
    searchMovie: function () { //ricerca film
      let self = this;
      self.allCollections = [];
      self.movies = [];
      self.tvShows = [];
        if (self.searchString != '') {
          Promise.all([
          // API MOVIES
          axios.get('https://api.themoviedb.org/3/search/movie',{
                params: {
                  api_key: self.apiKey,
                  query: self.searchString,
                  language: 'it-IT'
                }
              }),
          // API SERIE
          axios.get('https:api.themoviedb.org/3/search/tv',{
                params: {
                  api_key: self.apiKey,
                  query: self.searchString,
                  language: 'it-IT'
                }
              }),
          // API GENERI
          axios.get('https://api.themoviedb.org/3/genre/movie/list', {
                params: {
                  api_key: self.apiKey,
                  language:"it-IT",
                }
              }),
            ])
              .then( (result) => {
                self.allCollections = [];
                self.movies = [];
                setTimeout( () => {
                  //FILM
                  result[0].data.results.forEach((item, i) => {
                    let voteStar = Math.ceil(item.vote_average / 2);
                    let voteEmpty = 5 - voteStar;
                    const newObjVote = {...item, voteStar: voteStar, voteEmpty: voteEmpty}
                    self.movies.push(newObjVote);
                    let nameGenres = [];
                    self.getGenres(item, result[2].data.genres, nameGenres);
                      nameGenres.forEach((item, i) => {
                        if (!self.genres.includes(item)) {
                          self.genres.push(item)
                        }
                      });
                    }
                  );
                  //SERIE TV
                  self.tvShows = [];
                  result[1].data.results.forEach((item, i) => {
                    let voteStar = Math.ceil(item.vote_average / 2);
                    let voteEmpty = 5 - voteStar;
                    const newObjVote = {...item, voteStar: voteStar, voteEmpty: voteEmpty}
                    self.tvShows.push(newObjVote);
                    let nameGenres = [];
                    self.getGenres(item, result[2].data.genres, nameGenres);
                      nameGenres.forEach((item, i) => {
                        console.log(item);
                        if (!self.genres.includes(item)) {
                          self.genres.push(item);
                        }
                      });
                    }
                  );
                  self.genres.sort();
                  console.log(self.genres);
                self.allCollections = [...self.movies,...self.tvShows];
                // console.log(self.movies);
                // console.log(self.tvShows);
                // console.log(self.allCollections);
              }, 1000)
            }
          )
        }
    },
    getGenres: function (element, arrayIdgeneres, nameGenres) { //Generi
      arrayIdgeneres.forEach( (item, i) => {
        element.genre_ids.forEach( (itemGenrs, i) => {
          if (item.id == itemGenrs){
            nameGenres[nameGenres.length] = item.name;
          }
        });
        element.genre = nameGenres;
      });
      return element;
    },
  }
});
