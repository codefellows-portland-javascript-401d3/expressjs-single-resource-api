const episodeToHtml = Handlebars.compile($('#epsode-details-template').html());
const id = url('?id');

if(id) {
  $.ajax(`/api/episodes/${id}`, {
    success: data => {
      let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      data.airdate = new Date(data.airdate).toLocaleDateString('en-US', options); 
      $('#details-display').append(episodeToHtml(data));
    },
    error: () => $('#notification-bar').text('Error occurred getting series list')
  });
} else {
  $('#notification-bar').text('Bad id parameter');
}

$('body').on('click', '.delete', function() {
  const selected = $(this).data();
  $.ajax(`/api/${selected.type}/${selected.id}`, {
    type: 'DELETE',
    success: data => {
      window.location('/');
      $('#notification-bar').text('Deleted:', data.name || data.title);
    },
    error: () => $('#notification-bar').text('Error occurred deleting', selected)
  });
});