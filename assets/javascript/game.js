//Set up 4 player objects that include names, health points, attack power, and counter attack power

var player1 = {
name: "Dorothy",
healthPoints: 130,
attackPower: 4,
counterAttackPower: 20}

var player2 = {
name: "Rose",
healthPoints: 150,
attackPower: 2,
counterAttackPower: 10}

var player3 = {
name: "Sophia",
healthPoints: 100,
attackPower: 5,
counterAttackPower: 25}

var player4 = {
name: "Blanche",
healthPoints: 150,
attackPower: 3,
counterAttackPower: 15}



//Set up variables for the opponents defeated, user player, current opponent
//The game play divs, and booleans for player selected and opponent selected
var opponentsDefeated = 0;
var userPlayer;
var currentOpponent;
var currentOpponentDiv;
var playerSelected = false;
var opponentSelected = false;

//reset function
function reset(){
	//reset all the variables
	opponentsDefeated = 0;
	userPlayer;
	currentOpponent;
	playerSelected = false;
	opponentSelected = false;
	//create an array of the player variables
	var goldenGirls = [];
	goldenGirls.push(player1, player2, player3, player4);
	//cycle through the array, resetting player's health points and attack attackPower
	for(var i = 0; i < goldenGirls.length; i++){
		goldenGirls[i].healthPoints = 130;
	  goldenGirls[i].attackPower = 4;
	}
	//reset the css and text of gameplay and win/lose div. Hide the gameplay and win/lose divs
	$(".gameDetails, .winLoseDiv, .winLoseContainer, .container").css("display", "none");
  $(".playerDivs").css("display", "inline-block").appendTo("#selectionDiv");
	$(".userPlayerReadOut, .OpponentReadOut").text("");
	$(".playerPrompt").text("select player");
}
function playGame(){
//When the user selects a player
$(".playerDivs").on("click", function() {
//if an opponent has already been selected, stop function
	if (opponentSelected) return;
//show the game play div
	$(".container").css("display","block")

//if a player has not been selected
  if (!playerSelected){
		//create varriable to hold the div image of the current player
  	var currentPlayerDiv = $(this);
		//append this variable to the user player div
    currentPlayerDiv.appendTo("#userPlayerDiv");
		//set player selected to "true"
    playerSelected = true;
		//determine which player has been selected, and set userPlayer to that player
    if (currentPlayerDiv.attr("value") === "player1"){
    	userPlayer = player1;
    } else if (currentPlayerDiv.attr("value") === "player2"){
    	userPlayer = player2;
    } else if (currentPlayerDiv.attr("value") === "player3"){
    	userPlayer = player3;
    } else if (currentPlayerDiv.attr("value") === "player4"){
    	userPlayer = player4;
    }
		//set the "select player" text to say "select opponent"
		$(".playerPrompt").text("select opponent")

} else{
	//if the user player has been selected, select an opponent and add their image to the opponent div
	currentOpponentDiv = $(this);
  currentOpponentDiv.appendTo("#currentOpponentDiv");
  opponentSelected = true;
// determine which opponent has been selected, and set currentOpponent to that player
	if (currentOpponentDiv.attr("value") === "player1"){
    	currentOpponent = player1;
    } else if (currentOpponentDiv.attr("value") === "player2"){
    	currentOpponent = player2;
    } else if (currentOpponentDiv.attr("value") === "player3"){
    	currentOpponent = player3;
    } else if (currentOpponentDiv.attr("value") === "player4"){
    	currentOpponent = player4;
    }
	//show the attack button and the vs text
  $("#attack").css("display", "inline");
	$(".vs").css("display", "inline-block");

}
});
//when the attack button is clicked
$("#attack").on("click", function(){
	//subtract user player's attack points from their opponent's health score
	currentOpponent.healthPoints -= userPlayer.attackPower;
	// subtract opponents counter attack points from the user player's health score
  userPlayer.healthPoints -= currentOpponent.counterAttackPower;
	//double the user player's attack power
  userPlayer.attackPower += userPlayer.attackPower;
	//show the game details div, and display the user player and opponents health scores, attack power and counter attack power
	$("#gameDetails").css("display", "block");
	$(".userPlayerReadOut").html(
		"Player 1: " + userPlayer.name + "<br>" +
		"Health Points: " + userPlayer.healthPoints +"<br>" +
		"Attack Power: " + userPlayer.attackPower);
	$(".OpponentReadOut").html(
		"Opponent: " + currentOpponent.name + "<br>" +
		"Health Points: " + currentOpponent.healthPoints +"<br>" +
		"Attack Power: " + currentOpponent.attackPower);
	// if the current opponent's health points reaches 0
  if(currentOpponent.healthPoints <= 0) {
	//hide the opponent
	currentOpponentDiv.css("display", "none");
	// reset the opponent selected boolean (so the user can choose another opponent)
  opponentSelected = false;
	// add one to the opponentsDefeated variable
  opponentsDefeated++;
}
//if the user player's health points reach zero
	if(userPlayer.healthPoints <= 0){
		//show the win-lose container and win-lose div
		$(".winLoseContainer, .winLoseDiv").css("display","block");
		//display the "you lose" message
  	$("#winLoseMessage").text("you lose");
		//set the img source to the lose gif
		$("#winLoseImg").attr("src", "assets/images/lose.gif");
		//hide the attack button
    $("#attack").css("display", "none");
  }
	// if the user has defeated all 3 opponents
  if(opponentsDefeated >= 3){
		//show the win-lose container and win-lose div
		$(".winLoseContainer, .winLoseDiv").css("display","block");
		//display the "you win" message
		$("#winLoseMessage").text("you win");
		//set the image source to the win gif
		$("#winLoseImg").attr("src", "assets/images/win.gif");
		//hide the attack button
    $("#attack").css("display", "none");
  }
})


}

//when the play game button is clicked
$("#playGame").click(function(){
	//show the player picker div
  $(".playerPickerDiv").css("display","block");
	//run the play game function
	playGame();
	//hide the frosted glass and welcome divs
  $(".frostedGlass, .welcomeDiv").css("display", "none");
})
//when the "new game" button is clicked, run the reset function
$("#newGame").click(function(){
  reset();
})
