document.addEventListener("DOMContentLoaded", function () {
    const initialImage = "37.png"; // 첫 번째 대사 이미지
    const secondImage = "36.png"; // 두 번째 대사 이미지
    const quizCompleteImage = "39.png"; // 모든 퀴즈 이후 이미지
    const finalImage = "40.png"; // 마지막 단계에서 변경되는 이미지

    const finalDialogues = [
        { text: "전기 콘센트에 물을 뿌리면 감전될 수 있어 위험해요.", audio: "T65.mp3" },
        { text: "전기 콘센트에 손이나 젓가락을 꽂아도 감전될 수 있어요.", audio: "T66.mp3" }
    ];

    let currentScenarioIndex = 0;
    let currentDialogueIndex = 0;
    let isFinalPhase = false;

    // 요소 참조
    const startContainer = document.getElementById("start-container");
    const startButton = document.getElementById("start-button");
    const dialogueTextElement = document.getElementById("dialogue-text");
    const nextButton = document.getElementById("next-button");
    const quizContainer = document.getElementById("quiz-container");
    const completionContainer = document.getElementById("completion-container");
    const quizQuestionElement = document.getElementById("quiz-question");
    const quizResultElement = document.getElementById("quiz-result");
    const mainImage = document.querySelector(".main-image");
    const dialogueContainer = document.querySelector(".text-container");

    const scenarios = [
        {
            dialogues: [
                { text: "이번에는 어떤 사고가 나타날까요?", audio: "T61.mp3" },
                { text: "소세지가 콘센트에 물을 뿌리고 있어요!", audio: "T62.mp3" },
                { text: "친구들 소세지 행동은 잘못된 행동일까요?", audio: "T63.mp3" },
                { text: "O,X 퀴즈를 통해 사고를 예방해봐요", audio: "T64.mp3" }
            ],
            quiz: {
                question: "소세지가 콘센트에 물을 뿌려도 안전해요.",
                correctAnswer: "X",
                resultMessage: "정답입니다. 콘센트에 물을 뿌리면 안돼요."
            },
            image: initialImage
        },
        {
            dialogues: [
                { text: "이번에는 어떤 사고가 나타날까요?", audio: "T61.mp3" },
                { text: "소세지가 쇠젓가락을 콘센트에 꽂고 있어요!", audio: "T622.mp3" },
                { text: "친구들 소세지의 행동은 잘못된 행동일까요?", audio: "T63.mp3" },
                { text: "O,X 퀴즈를 통해 사고를 예방해봐요", audio: "T64.mp3" }
            ],
            quiz: {
                question: "쇠젓가락을 콘센트에 꽂아도 괜찮아요.",
                correctAnswer: "X",
                resultMessage: "정답입니다. 콘센트에 젓가락이나 손을 넣으면 안돼요."
            },
            image: secondImage
        }
    ];

    function playAudio(audioFile) {
        const audio = new Audio(audioFile);
        audio.play();
    }

    function getCurrentScenario() {
        return scenarios[currentScenarioIndex];
    }

    function updateDialogue() {
        if (isFinalPhase) {
            const dialogue = finalDialogues[currentDialogueIndex];
            dialogueTextElement.textContent = dialogue.text;

            // 오디오 재생
            playAudio(dialogue.audio);

            if (currentDialogueIndex === finalDialogues.length - 1) {
                // 마지막 대사가 끝난 후 40.png 이미지 표시
                mainImage.src = finalImage;
                nextButton.style.display = "none"; // 화살표 숨기기
                setTimeout(triggerCompletionScreen, 5000); // 2초 후 완료 화면 표시
            }
        } else {
            const scenario = getCurrentScenario();
            const dialogue = scenario.dialogues[currentDialogueIndex];
            dialogueTextElement.textContent = dialogue.text;

            // 오디오 재생
            playAudio(dialogue.audio);

            mainImage.src = scenario.image;
        }
    }

    function showQuiz() {
        dialogueContainer.style.display = "none";
        quizContainer.style.display = "flex";
        const scenario = getCurrentScenario();
        quizQuestionElement.textContent = scenario.quiz.question;
        quizResultElement.textContent = "";
    }

    function returnToDialogue() {
        quizContainer.style.display = "none";
        dialogueContainer.style.display = "flex";
        currentScenarioIndex++;
        currentDialogueIndex = 0;

        if (currentScenarioIndex < scenarios.length) {
            updateDialogue();
        } else {
            isFinalPhase = true;
            mainImage.src = quizCompleteImage;
            updateDialogue();
        }
    }

    function triggerCompletionScreen() {
        // 완료 화면 표시
        dialogueContainer.style.display = "none"; // 대화 숨기기
        completionContainer.style.display = "flex"; // 완료 화면 표시
    }

    // "대사 시작" 버튼 클릭 이벤트
    startButton.addEventListener("click", function () {
        // "대사 시작" 버튼 숨기기
        startContainer.style.display = "none";

        // 대화 및 UI 활성화
        dialogueContainer.style.display = "flex";
        nextButton.style.display = "block";

        // 첫 대사 시작
        updateDialogue();
    });

    nextButton.addEventListener("click", function () {
        if (isFinalPhase) {
            currentDialogueIndex++;
            if (currentDialogueIndex < finalDialogues.length) {
                updateDialogue();
            }
        } else {
            currentDialogueIndex++;
            const scenario = getCurrentScenario();
            if (currentDialogueIndex === scenario.dialogues.length) {
                showQuiz();
            } else if (currentDialogueIndex < scenario.dialogues.length) {
                updateDialogue();
            }
        }
    });

    function checkAnswer(selectedAnswer) {
        const scenario = getCurrentScenario();
        const correctAudio = new Audio("right.mp3"); // 정답 오디오 파일
        const incorrectAudio = new Audio("wrong.mp3"); // 오답 오디오 파일
    
        if (selectedAnswer === scenario.quiz.correctAnswer) {
            quizResultElement.textContent = scenario.quiz.resultMessage;
            quizResultElement.style.color = "red";
            correctAudio.play(); // 정답 오디오 재생
        } else {
            quizResultElement.textContent = "오답입니다. 다시 생각해보세요! 😢";
            quizResultElement.style.color = "red";
            incorrectAudio.play(); // 오답 오디오 재생
        }
    
        setTimeout(returnToDialogue, 3000);
    }
    

    document.getElementById("option-o").addEventListener("click", function () {
        checkAnswer("O");
    });
    document.getElementById("option-x").addEventListener("click", function () {
        checkAnswer("X");
    });

    completionContainer.querySelector(".completion-button").addEventListener("click", function () {
        window.location.href = "test7.html"; // 이동할 URL
    });
});

