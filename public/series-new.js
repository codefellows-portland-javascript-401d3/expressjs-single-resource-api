$('#series-form button').on('click', event => {
  event.preventDefault();
  
  const data = {
    name: $('#series_name').val(),
    type: $('#series_type').val(),
    description: $('#series_description').val()
  };

  if(!data.name) $('#notification-bar').text('Name Required');
  else {
    $.post('/api/series', JSON.stringify(data))
    .done( function(result) {
      window.location.href = 'series-detail.html?id=' + result._id;
    });
  }
});