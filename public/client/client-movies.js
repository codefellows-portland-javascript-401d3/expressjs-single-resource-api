(function(module){
  const movies = {};

  movies.populate = function () {
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(token);

    superagent
      .get('/movies')
      .set({token})
      .end((err, res) => {
        const movies = JSON.parse(res.text);
        console.log(movies);
        //append all movies to movies select
        movies.forEach(e => {
          $('#movieSelect').append(`<option value="${e._id}">${e.title}</option>`);
        });

      });
  };


  module.movies = movies;
})(window);
