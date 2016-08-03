const seriesToHtml = Handlebars.compile($('#series-template').html());

function loadSeries() {
  $.ajax('/api/series', {
    success: data => {
      const series = { data };
      const html = seriesToHtml(series);
      $('#series-list').empty().append(html);
    },
    error: () => $('#notification-bar').text('Error occurred getting series list')
  });
}

loadSeries();

const episodesToHtml = Handlebars.compile($('#episode-template').html());

function loadEpisodes() {
  $.ajax('/api/episodes', {
    success: data => {
      const episode = { data };
      const html = episodesToHtml(episode);
      $('#episode-list').empty().append(html);
    },
    error: () => $('#notification-bar').text('Error occurred getting episode list')
  });
}

loadEpisodes();

const usersToHtml = Handlebars.compile($('#userlist-template').html());

function loadUsers() {
  $.ajax('/api/users', {
    success: data => {
      const episode = { data };
      const html = usersToHtml(episode);
      $('#user-list').empty().append(html);
    },
    error: () => $('#notification-bar').text('Error occurred getting episode list')
  });
}

loadUsers();

$('#user-list,#episode-list,#series-list').on('click', '.delete', function() {
  const selected = $(this).data();
  $.ajax(`/api/${selected.type}/${selected.id}`, {
    type: 'DELETE',
    success: data => {
      selected.type === 'series' ? loadSeries() : selected.type === 'episodes' ? loadEpisodes() : loadUsers();
      $('#notification-bar').text('Deleted: ' + (data.name || data.title || data.username));
      setTimeout( () => $('#notification-bar').empty() , 10000);
    },
    error: () => $('#notification-bar').text('Error occurred deleting', selected)
  });
});
