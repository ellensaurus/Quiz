$(document).ready(function() {

	// array containing questions, answers, facts
	var questions = [
		{question: "What is the name of Lisa's jazz mentor?", choices: ["Louie T. Mint", "Pat McPlinkit", "Bleeding Gums Murphy"], answer: "Bleeding Gums Murphy", image: 'Q1.jpeg', facts: '<li>' + "Bleeding Gums was a mentor to Lisa until his early death. He played and sang a song written by Lisa, which had lyrics that criticized everyone in her family" +  '</li>' + '<li>' + "The origin of Bleeding Gums' nickname came from him never visiting the dentist" + '</li>'},
		{question: "Where does Marge hide the Christmas money?", choices: ["In her hair", "In the back of the food cabinet", "In the attic"], answer: "In her hair", image: 'Q2.jpg', facts: '<li>' + "During her teens, Marge had waist length hair that she always wore down, but wore her trademark beehive for senior prom" + '</li>' + '<li>' + "Her hair is thick enough to keep objects like the family savings and, the Christmas money" + '</li>' },
		{question: "What is Chief Wiggum's first name?", choices: ["Charlie", "Clancy", "Cal"], answer: "Clancy", image: 'Q3.jpg', facts: '<li>' + "Wiggum weighs about 360 pounds and is 5'9 tall" + '</li>' + '<li>' + "He is also the coach for the Mighty Pigs Hockey team" + '</li>' },
		{question: "Who is Groundskeeper Willie's true enemy?", choices: ["Skinner", "Bart", "Seamus"], answer: "Seamus", image: 'Q4.jpg', facts: '<li>' + "Willie was originally hired at Springfield Elementary as the swim teacher, but after Skinner was trapped in the worm-filled pool for three days, he had the pool destroyed and made Willie a groundskeeper" + '</li>' + '<li> ' + "He likes to take nude pictures of himself in his spare time" + '</li>' },
		{question: "How old is Bart when he finally gets to see the Itchy & Scratchy movie?", choices: ["40", "45", "50"], answer: "50", image: 'Q5.jpg', facts: '<li>' + "The episode features the first appearance of Bumblebee Man" + '</li>' + '<li>' + 'Even in the future scene at the end of the episode, the "Do not sell a ticket to this boy" photo of Bart at the Aztec theater is still there' + '</li>'},
		];

	var questionNumber = 0;
	var correctAnswers = 0;
	var totalQuestions = questions.length;
	welcomeScreen();

		var images = ['Q1.jpeg', 'Q2.jpg', 'Q3.jpg', 'Q4.jpg', 'Q5.jpg'];
				for (var i = 0; i < images.length; i++) {
					var img = new Image();
					img.src = images[i];
				};


	// welcomeScreen appears when page loads
	function welcomeScreen() {
		$("header").fadeIn(1000);
		$("#beginButton").fadeIn(1000);
		$("#submitButton").hide();
		$("#continueButton").hide();
		$("#retryButton").hide();
	}


	$("#beginButton").click(function(event){
		event.preventDefault();
		nextQuestion();
	});

	// nextQuestion happens when beginButton or continueButton clicked
	function nextQuestion() {
		var currentQuestion = questions[questionNumber];
		$("#beginButton").hide();
		$("#question").text(currentQuestion.question);
		for (i = 0; i < currentQuestion.choices.length; i++){
			$("#choices").append('<input type="radio" name="choice" value=' + currentQuestion.choices[i] + ' class=\'choices\' id=' + currentQuestion.choices[i] + '><label for=' + currentQuestion.choices[i] + '>' + currentQuestion.choices[i] + '</label><br>');		
		}
		$("#question").slideDown("slow");
		$("#choices").slideDown("slow");
		$("#submitButton").fadeIn("slow");
		$("#questionNumber").text("Question " + (questionNumber + 1) + "/" + totalQuestions);
		$("#questionNumber").fadeIn(1000);
	}

	$("#submitButton").click(function(event){
		event.preventDefault();
		checkAnswer();
	});

	function resultMessage() {
		var currentQuestion = questions[questionNumber];
		$("#resultMessage").append('<img src="' + currentQuestion.image + '" alt="' + currentQuestion.answer + '">' + '<br><br>' + "Answer: " + currentQuestion.answer + '<br>' + '<br>' + currentQuestion.facts + '<br>');
		$("#resultMessage").fadeIn(1000);
		$("#continueButton").fadeIn(1000);
	}

	// checkAnswer happens when submitButton is clicked
	function checkAnswer() {
		var userChoice = $('input[name="choice"]:checked').val();
		var currentQuestion = questions[questionNumber];
		$("#questionNumber").hide();
		$("#question").hide();
		$("#choices").hide();
		$("#submitButton").hide();
		$("#choices").empty();
		if (!(userChoice)){
			alert("Select an answer");
			$("#question").text(currentQuestion.question);
			for (i = 0; i < currentQuestion.choices.length; i++){
				$("#choices").append('<input type="radio" name="choice" value=' + currentQuestion.choice[i] + ' class=\'choices\' id=' + currentQuestion.choices[i] + '><label for=' + currentQuestion.choices[i] + '>' + currentQuestion.choices[i] + '</label><br>');
			}
			$("#choices").show();
			$("#submitButton").show();
			$("#question").show();
			$("#questionNumber").show();
			userChoice = $('input[name="choice"]:checked').val();
		} else if (userChoice == questions[questionNumber].answer){
			resultMessage();
			correctAnswers++;
		} else {
			resultMessage();
		}

	}
	
	$("#continueButton").click(function(event){
		event.preventDefault();
		$("#questionNumber").hide();
		questionNumber++;
		if (questionNumber >= questions.length){
			finalScreen();
		} else {
			nextQuestion();
		}
		$("#continueButton").hide();
		$("#resultMessage").hide();
		$("#resultMessage").empty();
	});

	// finalScreen occurs when there are no more questions
	function finalScreen() {
		$("#questionNumber").empty();
		$("#finalMessage").append("Your score: " + correctAnswers + "/" + totalQuestions);
		$("#finalMessage").fadeIn(2000);
		$("#retryButton").fadeIn(2000);
	}

	$("#retryButton").click(function(event){
		event.preventDefault();
		questionNumber = 0;
		correctAnswers = 0;
		$("#finalMessage").empty();
		$("#finalMessage").hide();
		$("#retryButton").hide();
		welcomeScreen();
	});
});