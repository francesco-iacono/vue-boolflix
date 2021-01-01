var root = new Vue({
  el: '#root',
  data: {
    clickSerach: false,
    searchString: '',
    apiKey: '9465910b329a81a6e089bd8b3ea2ac56',
    movies: [],
    tvShows: [],
    allCollections: [],
    startImgSrc: 'https://image.tmdb.org/t/p/w220_and_h330_face/',
  },
  methods: {
    openInput: function () {
      if (this.clickSerach == false) {
          this.clickSerach = true;
      } else {
          this.clickSerach = false;
      }
    },
    searchMovie: function () {
      setTimeout( () => {
        if (!this.searchString == '') {
          this.movies = [];
          this.tvShows = [];
          this.allCollections = [];
          Promise.all([
          axios.get('https://api.themoviedb.org/3/search/movie',{
                params: {
                api_key: this.apiKey,
                query: this.searchString,
                language: 'it-IT'
              }})
              .then( (result) => {
                result.data.results.forEach((item, i) => {
                  let voteStar = Math.ceil(item.vote_average / 2);
                  let voteEmpty = 5 - voteStar;
                  const newObjMovie = {...item, voteStar: voteStar, voteEmpty: voteEmpty}
                  this.movies.push(newObjMovie);
                }
              );
              this.allCollections = this.allCollections.concat(this.movies);
            }
          )])
          Promise.all([
          axios.get('https:api.themoviedb.org/3/search/tv',{
                params: {
                api_key: this.apiKey,
                query: this.searchString,
                language: 'it-IT'
              }})
              .then( (result) => {
                result.data.results.forEach((item, i) => {
                  let voteStar = Math.ceil(item.vote_average / 2);
                  let voteEmpty = 5 - voteStar;
                  const newObjTvShow = {...item, voteStar: voteStar, voteEmpty: voteEmpty}
                  this.tvShows.push(newObjTvShow);
                }
              );
              // console.log('Film',this.movies);
              // console.log('Serie',this.tvShows);
              // unire gli array
              this.allCollections = this.allCollections.concat(this.tvShows);
              // ordinare in base alla popolarità
              this.allCollections.sort((a, b) => {
              return parseInt(b.popularity) - parseInt(a.popularity);
              });
              // console.log('Collections', this.allCollections);
            }
          )])
        }
       }, 1000)
    }
  }
});


// FUNZIONI---------------------------------------------------
