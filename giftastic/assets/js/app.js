// To be done in the future
// Animation of buttons refer to http://animejs.com/documentation
//

// we are not on ES6 yet so lets stick on using array as variable instead of a set
// Set() will prevent any duplication of items in the topics collection
var topics = [
    "bmw",
    "renault",
    "buick",
    "cadillac",
    "chevrolet",
    "chrysler",
    "citroen",
    "dodge",
    "ferrari"
];

var favorites = [];

var apikey = 'qGk3tw0SOldGkXMk4bcwvYYoZFKZ5EVa';

$(document).ready(function(){
    renderButtons();
    $( "#car-form" ).submit(function( event ) {
        var x = document.getElementById("carchoose");
        
        topics.push($("#car-brand").val());
        
        renderButtons();
        event.preventDefault();
    });

    console.log($("#cars-buttons").andSelf().html());

    $(document).on("click",".imageFavorite",function(){
        console.log($(this).html());
        favorites.push($(this).val());
    });

    $(document).on("click",".gifplay", function() {
        var car = $(this).text();
  
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          car + "&api_key=" + apikey + "&limit=10";
  
        // Performing our AJAX GET request
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            // Storing an array of results in the results variable
            var results = response.data;

            // Looping over every result item
            $("img").each(function(index){
                $(this).addClass("imageFavorite");
                $(this).attr("src",results[index].images.fixed_height.url);
                $(this).prev().prev().text("Rating: " + results[index].rating);
                $(this).prev().text("Title: " + results[index].title);
            });
        });
    });

    $( window ).unload(function() {
        localStorage.setItem("favorites",favorites);
      });
});

function renderButtons() {
    // Deleting the cars buttons prior to adding new cars buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#cars-buttons").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {
        // Then dynamicaly generating buttons for each movie in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var b = $("<button>");
        // Adding a class
        b.addClass("gifplay");
        // Adding a data-attribute with a value of the movie at index i
        b.attr("data-name", topics[i]);
        // Providing the button's text with a value of the movie at index i
        b.text(topics[i]);
        if (i % 2 == 0) {
            b.css("background-color","red");
        } else {
            b.css("background-color","green");
        }
        // Adding the button to the HTML
        $("#cars-buttons").append(b);
    }
}
