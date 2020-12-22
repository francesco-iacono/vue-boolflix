var root = new Vue({
  el: '#root',
  data: {
    searchString: '',
    movies: [],
    tvShows: [],
    allCollections: [],
    startImgSrc: 'https://image.tmdb.org/t/p/w220_and_h330_face/',
  },
  methods: {
    searchMovie: function () {
          this.movies = [],
          axios
          .get('https://api.themoviedb.org/3/search/movie',{
            params: {
            api_key:'9465910b329a81a6e089bd8b3ea2ac56',
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
        }
      );
      this.tvShows = [],
      axios
          .get('https:api.themoviedb.org/3/search/tv',{
            params: {
            api_key:'9465910b329a81a6e089bd8b3ea2ac56',
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
          // unire gli array
          this.allCollections = [...this.movies,...this.tvShows];
          // ordinare in base alla popolarità
          this.allCollections.sort((a, b) => {
          return parseInt(b.popularity) - parseInt(a.popularity);
          });
          this.allCollections = [...this.movies,...this.tvShows];
          this.searchString = '';
        }
      );
    }
  },
  mounted: function () {
        axios
        .get('https://api.themoviedb.org/3/search/movie',{
          params: {
          api_key:'9465910b329a81a6e089bd8b3ea2ac56',
          query: 'suits',
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
      }
    );
    axios
        .get('https:api.themoviedb.org/3/search/tv',{
          params: {
          api_key:'9465910b329a81a6e089bd8b3ea2ac56',
          query: 'suits',
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
        console.log('Film',this.movies);
        console.log('Serie',this.tvShows);
        // unire gli array
        this.allCollections = [...this.movies,...this.tvShows];
        // ordinare in base alla popolarità
        this.allCollections.sort((a, b) => {
        return parseInt(b.popularity) - parseInt(a.popularity);
        });
        console.log('Collections', this.allCollections);
        this.searchString = '';
      }
    );
  }
});


// FUNZIONI---------------------------------------------------
