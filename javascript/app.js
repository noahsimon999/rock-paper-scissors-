// start screen
    // player 1 info
    // player 2 info
    // rules
// rendergame 
    // player 1 RPS buttons
    // player 1 scores
    // middle panel
    // player 2 RPS buttons
    // player 2 scores
    // chat input
    // chat box
// reset 
    // reset on disconnect

var config = {
    apiKey: "AIzaSyCCqLdm6Zp6TloauYlpKdQcKziofZcVEds",
    authDomain: "rock-paper-scissors-e0095.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-e0095.firebaseio.com",
    projectId: "rock-paper-scissors-e0095",
    storageBucket: "rock-paper-scissors-e0095.appspot.com",
    messagingSenderId: "169398494937"
    };
    firebase.initializeApp(config);

var database = firebase.database();
var player1 = false;
var player2 = false;
var player1Name = "";
var player2Name = "";
var player1Connected = false;
var player2Connected = false;

function update1() {
    var connectedRef = firebase.database().ref(".info/connected");
        connectedRef.on("value", function(snap) {
            if (snap.val() === true) {
                $(".p1Name").html("<p>" + player1Name + "</p>");
                $(".chatArea").prepend("<div>" + player1Name + " has connected</div>");
                player1Connected = true;
            } else {
                $(".chatArea").prepend("<div>" + player1Name + " has disconnected</div>");
            }
        });
}

function update2() {
    var connectedRef = firebase.database().ref(".info/connected");
        connectedRef.on("value", function(snap) {
            if (snap.val() === true) {
                $(".p2Name").html("<p>" + player2Name + "</p>");  
                $(".chatArea").prepend("<div>" + player2Name + " has connected</div>");
                player2Connected = true;
                console.log("player 2 connected");
            } else {
                $(".chatArea").prepend("<div>" + player2Name + " has disconnected</div>");
            }
         });
}

$("#btn-name").click(function(){
    

    if(player1Connected === false) { 
        player1Name = $("#inputName").val().trim();
        database.ref("/connections/player1").set({
            player1: player1Name,
        });
        update1();
    } else if(player2Connected === false) {
        player2Name = $("#inputName").val().trim();
        database.ref("/connections/player2").set({
            player2: player2Name,
        });
        update2();
        playerChoice();
    }
    
    var addName = $(".form-control").val().trim();
    
    if (addName === "") {
        return false;
    }
    else {
        document.forms["inputForm"].reset();
    }
    console.log(player1Connected);
    console.log(player2Connected);   
});

$(document).keydown(function (e) {
    var key_one = 13;
 
    if (e.keyCode == key_one) {
        event.preventDefault();
 
        if (player1 === false) {
            player1Name = $("#inputName").val().trim();
            database.ref("/connections/player1").set({
                player1: player1Name,
            });
            update1();
 
        } else if (player2 === false) {
            player2Name = $("#inputName").val().trim();
            database.ref("/connections/player2").set({
                player2: player2Name,
            });
            update2();
            playerChoice();
        }
        $(".form-control").val("");
    }
 });



var player1Choice = false;
var player2Choice = false;


function playerChoice() {
    if(player1Choice === false) {
        $(".rock1").click(function(){
            player1Choice = "rock";
            $(".prompt1").html($("<h3>").text(player1Choice));
        });
        $(".paper1").click(function(){
            player1Choice = "paper";
            $(".prompt1").html($("<h3>").text(player1Choice));
        });
        $(".scissors1").click(function(){
            player1Choice = "scissors";
            $(".prompt1").html($("<h3>").text(player1Choice));
        });
        
    } 
    
    if(player2Choice === false) {
        $(".rock2").click(function(){
            player2Choice = "rock";
            $(".prompt2").html($("<h3>").text(player2Choice));
            results();
        });
        $(".paper2").click(function(){
            player2Choice = "paper";
            $(".prompt2").html($("<h3>").text(player2Choice));
            results();
        });
        $(".scissors2").click(function(){
            player2Choice = "scissors";
            $(".prompt2").html($("<h3>").text(player2Choice));
            results();
        });
    }
}

var player1Wins = 0;
var player1Losses = 0;
var tie = 0;
var player2Wins = 0;
var player2Losses = 0;

function winLossValidator() {
    
    // player one choses rock
    if (player1Choice === "rock" && player2Choice === "rock") {
        tie++;
        score();
    
    } else if (player1Choice === "rock" && player2Choice === "paper") {
        player1Losses++;
        player2Wins++;
        score();
        console.log(player1Losses);
        console.log(player2Wins);
    } else if (player1Choice === "rock" && player2Choice === "scissors") {
        player2Losses++;
        player1Wins++;
        score();
        console.log(player2Losses);s
        console.log(player1Wins);
    }

   // player one choses paper
    if (player1Choice === "paper" && player2Choice === "paper") {
        tie++;
        score();
    }
    if (player1Choice === "paper" && player2Choice === "scissors") {
        player1Losses++;
        player2Wins++;
        score();
    }
    if (player1Choice === "paper" && player2Choice === "rock") {
        player2Losses++;
        player1Wins++;
        score();
    }

    // player one choses scissors
    if (player1Choice === "scissors" && player2Choice === "scissors") {
        tie++;
        score();
    }
    if (player1Choice === "scissors" && player2Choice === "rock") {
        player1Losses++;
        player2Wins++;
        score();
    }
    if (player1Choice === "scissors" && player2Choice === "paper") {
        player2Losses++;
        player1Wins++;
        score();
    }
}

function score() {
    $(".p1WinLoss").html("<p>Wins: " + player1Wins + " - Loss: " + player1Losses + " - Tie: " + tie + "</p>");
    $(".p2WinLoss").html("<p>Wins: " + player2Wins + " - Loss: " + player2Losses + " - Tie: " + tie + "</p>");
}










// chat


var name = "";
var chat = "";

function chatbox() {
    $("#btn-chat").on("click", function (event) {
        // Prevent the chat from refreshing
        event.preventDefault();

        // Get inputs
        name = player1Name;
        chat = $("#chat-input").val().trim();

        // Change what is saved in firebase
        database.ref("/chat").push({
            name: name,
            chat: chat,
        });

        $(".form-control").val("");
    });

// Firebase is always watching for changes to the data.
// When changes occurs it will print them to console and html
database.ref("/chat").on("child_added", function (snapshot) {

    // Print the initial data to the console.
    console.log(snapshot.val());

    // Log the value of the various properties
    console.log(snapshot.val().name);
    console.log(snapshot.val().chat);

    // Change the HTML    
    $(".chatArea").prepend("<div>" + snapshot.val().name + ": " + snapshot.val().chat + "</div>");

        // If any errors are experienced, log them to console.
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
});

}


chatbox();





