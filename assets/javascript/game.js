//Set up 4 player objects that include names, health points, attack power, and counter attack power
console.log("linkedokay");

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

var opponentsDefeated = 0;
var userPlayer;
var currentOpponent;
var currentOpponentDiv;
var currentPlayerDiv;
var playerSelected = false;
var opponentSelected = false;

//reset function
function reset(){
	opponentsDefeated = 0;
	userPlayer;
	currentOpponent;
	playerSelected = false;
	opponentSelected = false;
  player1.healthPoints = 130;
  player1.attackPower = 4;
  player2.healthPoints = 150;
  player2.attackPower = 2;
  player3.healthPoints = 100;
  player3.attackPower = 5;
  player4.healthPoints = 180;
  player4.attackPower = 3;
	$("#gameDetails").css("display", "none");
  $(".playerDivs").css("display", "inline-block").appendTo("#selectionDiv");
	$("#winLose").css("display", "none");
	$(".userPlayerReadOut").text("");
	$(".OpponentReadOut").text("");


}
function playGame(){

$(".playerDivs").on("click", function() {

	$(".playerPickerDiv").css("display","block")

	if (opponentSelected) return;


  if (playerSelected === false){
		$(".container").css("display","block")
  	currentPlayerDiv = $(this);
    currentPlayerDiv.appendTo("#userPlayerDiv");
    playerSelected = true;
    if (currentPlayerDiv.attr("value") === "player1"){
    	userPlayer = player1;
    } else if (currentPlayerDiv.attr("value") === "player2"){
    	userPlayer = player2;
    } else if (currentPlayerDiv.attr("value") === "player3"){
    	userPlayer = player3;
    } else if (currentPlayerDiv.attr("value") === "player4"){
    	userPlayer = player4;
    }

} else{
	currentOpponentDiv = $(this);
  currentOpponentDiv.appendTo("#currentOpponentDiv");
  opponentSelected = true;

	if (currentOpponentDiv.attr("value") === "player1"){
    	currentOpponent = player1;
    } else if (currentOpponentDiv.attr("value") === "player2"){
    	currentOpponent = player2;
    } else if (currentOpponentDiv.attr("value") === "player3"){
    	currentOpponent = player3;
    } else if (currentOpponentDiv.attr("value") === "player4"){
    	currentOpponent = player4;
    }
  $("#attack").css("display", "inline");
	$(".vs").css("display", "inline-block");

}
});
$("#attack").on("click", function(){
	currentOpponent.healthPoints -= userPlayer.attackPower;
  userPlayer.healthPoints -= currentOpponent.counterAttackPower;
  userPlayer.attackPower += userPlayer.attackPower;
	$("#gameDetails").css("display", "block");
	$(".userPlayerReadOut").html(
		"Player 1: " + userPlayer.name + "<br>" +
		"Health Points: " + userPlayer.healthPoints +"<br>" +
		"Attack Power: " + userPlayer.attackPower);
	$(".OpponentReadOut").html(
		"Opponent: " + currentOpponent.name + "<br>" +
		"Health Points: " + currentOpponent.healthPoints +"<br>" +
		"Attack Power: " + currentOpponent.attackPower);

  if(currentOpponent.healthPoints <= 0) {
	currentOpponentDiv.css("display", "none");
  opponentSelected = false;
  opponentsDefeated++;
}
	if(userPlayer.healthPoints <= 0){
		$("#winLose").css("display", "block");
  	$("#winLoseMessage").text("you lose");
		$("#winLoseImg").attr("src", "assets/images/lose.gif");
    $("#attack").css("display", "none");
  }

  if(opponentsDefeated >= 3){
		$("#winLose").css("display", "block");
		$("#winLoseMessage").text("you win");
		$("#winLoseImg").attr("src", "assets/images/win.gif");
    $("#attack").css("display", "none");
  }
})


}


$("#playGame").click(function(){
  $(".playerPickerDiv").css("display","block");
	playGame();
  $(".frostedGlass").css("display", "none");
	$(".welcomeDiv").css("display", "none");
})

$("#newGame").click(function(){
  reset();
})
