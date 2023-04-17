// Create the List
 var options = {
    valueNames: [ 'shows', 'genre', 'date', 'tickets', 'price', 'num_ticket', 'description', 'link']
  };

// Populate the List
var values = [];

var showElements = document.querySelectorAll('.show');
var genreElements = document.querySelectorAll('.genre');
var dateElements = document.querySelectorAll('.date');
var ticketsElements = document.querySelectorAll('.tickets');
var numTicketElements = document.querySelectorAll('.num_ticket');
var priceElements = document.querySelectorAll('.price');
var descriptionElements = document.querySelectorAll('.description');
var linkElements = document.querySelectorAll('.link');

for (var i = 0; i < showElements.length; i++) {
  var show = showElements[i].textContent;
  var genre = genreElements[i].textContent;
  var date = dateElements[i].textContent;
  var tickets = ticketsElements[i].textContent;
  var numTicket = numTicketElements[i].textContent;
  var price = priceElements[i].textContent;
  var description = descriptionElements[i].textContent;
  var link = linkElements[i].href;

  var value = {
    shows: show,
    genre: genre,
    date: date,
    tickets: tickets,
    num_ticket: numTicket,
    price: price,
    description: description,
    link: link
  };

  values.push(value);
}
  
  // Run the list with default sort
  var shows = new List('shows', options, values);
  shows.sort("show", {
    order: "asc"
  })
  
  // Create filters
  $('.filter').on('click',function(){
    var $q = $(this).attr('genre-filter');
    var $w = $(this).attr('date-filter');
    var $e = $(this).attr('ticket-filter');
    if($(this).hasClass('active')){
      shows.filter();
      $('.filter').removeClass('active');
    } else if ($q && $w && $e) {
      shows.filter(function(item) {
        return (item.values().genre == $q && item.values().date == $w && item.values().tickets == $e);
      });
      $('.filter').removeClass('active');
      $(this).addClass('active');
    } else if ($q && $w) {
      shows.filter(function(item) {
        return (item.values().genre == $q && item.values().date == $w);
      });
      $('.filter').removeClass('active');
      $(this).addClass('active');
    } else if ($q && $e) {
      shows.filter(function(item) {
        return (item.values().genre == $q && item.values().tickets == $e);
      });
      $('.filter').removeClass('active');
      $(this).addClass('active');
    } else if ($w && $e) {
      shows.filter(function(item) {
        return (item.values().date == $w && item.values().tickets == $e);
      });
      $('.filter').removeClass('active');
      $(this).addClass('active');
    } else if ($q) {
      shows.filter(function(item) {
        return (item.values().genre == $q);
      });
      $('.filter').removeClass('active');
      $(this).addClass('active');
    } else if ($w) {
      shows.filter(function(item) {
        return (item.values().date == $w);
      });
      $('.filter').removeClass('active');
      $(this).addClass('active');
    } else if ($e) {
      shows.filter(function(item) {
        return (item.values().tickets == $e);
      });
      $('.filter').removeClass('active');
      $(this).addClass('active');
    }
  });


  // Return # of items
  var $count = $('.count')
  $count.append(shows.size());
  shows.on('filterComplete', function(){
    $count.text(shows.update().matchingItems.length);
  });