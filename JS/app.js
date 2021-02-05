window.onload = function() {
    populateHeader();
}

let listeQuiz = document.querySelector('.wrapper');
let quesitonsContainer = document.querySelector('#questions-container');
let article = document.querySelector('#Score');

function populateHeader() {
    fetch('js/package.json')
	.then(response => response.json())
	.then(data => {

        for (let i = 0; i < data['QUIZ'].length; i++){
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
            myH1.textContent = data['QUIZ'][i].theme;
            let myPara1 = document.createElement('p');
            myPara1.classList.add('number__questions');
            myPara1.textContent = data['QUIZ'][i].nombreQuestions + " questions";
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

    });
}

function debutQuiz(nbQuiz){
    document.querySelector('#questions-container').classList.add('show');
    selectQuestion(nbQuiz);
}

let tableQuestions = [];
let score = [];

function selectQuestion(nbQuiz){
    fetch('js/package.json')
	.then(response => response.json())
	.then(data => {
        for(let i = 0; i < data['QUIZ'][nbQuiz]['totalQuestions'].length; i++){
            tableQuestions.push(data['QUIZ'][nbQuiz]['totalQuestions'][i]);
        }
        showQuestion(nbQuiz);
    });
}

function showQuestion(nbQuiz){

    console.log(tableQuestions);

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



























// fetch('js/package.json')
// 	.then(response => response.json())
// 	.then(data => {
//         let listeQuiz = document.querySelector('.wrapper');
//         let quesitonsContainer = document.querySelector('#questions-container');
//         let article = document.querySelector('#Score');
//         console.log(data);
        
//         // Creation du menu avec la liste des quiz

// 		for (let i = 0; i < data['QUIZ'].length; i++){
            


//             let tableQuestions = [];
//             let score = [];

//             for(let b = 0; b < data['QUIZ'][i]['totalQuestions'].length; b++){
//                 tableQuestions.push(data['QUIZ'][i]['totalQuestions'][b]);
//             }
    
//             launchBtn.addEventListener('click', () => {
//                 console.log(tableQuestions);

//                 document.querySelector('#questions-container').classList.add('show');

//                 let insertQuestions = document.querySelector('#questions');

//                 document.querySelector('.suivant').disabled = true;

//                 while (insertQuestions.firstChild){
//                     insertQuestions.removeChild(insertQuestions.firstChild);
//                 }
                
//                 let tirageQuestion = Math.floor(Math.random() * (tableQuestions.length - 0) + 0);

//                 if (tableQuestions.length == 0){
//                     return console.log("fin du quiz");
//                 } else {
//                     document.querySelector('#questions-title').innerHTML = tableQuestions[tirageQuestion].question;

//                     for(let j = 0; j < tableQuestions[tirageQuestion].proposition.length; j++){
//                         let buttonReponse = document.createElement('button');
//                         buttonReponse.classList.add("question-" + j)
//                         buttonReponse.value = tableQuestions[tirageQuestion].proposition[j];
//                         buttonReponse.textContent = tableQuestions[tirageQuestion].proposition[j];
//                         let reponseQuestion = tableQuestions[tirageQuestion].reponse;

//                         buttonReponse.addEventListener('click', () => {
//                             if (buttonReponse.value == reponseQuestion){
//                                 buttonReponse.classList.add("correct");
//                                 score.push(1);
//                             } else if (buttonReponse.value != reponseQuestion){

//                                 for (let r = 0; r < 4; r++){
//                                     let selectQuestions = document.querySelector('.question-' + r);

//                                     if (selectQuestions.value == reponseQuestion){
//                                         selectQuestions.classList.add('correct');
//                                     }
//                                 }

//                                 buttonReponse.classList.add("wrong");
//                             }

//                             if (tableQuestions.length == 0){
//                                 document.querySelector('.score').classList.add('active');
//                                 document.querySelector('.score').addEventListener('click', () => {
//                                     showScore(score.length, nbQuiz);
//                                 });
//                             } else {
//                                 let buttonNext = document.querySelector('.suivant');
//                                 buttonNext.disabled = false;
//                                 buttonNext.addEventListener('click', () => {
//                                     //showQuestion(nbQuiz);
//                                 });
//                             }

//                         });

//                         insertQuestions.appendChild(buttonReponse);
//                     }

//                     tableQuestions.splice(tirageQuestion, 1);
//                 }


//             });
//         }
// 	});

     

// function showScore(score, nbQuiz){
//     section.classList.remove("active");
//     article.classList.add("active");
//     jsonObj = request.response;

//     let afficherLeScore = document.querySelector('.afficherScore');
//     afficherLeScore.innerHTML = "Votre score est de " + score + " sur " + jsonObj['QUIZ'][nbQuiz].nombreQuestions;

// }

// function changeQuiz(){
//     header.classList.add("active");
//     section.classList.remove("active");
//     article.classList.remove("active");
// }















// let requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
// let request = new XMLHttpRequest();

// let header = document.querySelector('header');
// let section = document.querySelector('section');

// request.open('GET', requestURL);

// request.responseType = 'json';
// request.send();

// request.onload = function() {
//     var superHeroes = request.response;
//     populateHeader(superHeroes);
//     showHeroes(superHeroes);
// }

// function populateHeader(jsonObj) {
//     var myH1 = document.createElement('h1');
//     myH1.textContent = jsonObj['squadName'];
//     header.appendChild(myH1);
  
//     var myPara = document.createElement('p');
//     myPara.textContent = 'Hometown: ' + jsonObj['homeTown'] + jsonObj['formed'];
//     header.appendChild(myPara);
// }

// function showHeroes(jsonObj) {
//     var heroes = jsonObj['members'];
  
//     for (var i = 0; i < heroes.length; i++) {
//       var myArticle = document.createElement('article');
//       var myH2 = document.createElement('h2');
//       var myPara1 = document.createElement('p');
//       var myPara2 = document.createElement('p');
//       var myPara3 = document.createElement('p');
//       var myList = document.createElement('ul');
  
//       myH2.textContent = heroes[i].name;
//       myPara1.textContent = 'Secret identity: ' + heroes[i].secretIdentity;
//       myPara2.textContent = 'Age: ' + heroes[i].age;
//       myPara3.textContent = 'Superpowers:';
  
//       var superPowers = heroes[i].powers;
//       for (var j = 0; j < superPowers.length; j++) {
//         var listItem = document.createElement('li');
//         listItem.textContent = superPowers[j];
//         myList.appendChild(listItem);
//       }
  
//       myArticle.appendChild(myH2);
//       myArticle.appendChild(myPara1);
//       myArticle.appendChild(myPara2);
//       myArticle.appendChild(myPara3);
//       myArticle.appendChild(myList);
  
//       section.appendChild(myArticle);
//     }
// }