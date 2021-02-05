let requestURL = 'https://ewen35550.github.io/SLAM/JS/package.json';
let request = new XMLHttpRequest();

let header = document.querySelector('.pageAccueil');
let section = document.querySelector('#Quiz');
let article = document.querySelector('#Score');

request.open('GET', requestURL);

request.responseType = 'json';
request.send();

request.onload = function() {
    let quiz = request.response;
    populateHeader(quiz);
}

function populateHeader(jsonObj) {
    for (let i = 0; i < jsonObj['QUIZ'].length; i++){
        let divQuiz = document.createElement('div');
            divQuiz.classList.add('quiz');
            listeQuiz.appendChild(divQuiz);
    
            let quizInfos = document.createElement('div');
            quizInfos.classList.add('quiz__infos');
            let launchBtn = document.createElement('div');
            launchBtn.classList.add('launch__btn');
            divQuiz.appendChild(quizInfos);
            divQuiz.appendChild(launchBtn);
    
            let myH1 = document.createElement('h1');
            myH1.classList.add('quiz__name');
            myH1.textContent = jsonObj['QUIZ'][i].theme;
            let myPara1 = document.createElement('p');
            myPara1.classList.add('number__questions');
            myPara1.textContent = jsonObj['QUIZ'][i].nombreQuestions + " questions";
            quizInfos.appendChild(myH1);
            quizInfos.appendChild(myPara1);
    
            let textButton = document.createElement('p');
            textButton.textContent = "Lancer le quiz";
            let iconButton = document.createElement('i');
            iconButton.classList.add('bx');
            iconButton.classList.add('bxs-rocket');
            launchBtn.appendChild(textButton);
            launchBtn.appendChild(iconButton);

            launchBtn.addEventListener('click', () => {
                debutQuiz(i);
            });
    }
}

// DEBUT QUIZ

function debutQuiz(nbQuiz){
    document.querySelector('#questions-container').classList.add('show');

    quiz = request.response;
    selectQuestion(quiz, nbQuiz);
}

// QUESTIONS QUIZ

let tableQuestions = [];
let score = [];

function selectQuestion(jsonObj, nbQuiz){
    for(let i = 0; i < jsonObj['QUIZ'][nbQuiz]['totalQuestions'].length; i++){
        tableQuestions.push(jsonObj['QUIZ'][nbQuiz]['totalQuestions'][i]);
    }
    showQuestion(nbQuiz);
}

function showQuestion(nbQuiz){
    console.log(tableQuestions);
    jsonObj = request.response;
	
    document.querySelector('#questions-container').classList.add('show');
	
    let insertQuestions = document.querySelector('#questions');

    document.querySelector('.suivant').disabled = true;

    while (insertQuestions.firstChild){
        insertQuestions.removeChild(insertQuestions.firstChild);
    }
    
    let tirageQuestion = Math.floor(Math.random() * (tableQuestions.length - 0) + 0);

    if (tableQuestions.length == 0){
        return console.log("fin du quiz");
    } else {
        document.querySelector('#questions-title').innerHTML = tableQuestions[tirageQuestion].question;

        for(let j = 0; j < tableQuestions[tirageQuestion].proposition.length; j++){
            let buttonReponse = document.createElement('button');
            buttonReponse.classList.add("question-" + j)
            buttonReponse.value = tableQuestions[tirageQuestion].proposition[j];
            buttonReponse.textContent = tableQuestions[tirageQuestion].proposition[j];
            let reponseQuestion = tableQuestions[tirageQuestion].reponse;

            buttonReponse.addEventListener('click', () => {
                if (buttonReponse.value == reponseQuestion){
                    buttonReponse.classList.add("correct");
                    score.push(1);
                } else if (buttonReponse.value != reponseQuestion){

                    for (let r = 0; r < 4; r++){
                        let selectQuestions = document.querySelector('.question-' + r);

                        if (selectQuestions.value == reponseQuestion){
                            selectQuestions.classList.add('correct');
                        }
                    }

                    buttonReponse.classList.add("wrong");
                }

                if (tableQuestions.length == 0){
                    document.querySelector('.score').classList.add('active');
                    document.querySelector('.score').addEventListener('click', () => {
                        showScore(score.length, nbQuiz);
                    });
                } else {
                    let buttonNext = document.querySelector('.suivant');
                    buttonNext.disabled = false;
                    buttonNext.addEventListener('click', () => {
                        showQuestion(nbQuiz);
                    });
                }

            });

            insertQuestions.appendChild(buttonReponse);
        }

        tableQuestions.splice(tirageQuestion, 1);
    }
}

function showScore(score, nbQuiz){
    section.classList.remove("active");
    article.classList.add("active");
    jsonObj = request.response;

    let afficherLeScore = document.querySelector('.afficherScore');
    afficherLeScore.innerHTML = "Votre score est de " + score + " sur " + jsonObj['QUIZ'][nbQuiz].nombreQuestions;

}

function changeQuiz(){
    header.classList.add("active");
    section.classList.remove("active");
    article.classList.remove("active");
}
