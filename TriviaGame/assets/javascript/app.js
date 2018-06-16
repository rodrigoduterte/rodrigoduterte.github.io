var answerIndices = [2,9,11,17,23]; //,26,34,37,43,46,53,58,61,67,74,76,82,89,93,96];
// http://www.quizmoz.com/tests/Animals-Tests/n/Nervous-System-Test.asp
var testbank = [ 
"What is the function of the nervous system?","makes you think","controls and coordinates body activity","responsible for the formation of bones","regulates body temperature",
"What are the 2 major divisions of the Nervous System?","Somatic & Autonomic","Peripheral & Autonomic","Central & Somatic","Central & Peripheral",
"What type of neuron carries impulses toward the CNS (Central Nervous System)?","Sensory","Motor","Associative","Inhibitor",
"Soma is another name for what?","dendrite","cell body","axon","ganglia",
"Neuron cell bodies that are grouped together outside the CNS are called","nuclei","plexus","ganglia","nerve fibres"]; /*,
"Junction between 2 neurons is a ..","synapse","ganglion","receptor","neurotransmitter", 
"What are the supportive cells of the Nervous System?","dendrite","Sensory","ganglia","Neuroglia",
"What is the protective covering over some nerve cells?","Nodes of Ranvier","Myelin","Neuron","Neurolemma",
"A network of intersecting nerves is called a","ganglia","stimulus","plexus","innervation", 
"What are the 3 layers of the meninges? (Inside to outside)","pia mater, arachnoid membrane, dura mater","Dura mater, pia mater, arachnoid membrane","pia mater, dura mater, arachnoid membrane","Dura mater, arachnoid membrane, pia mater",
"What are the small cavaties of the brain called?","pons","ependymas","ventricles","vermis", 
"What is the 2nd largest part of the brain that coordinates muscle activity for smooth movement?","brainstem","cerebrum",
"cerebellum","thalamus",
"How many cranial nerves are there?",12,10,14,13,
"What are the 2 roots of the spinal nerves?","medial and lateral","dorsal and ventral","dorsal and lateral","ventral and medial",
"What happens in the sympathetic nervous system?","heart rate and respiration rate decrease, pupils constrict",
"heart and respiration rate increase, pupils constrict","heart rate and respiration rate decrease, pupils dilate",
"heart and respiration rate increase, pupils dilate", 
"When the transmembrane potential across the cell membrane is approx. -70mV in a resting neurone it is said to be..",
"polarized","depolarized","hyperpolarized","hypopolarized", 
"What is it called when there is a certain level of depolarization required before an action potential can be triggered?",
"All-or-None law","Threshold","Refractory","Blah :)",
"What is the excitor neurotransmitter called that is released at synapses of the PNS and generates an action potential?",
"Terminal Bouton","Acetlycholinesterase","GABA","Acetylcholine", 
"What are 2 examples of Postsynaptic receptors?","Chemoreceptors and Exteroceptors","Mechanoreceptors and Electromagnetic receptors","Nicotinic and Muscarinic receptors","Brachial and Trigeminal receptors", 
"What type of sensory neuron moniters the interal environment and organs?","Visceral","Somatic","Motor","Receptor"]
*/

var seconds = 10;
var time=seconds;
var tbIndex=0;
var timeDisplay;
var waitBetweenQuestions;
var scores = [0,0];
var restartButton;

$(document).ready(function(){
    document.getElementById("board").style.display = "none";
    $("#bstart").on("click",function() {
        scores = [0,0];
        tbIndex=0;
        time=seconds;
        $("#bstart").hide();
        $("#click").hide();
        document.getElementById("board").style.display = "block";
        startQuestion();
    });
    
});

function correctAnswer(answer) {
    var toAttach = $("<div id=\"question\"></div>");
    if (answer === "correct") {
        console.log('You got the right answer!');
        $("#display").text('You got the right answer!');
    } else if (answer === "wrong") {
        console.log('The correct answer is:');
        $("#display").html('The correct answer is: <br>');
        $("#display").append(testbank[answerIndices[tbIndex]]);
    }
    clearInterval(timeDisplay);
    tbIndex++;
}

function reset() {
    clearTimeout(waitBetweenQuestions);
    time = seconds;
    startQuestion();
}

function startQuestion() {
    timeDisplay = setInterval(countdown, 1000);
    $("#display").text(time + " secs left");
    displayQuestion();
}

function countdown() {
    time--;
    if (time > 1 ) {
        $("#display").text(time + " secs left");
    } else if (time == 1) {
        $("#display").text(time + " sec left");
    } else { 
        scores[1]++;
        waitAfterQuizEnds("wrong",true);
    }
}

function waitAfterQuizEnds(cow,runs) {
    if (runs) {
        $("#quiz").empty();
        $("#display").empty();
        waitBetweenQuestions = setTimeout(reset,3000);
        correctAnswer(cow);
    } else {
        $("#quiz").empty();
        $("#display").empty();
        clearInterval(timeDisplay);
        displayScores();
    }   
}

function displayQuestion() {                
    var letters = ['A','B','C','D'];
    var toAttach = $("<div id=\"question\"></div>");
    if (tbIndex === answerIndices.length) {
        waitAfterQuizEnds("end",false);
    } else {
        toAttach.text(testbank[tbIndex*5]); 
        $("#quiz").append(toAttach);
        $("#quiz").append('<br>');
        $("#quiz").append('<br>');
        for(var i=0;i<4;i++) {
            var cIndex = i + (tbIndex * 5) + 1;
            if (answerIndices.indexOf(cIndex) > -1) {
                toAttach = $("<button id=\"" + letters[i] + "\" class=\"correct choice\">" + letters[i] + ". " + testbank[cIndex] + "</button>");
            } else {
                toAttach = $("<button id=\"" + letters[i] + "\" class=\"wrong choice\">" + letters[i] + ". " + testbank[cIndex] + "</button>");
            }
            $("#quiz").append(toAttach);
        }
        $(".correct").on("click",function() {
            scores[0]++;
            waitAfterQuizEnds("correct",true); 
        });
        $(".wrong").on("click",function() {
            scores[1]++; 
            waitAfterQuizEnds("wrong",true);
        });
    }
    
}

function displayScores() {
    $("#display").html('<p>Your brain isn\'t bleeding yet?! </p>');
    $("#display").append('<br>');
    $("#display").append('Ego Boosts(Corrects): ' + scores[0]);
    $("#display").append('<br>');
    $("#display").append('Humility Boosts(Incorrects): ' + scores[1]);
    $("#display").append('<br>');
    $("#display").append('<br>');
    $("#display").append('<br>');
    restartButton = $("<button id=\"restart\">Get Addicted, Play Again!</button>");
    $("#display").append(restartButton);
    restartButton.on("click",function() {
        $("#display").empty();
        restartButton.remove();
        document.getElementById("board").style.display = "none";
        $("#bstart").show();
        $("#click").show();
    });
}