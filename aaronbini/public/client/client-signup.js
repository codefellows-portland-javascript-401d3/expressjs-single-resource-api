(function(module) {
  const signUp = {};

  const $signup = $('#userSignUp');

  signUp.addUser = function () {
    const data = {
      username: document.querySelector( 'input[name=username]' ).value,
      password: document.querySelector( 'input[name=password]' ).value
    };
    superagent
      .post('auth/signup')
      .send( data )
      .end( ( err, res ) => {
        console.log(res);
        const token = JSON.parse(res.text);
        const tokenString = token.token;
        console.log(tokenString);
        localStorage.setItem('token', JSON.stringify(tokenString));

        alert( 'Thanks for signing up!' );
        movies.populate(token);
      });
    $('.tab-content').hide();
    $('#movies').show();
  };

  $signup.on('submit', (e) => {
    e.preventDefault();
    signUp.addUser();

  });


  module.signUp = signUp;
})(window);
