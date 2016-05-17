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
  };


  
    //quiz question array
    (function(){
    var questions = [
    {
        question: "What race is the Doctor?",
        choices: ["Human", "Time Lord", "Judoon", "Dream Lord"],
        qNum : 0,
        correctAnswer: 1,
    },
     {
        question: "Where is the Doctor from?",
        choices: ["Skaro", "Mars", "Earth", "Galifrey"],
        qNum : 1,
        correctAnswer:3,
    },
     {
        question: "What is the 11th Doctor's favorite accessory?",
        choices: ["Bow tie","stetson","fez", "space-helmet"],
        qNum : 2,
        correctAnswer: 0,
    },
   {
        question: "Who are the four companions in the newer series?",
        choices: ["Rose Robins, Jackie Tyler, Donna Book, and Amy River","Sally Sparrow, Rose Tyler, Donna Knoble, Martha Jones",
        "Rose Tyler, Martha Jones, Donna Noble, and Amy Pond", "Martha Jones, Sophie Smith, Rose Thomas, and Donna Noble"],
        qNum : 3,
        correctAnswer:2,
    },
   {
        question:"What does TARDIS stand for?",
        choices: ["Time and Relative Dimensions In Space", "Tourists And Relatives Demand Instant Sandwiches", "Tacos Are Rarely Divided In Stations","Time and Race Do Insist Strategy"],
        qNum : 4,
        correctAnswer:0,
    },
   {
        question: "In what relation to him was the first Doctor's companion?",
        choices: ["friend", "cousin", "grandaughter", "daughter"],
        qNum : 5,
        correctAnswer:2,
    },
   {
        question: "Who is the Doctor's greatest enemy?",
        choices: ["Sontarans", "Weeping Angels", "Cybermen", "Daleks"],
        qNum : 6,
        correctAnswer: 3,
    },
   {
        question: "When is London deserted for fear of alien attack?",
        choices: ["At New Year", "Ever Saturday around 9pm", "Christmas", "When it rains"],
        qNum : 7,
        correctAnswer: 2,
    },
   {
        question: "What's the first thing the doctor asks Amy Pond for when he crashes in her yard?",
        choices: ["Directions", "An apple", "fish custard", "a sonic screwdriver"],
        qNum : 8,
        correctAnswer: 1,
    },
   {
        question: "What is the Doctor's name for the TARDIS?",
        choices: ["Old Girl", "Type 40", "Sexy", "Idris"],
        qNum : 9,
        correctAnswer: 2,
    },
    ];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();