$(document).ready(function () {
    // ======================================================== CREATE ARRAY ==================================================
    // Create array for topics
    var topics = ["Cat", "Dog", "Bird", "Turtle"];

    // ======================================================== RENDER BUTTONS ==================================================
    // Function for displaying buttons
    function renderButtons() {
        // Emptying the button-dump so that we don't get duplicates everytime the function runs
        $("#button-dump").empty();
        // Loop through array of topics
        for (var i = 0; i < topics.length; i++) {
            // Create a button for each topic
            var button = $("<button>");
            // Adding class of giph button and bootstrap btn
            button.addClass("giph-button");
            button.addClass("btn btn-info");
            // Adding data attribute
            button.attr("data-name", topics[i]);
            // Adding button text
            button.text(topics[i]);
            // Displaying to button-dump
            $("#button-dump").append(button);
        }
    };

    // ======================================================== DISPLAY IMAGES ===================================================
    // Clicking on the elements with the class of "giph-button" should bring up 10 static images from giphy api
    function displayImages() {
        // Emptying the display of any past images that might have been loaded. This prevents duplicates and stops the page from getting too long.
        $("#giph-dump").empty();
        // Creating a variable that stores the string attatched to the gif button that was created
        var gif = $(this).attr("data-name");
        // Putting the gif variable in the serch query value of the url.
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=vk6JL1A4O9x1el2z4s9b2Ewv4K7Ohz6L&limit=10";
        // AJAX call to giphy api
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // Creating variable to get access from the response JSON data
            var data = response.data;
            // Creating variable to store all of the images
            var containerDiv = $("<div class = 'container'>");
            // Creating variable to reference html element with id of #giph-dump
            var giphDump = $("#giph-dump");
            // Looping through the JSON data
            for (var i = 0; i < data.length; i++) {
                // Creating a variable to store the still image url
                var stillImgURL = response.data[i].images.downsized_still.url;
                // Creating a variable to store the moving image url
                var movingImgURL = response.data[i].images.downsized_medium.url;
                // Creating a variable to store the rating of the specific image
                var rating = response.data[i].rating;
                // Creating a variable that creates an html element to append the rating to.
                var ratingHolder = $("<p>").addClass("rating-holder");
                // Creating a variable that creates an html image element with the source of the still image
                var imageHolder = $("<img>").attr("src", stillImgURL);
                // Adding classes and attributes
                imageHolder.addClass("gif");
                imageHolder.attr("data-state", "still");
                imageHolder.attr("data-still", stillImgURL);
                imageHolder.attr("data-animate", movingImgURL);
                // Appending all of the ratings and images
                ratingHolder.append("Rating: " + rating.toUpperCase());
                imageHolder.append(ratingHolder);
                containerDiv.append(imageHolder, ratingHolder);
                giphDump.append(containerDiv);
            };
        });
    };

    // ======================================================= ON CLICK EVENTS =========================================================
    // On click event handler that listens for elements with the class "giph-button" and executes the displayImages function
    // ***===Needs to be document.on because that works for dynamically created elements.===***
    $(document).on("click", ".giph-button", displayImages);
    // On click event to replace still img with gif or vice versa
    $(document).on("click", ".gif", function () {
        if ($(this).attr("data-state") === "still") {
            $(this).attr("data-state", "animate");
            $(this).attr("src", $(this).attr("data-animate"));
        } else {
            $(this).attr("data-state", "still");
            $(this).attr("src", $(this).attr("data-still"));
        };
    });
    // On click event that adds users search to the topic array
    $("#gif-search").on("click", function(event) {
        // Prevent the default action from happening
        event.preventDefault();
        // Getting the users input from the gif search box
        var gifSearch = $("#gif-input").val().trim();
        // If the user forgot to type in the gif search textbox, don't create a new button and alert that they need to type something to search for.
        if(gifSearch === "") {
            alert("You Forgot To Type In A Search Term!");
        } else {
        // Pushing the search box value to the topic array
            topics.push(gifSearch);
        };
        // Call the renderButtons function to create a button for the users search
        renderButtons(); 
    });
    // Calling the renderButtons function to create all of the buttons, including the users input.    
    renderButtons();

});

