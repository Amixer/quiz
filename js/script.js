'use scrict'

$(document).ready(pageLoad);

 function pageLoad(){
	
	/*--- Display information modal box ---*/
  	$('#opt').click(function(){
    	$('.overlay').fadeIn(1000);
  	});
  	/*--- Hide information modal box ---*/
  	$('a.close').click(function(){
  		$('.overlay').fadeOut(1000);
  	});
  }

  /* Coffee Test */
  $(document).ready(function() {
    //quiz question array
    var questions = [
    {
        question: "What race is the Doctor?",
        choices: ["Human", "Time Lord", "Judoon", "Dream Lord"],
        qNum : 0,
        correct : 1,
    },
        {
        question: "Where is the Doctor from?",
        choices: ["Skaro", "Mars", "Earth", "Galifrey"],
        qNum : 1,
        correct : 3,
    },
        {
        question: "What is the 11th Doctor's favorite accessory?",
        choices: ["Bow tie","stetson","fez", "space-helmet"],
        qNum : 2,
        correct : 0,
    },
   {
        question: "Who are the four companions in the newer series?",
        choices: ["Rose Robins, Jackie Tyler, Donna Book, and Amy River","Sally Sparrow, Rose Tyler, Donna Knoble, Martha Jones",
		"Rose Tyler, Martha Jones, Donna Noble, and Amy Pond", "Martha Jones, Sophie Smith, Rose Thomas, and Donna Noble"],
        qNum : 3,
        correct : 2,
    },
   {
        question:"What does TARDIS stand for?",
        choices: ["Time and Relative Dimensions In Space", "Tourists And Relatives Demand Instant Sandwiches", "Tacos Are Rarely Divided In Stations","Time and Race Do Insist Strategy"],
        qNum : 4,
        correct : 0,
    },
   {
        question: "In what relation to him was the first Doctor's companion?",
        choices: ["friend", "cousin", "grandaughter", "daughter"],
        qNum : 5,
        correct : 2,
    },
   {
        question: "Who is the Doctor's greatest enemy?",
        choices: ["Sontarans", "Weeping Angels", "Cybermen", "Daleks"],
        qNum : 6,
        correct : 3,
    },
   {
        question: "When is London deserted for fear of alien attack?",
        choices: ["At New Year", "Ever Saturday around 9pm", "Christmas", "When it rains"],
        qNum : 7,
        correct : 2,
    },
   {
        question: "What's the first thing the doctor asks Amy Pond for when he crashes in her yard?",
        choices: ["Directions", "An apple", "fish custard", "a sonic screwdriver"],
        qNum : 8,
        correct : 1,
    },
   {
        question: "What is the Doctor's name for the TARDIS?",
        choices: ["Old Girl", "Type 40", "Sexy", "Idris"],
        qNum : 9,
        correct : 2,
    },







      ]
    
    //global variables
    var numberCorrect = 0;
    var currentQuestion = 0;
    
    $("#question").on("click", "#submit", function () {
        updateCup();
        currentQuestion++;
        nextQuestion();
    });
    
    $("#question").on("click", "#retry_button", function () {
        numberCorrect = 0;
        currentQuestion = 0;
        $(".score_cup").css("display", "none");
        $("#score_cup0").css("display", "inline");
        var newQuestion = '<span class="question">'+questions[currentQuestion].question+'</span><br><div id="answer_holder"><input type="radio" name="option" class="option" value="0"><span class="answer">'+questions[currentQuestion].choices[0]+'</span><br><input type="radio" name="option" class="option" value="1"><span class="answer">'+questions[currentQuestion].choices[1]+'</span><br><input type="radio" name="option" class="option" value="2"><span class="answer">'+questions[currentQuestion].choices[2]+'</span><br><input type="radio" name="option" class="option" value="3"><span class="answer">'+questions[currentQuestion].choices[3]+'</span><br></div><div id="button_holder"><input type="button" id="submit" value="Submit Answer"><span id="hint"></span><input type="button" id="retry_button" value="Try Again!"></div>';
        $("#question_wrapper").html(newQuestion);
        $("#last_question_fact").html("");
    });

    function updateCup() {
        var answer = $("input[type='radio']:checked").val();
        if (answer == questions[currentQuestion].correct) {
            numberCorrect++;    
        }
        if (numberCorrect == 1) {
            $(".score_cup").css("display", "none")
            $("#score_cup1").fadeIn();
        }
        else if (numberCorrect == 2) {
            $(".score_cup").css("display", "none")
            $("#score_cup2").fadeIn();
        }
        else if (numberCorrect == 3) {
            $(".score_cup").css("display", "none")
            $("#score_cup3").fadeIn();
        }
        else if (numberCorrect == 4) {
            $(".score_cup").css("display", "none")
            $("#score_cup4").fadeIn();
        }
        else if (numberCorrect == 5) {
            $(".score_cup").css("display", "none")
            $("#score_cup5").fadeIn();
        }
    }

    function nextQuestion() {
        if (currentQuestion < 5) {
            $(".question").remove();
            $("#answer_holder input").remove();
            $("#answer_holder span").remove();
			$("#last_question_fact").hide();
            var newQuestion = '<span class="question">'+questions[currentQuestion].question+'</span><br><div id="answer_holder"><input type="radio" name="option" class="option" value="0"><span class="answer">'+questions[currentQuestion].choices[0]+'</span><br><input type="radio" name="option" class="option" value="1"><span class="answer">'+questions[currentQuestion].choices[1]+'</span><br><input type="radio" name="option" class="option" value="2"><span class="answer">'+questions[currentQuestion].choices[2]+'</span><br><input type="radio" name="option" class="option" value="3"><span class="answer">'+questions[currentQuestion].choices[3]+'</span><br></div><div id="button_holder"><input type="button" id="submit" value="Submit Answer"><span id="hint"></span><input type="button" id="retry_button" value="Try Again!"></div>';
            $("#question_wrapper").html(newQuestion);
            var lastFact= questions[currentQuestion-1].fact;
            $("#last_question_fact").html(lastFact).fadeIn();
        }
        else {
            $(".question").remove();
            $("#answer_holder input").remove();
            $("#answer_holder span").remove();
			$("#last_question_fact").fadeOut();
            $("#submit").css("display", "none");
            $("#retry_button").css("display", "inline");
            var lastFact= questions[currentQuestion-1].fact;
            $("#last_question_fact").html(lastFact);
            if (numberCorrect == 1) {
                var finalScore = '<span id="final">Congratulations on finishing the quiz!  You correctly answered '+numberCorrect+' question.'
                $("#answer_holder").html(finalScore);
            }
            else {
                var finalScore = '<span id="final">Congratulations on finishing the quiz!  You correctly answered '+numberCorrect+' questions.'
                $("#answer_holder").html(finalScore);
            }
        }
    }
});
