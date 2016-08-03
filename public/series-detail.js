const seriesToHtml = Handlebars.compile($('#series-details-template').html());
const episodesToHtml = Handlebars.compile($('#episode-list-template').html());
const id = url('?id');

if(id) {
  $.ajax(`/api/series/${id}`, {
    success: data => {
      console.log('data:',data);
      $('#details-display').append(seriesToHtml(data));
      $('#details-display').append(episodesToHtml(data));
    },
    error: () => $('#notification-bar').text('Error occurred getting series detail')
  });
} else {
  $('#notification-bar').text('Bad id parameter');
}

// $('body').on('click', '.delete', function() {
//   const selected = $(this).data();
//   $.ajax(`/api/${selected.type}/${selected.id}`, {
//     type: 'DELETE',
//     success: data => {
//       window.location('/');
//       $('#notification-bar').text('Deleted:', data.name || data.title);
//     },
//     error: () => $('#notification-bar').text('Error occurred deleting', selected)
//   });
// });