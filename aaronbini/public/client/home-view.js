(function(module) {
  var homeController = {};

  // show all home elements
  homeController.index = function() {
    $('.tab-content').hide();
    $('#auth').show();
  };
  module.homeController = homeController;
})(window);
