var topics = ["cat", "dog", "whale", "penguin"];
var searchedValue = "";
var topicButton = "";
var responseArr = [];
var gifCard = "";
var gifInfo = "";

$(document).ready(function() {
  $(".searchButton").click(function() {
    createTopic();
  });

  function createTopic() {
    searchedValue = "";
    event.preventDefault();
    searchedValue = $(".animalSearch").val();
    if (searchedValue !== "" && topics.indexOf(searchedValue) === -1) {
      topics.push(searchedValue);
      createButtons();
    }
  }

  function createButtons() {
    $(".tags").empty();
    for (i = 0; i < topics.length; i++) {
      topicButton = $("<button>");
      topicButton.text(topics[i]);
      topicButton.css({ margin: "5px" });
      topicButton.addClass("topic btn btn-info animal-btn");
      topicButton.attr("data-name", topics[i]);
      $(".tags").append(topicButton);
      $(".animalSearch").val("");
    }
  }
  // Example queryURL for Giphy API
  function displayAnimalGIF() {
    var animal = $(this).attr("data-name");
    $(".gifsGoHere").empty();
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?api_key=yaXhnonhBhWWH3O1gAupkSCO2l0BjpKH&q=" +
      animal +
      "&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      for (i = 0; i < response.data.length; i++) {
        gifDiv = $("<div class=card-body>");
        rating = response.data[i].rating;
        var ratingTxt = $("<p>").text("Rating: " + rating);

        gifCard = $("<img width=300px height=200px>");
        gifCard.attr("src", response.data[i].images.original_still.url);
        gifCard.addClass("card gif");
        gifCard.attr("data-state", "still");
        gifCard.attr("data-still", response.data[i].images.original_still.url);
        gifCard.attr("data-animate", response.data[i].images.original.url);

        gifDiv.prepend(ratingTxt);
        gifDiv.prepend(gifCard);
        $(".gifsGoHere").append(gifDiv);
      }
      $(".gif").on("click", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });
  }
  function playGIF() {}
  $(document).on("click", ".animal-btn", displayAnimalGIF);
  createButtons();
});
