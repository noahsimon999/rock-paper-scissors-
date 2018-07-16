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


$("#btn-name").click(function(){
    event.preventDefault();

    if(player1 === false) { 
        player1 = $("#inputName").val().trim();
        database.ref("/connections/player1").set({
            player1: player1
        });
        database.ref().on("value", function(snapshot) {
            $(".p1Name").html("<p>" + snapshot.val().connections.player1.player1 + "</p>");
        });
        
    } else if(player2 === false) {
        player2 = $("#inputName").val().trim();
        database.ref("/connections/player2").set({
            player2: player2
        });
        database.ref().on("value", function(snapshot) {
            $(".p2Name").html("<p>" + snapshot.val().connections.player2.player2 + "</p>");
        });
    }
    var addName = $(".form-control").val().trim();
    if (addName === "") {
        return false;
    }
    else {
        document.forms["inputForm"].reset();
    }
    console.log(player1);
    console.log(player2);

    
   
});





















