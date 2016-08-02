const seriesToHtml = Handlebars.compile($('#series-template').html());

$.ajax('/api/series', {
  success: data => {
    const series = { data };
    const html = seriesToHtml(series);
    $('#series-list').append(html);
  },
  error: () => $('#notification-bar').text('Error occurred getting series list')
});

const episodesToHtml = Handlebars.compile($('#episode-template').html());

$.ajax('/api/episodes', {
  success: data => {
    const episode = { data };
    const html = episodesToHtml(episode);
    $('#episode-list').append(html);
  },
  error: () => $('#notification-bar').text('Error occurred getting episode list')
});

$('#episode-list').on('click', '.delete', function() {
  const selected = $(this).data();
  $.ajax(`/api/${selected.type}/${selected.id}`, {
    type: 'DELETE',
    success: data => {
      console.log('deleted:',data);
    },
    error: () => $('#notification-bar').text('Error occurred deleting', selected)
  });
});