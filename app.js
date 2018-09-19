// api key: gu0Ti6yuREivJrjmjgzOocWTnr7pJQ9I
var ndiv = $("<div>");
ndiv.text("ok linked js")
$(".container").append(ndiv); 
//array of topics
var topics = ["Archer", "Rick And Morty", "American Dad", "Mad Men","Breaking Bad"];
//function to build buttons
$(document).ready(function(){
    topics.forEach(x => {
        var btn = $("<button>");
        btn.text(x);
        btn.attr("data-text",x);
        btn.addClass("search");
        $(".container").append(btn);
    });
})


$(".sub").on("click", function(){
    var text = $(".userInput").val();
    if (text) {
        var text = $(".userInput").val();
        
        $(".userInput").val("");
        var btn = $("<button>")
        btn.text(text);
        btn.attr("data-text",text);
        btn.addClass("search");
        $(".container").append(btn);
        
    }
 

});

$(document).on("click", ".search", function(){
    var queryurl ="http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=10"
    var person="";
    $("#gifs-appear-here").empty()
    person = $(this).attr("data-text")
    queryurl = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=gu0Ti6yuREivJrjmjgzOocWTnr7pJQ9I&limit=10"

    $.ajax({
        url: queryurl,
        method:"GET"
    }).then(function(response){
        
        //begin copy
        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

          // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div for the gif
            var gifDiv = $("<div>");
            

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var personImage = $("<img>");
            personImage.attr("data-state","still")
            personImage.attr("data-still",results[i].images.fixed_height_still.url)
            personImage.attr("data-animate",results[i].images.fixed_height.url)
            personImage.addClass("gif")

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            personImage.attr("src", results[i].images.fixed_height_still.url);

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(personImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").prepend(gifDiv);
          }
        }

        //end copy

    });

});


$(document).on("click", ".gif", function() {
    // $(".gif").on("click", function(){
     //look at the state to determine which url to update the src with. 
     
     var state = $(this).attr("data-state");
     if (state === "still") {
         
         $(this).attr("src", $(this).attr("data-animate"));
         $(this).attr("data-state", "animate");
       } else {
         
         $(this).attr("src", $(this).attr("data-still"));
         $(this).attr("data-state", "still");
       }

 })
