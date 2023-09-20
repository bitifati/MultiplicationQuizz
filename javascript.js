//javascript.js
var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

//if we click on the start/reset
document.getElementById("startreset").onclick = function(){
    
    //if we are playing
    
    if(playing == true){
        
        location.reload(); //reload page
        
    }else{//if we are not playing
        
        //change mode to playing
        
        playing = true;
        
        //set score to 0
        
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
     
        //show countdown box 
        
        show("timeremaining");
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        
        //hide game over box
        
        hide("gameOver");
        
        //change button to reset
        document.getElementById("startreset").innerHTML = "Reset Game";
        
        //start countdown
        
        startCountdown();
        
        //generate a new Q&A
        
        generateQA();
    }
    
}

//Clicking on an answer box

for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
    //check if we are playing     
    if(playing == true){//yes
        if(this.innerHTML == correctAnswer){
        //correct answer
            
            //increase score by 1
            score++;
            document.getElementById("scorevalue").innerHTML = score;
            //hide wrong box and show correct box
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");   
            }, 1000);
            
            //Generate new Q&A
            
            generateQA();
        }else{
        //wrong answer
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");   
            }, 1000);
        }
    }
}   
}
//if we click on answer box
    //if we are playing
        //correct?
            //yes
                //increase score
                //show correct box for 1sec
                //generate new Q&A
            //no
                //show try again box for 1sec


//functions

//start counter

function startCountdown(){
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining == 0){// game over
            stopCountdown();
            show("gameOver");
         document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>Your score is " + score + ".</p>";   
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);    
}

//stop counter

function stopCountdown(){
    clearInterval(action);   
}

//hide an element

function hide(Id){
    document.getElementById(Id).style.display = "none";   
}

//show an element

function show(Id){
    document.getElementById(Id).style.display = "block";   
}

//generate question and multiple answers

function generateQA(){
    var x = 1+ Math.round(9*Math.random());
    var y = 1+ Math.round(9*Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1+ Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer
    
    //fill other boxes with wrong answers
    
    var answers = [correctAnswer];
    
    for(i=1; i<5; i++){
        if(i != correctPosition) {
            var wrongAnswer;
            do{
                //wrongAnswer = (1+ Math.round(9*Math.random()))*(1+ Math.round(9*Math.random())); //a wrong answer
                
                if (correctAnswer <= 10) {
                    wrongAnswer = generateNum(0, 15);
                }
                else if (correctAnswer >= 90) {
                    wrongAnswer = generateNum(85, 100);
                } else {
                    wrongAnswer = generateNum(correctAnswer - 10, correctAnswer + 10);
                }

            }while(answers.indexOf(wrongAnswer)>-1)
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }


    /*if (correctAnswer <= 10) {
        while (i < 5) {
            possibleAnswer = generateNum(0, 15);
            if (i < 5 && !answers.includes(possibleAnswer, 0)) {
                wrongAnswer = possibleAnswer;
                answers.push(wrongAnswer);
                document.getElementById("box"+i).innerHTML = wrongAnswer;
                i++;
            }
        }
    } else {
        if (correctAnswer >= 90) {
            possibleAnswer = generateNum(85, 100)
            while (i < 5 && !answers.includes(possibleAnswer, 0)) {
                wrongAnswer = possibleAnswer;
                answers.push(wrongAnswer);
                document.getElementById("box"+i).innerHTML = wrongAnswer;
                i++;
            }
        } else {
            possibleAnswer = generateNum(result - 10, result + 10);
            while (i < 5 && !answers.includes(possibleAnswer, 0)) {
                wrongAnswer = possibleAnswer;
                answers.push(wrongAnswer);
                document.getElementById("box"+i).innerHTML = wrongAnswer;
                i++;  
            }
        }
    }*/

}



/*if (correctAnswer <= 10) {
    while (i < 5) {
        possibleAnswer = generateNum(0, 15);
        if (i < 5 && !answers.includes(possibleAnswer, 0)) {
            wrongAnswer = possibleAnswer;
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
            i++;
        }
    }
} else {
    if (correctAnswer >= 90) {
        possibleAnswer = generateNum(85, 100)
        while (i < 5 && !answers.includes(possibleAnswer, 0)) {
            wrongAnswer = possibleAnswer;
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
            i++;
        }
    } else {
        possibleAnswer = generateNum(result - 10, result + 10);
        while (i < 5 && !answers.includes(possibleAnswer, 0)) {
            wrongAnswer = possibleAnswer;
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
            i++;  
        }
    }
}*/

function generateNum(min, max) {
    var num;
    num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}